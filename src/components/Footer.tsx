import React from 'react';
import { Heart, Mail, Phone, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import { NavigationPage } from '../types';
import { HOSPITAL_CONTACT_INFO } from '../data/initialData';

interface FooterProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenEmail: () => void;
  onOpenEmergency: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenEmail,
  onOpenEmergency,
}) => {
  return (
    <footer className="w-full bg-[#102A43] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0878E8] to-[#16B8C4] flex items-center justify-center text-white shadow-md">
                <Heart className="w-5 h-5 fill-white stroke-white stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Vital <span className="text-[#0878E8]">AI</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-sm">
              Next-generation hospital and patient healthcare intelligence platform. Transforming clinical pathways with real-time biometric analysis, expert multi-specialty care, and precision medicine.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0878E8] shrink-0 mt-0.5" />
                <span>{HOSPITAL_CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0878E8] shrink-0" />
                <span>{HOSPITAL_CONTACT_INFO.phone1} / {HOSPITAL_CONTACT_INFO.phone2}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0878E8] shrink-0" />
                <button
                  onClick={onOpenEmail}
                  className="hover:text-white underline text-left transition-colors"
                >
                  {HOSPITAL_CONTACT_INFO.email}
                </button>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Patient Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('doctors')} className="hover:text-white transition-colors">
                  Find Specialists & Doctors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('appointments')} className="hover:text-white transition-colors">
                  Appointments & Bookings
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('medical-records')} className="hover:text-white transition-colors">
                  Electronic Medical Records
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('medicines')} className="hover:text-white transition-colors">
                  Medicines & Prescriptions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinical Tools */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Clinical Tools</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('health-tools')} className="hover:text-white transition-colors">
                  Health & BMI Calculators
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('teleconsultation')} className="hover:text-white transition-colors">
                  Teleconsultation Suite
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About SGT Hospital
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="text-cyan-400 font-bold hover:underline transition-colors">
                  Hospital Admin Panel →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: 24/7 Emergency & Quality */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Emergency Hotline</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Immediate level-1 trauma dispatch & cardiac life support for Gurugram & Haryana regions.
            </p>

            <button
              onClick={onOpenEmergency}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs tracking-wider shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>DIAL 112 EMERGENCY</span>
            </button>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>NABH & NABL Accredited Center</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Vital AI — Sgt Hospital. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">HIPAA Compliance</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Accessibility</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
