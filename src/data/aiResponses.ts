export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
  isEmergencyNotice?: boolean;
}

export const getSmartAIResponse = (query: string): string => {
  const q = query.toLowerCase().trim();

  // Emergency detection
  if (
    q.includes('chest pain') ||
    q.includes('heart attack') ||
    q.includes('can\'t breathe') ||
    q.includes('cannot breathe') ||
    q.includes('stroke') ||
    q.includes('severe bleeding') ||
    q.includes('unconscious') ||
    q.includes('paralysis') ||
    q.includes('poison')
  ) {
    return `🚨 **CRITICAL MEDICAL NOTICE**: The symptoms described may indicate an acute medical emergency.

Please **immediately dial emergency services at 112** or proceed to the nearest emergency trauma center. 

**Vital AI Emergency Protocol:**
1. Call National Emergency: **112**
2. SGT Hospital Trauma Direct Line: **+91-124-2278187**
3. Stay seated, avoid exertion, and have someone stay with you until first responders arrive.

*Vital AI does not diagnose emergency conditions.*`;
  }

  // Lab reports
  if (q.includes('lab') || q.includes('report') || q.includes('cbc') || q.includes('blood') || q.includes('lipid')) {
    return `📋 **Vital AI Lab Report Analysis**:

Based on your verified medical records at Vital AI:
• **Complete Blood Count (CBC)**: Hemoglobin (14.8 g/dL), WBC (6,800 /mcL), and Platelets (240k /mcL) are in optimal clinical ranges. Mildly elevated hematocrit (49.2%) indicates you may benefit from increasing daily fluid intake.
• **Lipid Panel**: Total Cholesterol is well-managed at 172 mg/dL with protective HDL at 54 mg/dL.

**Recommendations:**
1. Target 2.5–3 liters of water daily.
2. Maintain cardiovascular exercise for 30 minutes 5 days a week.

*Disclaimer: This assessment is informational and does not replace the diagnosis of your attending physician, Dr. Priya Sharma.*`;
  }

  // Medicines
  if (q.includes('medicine') || q.includes('safe') || q.includes('paracetamol') || q.includes('atorvastatin') || q.includes('side effect') || q.includes('dose')) {
    return `💊 **Vital AI Medication Review**:

Your active prescriptions in your patient vault:
• **Paracetamol (500mg)**: Safe when taken as directed (twice daily post meals for mild fever/headache). Do not exceed 2000mg/day.
• **Atorvastatin (10mg)**: Recommended at bedtime to regulate lipid synthesis during liver nocturnal peak hours.
• **Vitamin D3 (60,000 IU)**: Weekly dose following a substantial meal for optimal fat-soluble absorption.

**Drug Interaction Status**: No harmful drug-drug interactions detected between your current active medications.

*Always consult your prescribing doctor before altering your medication routine.*`;
  }

  // Nutrition & Diet
  if (q.includes('eat') || q.includes('diet') || q.includes('food') || q.includes('nutrition') || q.includes('weight')) {
    return `🥗 **Vital AI Clinical Nutrition Guidance**:

For your current profile (21 yo, Male, Weight: 68 kg, BMI: 22.2 - Normal):
1. **Cardioprotective Nutrition**: Prioritize whole legumes, colorful vegetables, seeds (flax, chia), and unsalted almonds.
2. **Hydration Strategy**: Target 2.5–3 liters of water throughout the day.
3. **Protein Intake**: 1.2g to 1.5g per kg body weight (~80–95g) to support lean tissue and muscular endurance.
4. **Meal Timing**: Aim to finish dinner at least 2.5 hours before sleeping to maximize sleep restorative architecture.`;
  }

  // Health summary
  if (q.includes('summary') || q.includes('profile') || q.includes('overall') || q.includes('vitals')) {
    return `📊 **Vital AI Executive Health Summary for Harshit Jakhar**:

• **Resting Heart Rate**: 72 bpm (Optimal sinus range 60–100 bpm)
• **Blood Pressure**: 118/76 mmHg (Normotensive clinical category)
• **BMI**: 22.2 kg/m² (Healthy weight index)
• **Sleep Efficiency**: 7h 30m average (Sufficient restorative slow-wave proportion)
• **Active Steps**: 8,452 steps today (Exceeds baseline mobility goal)

**Next Action**: Your follow-up consultation with Dr. Priya Sharma is scheduled for tomorrow at 10:30 AM.`;
  }

  // Default response
  return `🩺 **Vital AI Health Copilot Response**:

Thank you for your question. Here is key guidance on "${query}":

• **Clinical Context**: Vital AI actively tracks your personal biomarkers, active prescriptions, and diagnostic pathology records.
• **Actionable Advice**: Maintain consistent circadian hydration, balanced sleep schedules, and adhere to physician-directed medication plans.
• **Follow-up**: Would you like to review your recent lab panels, schedule a teleconsultation with our specialist team, or run a diagnostic calculator?

*Vital AI assists with clinical literacy and does not substitute for physician consultation.*`;
};
