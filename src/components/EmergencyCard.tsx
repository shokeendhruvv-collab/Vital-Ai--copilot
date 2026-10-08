import React from 'react';
import { PhoneCall, ShieldAlert, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface EmergencyCardProps {
  onCallEmergency: () => void;
}

export const EmergencyCard: React.FC<EmergencyCardProps> = ({ onCallEmergency }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-red-500 via-rose-600 to-red-700 text-white rounded-2xl p-5 sm:p-6 shadow-md shadow-red-500/20 space-y-3.5 relative overflow-hidden">
      {/* Decorative pulse ring */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-4 h-4 text-white animate-pulse" />
        </div>
        <h3 className="text-base font-black tracking-tight">{t.emergencyTitle}</h3>
      </div>

      <p className="text-xs text-red-100 font-medium leading-relaxed">
        {t.emergencyDesc}
      </p>

      <button
        onClick={onCallEmergency}
        className="w-full py-3 rounded-xl bg-white hover:bg-red-50 text-red-600 font-black text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2"
      >
        <PhoneCall className="w-4 h-4 text-red-600" />
        <span>{t.emergencyCallBtn}</span>
      </button>

      <p className="text-[10px] text-red-200 text-center">
        For life-threatening conditions, dispatch emergency services immediately.
      </p>
    </div>
  );
};
