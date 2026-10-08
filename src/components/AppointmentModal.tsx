import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Video, 
  MapPin, 
  Star, 
  CheckCircle2, 
  User, 
  Phone, 
  ShieldCheck 
} from 'lucide-react';
import { Doctor, Appointment } from '../types';

interface AppointmentModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onConfirm: (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  doctor,
  onClose,
  onConfirm,
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-09');
  const [selectedTime, setSelectedTime] = useState(doctor?.slots[0] || '10:30 AM');
  const [consultType, setConsultType] = useState<'In-person' | 'Video consultation'>('In-person');
  const [patientName, setPatientName] = useState('Harshit Jakhar');
  const [phoneNumber, setPhoneNumber] = useState('+91 98123 45678');
  const [reason, setReason] = useState('Routine preventive cardiovascular follow-up');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!doctor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      patientId: 'p-001',
      patientName,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date: selectedDate,
      time: selectedTime,
      type: consultType,
      status: 'Upcoming',
      reason,
      phoneNumber,
      hospitalRoom: consultType === 'In-person' ? 'Room 304, OPD Block B' : undefined,
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-12 h-12 rounded-xl object-cover object-top border border-slate-200 shrink-0"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">{doctor.name}</h3>
              <p className="text-xs text-slate-500 font-medium">{doctor.specialty} · SGT Hospital</p>
              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-amber-600 font-bold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{doctor.rating}</span>
                <span className="text-slate-400 font-normal">({doctor.reviewsCount}+ reviews)</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form or Success */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Appointment Confirmed!</h4>
            <p className="text-xs text-slate-500">
              Your consultation with {doctor.name} has been confirmed for {selectedDate} at {selectedTime}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
            
            {/* Consultation Type Toggle */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Consultation Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setConsultType('In-person')}
                  className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                    consultType === 'In-person'
                      ? 'bg-blue-50 border-[#0878E8] text-[#0878E8]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Hospital OPD Visit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setConsultType('Video consultation')}
                  className={`py-2.5 px-3 rounded-xl font-bold flex items-center justify-center gap-2 border transition-all ${
                    consultType === 'Video consultation'
                      ? 'bg-teal-50 border-[#16B8C4] text-[#16B8C4]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Vital AI Video Call</span>
                </button>
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Preferred Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min="2026-10-08"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0878E8]"
                required
              />
            </div>

            {/* Time Slot Picker */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Available Slots</label>
              <div className="grid grid-cols-3 gap-2">
                {doctor.slots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`py-2 px-2 rounded-xl text-center font-bold border transition-all ${
                      selectedTime === slot
                        ? 'bg-[#0878E8] text-white border-[#0878E8]'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Patient Name */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Patient Full Name</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0878E8]"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Contact Phone</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0878E8]"
                required
              />
            </div>

            {/* Reason */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">Reason for Visit / Symptoms</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={2}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0878E8]"
                required
              />
            </div>

            {/* Fee note */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
              <span className="font-medium">Consultation Fee</span>
              <span className="font-black text-slate-900 text-sm">₹{doctor.consultationFee}</span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0878E8] hover:bg-[#0665c7] text-white font-bold text-sm shadow-md transition-colors"
            >
              Confirm Appointment
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
