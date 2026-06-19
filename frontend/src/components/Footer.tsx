import { Globe, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-slate-800 pb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
                SS
              </div>
              <div className="flex flex-col text-white">
                <span className="font-poppins font-bold text-lg leading-tight">Sai Swetha</span>
                <span className="text-xs text-primary font-medium tracking-wide uppercase">Hospital</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              Advanced Healthcare with Compassion and Excellence. Leading multi-speciality hospital in Tanuku.
            </p>
            <div className="flex gap-4 pt-4">
              {[Globe, Globe, Globe, Globe].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold font-poppins mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Doctors', 'Health Packages', 'Insurance & Cashless', 'Careers', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-white font-semibold font-poppins mb-6">Departments</h4>
            <ul className="space-y-3">
              {['Cardiology', 'Orthopaedics', 'Neurology', 'Pediatrics', 'Obstetrics & Gynaecology'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold font-poppins mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">Sai Swetha Super Speciality Hospital, Main Road, Tanuku, Andhra Pradesh, India</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">+91 98765 43210 (24/7)</span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm">info@saiswethahospital.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Sai Swetha Super Speciality Hospital. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
