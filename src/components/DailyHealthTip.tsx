import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Copy, 
  Bookmark, 
  Share2, 
  Award,
  Calendar
} from 'lucide-react';
import { HEALTH_TIPS, HealthTip } from '../data/healthTips';

interface DailyHealthTipProps {
  onPersonalizeWithCopilot: (tipTitle: string) => void;
}

export const DailyHealthTip: React.FC<DailyHealthTipProps> = ({
  onPersonalizeWithCopilot,
}) => {
  const currentDayOfWeek = new Date().getDay();
  const [activeDayIndex, setActiveDayIndex] = useState(currentDayOfWeek % HEALTH_TIPS.length);
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const activeTip = HEALTH_TIPS[activeDayIndex];

  const handlePrev = () => {
    setActiveDayIndex((prev) => (prev === 0 ? HEALTH_TIPS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveDayIndex((prev) => (prev === HEALTH_TIPS.length - 1 ? 0 : prev + 1));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Vital AI Health Tip: ${activeTip.title} - ${activeTip.takeaway}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden my-6 border border-blue-800/40">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-cyan-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-cyan-400">Daily Evidence-Based Clinical Tip</span>
              <h3 className="text-base font-bold text-white leading-tight">Vital AI Health Intelligence</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Previous Tip"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-slate-300 px-1">
              Tip {activeDayIndex + 1} of {HEALTH_TIPS.length}
            </span>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Next Tip"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                {activeTip.category}
              </span>
              <span className="text-xs text-slate-400">Verified by {activeTip.reviewedBy}</span>
            </div>

            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {activeTip.title}
            </h4>

            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              {activeTip.takeaway}
            </p>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-cyan-200 flex items-start gap-2">
              <Award className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-semibold">Observed Clinical Impact: </strong>
                {activeTip.clinicalImpact}
              </div>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="lg:col-span-4 flex flex-col gap-2.5 sm:flex-row lg:flex-col justify-end">
            <button
              onClick={() => onPersonalizeWithCopilot(activeTip.title)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0878E8] to-[#16B8C4] hover:opacity-95 text-white font-bold text-xs tracking-wide shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span>Personalize with Copilot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>

              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                  isBookmarked ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-cyan-300' : ''}`} />
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
