import { CheckCircle2, HeartPulse, Microscope } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-accent/30 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" 
                alt="Hospital Building" 
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=800&auto=format&fit=crop" 
                alt="Surgery Room" 
                className="rounded-2xl shadow-lg w-full h-64 object-cover mt-8"
              />
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-2xl z-10 text-center min-w-[200px]">
              <div className="text-primary font-bold text-4xl mb-1">11+</div>
              <div className="text-slate-600 font-medium text-sm">Years of Excellence</div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-2">About Sai Swetha</h2>
              <h3 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-6">Patient-First Healthcare With Modern Infrastructure</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Sai Swetha Super Speciality Hospital was founded with a mission to bring world-class healthcare to Tanuku. We combine ethical medical practices with state-of-the-art technology to ensure the best possible outcomes for our patients.
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                'Patient-first approach in every decision',
                'Advanced treatment facilities and equipment',
                'Highly experienced specialists across domains',
                'Transparent and ethical medical practices'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              <Card className="border-primary/20 bg-white">
                <CardContent className="p-6">
                  <HeartPulse className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-poppins font-semibold text-lg mb-2">Our Mission</h4>
                  <p className="text-sm text-slate-600">To provide compassionate, accessible, and high-quality healthcare services.</p>
                </CardContent>
              </Card>
              <Card className="border-secondary/20 bg-white">
                <CardContent className="p-6">
                  <Microscope className="w-8 h-8 text-secondary mb-4" />
                  <h4 className="font-poppins font-semibold text-lg mb-2">Our Vision</h4>
                  <p className="text-sm text-slate-600">To be the most trusted healthcare partner recognized for medical excellence.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
