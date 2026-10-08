import React from 'react';
import { Hero } from '../components/Hero';
import { FeatureCards } from '../components/FeatureCards';
import { BookAppointmentSection } from '../components/BookAppointmentSection';
import { HealthOverview } from '../components/HealthOverview';
import { AICopilot } from '../components/AICopilot';
import { PatientProfileCard } from '../components/PatientProfileCard';
import { RecentMetricsCard } from '../components/RecentMetricsCard';
import { EmergencyCard } from '../components/EmergencyCard';
import { DailyHealthTip } from '../components/DailyHealthTip';
import { Doctor, PatientProfile, NavigationPage } from '../types';

interface HomePageProps {
  doctors: Doctor[];
  patient: PatientProfile;
  copilotPrompt: string;
  onNavigate: (page: NavigationPage) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onOpenProfile: () => void;
  onOpenAnalytics: () => void;
  onOpenEmergency: () => void;
  onAskCopilot: (prompt: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  doctors,
  patient,
  copilotPrompt,
  onNavigate,
  onSelectDoctor,
  onOpenProfile,
  onOpenAnalytics,
  onOpenEmergency,
  onAskCopilot,
}) => {
  return (
    <div className="w-full min-h-screen bg-[#F7FAFC] pb-16">
      
      {/* 1. Hero Section */}
      <Hero
        onBookAppointment={() => onNavigate('doctors')}
        onExploreServices={() => onNavigate('about')}
        onAskCopilot={onAskCopilot}
      />

      {/* 2. Quick Feature Navigation Cards */}
      <FeatureCards
        onNavigate={onNavigate}
        onOpenEmergency={onOpenEmergency}
      />

      {/* 3. Evidence-Based Daily Health Tip Component */}
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14">
        <DailyHealthTip onPersonalizeWithCopilot={onAskCopilot} />
      </div>

      {/* 4. Three-Column Main Dashboard Layout */}
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT COLUMN (4 Cols): Appointment Booking Section */}
          <div className="lg:col-span-4 space-y-6">
            <BookAppointmentSection
              doctors={doctors}
              onSelectDoctor={onSelectDoctor}
              onViewAllDoctors={() => onNavigate('doctors')}
            />
          </div>

          {/* CENTER COLUMN (5 Cols): Health Overview + AI Copilot */}
          <div className="lg:col-span-5 space-y-6">
            <HealthOverview
              patient={patient}
              onViewFullReport={onOpenAnalytics}
            />

            <AICopilot initialPrompt={copilotPrompt} />
          </div>

          {/* RIGHT COLUMN (3 Cols): Patient Profile + Recent Metrics + Emergency */}
          <div className="lg:col-span-3 space-y-6">
            <PatientProfileCard
              patient={patient}
              onEditProfile={onOpenProfile}
            />

            <RecentMetricsCard
              patient={patient}
              onViewAll={onOpenAnalytics}
            />

            <EmergencyCard onCallEmergency={onOpenEmergency} />
          </div>

        </div>
      </div>

    </div>
  );
};
