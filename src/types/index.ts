export type NavigationPage = 
  | 'home' 
  | 'doctors' 
  | 'appointments' 
  | 'medical-records' 
  | 'medicines' 
  | 'health-tools' 
  | 'teleconsultation' 
  | 'about' 
  | 'admin';

export type SupportedLanguage = 'en' | 'hi' | 'pa' | 'es' | 'fr' | 'ar';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  availability: 'Available Today' | 'Available Tomorrow' | 'Available this Week';
  consultationFee: number;
  avatar: string;
  bio: string;
  qualifications: string;
  availableDays: string[];
  slots: string[];
  teleconsultationAvailable: boolean;
  isOnDuty?: boolean;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: 'In-person' | 'Video consultation';
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  reason: string;
  phoneNumber: string;
  hospitalRoom?: string;
  createdAt: string;
}

export interface PatientProfile {
  id: string;
  name: string;
  patientIdNumber: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  phone: string;
  email: string;
  emergencyContact: string;
  emergencyContactName: string;
  address: string;
  vitals: {
    heartRate: number;
    heartRateStatus: string;
    bloodPressure: string;
    bloodPressureStatus: string;
    weightKg: number;
    weightStatus: string;
    sleepHours: string;
    sleepStatus: string;
    steps: number;
    stepsStatus: string;
    caloriesBurned: number;
  };
}

export interface MedicalRecord {
  id: string;
  title: string;
  type: 'Lab Report' | 'Imaging' | 'Prescription' | 'Clinical Notes' | 'Discharge Summary';
  doctorName: string;
  facility: string;
  date: string;
  status: 'Verified' | 'Pending Review' | 'Archived';
  fileSize: string;
  summary: string;
  precautions?: string[];
  testValues?: {
    parameter: string;
    value: string;
    range: string;
    status: 'Normal' | 'Elevated' | 'Low';
  }[];
  questionsForDoctor?: string[];
  riskLevel?: 'Low Risk' | 'Moderate Attention' | 'Needs Clinical Review';
  isExternalUpload?: boolean;
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  prescribingDoctor: string;
  refillDueDate: string;
  category: 'Active' | 'Past';
  pillsRemaining: number;
  totalPills: number;
  instructions: string;
  priceInINR: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'appointment' | 'record' | 'refill' | 'system';
}

export interface HospitalEmailMessage {
  id: string;
  sender: string;
  senderRole: string;
  recipient: string;
  subject: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  folder: 'inbox' | 'sent' | 'starred';
  hasAttachment?: boolean;
  attachmentName?: string;
}

export interface HospitalStaffSalary {
  id: string;
  employeeName: string;
  role: string;
  department: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  paymentStatus: 'Disbursed' | 'Pending';
  accountMask: string;
}

export interface HospitalExpense {
  id: string;
  voucherNumber: string;
  title: string;
  category: 'Equipment Maintenance' | 'Liquid Oxygen & Gases' | 'Pharmaceutical Stock' | 'Utilities & Facility' | 'Ambulance & Fuel';
  amount: number;
  date: string;
  approvedBy: string;
  status: 'Approved' | 'In Review';
}
