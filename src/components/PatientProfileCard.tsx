import React from 'react';
import { User, Edit3, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { PatientProfile } from '../types';

interface PatientProfileCardProps {
  patient: PatientProfile;
  onEditProfile: () => void;
}

export const PatientProfileCard: React.FC<PatientProfileCardProps> = ({
  patient,
  onEditProfile,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4">
      {/* Header with Avatar & ID */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0878E8] via-[#102A43] to-[#16B8C4] text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-500/20">
            HJ
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-tight">{patient.name}</h3>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">
              Patient ID: <span className="text-[#0878E8]">{patient.patientIdNumber}</span>
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified Patient
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onEditProfile}
          className="p-2 text-slate-500 hover:text-[#0878E8] hover:bg-blue-50 rounded-xl transition-colors"
          title="Edit Profile"
        >
          <Edit3 className="w-4 h-4" />
        </button>
      </div>

      {/* Clinical Profile Badges */}
      <div className="grid grid-cols-3 gap-2.5 text-center">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">Age</span>
          <span className="text-sm font-bold text-slate-900 mt-0.5 block">{patient.age} yrs</span>
        </div>
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider block">Gender</span>
          <span className="text-sm font-bold text-slate-900 mt-0.5 block">{patient.gender}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100">
          <span className="text-[10px] font-medium text-rose-600 uppercase tracking-wider block">Blood Group</span>
          <span className="text-sm font-black text-rose-700 mt-0.5 block">{patient.bloodGroup}</span>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-2 text-xs text-slate-600 pt-1">
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{patient.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{patient.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{patient.address}</span>
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={onEditProfile}
        className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 text-xs font-bold transition-colors"
      >
        Edit Patient Profile
      </button>
    </div>
  );
};
