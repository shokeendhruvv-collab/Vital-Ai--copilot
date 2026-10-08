import React from 'react';
import { X, AlertTriangle, Calendar, Clock, User } from 'lucide-react';
import { Appointment } from '../types';

interface CancelAppointmentModalProps {
  appointment: Appointment | null;
  onClose: () => void;
  onConfirmCancel: (appointmentId: string) => void;
}

export const CancelAppointmentModal: React.FC<CancelAppointmentModalProps> = ({
  appointment,
  onClose,
  onConfirmCancel,
}) => {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-5 bg-red-50 border-b border-red-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-red-950">Cancel Consultation</h3>
            <p className="text-xs text-red-700">Are you sure you want to cancel this booking?</p>
          </div>
        </div>

        {/* Details Card */}
        <div className="p-6 space-y-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm">{appointment.doctorName}</span>
              <span className="text-[11px] text-slate-500 font-medium">{appointment.specialty}</span>
            </div>
            <div className="flex items-center gap-4 text-slate-600">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {appointment.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {appointment.time}
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              Mode: <strong>{appointment.type}</strong>
            </div>
          </div>

          <p className="text-slate-500 leading-relaxed">
            There is no cancellation fee. The time slot will be released back to other patients. You may reschedule at any time.
          </p>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
            >
              Keep Appointment
            </button>
            <button
              onClick={() => {
                onConfirmCancel(appointment.id);
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-md transition-colors"
            >
              Yes, Cancel Appointment
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
