import { Calendar } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

export default function DoctorsSection() {
  const doctors = [
    {
      name: 'Dr. A. Sharma',
      qualification: 'MBBS, MD, DM (Cardiology)',
      specialization: 'Senior Cardiologist',
      experience: '15+ Years Experience',
      timings: 'Mon-Sat: 10:00 AM - 2:00 PM',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Dr. K. Verma',
      qualification: 'MS (Orthopaedics)',
      specialization: 'Orthopaedic Surgeon',
      experience: '12+ Years Experience',
      timings: 'Mon-Sat: 11:00 AM - 4:00 PM',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Dr. M. Reddy',
      qualification: 'MBBS, MD (Pediatrics)',
      specialization: 'Pediatrician',
      experience: '10+ Years Experience',
      timings: 'Mon-Sun: 9:00 AM - 1:00 PM',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=600&auto=format&fit=crop'
    },
    {
      name: 'Dr. S. Nair',
      qualification: 'MS (Obstetrics & Gynaecology)',
      specialization: 'Gynaecologist',
      experience: '18+ Years Experience',
      timings: 'Mon-Sat: 10:00 AM - 5:00 PM',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <section id="doctors" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-2">Expert Care</h2>
          <h3 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">Our Specialists</h3>
          <p className="text-slate-600">Meet our team of highly qualified and experienced medical professionals.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, idx) => (
            <Card key={idx} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h4 className="font-poppins font-bold text-xl">{doctor.name}</h4>
                  <p className="text-sm text-primary-foreground font-medium">{doctor.specialization}</p>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="text-sm font-semibold text-slate-800">{doctor.qualification}</div>
                  <div className="text-sm text-slate-500">{doctor.experience}</div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-100 p-2 rounded-md">
                  <Calendar className="w-4 h-4 text-primary" />
                  {doctor.timings}
                </div>
                <Button className="w-full group" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
            View All Doctors
          </Button>
        </div>
      </div>
    </section>
  );
}
