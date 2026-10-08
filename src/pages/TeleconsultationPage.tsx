import React from 'react';
import { Video, Star, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Doctor } from '../types';

interface TeleconsultationPageProps {
  doctors: Doctor[];
  onStartTeleconsult: (doctor: Doctor) => void;
}

export const TeleconsultationPage: React.FC<TeleconsultationPageProps> = ({
  doctors,
  onStartTeleconsult,
}) => {
  const teleDoctors = doctors.filter((d) => d.teleconsultationAvailable);

  return (
    <div className="w-full min-h-screen bg-[#F7FAFC] py-10">
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#16B8C4] text-xs font-bold border border-teal-200">
            <Video className="w-3.5 h-3.5" />
            <span>Vital AI Virtual Clinic</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
            Encrypted Instant Teleconsultation
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl font-normal">
            Connect directly with verified hospital doctors from home with HD WebRTC video, digital prescription delivery, and instant clinical charts.
          </p>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teleDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4 hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3.5">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover object-top border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{doc.rating}</span>
                      <span className="text-slate-400 font-normal">({doc.reviewsCount})</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">{doc.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{doc.specialty}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 bg-teal-50/50 p-2.5 rounded-xl border border-teal-100">
                  <span className="flex items-center gap-1 text-emerald-600 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Online for Video
                  </span>
                  <span className="font-bold text-slate-900">Fee: ₹{doc.consultationFee}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {doc.bio}
                </p>
              </div>

              <button
                onClick={() => onStartTeleconsult(doc)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0878E8] to-[#16B8C4] hover:opacity-95 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Video className="w-4 h-4" />
                <span>Start Video Consultation</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
