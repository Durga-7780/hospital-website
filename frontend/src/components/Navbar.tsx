import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '#about' },
  { name: 'Departments', path: '#departments' },
  { name: 'Doctors', path: '#doctors' },
  { name: 'Services', path: '#services' },
  { name: 'Facilities', path: '#facilities' },
  { name: 'Insurance & Cashless', path: '#insurance' },
  { name: 'Health Packages', path: '#packages' },
  { name: 'Blog', path: '#blog' },
  { name: 'Contact Us', path: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-white py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl">
            SS
          </div>
          <div className="flex flex-col">
            <span className="font-poppins font-bold text-lg leading-tight text-slate-900">Sai Swetha</span>
            <span className="text-xs text-primary font-medium tracking-wide uppercase">Super Speciality Hospital</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.slice(0, 5).map((link) => (
            <a key={link.name} href={link.path} className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}
          {/* Dropdown for more could be added here */}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-destructive font-semibold">
            <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
              <Phone className="w-4 h-4 text-destructive" />
            </div>
            <span>24/7 Emergency</span>
          </div>
          <Button variant="default" className="font-semibold rounded-full px-6 shadow-lg shadow-primary/25" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Book Appointment
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 flex flex-col py-4 px-4 gap-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.path} className="text-sm font-medium text-slate-700 py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </a>
          ))}
          <Button className="w-full mt-4 bg-primary text-white" onClick={() => {
            setIsMobileMenuOpen(false);
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>Book Appointment</Button>
          <Button variant="destructive" className="w-full mt-2">Emergency Contact</Button>
        </div>
      )}
    </header>
  );
}
