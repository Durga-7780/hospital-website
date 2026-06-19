import { Shield, Clock, HeartHandshake, Accessibility } from 'lucide-react';
import { Card, CardContent } from './ui/card';

export default function FeaturesSection() {
  const features = [
    { icon: Shield, title: 'Insurance Assistance', desc: 'Cashless treatment with major providers' },
    { icon: Clock, title: '24/7 Emergency Services', desc: 'Round-the-clock critical care' },
    { icon: HeartHandshake, title: 'Patient-Centered Care', desc: 'Compassionate and ethical approach' },
    { icon: Accessibility, title: 'Wheelchair Accessible', desc: 'Friendly infrastructure for everyone' },
  ];

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-primary font-semibold tracking-wider uppercase text-sm mb-2">Why Choose Us</h2>
          <h3 className="text-3xl md:text-4xl font-bold font-poppins text-slate-900 mb-4">Dedicated to Your Health</h3>
          <p className="text-slate-600">We provide a holistic healing environment focused entirely on your recovery and well-being.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="border-slate-100 hover:border-secondary hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="font-poppins font-semibold text-lg mb-2 text-slate-900">{feature.title}</h4>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Insurance Partners */}
        <div id="insurance" className="mt-32 border-t border-slate-100 pt-16">
          <div className="text-center mb-10">
            <h4 className="text-xl font-bold font-poppins text-slate-900">Empaneled Insurance Partners</h4>
            <p className="text-slate-500 mt-2">Avail cashless treatments through our network of health insurance providers.</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Using text placeholders since logos aren't available */}
            <div className="font-bold text-2xl tracking-tighter">HDFC ERGO</div>
            <div className="font-bold text-2xl tracking-tighter text-red-600">ICICI Lombard</div>
            <div className="font-bold text-2xl tracking-tighter text-blue-800">STAR HEALTH</div>
            <div className="font-bold text-2xl tracking-tighter text-green-700">RELIANCE</div>
          </div>
        </div>
      </div>
    </section>
  );
}
