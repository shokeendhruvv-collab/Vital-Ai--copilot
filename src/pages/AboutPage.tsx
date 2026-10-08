import React from 'react';
import { 
  Building2, 
  Award, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail,
  Heart
} from 'lucide-react';
import { HOSPITAL_CONTACT_INFO } from '../data/initialData';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#F7FAFC] py-10">
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14 space-y-12">
        
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#102A43] via-[#0D406E] to-[#0878E8] rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-cyan-300 text-xs font-bold border border-white/20">
              <Sparkles className="w-4 h-4" />
              <span>Vital AI · Center of Clinical Excellence</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Sgt Hospital — Vital AI Healthcare
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              A premier tertiary-care and multi-specialty healthcare research institution situated on Gurugram-Badli Road. Powered by Vital AI clinical intelligence, we combine world-class medical specialists with cutting-edge diagnostics.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl font-black text-[#0878E8]">500+</p>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Specialists & Surgeons</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl font-black text-[#16B8C4]">50+</p>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Super-Specialties</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl font-black text-[#102A43]">100K+</p>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Patients Served</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl font-black text-red-600">24/7</p>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1">Emergency Trauma Center</p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-8 space-y-3">
            <h3 className="text-xl font-bold text-slate-900">Our Clinical Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To deliver compassionate, evidence-based, and technologically advanced healthcare that empowers patients to manage their well-being seamlessly. We combine medical expertise with AI diagnostic intelligence to provide precise, timely care.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-8 space-y-3">
            <h3 className="text-xl font-bold text-slate-900">Our Future Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To lead as the gold standard in smart hospital operations across South Asia, where every patient file is securely digitized, every diagnosis is accelerated by clinical AI assistants, and every community member receives equitable care.
            </p>
          </div>
        </div>

        {/* Contact & Location Block */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Hospital Facility & Campus Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <MapPin className="w-5 h-5 text-[#0878E8]" />
              <strong className="text-slate-900 block text-sm">Campus Address</strong>
              <p className="leading-relaxed">{HOSPITAL_CONTACT_INFO.address}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <Phone className="w-5 h-5 text-emerald-600" />
              <strong className="text-slate-900 block text-sm">Direct Phone Helplines</strong>
              <p>{HOSPITAL_CONTACT_INFO.phone1}</p>
              <p>{HOSPITAL_CONTACT_INFO.phone2}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <Mail className="w-5 h-5 text-indigo-600" />
              <strong className="text-slate-900 block text-sm">Administrative Email</strong>
              <p className="font-mono">{HOSPITAL_CONTACT_INFO.email}</p>
              <p className="text-slate-400">Office of the Medical Superintendent</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
