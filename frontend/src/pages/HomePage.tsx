import { motion } from 'framer-motion';
import { ChevronRight, PhoneCall, CalendarPlus, Activity, ShieldPlus, HeartPulse, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AboutSection from '@/components/AboutSection';
import FeaturesSection from '@/components/FeaturesSection';
import DoctorsSection from '@/components/DoctorsSection';
import BookingSection from '@/components/BookingSection';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white -z-10"></div>
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Top Multi-Speciality Hospital in Tanuku
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-slate-900 leading-[1.1]">
              Trusted Healthcare for <span className="text-primary">Every Stage</span> of Life
            </h1>
            
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Advanced medical technology combined with compassionate care. 24×7 Emergency Care • Advanced Treatments • Experienced Specialists
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="rounded-full font-semibold text-base px-8 shadow-lg shadow-primary/25 group" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <CalendarPlus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Book Appointment
              </Button>
              <Button size="lg" variant="outline" className="rounded-full font-semibold text-base px-8 border-slate-300 group">
                <PhoneCall className="mr-2 h-5 w-5 text-destructive group-hover:scale-110 transition-transform" />
                Emergency Contact
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-200">
              {[
                { label: 'Experience', value: '11+ Yrs' },
                { label: 'Emergency', value: '24×7' },
                { label: 'Specialities', value: '20+' },
                { label: 'Happy Patients', value: '50k+' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop" 
                alt="Hospital Care" 
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              {/* Floating Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center text-secondary">
                  <ShieldPlus className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">Advanced Infrastructure</div>
                  <div className="text-sm text-slate-600">Equipped with state-of-the-art tech</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DepartmentsSection = () => {
  const departments = [
    { name: 'Cardiology', icon: HeartPulse, desc: 'Heart care and cardiac consultations' },
    { name: 'Orthopaedics', icon: Activity, desc: 'Joint replacement and fracture care' },
    { name: 'Neurology', icon: Activity, desc: 'Brain and nervous system care' },
    { name: 'Pediatrics', icon: Users, desc: 'Child healthcare services' },
    { name: 'Obstetrics', icon: Users, desc: 'Women\'s healthcare' },
    { name: 'Nephrology', icon: Activity, desc: 'Kidney care and treatment' },
  ];

  return (
    <section id="departments" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-2">Center of Excellence</h2>
          <h3 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">Our Departments</h3>
          <p className="text-slate-600">Comprehensive medical care across various specialities under one roof.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <Card className="h-full border-slate-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <dept.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-slate-900 group-hover:text-primary transition-colors">{dept.name}</h4>
                  <p className="text-slate-600 mb-6 flex-grow">{dept.desc}</p>
                  <span className="text-sm font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <DepartmentsSection />
      <FeaturesSection />
      <DoctorsSection />
      <BookingSection />
    </div>
  );
}

