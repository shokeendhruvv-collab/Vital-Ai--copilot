import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/Home';
import { DoctorsPage } from './pages/DoctorsPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { MedicalRecordsPage } from './pages/MedicalRecordsPage';
import { MedicinesPage } from './pages/MedicinesPage';
import { HealthToolsPage } from './pages/HealthToolsPage';
import { TeleconsultationPage } from './pages/TeleconsultationPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { LanguageProvider } from './context/LanguageContext';

// Modals
import { AppointmentModal } from './components/AppointmentModal';
import { EmergencyModal } from './components/EmergencyModal';
import { EditProfileModal } from './components/EditProfileModal';
import { HealthAnalyticsModal } from './components/HealthAnalyticsModal';
import { TeleconsultationModal } from './components/TeleconsultationModal';
import { DocumentPreviewModal } from './components/DocumentPreviewModal';
import { UploadRecordModal } from './components/UploadRecordModal';
import { CancelAppointmentModal } from './components/CancelAppointmentModal';
import { MedicineOrderModal } from './components/MedicineOrderModal';
import { NotificationPanel } from './components/NotificationPanel';
import { HospitalEmailModal } from './components/HospitalEmailModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';

// Types & Initial Data
import { 
  NavigationPage, 
  Doctor, 
  Appointment, 
  PatientProfile, 
  MedicalRecord, 
  Medicine, 
  NotificationItem, 
  HospitalExpense, 
  HospitalStaffSalary 
} from './types';
import { 
  INITIAL_DOCTORS, 
  INITIAL_PATIENT, 
  INITIAL_RECORDS, 
  INITIAL_MEDICINES, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_EXPENSES, 
  INITIAL_SALARIES 
} from './data/initialData';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<NavigationPage>('home');

  // Application Data States
  const [doctors, setDoctors] = useState<Doctor[]>(INITIAL_DOCTORS);
  const [patient, setPatient] = useState<PatientProfile>(() => {
    const saved = localStorage.getItem('vital_ai_patient');
    return saved ? JSON.parse(saved) : INITIAL_PATIENT;
  });
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('vital_ai_appointments');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'app-101',
        patientId: 'p-001',
        patientName: 'Harshit Jakhar',
        doctorId: 'doc-01',
        doctorName: 'Dr. Priya Sharma',
        specialty: 'Cardiologist',
        date: '2026-10-09',
        time: '10:30 AM',
        type: 'In-person',
        status: 'Upcoming',
        reason: 'Follow-up on cardiovascular lipid metrics and resting ECG review.',
        phoneNumber: '+91 98123 45678',
        hospitalRoom: 'Room 304, OPD Block B, SGT Hospital',
        createdAt: '2026-10-07',
      },
      {
        id: 'app-102',
        patientId: 'p-001',
        patientName: 'Harshit Jakhar',
        doctorId: 'doc-04',
        doctorName: 'Dr. Sameer Kapoor',
        specialty: 'General Physician',
        date: '2026-09-28',
        time: '11:00 AM',
        type: 'In-person',
        status: 'Completed',
        reason: 'Routine quarterly wellness review & CBC report check.',
        phoneNumber: '+91 98123 45678',
        hospitalRoom: 'Room 102, Internal Medicine Block',
        createdAt: '2026-09-25',
      }
    ];
  });
  const [records, setRecords] = useState<MedicalRecord[]>(() => {
    const saved = localStorage.getItem('vital_ai_records');
    return saved ? JSON.parse(saved) : INITIAL_RECORDS;
  });
  const [medicines, setMedicines] = useState<Medicine[]>(INITIAL_MEDICINES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [expenses, setExpenses] = useState<HospitalExpense[]>(INITIAL_EXPENSES);
  const [salaries, setSalaries] = useState<HospitalStaffSalary[]>(INITIAL_SALARIES);

  // Modal Control States
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [teleconsultDoctor, setTeleconsultDoctor] = useState<Doctor | null>(null);
  const [selectedRecordForPreview, setSelectedRecordForPreview] = useState<MedicalRecord | null>(null);
  const [selectedMedForOrder, setSelectedMedForOrder] = useState<Medicine | null>(null);
  const [cancellingAppointment, setCancellingAppointment] = useState<Appointment | null>(null);

  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [analyticsModalOpen, setAnalyticsModalOpen] = useState(false);
  const [uploadRecordModalOpen, setUploadRecordModalOpen] = useState(false);
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [globalSearchOpen, setGlobalSearchOpen] = useState(false);

  // Copilot Initial Prompt passing
  const [copilotPrompt, setCopilotPrompt] = useState('');

  // Handlers
  const handleAskCopilot = (prompt: string) => {
    setCopilotPrompt(prompt);
    setActivePage('home');
  };

  const handleConfirmAppointment = (data: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...data,
      id: `app-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem('vital_ai_appointments', JSON.stringify(updated));

    // Also add to notification center
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Appointment Scheduled',
      message: `Your appointment with ${data.doctorName} on ${data.date} at ${data.time} is confirmed.`,
      timestamp: 'Just now',
      read: false,
      type: 'appointment',
    };
    setNotifications([newNotif, ...notifications]);
  };

  const handleConfirmCancelAppointment = (id: string) => {
    const updated = appointments.map((a) => (a.id === id ? { ...a, status: 'Cancelled' as const } : a));
    setAppointments(updated);
    localStorage.setItem('vital_ai_appointments', JSON.stringify(updated));

    const cancelNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Appointment Cancelled',
      message: 'Your appointment has been cancelled. You can reschedule anytime.',
      timestamp: 'Just now',
      read: false,
      type: 'appointment',
    };
    setNotifications([cancelNotif, ...notifications]);
  };

  const handleSaveProfile = (updatedProfile: PatientProfile) => {
    setPatient(updatedProfile);
    localStorage.setItem('vital_ai_patient', JSON.stringify(updatedProfile));
  };

  const handleUploadRecordSuccess = (newRecord: MedicalRecord) => {
    const updated = [newRecord, ...records];
    setRecords(updated);
    localStorage.setItem('vital_ai_records', JSON.stringify(updated));

    // Show preview of newly uploaded and analyzed record
    setSelectedRecordForPreview(newRecord);
  };

  const handleOrderRefillSuccess = (medicineName: string, quantity: number) => {
    const updated = medicines.map((m) => {
      if (m.name === medicineName) {
        return {
          ...m,
          pillsRemaining: Math.min(m.totalPills, m.pillsRemaining + quantity * 10),
        };
      }
      return m;
    });
    setMedicines(updated);

    const refillNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Pharmacy Order Placed',
      message: `Refill for ${medicineName} (${quantity} units) queued for 3-hour dispatch.`,
      timestamp: 'Just now',
      read: false,
      type: 'refill',
    };
    setNotifications([refillNotif, ...notifications]);
  };

  // Admin handlers
  const handleUpdateDoctorDuty = (doctorId: string, isOnDuty: boolean) => {
    setDoctors(doctors.map((d) => (d.id === doctorId ? { ...d, isOnDuty } : d)));
  };

  const handleUpdateAppointmentStatus = (appointmentId: string, status: 'Upcoming' | 'Completed' | 'Cancelled') => {
    const updated = appointments.map((a) => (a.id === appointmentId ? { ...a, status } : a));
    setAppointments(updated);
    localStorage.setItem('vital_ai_appointments', JSON.stringify(updated));
  };

  const handleDisburseSalary = (salaryId: string) => {
    setSalaries(salaries.map((s) => (s.id === salaryId ? { ...s, paymentStatus: 'Disbursed' } : s)));
  };

  const handleAddExpense = (newExp: Omit<HospitalExpense, 'id'>) => {
    const created: HospitalExpense = {
      ...newExp,
      id: `exp-${Date.now()}`,
    };
    setExpenses([created, ...expenses]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F7FAFC] flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-100 selection:text-blue-900">
        
        {/* Sticky Top Navigation */}
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          unreadNotificationsCount={unreadCount}
          onOpenNotifications={() => setNotificationPanelOpen(true)}
          onOpenEmail={() => setEmailModalOpen(true)}
          onOpenGlobalSearch={() => setGlobalSearchOpen(true)}
          onOpenProfile={() => setProfileModalOpen(true)}
          onOpenEmergency={() => setEmergencyModalOpen(true)}
        />

        {/* Dynamic Page Router */}
        <main className="flex-1 w-full">
          {activePage === 'home' && (
            <HomePage
              doctors={doctors}
              patient={patient}
              copilotPrompt={copilotPrompt}
              onNavigate={setActivePage}
              onSelectDoctor={(doc) => setSelectedDoctorForBooking(doc)}
              onOpenProfile={() => setProfileModalOpen(true)}
              onOpenAnalytics={() => setAnalyticsModalOpen(true)}
              onOpenEmergency={() => setEmergencyModalOpen(true)}
              onAskCopilot={handleAskCopilot}
            />
          )}

          {activePage === 'doctors' && (
            <DoctorsPage
              doctors={doctors}
              onSelectDoctor={(doc) => setSelectedDoctorForBooking(doc)}
              onStartTeleconsult={(doc) => setTeleconsultDoctor(doc)}
            />
          )}

          {activePage === 'appointments' && (
            <AppointmentsPage
              appointments={appointments}
              onBookNew={() => {
                setSelectedDoctorForBooking(doctors[0]);
              }}
              onRequestCancel={(app) => setCancellingAppointment(app)}
              onStartTeleconsultById={(doctorId) => {
                const found = doctors.find((d) => d.id === doctorId) || doctors[0];
                setTeleconsultDoctor(found);
              }}
            />
          )}

          {activePage === 'medical-records' && (
            <MedicalRecordsPage
              records={records}
              onOpenUpload={() => setUploadRecordModalOpen(true)}
              onPreviewRecord={(rec) => setSelectedRecordForPreview(rec)}
            />
          )}

          {activePage === 'medicines' && (
            <MedicinesPage
              medicines={medicines}
              onOrderRefill={(med) => setSelectedMedForOrder(med)}
            />
          )}

          {activePage === 'health-tools' && <HealthToolsPage />}

          {activePage === 'teleconsultation' && (
            <TeleconsultationPage
              doctors={doctors}
              onStartTeleconsult={(doc) => setTeleconsultDoctor(doc)}
            />
          )}

          {activePage === 'about' && <AboutPage />}

          {activePage === 'admin' && (
            <AdminPage
              doctors={doctors}
              appointments={appointments}
              expenses={expenses}
              salaries={salaries}
              patient={patient}
              onUpdateDoctorDuty={handleUpdateDoctorDuty}
              onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
              onDisburseSalary={handleDisburseSalary}
              onAddExpense={handleAddExpense}
            />
          )}
        </main>

        {/* Global Dark Navy Footer */}
        <Footer
          onNavigate={setActivePage}
          onOpenEmail={() => setEmailModalOpen(true)}
          onOpenEmergency={() => setEmergencyModalOpen(true)}
        />

        {/* Modals & Dialogs */}
        {selectedDoctorForBooking && (
          <AppointmentModal
            doctor={selectedDoctorForBooking}
            onClose={() => setSelectedDoctorForBooking(null)}
            onConfirm={handleConfirmAppointment}
          />
        )}

        {emergencyModalOpen && (
          <EmergencyModal onClose={() => setEmergencyModalOpen(false)} />
        )}

        {profileModalOpen && (
          <EditProfileModal
            patient={patient}
            onClose={() => setProfileModalOpen(false)}
            onSave={handleSaveProfile}
          />
        )}

        {analyticsModalOpen && (
          <HealthAnalyticsModal onClose={() => setAnalyticsModalOpen(false)} />
        )}

        {teleconsultDoctor && (
          <TeleconsultationModal
            doctor={teleconsultDoctor}
            onClose={() => setTeleconsultDoctor(null)}
          />
        )}

        {selectedRecordForPreview && (
          <DocumentPreviewModal
            record={selectedRecordForPreview}
            onClose={() => setSelectedRecordForPreview(null)}
            onDiscussWithCopilot={(title) => {
              handleAskCopilot(`Explain my findings and precautions for: ${title}`);
            }}
          />
        )}

        {uploadRecordModalOpen && (
          <UploadRecordModal
            onClose={() => setUploadRecordModalOpen(false)}
            onUploadSuccess={handleUploadRecordSuccess}
          />
        )}

        {cancellingAppointment && (
          <CancelAppointmentModal
            appointment={cancellingAppointment}
            onClose={() => setCancellingAppointment(null)}
            onConfirmCancel={handleConfirmCancelAppointment}
          />
        )}

        {selectedMedForOrder && (
          <MedicineOrderModal
            medicine={selectedMedForOrder}
            onClose={() => setSelectedMedForOrder(null)}
            onConfirmOrder={handleOrderRefillSuccess}
          />
        )}

        {notificationPanelOpen && (
          <NotificationPanel
            notifications={notifications}
            onClose={() => setNotificationPanelOpen(false)}
            onMarkAllAsRead={() => {
              setNotifications(notifications.map((n) => ({ ...n, read: true })));
            }}
            onDeleteNotification={(id) => {
              setNotifications(notifications.filter((n) => n.id !== id));
            }}
          />
        )}

        {emailModalOpen && (
          <HospitalEmailModal onClose={() => setEmailModalOpen(false)} />
        )}

        {globalSearchOpen && (
          <GlobalSearchModal
            doctors={doctors}
            onClose={() => setGlobalSearchOpen(false)}
            onNavigate={setActivePage}
            onSelectDoctor={(doc) => {
              setSelectedDoctorForBooking(doc);
              setGlobalSearchOpen(false);
            }}
          />
        )}

      </div>
    </LanguageProvider>
  );
}
