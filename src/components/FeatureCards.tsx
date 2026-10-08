import React from 'react';
import { 
  Users, 
  CalendarCheck, 
  FileText, 
  Pill, 
  Activity, 
  PhoneCall 
} from 'lucide-react';
import { NavigationPage } from '../types';

interface FeatureCardsProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenEmergency: () => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({
  onNavigate,
  onOpenEmergency,
}) => {
  const features = [
    {
      id: 'find-doctors',
      title: 'Find Doctors',
      subtitle: 'Top specialists, trusted care',
      icon: Users,
      bgColor: 'bg-blue-50',
      iconColor: 'text-[#0878E8]',
      action: () => onNavigate('doctors'),
    },
    {
      id: 'book-appointment',
      title: 'Book Appointment',
      subtitle: 'Quick & easy slot booking',
      icon: CalendarCheck,
      bgColor: 'bg-teal-50',
      iconColor: 'text-[#16B8C4]',
      action: () => onNavigate('appointments'),
    },
    {
      id: 'medical-records',
      title: 'Medical Records',
      subtitle: 'Your health, your data vault',
      icon: FileText,
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      action: () => onNavigate('medical-records'),
    },
    {
      id: 'medicines',
      title: 'Medicines & Rx',
      subtitle: 'Order & express refill online',
      icon: Pill,
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      action: () => onNavigate('medicines'),
    },
    {
      id: 'health-monitoring',
      title: 'Health Monitoring',
      subtitle: 'Track vitals & wellness',
      icon: Activity,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      action: () => onNavigate('health-tools'),
    },
    {
      id: 'emergency-247',
      title: 'Emergency 24/7',
      subtitle: 'Instant trauma response',
      icon: PhoneCall,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600',
      isEmergency: true,
      action: onOpenEmergency,
    },
  ];

  return (
    <section className="w-full py-8 bg-[#F7FAFC] border-b border-slate-200/60">
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={item.action}
                className={`group cursor-pointer p-4 rounded-2xl bg-white border transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                  item.isEmergency
                    ? 'border-red-200 hover:border-red-400 bg-gradient-to-b from-white to-red-50/40'
                    : 'border-slate-200/80 hover:border-blue-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-105 ${item.bgColor}`}>
                  <Icon className={`w-6 h-6 ${item.iconColor} ${item.isEmergency ? 'animate-pulse' : ''}`} />
                </div>
                <h3 className={`text-sm font-bold tracking-tight ${item.isEmergency ? 'text-red-700' : 'text-slate-900'}`}>
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
