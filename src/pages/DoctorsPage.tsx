import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Video, 
  Calendar, 
  MapPin, 
  Filter, 
  CheckCircle2, 
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import { Doctor } from '../types';

interface DoctorsPageProps {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
  onStartTeleconsult: (doctor: Doctor) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  doctors,
  onSelectDoctor,
  onStartTeleconsult,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const departments = [
    'All',
    'Cardiology',
    'Orthopedics',
    'Dermatology',
    'Internal Medicine',
    'Neurology',
    'Pediatrics',
    'Obstetrics & Gynecology',
    'Pulmonology & Chest Medicine',
    'Gastroenterology & Hepatology',
    'Endocrinology & Diabetology',
    'Medical Oncology',
  ];

  const filtered = doctors.filter((doc) => {
    const matchesDept = selectedDept === 'All' || doc.department.toLowerCase().includes(selectedDept.toLowerCase());
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) || doc.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[#F7FAFC] py-10">
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0878E8] text-xs font-bold border border-blue-200">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>SGT Hospital Medical Faculty</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
            Consult With Our Specialists & Surgeons
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl font-normal">
            Board-certified consultants across super-specialty departments. Schedule hospital OPD visits or start instant encrypted teleconsultations.
          </p>
        </div>

        {/* Search & Department Filters */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by doctor name, clinical specialty, or symptom..."
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0878E8] focus:bg-white text-slate-800 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedDept === dept
                    ? 'bg-[#0878E8] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-800 shadow-sm flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{doctor.rating}</span>
                    <span className="text-slate-400">({doctor.reviewsCount})</span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white">
                    {doctor.experienceYears} Years Exp
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#0878E8] uppercase tracking-wider">
                      {doctor.department}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600">
                      ● {doctor.availability}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {doctor.name}
                  </h3>

                  <p className="text-xs font-semibold text-slate-500">
                    {doctor.specialty}
                  </p>

                  <p className="text-[11px] text-slate-400 font-mono">
                    {doctor.qualifications}
                  </p>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                    {doctor.bio}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-4 pt-0 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-700 py-2 border-t border-slate-100">
                  <span className="font-medium text-slate-500">Consultation Fee</span>
                  <span className="font-black text-slate-900 text-sm">₹{doctor.consultationFee}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectDoctor(doctor)}
                    className="w-full py-2.5 rounded-xl bg-[#0878E8] hover:bg-[#0665c7] text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    Book OPD
                  </button>

                  <button
                    onClick={() => onStartTeleconsult(doctor)}
                    className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#16B8C4] hover:text-teal-800 text-xs font-bold border border-teal-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video Call</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            No doctors matched your search criteria. Please adjust your department or query.
          </div>
        )}

      </div>
    </div>
  );
};
