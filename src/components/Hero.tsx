import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Send, 
  Bot, 
  ShieldCheck, 
  Star, 
  Activity, 
  HeartPulse, 
  CheckCircle2 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onBookAppointment: () => void;
  onExploreServices: () => void;
  onAskCopilot: (prompt: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBookAppointment,
  onExploreServices,
  onAskCopilot,
}) => {
  const { t } = useLanguage();
  const [copilotInput, setCopilotInput] = useState('');

  const handleSendPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!copilotInput.trim()) return;
    onAskCopilot(copilotInput);
    setCopilotInput('');
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#EAF6FF]/80 via-[#F3F9FE]/50 to-[#F7FAFC] py-12 lg:py-16 border-b border-slate-200/70">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Hero Pitch & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200/80 text-[#0878E8] text-xs sm:text-sm font-bold shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-[#0878E8] animate-ping" />
              <span>{t.heroBadge}</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-medium text-xs">Sgt Hospital, Budhera</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#102A43] tracking-tight leading-[1.12]">
              {t.heroHeadingPart1}{' '}
              <span className="bg-gradient-to-r from-[#0878E8] via-[#0D8EF8] to-[#16B8C4] bg-clip-text text-transparent">
                {t.heroHeadingHighlight}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 font-normal max-w-2xl leading-relaxed">
              {t.heroSubtitle}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBookAppointment}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#0878E8] hover:bg-[#0665c7] text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.bookAppointmentBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border border-slate-300 shadow-sm transition-all duration-200 hover:border-slate-400"
              >
                <span>{t.exploreServicesBtn}</span>
              </button>
            </div>

            {/* Key trust credentials */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-xl">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#102A43]">500+</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Expert Specialists</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#0878E8]">100k+</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Patients Treated</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#20B26B]">24/7</p>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">Trauma Response</p>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Doctor Visual + Floating Vital AI Copilot Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Visual Container */}
            <div className="relative w-full max-w-md">
              
              {/* Doctor card presentation */}
              <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-2xl p-2">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=700"
                  alt="Senior Physician at Vital AI"
                  className="w-full h-80 sm:h-96 object-cover object-top rounded-2xl"
                />
                
                {/* Floating Physician Badge */}
                <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <p className="text-xs font-bold text-slate-900 leading-none">Dr. Priya Sharma</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">Cardiology Specialist</p>
                  </div>
                </div>

                <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>4.9 (1.4k+ Reviews)</span>
                </div>
              </div>

              {/* Floating Vital AI Copilot Overlay */}
              <div className="absolute -bottom-7 -left-4 sm:-left-8 right-4 sm:right-auto sm:w-84 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0878E8] to-[#16B8C4] flex items-center justify-center text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#102A43] leading-none">Vital AI Copilot</h4>
                      <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">● Ready to assist</p>
                    </div>
                  </div>
                  <Sparkles className="w-3.5 h-3.5 text-[#0878E8]" />
                </div>

                <div className="mt-2.5 bg-blue-50/60 p-2.5 rounded-xl text-xs text-slate-700">
                  <p className="font-semibold text-slate-900">Hi Harshit! 👋</p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    How can I assist your health and prescription records today?
                  </p>
                </div>

                {/* Form quick prompt */}
                <form onSubmit={handleSendPrompt} className="mt-2.5 flex items-center gap-1.5">
                  <input
                    type="text"
                    value={copilotInput}
                    onChange={(e) => setCopilotInput(e.target.value)}
                    placeholder="Ask about vitals, medicines..."
                    className="flex-1 text-xs bg-slate-100 rounded-xl px-3 py-2 border border-slate-200 outline-none focus:border-[#0878E8] focus:bg-white text-slate-800"
                  />
                  <button
                    type="submit"
                    className="w-8 h-8 rounded-xl bg-[#0878E8] hover:bg-[#0665c7] text-white flex items-center justify-center transition-colors shadow-sm shrink-0"
                    title="Send to Vital AI"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
