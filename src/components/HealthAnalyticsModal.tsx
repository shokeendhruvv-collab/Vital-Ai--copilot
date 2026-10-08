import React, { useState } from 'react';
import { X, TrendingUp, Calendar, Heart, Activity, Footprints, Moon, Flame } from 'lucide-react';

interface HealthAnalyticsModalProps {
  onClose: () => void;
}

export const HealthAnalyticsModal: React.FC<HealthAnalyticsModalProps> = ({ onClose }) => {
  const [timeframe, setTimeframe] = useState<'7 Days' | '30 Days' | '3 Months' | '1 Year'>('7 Days');

  const days7 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const heartRateData = [74, 71, 70, 75, 72, 73, 72];
  const bpSystolicData = [120, 118, 122, 119, 117, 118, 118];
  const stepsData = [8200, 9400, 7900, 10200, 8452, 9100, 8800];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-slate-50 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Health Analytics & Physiological Trends</h3>
            <p className="text-xs text-slate-500">Comprehensive biometric overview powered by Vital AI</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Timeframe selector */}
            <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-xl text-xs font-semibold">
              {(['7 Days', '30 Days', '3 Months', '1 Year'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    timeframe === t ? 'bg-white text-[#0878E8] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Analytics Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* Trends Summary Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 space-y-1">
              <span className="text-[11px] font-bold text-blue-700">Heart Rate Trend</span>
              <p className="text-lg font-black text-slate-900">72 bpm avg</p>
              <p className="text-[10px] text-emerald-600 font-semibold">● Stable resting sinus rhythm</p>
            </div>
            <div className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-100 space-y-1">
              <span className="text-[11px] font-bold text-teal-700">Sleep Architecture</span>
              <p className="text-lg font-black text-slate-900">7h 30m avg</p>
              <p className="text-[10px] text-emerald-600 font-semibold">▲ +8% slow-wave improvement</p>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 space-y-1">
              <span className="text-[11px] font-bold text-emerald-700">Daily Steps Movement</span>
              <p className="text-lg font-black text-slate-900">8,864 /day</p>
              <p className="text-[10px] text-emerald-600 font-semibold">▲ +12% mobility vs last cycle</p>
            </div>
          </div>

          {/* Interactive Chart 1: Heart Rate */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span className="font-bold text-slate-800">Resting Heart Rate (BPM)</span>
              </div>
              <span className="text-xs font-semibold text-slate-500">Normal Range: 60 - 100 bpm</span>
            </div>

            {/* SVG Visual Chart */}
            <div className="h-36 w-full flex items-end gap-3 pt-6 px-4 pb-2 border-b border-slate-200">
              {heartRateData.map((val, idx) => {
                const heightPct = ((val - 50) / 40) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {val}
                    </span>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full max-w-[28px] bg-gradient-to-t from-rose-500 to-rose-400 rounded-t-md transition-all duration-300 group-hover:brightness-110"
                    />
                    <span className="text-[10px] font-semibold text-slate-400">{days7[idx]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Chart 2: Steps Tracker */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Footprints className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-800">Mobility & Steps Tracker</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600">Goal: 8,000 / day (Exceeded)</span>
            </div>

            <div className="h-36 w-full flex items-end gap-3 pt-6 px-4 pb-2 border-b border-slate-200">
              {stepsData.map((val, idx) => {
                const heightPct = Math.min((val / 12000) * 100, 100);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[9px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {val}
                    </span>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full max-w-[28px] bg-gradient-to-t from-[#0878E8] to-[#16B8C4] rounded-t-md transition-all duration-300 group-hover:brightness-110"
                    />
                    <span className="text-[10px] font-semibold text-slate-400">{days7[idx]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vital AI Biometric Conclusion */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-slate-800 space-y-1">
            <span className="font-bold text-[#0878E8] block">Vital AI Clinical Evaluation:</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Biometric stability scores rate at 94/100. Blood pressure variation is within optimal systolic limits. Physical step counts show robust cardiovascular endurance. Recommend continuing your current diet and lifestyle routine.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
