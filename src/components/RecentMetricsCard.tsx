import React from 'react';
import { Heart, Activity, Footprints, Moon, ArrowRight } from 'lucide-react';
import { PatientProfile } from '../types';

interface RecentMetricsCardProps {
  patient: PatientProfile;
  onViewAll: () => void;
}

export const RecentMetricsCard: React.FC<RecentMetricsCardProps> = ({
  patient,
  onViewAll,
}) => {
  const list = [
    {
      id: 'hr',
      label: 'Heart Rate',
      val: `${patient.vitals.heartRate} bpm`,
      stat: 'Normal',
      icon: Heart,
      color: 'text-rose-500',
    },
    {
      id: 'bp',
      label: 'Blood Pressure',
      val: `${patient.vitals.bloodPressure} mmHg`,
      stat: 'Normal',
      icon: Activity,
      color: 'text-[#0878E8]',
    },
    {
      id: 'steps',
      label: 'Steps',
      val: `${patient.vitals.steps.toLocaleString()}`,
      stat: 'Good',
      icon: Footprints,
      color: 'text-emerald-500',
    },
    {
      id: 'sleep',
      label: 'Sleep',
      val: patient.vitals.sleepHours,
      stat: 'Good',
      icon: Moon,
      color: 'text-indigo-500',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900">Recent Health Metrics</h3>
          <p className="text-[11px] text-slate-500 font-medium">Daily wearable & clinical inputs</p>
        </div>
        <button
          onClick={onViewAll}
          className="text-xs font-bold text-[#0878E8] hover:underline flex items-center gap-1"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {list.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-xs font-semibold text-slate-700">{item.label}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-900">{item.val}</span>
                <span className="ml-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {item.stat}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
