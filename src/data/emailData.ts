import { HospitalEmailMessage } from '../types';

export const INITIAL_EMAILS: HospitalEmailMessage[] = [
  {
    id: 'em-01',
    sender: 'Dr. Priya Sharma (Cardiology HOD)',
    senderRole: 'Cardiologist',
    recipient: 'harshit.jakhar@example.com',
    subject: 'Follow-Up Instructions & Resting ECG Notes',
    body: `Dear Harshit,

Thank you for completing your scheduled cardiovascular review. Your resting heart rate of 72 bpm and blood pressure of 118/76 mmHg demonstrate stable sinus rhythm and excellent endothelial compliance.

Please ensure you stay well-hydrated throughout your morning routines and continue your 30-minute daily brisk walks. If you experience any palpitations or unusual fatigue, do not hesitate to reach out via Vital AI teleconsultation.

Warm regards,
Dr. Priya Sharma
MBBS, MD, DM (Cardiology), FACC
Sgt Hospital, Budhera, Gurugram`,
    timestamp: 'Today, 09:45 AM',
    isRead: false,
    folder: 'inbox',
    hasAttachment: true,
    attachmentName: 'Cardiology_Consult_Summary.pdf'
  },
  {
    id: 'em-02',
    sender: 'SGT Hospital Diagnostics & Pathology Lab',
    senderRole: 'Clinical Diagnostics Wing',
    recipient: 'harshit.jakhar@example.com',
    subject: 'Complete Blood Count (CBC) Laboratory Release',
    body: `Dear Harshit Jakhar (Patient ID: LH982736),

Your laboratory test results for the routine preventive panel conducted on 28th September 2026 have been verified by Chief Pathologist Dr. Sameer Kapoor.

Key Highlights:
- Hemoglobin: 14.8 g/dL (Normal)
- Platelet Count: 240,000 /mcL (Optimal)
- Total Leukocyte Count: 6,800 /mcL (Normal)

Your official digital PDF has been synchronized with your Vital AI Medical Records vault.

Best regards,
Pathology Department, Sgt Hospital, Budhera`,
    timestamp: 'Yesterday, 04:15 PM',
    isRead: true,
    folder: 'inbox',
    hasAttachment: true,
    attachmentName: 'CBC_Report_LH982736.pdf'
  },
  {
    id: 'em-03',
    sender: 'Vital AI Central Pharmacy Dispatch',
    senderRole: 'Pharmacy Department',
    recipient: 'harshit.jakhar@example.com',
    subject: 'Prescription Refill Ready for Dispatch',
    body: `Hello Harshit,

This is a reminder from the Vital AI Pharmacy Desk. Your active prescription for Paracetamol 500mg currently has 6 tablets remaining.

If you wish to request an doorstep express dispatch to your Budhera address, please confirm your order via the Medicines portal or reply directly to this email.

Hospital Pharmacy Helpline: +91-124-2278187 (Ext. 204)`,
    timestamp: '2 days ago',
    isRead: true,
    folder: 'inbox',
    hasAttachment: false
  }
];
