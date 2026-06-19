import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export default function BookingSection() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    department: '',
    date: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const aptNo = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const response = await fetch('/api/v1/external/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'SAISWETHA-2026-PATIENT-APPOINTMENT-BOOKING',
          'x-hospital-email': 'durga@yashoda.com'
        },
        body: JSON.stringify({
          data: {
            appointment_no: aptNo,
            patient_name: formData.name,
            doctor_name: formData.department,
            appointment_at: formData.date ? `${formData.date}T10:30:00Z` : new Date().toISOString(),
            reason: formData.message,
            status: "Booked"
          }
        }),
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.detail || 'Failed to book');
      
      console.log('API Response:', result);
      setToast({ message: `Appointment ${result.appointment_no || aptNo} booked successfully for ${result.patient_name || formData.name}!`, type: 'success' });
      setFormData({ name: '', mobile: '', department: '', date: '', message: '' });
    } catch (error) {
      console.error('Error booking appointment:', error);
      setToast({ message: 'Failed to Book appointment! - Please try After some time.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  return (
    <section id="contact" className="py-24 bg-primary/5 relative">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed top-24 right-6 z-[100] bg-white rounded-lg shadow-2xl border border-slate-200 overflow-hidden w-80"
          >
            <div className="p-4 flex items-start gap-3">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1">
                <h4 className={`font-semibold text-sm ${toast.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                  {toast.type === 'success' ? 'Success' : 'Error'}
                </h4>
                <p className="text-slate-600 text-sm mt-1">{toast.message}</p>
              </div>
              <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: 0 }}
              transition={{ duration: 5, ease: 'linear' }}
              className={`h-1 ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          
          <div className="lg:w-2/5 bg-primary text-white p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10 space-y-6">
              <h3 className="text-3xl font-bold font-poppins">Book an Appointment</h3>
              <p className="text-primary-foreground/90 leading-relaxed">
                Schedule a visit with our experts. Fill out the form and our team will get back to you to confirm your appointment.
              </p>
              
              <div className="space-y-4 pt-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl">1</div>
                  <div>
                    <h4 className="font-semibold">Fill Details</h4>
                    <p className="text-sm text-primary-foreground/80">Provide your basic info</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl">2</div>
                  <div>
                    <h4 className="font-semibold">Choose Doctor</h4>
                    <p className="text-sm text-primary-foreground/80">Select department & specialist</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-xl">3</div>
                  <div>
                    <h4 className="font-semibold">Get Confirmation</h4>
                    <p className="text-sm text-primary-foreground/80">Receive SMS/WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-3/5 p-8 md:p-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Patient Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Mobile Number</label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Department</label>
                  <select name="department" value={formData.department} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white">
                    <option value="">Select Department</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Orthopaedics">Orthopaedics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Gynecology">Gynecology</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Preferred Date</label>
                  <input type="date" name="date" value={formData.date} min={new Date().toISOString().split('T')[0]} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Message [Reason of appointment] <span className="text-red-500">*</span></label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Describe your symptoms or reason for visit..."></textarea>
              </div>
              
              <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto px-8 py-6 text-lg font-semibold rounded-xl">
                {loading ? 'Submitting...' : 'Request Appointment'}
              </Button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
