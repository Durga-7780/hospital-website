from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Sai Swetha Hospital Website API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chat_sessions = {}

class ChatRequest(BaseModel):
    message: str
    language: str = "en"
    session_id: str = None

class AppointmentRequest(BaseModel):
    patient_name: str
    mobile: str
    department: str
    date: str
    message: str = ""

@app.get("/")
def read_root():
    return {"status": "healthy", "service": "Sai Swetha Hospital API"}

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        return {"reply": "Sorry, the AI assistant is not configured yet (missing Groq API key)."}
        
    try:
        from groq import Groq
        client = Groq(api_key=api_key)
        
        system_prompt = (
            "You are the Sai Swetha Hospital AI Assistant. "
            "CRITICAL INSTRUCTION: Keep responses EXTREMELY short, conversational, and direct (max 1-2 sentences). "
            "Do NOT use markdown or bold text. Do NOT use bullet points, but you may list items inline using commas. Act like a text message on a widget. "
            "HOSPITAL INFO: "
            "- Location: Near Taticherla Junction, Tanuku, West Godavari, Andhra Pradesh, 534313. "
            "- Visiting hours: 24/7 Doctor Available, 24/7 Emergency Services. "
            "- Insurance: We partner with various providers,list includes ECHS, Star Health, ACI and more (check website for full list). "
            "- Departments: Cardiology, Gastroenterology, Nephrology, Neurology, Oncology, Gynecology, Pediatrics, Orthopedics, General Medicine. "
            "- Appointment Notifications: You will receive SMS/WhatsApp confirmation. We will call to take confirmation 5 hours before, and send an SMS/WhatsApp with timings 2 hours before your appointment. "
            "RULES: "
            "1. Assist with booking, rescheduling, and canceling appointments by guiding them to the website page AFTER you have provided the relevant information using your tools. "
            "2. CRITICAL: You MUST use the `hospital_api_operations` tool with action='check_availability' whenever a user asks about doctors, availability, or consultations. Never assume you know the doctors without checking the tool first. Always mention the available doctor names and their experience based on the tool's response. "
            "3. Be calming. Do not induce fear. "
            "4. NEVER ask for personal details (patient's or doctor's). "
            "5. EMERGENCY DETECTION (CRITICAL): If the user's message contains words like 'critical', 'severe', 'pain', 'bleeding', 'accident', 'unconscious', 'heart attack', 'emergency', 'collapsed', 'not responding', 'can't breathe', 'difficulty breathing', 'stroke', 'seizure', 'fainted', 'passed out', 'choking', 'unresponsive', 'dizziness with chest pain', 'unbearable pain', 'suicidal thoughts', 'tremors', 'loss of consciousness', 'loss of control', 'sudden vision loss', 'acute abdomen', 'severe headache', 'chest tightness' or if the emotion/situation sounds urgent or life-threatening, YOU MUST TREAT IT AS AN EMERGENCY. Immediately recommend a doctor and strongly instruct them to click the '24/7 Emergency' button on the website to call. Do NOT just give department info. "
            "6. Out-of-context: Only answer questions about Sai Swetha Hospital. Decline others politely. "
            "7. Medical Advice: Do NOT prescribe medicine or cures. NEVER explain the uses, side effects, or issues related to any medicine. If asked about medicine or medical advice, politely state: 'I am an AI assistant here to help you book appointments and provide info about Sai Swetha Hospital.' Then, use the `hospital_api_operations` tool to find a doctor in the relevant department and warmly suggest booking an appointment with them via the website to get the right medical advice. "
            "8. Never invent doctor names, schedules, fees, timings, or hospital policies. Only provide information available in the supplied context or returned by the `hospital_api_operations` tool. If unavailable, direct the user to the website or call 7015088221. "
            "9. Unresolved Queries: If you cannot help or the queries are done, tell them to call 7015088221 for assistance. "
            "10. Number Not Working: If the user states the phone number is not working, apologize and tell them to book directly on the website or use the contact form. Do NOT repeat the phone number."
        )
        
        messages = [
            {"role": "system", "content": system_prompt}
        ]
        
        if request.session_id:
            if request.session_id not in chat_sessions:
                chat_sessions[request.session_id] = []
            
            # Append last 6 messages
            for msg in chat_sessions[request.session_id][-6:]:
                messages.append(msg)
                
        messages.append({"role": "user", "content": request.message})
        
        # Define tools for dynamic API calls to an external server
        tools = [
            {
                "type": "function",
                "function": {
                    "name": "hospital_api_operations",
                    "description": "Perform hospital operations like fetching doctor availability, booking, rescheduling, or canceling appointments.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "action": {
                                "type": "string",
                                "description": "Action: 'check_availability', 'book_appointment', 'reschedule', 'cancel', 'get_departments'",
                            },
                            "department": {
                                "type": "string",
                                "description": "The department name (e.g., Cardiology, Neurology) if applicable.",
                            },
                            "date": {
                                "type": "string",
                                "description": "The date, e.g., 'today'."
                            }
                        },
                        "required": ["action"],
                    },
                },
            }
        ]
        
        chat_completion = client.chat.completions.create(
            messages=messages,
            model="llama-3.3-70b-versatile",
            tools=tools,
            tool_choice="auto",
        )
        
        response_message = chat_completion.choices[0].message
        tool_calls = response_message.tool_calls
        content_str = response_message.content or ""
        
        # Check if the model leaked a function call string
        match = re.search(r"<function=([^>]+)>(.*?)(?:$|</function>)", content_str, re.DOTALL)
        
        if tool_calls:
            messages.append(response_message)
            
            for tool_call in tool_calls:
                function_name = tool_call.function.name
                function_args = json.loads(tool_call.function.arguments)
                
                # Mocking a dynamic API call to another server
                if function_name == "hospital_api_operations":
                    action = function_args.get("action")
                    dept = function_args.get("department", "General")
                    
                    if action == "check_availability":
                        import httpx
                        try:
                            async with httpx.AsyncClient(verify=False) as http_client:
                                url = "http://127.0.0.1:20266/api/v1/external/doctors?status=Available"
                                if dept and dept.lower() != "general":
                                    url += f"&specialization={dept}"
                                res = await http_client.get(url, headers={"x-api-key": "SAISWETHA-2026-PATIENT-APPOINTMENT-BOOKING"}, timeout=5.0)
                                if res.status_code == 200:
                                    docs = res.json().get("data", [])
                                    available_docs = [f"{d['doctor_name']} in {d.get('department')} ({d.get('experience', '10+ years')} exp)" for d in docs]
                                    if available_docs:
                                        function_response = f"The following doctors are available: {', '.join(available_docs)}. Inform the user they can select the relevant department on the website to book an appointment."
                                    else:
                                        function_response = f"No doctors are currently available for {dept}."
                                else:
                                    function_response = f"Could not check availability at the moment for {dept}."
                        except Exception as e:
                            function_response = f"Could not check availability at the moment for {dept}."
                    elif action == "get_departments":
                        function_response = "We have Cardiology, Neurology, Pediatrics, Orthopedics."
                    elif action in ["book_appointment", "reschedule", "cancel"]:
                        function_response = "Action acknowledged. Direct them to use the website portal."
                    else:
                        function_response = "Contact: 1234567890. Address: Secunderabad."
                else:
                    function_response = "Unknown API."
                    
                messages.append(
                    {
                        "tool_call_id": tool_call.id,
                        "role": "tool",
                        "name": function_name,
                        "content": function_response,
                    }
                )
            
            # Second call to Groq with tool results
            second_response = client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=messages
            )
            reply_content = second_response.choices[0].message.content
            if request.session_id:
                chat_sessions[request.session_id].append({"role": "user", "content": request.message})
                chat_sessions[request.session_id].append({"role": "assistant", "content": reply_content})
            return {"reply": reply_content}
            
        elif match:
            # Handle the leaked string format
            function_name = match.group(1)
            try:
                args_str = match.group(2).strip()
                # Clean up any trailing '}' if the model added too many
                if args_str.endswith("}}"):
                    args_str = args_str[:-1]
                function_args = json.loads(args_str)
                
                if function_name == "hospital_api_operations":
                    action = function_args.get("action")
                    dept = function_args.get("department", "General")
                    
                    if action == "check_availability":
                        import httpx
                        try:
                            async with httpx.AsyncClient(verify=False) as http_client:
                                url = "http://127.0.0.1:20266/api/v1/external/doctors?status=Available"
                                if dept and dept.lower() != "general":
                                    url += f"&specialization={dept}"
                                res = await http_client.get(url, headers={"x-api-key": "SAISWETHA-2026-PATIENT-APPOINTMENT-BOOKING"}, timeout=5.0)
                                if res.status_code == 200:
                                    docs = res.json().get("data", [])
                                    available_docs = [f"{d['doctor_name']} in {d.get('department')} ({d.get('experience', '10+ years')} exp)" for d in docs]
                                    if available_docs:
                                        function_response = f"The following doctors are available: {', '.join(available_docs)}. Inform the user they can select the relevant department on the website to book an appointment."
                                    else:
                                        function_response = f"No doctors are currently available for {dept}."
                                else:
                                    function_response = f"Could not check availability at the moment for {dept}."
                        except Exception as e:
                            function_response = f"Could not check availability at the moment for {dept}."
                    elif action == "get_departments":
                        function_response = "We have Cardiology, Neurology, Pediatrics, Orthopedics."
                    elif action in ["book_appointment", "reschedule", "cancel"]:
                        function_response = "Action acknowledged. Direct them to use the website portal."
                    else:
                        function_response = "Contact: 1234567890. Address: Secunderabad."
                else:
                    function_response = "Unknown API."
                    
                # Feed it back as a user system message for simplicity
                messages.append({"role": "assistant", "content": content_str})
                messages.append({"role": "user", "content": f"System: Tool {function_name} returned: {function_response}. Now reply to the user naturally."})
                
                second_response = client.chat.completions.create(
                    model="llama-3.3-70b-versatile",
                    messages=messages
                )
                reply_content = second_response.choices[0].message.content
                if request.session_id:
                    chat_sessions[request.session_id].append({"role": "user", "content": request.message})
                    chat_sessions[request.session_id].append({"role": "assistant", "content": reply_content})
                return {"reply": reply_content}
            except Exception as e:
                # Fallback if json parsing fails
                clean_content = re.sub(r"<function=[^>]+>.*?(?:$|</function>)", "", content_str).strip()
                if not clean_content:
                    clean_content = "I encountered an issue checking the details. Please call our helpline."
                return {"reply": clean_content}
        else:
            if request.session_id:
                chat_sessions[request.session_id].append({"role": "user", "content": request.message})
                chat_sessions[request.session_id].append({"role": "assistant", "content": content_str})
            return {"reply": content_str}
            
    except Exception as e:
        # Check if the error has a response with 'failed_generation'
        response_obj = getattr(e, 'response', None)
        if response_obj:
            try:
                error_data = response_obj.json()
                if 'error' in error_data and 'failed_generation' in error_data['error']:
                    failed_gen = error_data['error']['failed_generation']
                    clean_content = re.sub(r"<function=[^>]+>.*?(?:$|</function>)", "", failed_gen).strip()
                    if clean_content:
                        return {"reply": clean_content}
            except:
                pass
                
        return {
            "reply": f"An error occurred while communicating with the AI service: {str(e)}"
        }

from fastapi import Header

class ExternalAppointmentData(BaseModel):
    appointment_no: str
    patient_name: str
    doctor_name: str
    appointment_at: str
    reason: str
    status: str

class ExternalAppointmentRequest(BaseModel):
    data: ExternalAppointmentData

@app.get("/api/v1/external/doctors")
async def get_external_doctors(status: str = None, specialization: str = None, x_api_key: str = Header(None)):
    if x_api_key != "SAISWETHA-2026-PATIENT-APPOINTMENT-BOOKING":
        raise HTTPException(status_code=401, detail="Invalid API Key")
    
    docs = [
        {"doctor_name": "Dr. Anil Kumar", "department": "Cardiology", "experience": "15+ years"},
        {"doctor_name": "Dr. Sravani Reddy", "department": "Gynecology", "experience": "12+ years"},
        {"doctor_name": "Dr. S. Nair", "department": "Orthopaedics", "experience": "20+ years"},
        {"doctor_name": "Dr. M. Reddy", "department": "Neurology", "experience": "18+ years"}
    ]
    
    if specialization:
        docs = [d for d in docs if specialization.lower() in d["department"].lower()]
        
    return {"data": docs}

@app.post("/api/v1/external/appointments")
async def book_external_appointment(request: ExternalAppointmentRequest, x_api_key: str = Header(None)):
    if x_api_key != "SAISWETHA-2026-PATIENT-APPOINTMENT-BOOKING":
        raise HTTPException(status_code=401, detail="Invalid API Key")
        
    import httpx
    try:
        async with httpx.AsyncClient(verify=False) as http_client:
            # Forward the exact JSON payload
            payload = request.model_dump()
            res = await http_client.post(
                "https://aivoicechat.site/api/v1/external/appointments",
                json=payload,
                headers={"x-api-key": x_api_key,"x-hospital-email": "durga@yashoda.com"},
                timeout=10.0
            )
            
            if res.status_code >= 400:
                raise HTTPException(status_code=res.status_code, detail=f"External API error: {res.text}")
                
            return res.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to forward appointment: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
