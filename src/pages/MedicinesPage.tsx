import React, { useState } from 'react';
import { Pill, RefreshCw, ShoppingCart, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Medicine } from '../types';

interface MedicinesPageProps {
  medicines: Medicine[];
  onOrderRefill: (medicine: Medicine) => void;
}

export const MedicinesPage: React.FC<MedicinesPageProps> = ({
  medicines,
  onOrderRefill,
}) => {
  const [activeTab, setActiveTab] = useState<'Active' | 'Past'>('Active');

  const filtered = medicines.filter((m) => m.category === activeTab);

  return (
    <div className="w-full min-h-screen bg-[#F7FAFC] py-10">
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
            Prescriptions & Express Pharmacy Refills
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Active medication routines, dosage schedules, and same-day delivery from SGT Hospital.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          {(['Active', 'Past'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                activeTab === tab
                  ? 'bg-white text-[#0878E8] shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab} Prescriptions ({medicines.filter((m) => m.category === tab).length})
            </button>
          ))}
        </div>

        {/* Medicines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((med) => {
            const pctRemaining = (med.pillsRemaining / med.totalPills) * 100;
            return (
              <div
                key={med.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4 hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-slate-900">{med.name}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {med.dosage}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Frequency</span>
                      <strong className="text-slate-800">{med.frequency}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Duration</span>
                      <strong className="text-slate-800">{med.duration}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600">
                    <strong>Instructions:</strong> {med.instructions}
                  </p>

                  <div className="text-[11px] text-slate-500">
                    Prescribed by: <strong>{med.prescribingDoctor}</strong>
                  </div>

                  {/* Remaining pills progress */}
                  {med.category === 'Active' && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-500">Supply Remaining</span>
                        <span className={med.pillsRemaining <= 6 ? 'text-amber-600 font-bold' : 'text-slate-800'}>
                          {med.pillsRemaining} of {med.totalPills} doses
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          style={{ width: `${pctRemaining}%` }}
                          className={`h-full rounded-full ${
                            med.pillsRemaining <= 6 ? 'bg-amber-500' : 'bg-[#0878E8]'
                          }`}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">₹{med.priceInINR}</span>

                  {med.category === 'Active' ? (
                    <button
                      onClick={() => onOrderRefill(med)}
                      className="px-4 py-2 rounded-xl bg-[#0878E8] hover:bg-[#0665c7] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Order Express Refill</span>
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">Course Completed</span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
