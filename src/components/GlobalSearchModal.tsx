import React, { useState } from 'react';
import { Search, X, User, Calendar, FileText, Pill, ArrowRight } from 'lucide-react';
import { Doctor, NavigationPage } from '../types';

interface GlobalSearchModalProps {
  doctors: Doctor[];
  onClose: () => void;
  onNavigate: (page: NavigationPage) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  doctors,
  onClose,
  onNavigate,
  onSelectDoctor,
}) => {
  const [query, setQuery] = useState('');

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialty.toLowerCase().includes(query.toLowerCase()) ||
      d.department.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Search Input Box */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#0878E8]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search doctors, clinical departments, appointments, reports..."
            className="flex-1 text-sm bg-transparent outline-none text-slate-900 placeholder:text-slate-400 font-medium"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="px-2 py-1 text-xs font-bold text-slate-400 hover:text-slate-700 bg-slate-100 rounded-lg">
            ESC
          </button>
        </div>

        {/* Quick Links & Results */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4 text-xs">
          
          {/* Direct Portals Quick Links */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Quick Portals
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onNavigate('appointments');
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 text-left flex items-center gap-2 text-slate-700 transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#0878E8]" />
                <span className="font-semibold">My Appointments</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('medical-records');
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 text-left flex items-center gap-2 text-slate-700 transition-colors"
              >
                <FileText className="w-4 h-4 text-indigo-500" />
                <span className="font-semibold">Medical Records</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('medicines');
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 text-left flex items-center gap-2 text-slate-700 transition-colors"
              >
                <Pill className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold">Prescriptions & Refills</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('admin');
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 text-left flex items-center gap-2 text-slate-700 transition-colors"
              >
                <User className="w-4 h-4 text-purple-500" />
                <span className="font-semibold">Hospital Admin Panel</span>
              </button>
            </div>
          </div>

          {/* Doctors results */}
          {query && (
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Matching Physicians & Specialists ({filteredDoctors.length})
              </span>
              <div className="space-y-1.5">
                {filteredDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      onSelectDoctor(doc);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl hover:bg-blue-50 border border-transparent hover:border-blue-100 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="w-8 h-8 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{doc.name}</p>
                        <p className="text-[11px] text-slate-500">{doc.specialty} · {doc.department}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-[#0878E8] flex items-center gap-1">
                      Book Slot <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}

                {filteredDoctors.length === 0 && (
                  <p className="text-center py-4 text-slate-400">No doctors match "{query}".</p>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
