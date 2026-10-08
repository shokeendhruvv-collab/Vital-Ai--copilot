import React from 'react';
import { X, PhoneCall, ShieldAlert, MapPin, Ambulance, AlertTriangle } from 'lucide-react';
import { HOSPITAL_CONTACT_INFO } from '../data/initialData';

interface EmergencyModalProps {
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-red-200">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-3">
            <Ambulance className="w-6 h-6 text-white animate-bounce" />
          </div>
          <h3 className="text-xl font-black tracking-tight">24/7 Emergency Medical Response</h3>
          <p className="text-xs text-red-100 font-medium mt-1">
            Immediate critical trauma & ambulance dispatch for SGT Hospital & Gurugram region.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          
          {/* Primary 112 Hotline */}
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-center space-y-2">
            <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider block">
              National Emergency Services
            </span>
            <a
              href="tel:112"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-lg shadow-md transition-transform hover:scale-105"
            >
              <PhoneCall className="w-5 h-5" />
              <span>DIAL 112 NOW</span>
            </a>
            <p className="text-[10px] text-red-600 font-semibold">Toll-free 24/7 national emergency lifeline</p>
          </div>

          {/* SGT Hospital Trauma Direct Lines */}
          <div className="space-y-2 pt-2">
            <span className="font-bold text-slate-800 block text-xs">SGT Hospital Trauma Center Helplines:</span>
            
            <a
              href={`tel:${HOSPITAL_CONTACT_INFO.phone1}`}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-300 hover:bg-white transition-all text-slate-800"
            >
              <span className="font-semibold">Trauma Desk Line 1</span>
              <span className="font-bold text-red-600">{HOSPITAL_CONTACT_INFO.phone1}</span>
            </a>

            <a
              href={`tel:${HOSPITAL_CONTACT_INFO.phone2}`}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-red-300 hover:bg-white transition-all text-slate-800"
            >
              <span className="font-semibold">Trauma Desk Line 2</span>
              <span className="font-bold text-red-600">{HOSPITAL_CONTACT_INFO.phone2}</span>
            </a>
          </div>

          {/* Hospital Address */}
          <div className="p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-slate-700 flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900">{HOSPITAL_CONTACT_INFO.name}</p>
              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{HOSPITAL_CONTACT_INFO.address}</p>
            </div>
          </div>

          {/* Critical Warning */}
          <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>If experiencing sudden chest pain or shortness of breath, do not drive yourself. Await paramedic transport.</span>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold transition-colors"
          >
            Close Emergency Panel
          </button>
        </div>

      </div>
    </div>
  );
};
