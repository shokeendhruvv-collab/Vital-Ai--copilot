import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  Calendar, 
  Video, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  User
} from 'lucide-react';
import { Doctor } from '../types';

interface BookAppointmentSectionProps {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
  onViewAllDoctors: () => void;
}

export const BookAppointmentSection: React.FC<BookAppointmentSectionProps> = ({
  doctors,
  onSelectDoctor,
  onViewAllDoctors,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const specialties = ['All', 'Cardiology', 'Dermatology', 'Orthopedics', 'General Physician'];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialty = selectedSpecialty === 'All' || doc.department.toLowerCase().includes(selectedSpecialty.toLowerCase()) || doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) || doc.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-[#102A43]">Book an Appointment</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Choose from top specialists at SGT Hospital & preferred slots
          </p>
        </div>
        <button
          onClick={onViewAllDoctors}
          className="text-xs font-bold text-[#0878E8] hover:underline flex items-center gap-1 shrink-0"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by doctor name, specialty or condition..."
          className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0878E8] focus:bg-white text-slate-800 transition-all"
        />
      </div>

      {/* Specialty Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {specialties.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedSpecialty === spec
                ? 'bg-[#0878E8] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctor List */}
      <div className="space-y-3.5">
        {filteredDoctors.slice(0, 3).map((doctor) => (
          <div
            key={doctor.id}
            className="p-3.5 sm:p-4 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:shadow-sm bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3.5">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-14 h-14 rounded-xl object-cover object-top border border-slate-200 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">{doctor.name}</h4>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {doctor.rating}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">{doctor.specialty}</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {doctor.availability}
                  </span>
                  <span>·</span>
                  <span>Fee: ₹{doctor.consultationFee}</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
              <span className="text-[11px] text-slate-400 hidden sm:block">
                {doctor.reviewsCount}+ reviews
              </span>
              <button
                onClick={() => onSelectDoctor(doctor)}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#0878E8] hover:bg-[#0665c7] text-white text-xs font-bold shadow-xs transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-8 text-slate-500 text-xs">
          No specialists match your search criteria. Try a different query.
        </div>
      )}

      {/* Footer link */}
      <div className="pt-2 text-center">
        <button
          onClick={onViewAllDoctors}
          className="text-xs font-bold text-[#0878E8] hover:text-[#0665c7] inline-flex items-center gap-1"
        >
          <span>View All Doctors & Available Specialists →</span>
        </button>
      </div>
    </div>
  );
};
