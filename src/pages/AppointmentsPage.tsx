import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  AlertCircle 
} from 'lucide-react';
import { Appointment } from '../types';

interface AppointmentsPageProps {
  appointments: Appointment[];
  onBookNew: () => void;
  onRequestCancel: (appointment: Appointment) => void;
  onStartTeleconsultById: (doctorId: string) => void;
}

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({
  appointments,
  onBookNew,
  onRequestCancel,
  onStartTeleconsultById,
}) => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'Cancelled'>('Upcoming');

  const filtered = appointments.filter((app) => app.status === activeTab);

  return (
    <div className="w-full min-h-screen bg-[#F7FAFC] py-10">
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
              Patient Appointments & Consultations
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Manage clinical schedules, OPD room details, and telemedicine sessions.
            </p>
          </div>

          <button
            onClick={onBookNew}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0878E8] hover:bg-[#0665c7] text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Appointment</span>
          </button>
        </div>

        {/* Status Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          {(['Upcoming', 'Completed', 'Cancelled'] as const).map((tab) => {
            const count = appointments.filter((a) => a.status === tab).length;
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors ${
                  isActive
                    ? 'bg-white text-[#0878E8] shadow-xs border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <span>{tab}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-blue-100 text-[#0878E8]' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    item.status === 'Upcoming'
                      ? 'bg-blue-50 text-[#0878E8] border border-blue-200'
                      : item.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    ● {item.status}
                  </span>

                  <span className="text-xs font-semibold text-slate-500">
                    ID: {item.id}
                  </span>

                  <span className="text-xs font-bold text-slate-800">
                    Mode: {item.type}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {item.doctorName}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {item.specialty} · Patient: <strong>{item.patientName}</strong>
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#0878E8]" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#0878E8]" />
                    <span>{item.time}</span>
                  </div>
                  {item.hospitalRoom && (
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>{item.hospitalRoom}</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-2xl">
                  <strong>Clinical Reason:</strong> {item.reason}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {item.status === 'Upcoming' && (
                  <>
                    {item.type === 'Video consultation' && (
                      <button
                        onClick={() => onStartTeleconsultById(item.doctorId)}
                        className="px-4 py-2.5 rounded-xl bg-[#16B8C4] hover:bg-teal-600 text-white font-bold text-xs shadow-xs flex items-center gap-1.5"
                      >
                        <Video className="w-4 h-4" />
                        <span>Launch Video Room</span>
                      </button>
                    )}

                    <button
                      onClick={() => onRequestCancel(item)}
                      className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs border border-red-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {item.status === 'Completed' && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Consultation Concluded
                  </span>
                )}

                {item.status === 'Cancelled' && (
                  <span className="text-xs font-bold text-red-500 flex items-center gap-1">
                    <XCircle className="w-4 h-4" />
                    Appointment Cancelled
                  </span>
                )}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
              No appointments found under the "{activeTab}" tab.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
