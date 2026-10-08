import React from 'react';
import { 
  Heart, 
  Activity, 
  Scale, 
  Moon, 
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { PatientProfile } from '../types';

interface HealthOverviewProps {
  patient: PatientProfile;
  onViewFullReport: () => void;
}

export const HealthOverview: React.FC<HealthOverviewProps> = ({
  patient,
  onViewFullReport,
}) => {
  const metrics = [
    {
      id: 'heart-rate',
      label: 'Heart Rate',
      value: `${patient.vitals.heartRate} bpm`,
      status: patient.vitals.heartRateStatus,
      icon: Heart,
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
      trend: 'Stable',
    },
    {
      id: 'blood-pressure',
      label: 'Blood Pressure',
      value: `${patient.vitals.bloodPressure} mmHg`,
      status: patient.vitals.bloodPressureStatus,
      icon: Activity,
      color: 'text-[#0878E8]',
      bgColor: 'bg-blue-50',
      trend: 'Optimal',
    },
    {
      id: 'weight',
      label: 'Weight',
      value: `${patient.vitals.weightKg} kg`,
      status: patient.vitals.weightStatus,
      icon: Scale,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      trend: 'BMI 22.2',
    },
    {
      id: 'sleep',
      label: 'Sleep',
      value: patient.vitals.sleepHours,
      status: patient.vitals.sleepStatus,
      icon: Moon,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      trend: '+8% vs last week',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[#102A43]">Your Health at a Glance</h2>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Synced
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Good afternoon, {patient.name}! Here's your personalized health profile.
          </p>
        </div>
        <button
          onClick={onViewFullReport}
          className="text-xs font-bold text-[#0878E8] hover:underline flex items-center gap-1 shrink-0"
        >
          <span>View Full Report</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of 4 Key Vitals */}
      <div className="grid grid-cols-2 gap-3.5">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              onClick={onViewFullReport}
              className="p-3.5 rounded-xl border border-slate-100 hover:border-blue-200 bg-slate-50/70 hover:bg-white hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">{m.label}</span>
                <div className={`w-7 h-7 rounded-lg ${m.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${m.color}`} />
                </div>
              </div>
              <p className="text-lg sm:text-xl font-black text-slate-900 mt-2 tracking-tight">
                {m.value}
              </p>
              <div className="flex items-center justify-between mt-1 text-[11px]">
                <span className="font-semibold text-emerald-600">{m.status}</span>
                <span className="text-slate-400 font-medium">{m.trend}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Health Metric Alert/Note */}
      <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs text-slate-700">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#0878E8] shrink-0" />
          <span>
            <strong>Vital AI Observation:</strong> Cardiovascular baseline is optimal. Resting heart rate stable across last 30 days.
          </span>
        </div>
      </div>
    </div>
  );
};
