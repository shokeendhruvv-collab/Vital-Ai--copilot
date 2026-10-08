export interface HealthTip {
  id: string;
  dayIndex: number;
  category: 'Cardiovascular' | 'Metabolic' | 'Sleep & Recovery' | 'Nutrition' | 'Mental Health' | 'Physical Fitness';
  title: string;
  takeaway: string;
  clinicalImpact: string;
  source: string;
  reviewedBy: string;
}

export const HEALTH_TIPS: HealthTip[] = [
  {
    id: 'tip-01',
    dayIndex: 0,
    category: 'Metabolic',
    title: 'The Post-Meal 10-Minute Walk',
    takeaway: 'Engaging in a relaxed 10 to 15-minute stroll within 30 minutes of eating stimulates muscle glucose uptake without insulin spikes.',
    clinicalImpact: 'Attenuates postprandial glucose excursions by up to 22% and supports vascular tone.',
    source: 'American Diabetes Association (ADA) Clinical Guidelines 2026',
    reviewedBy: 'Dr. Sameer Kapoor (Chief of Internal Medicine)'
  },
  {
    id: 'tip-02',
    dayIndex: 1,
    category: 'Cardiovascular',
    title: 'Hydration and Arterial Elasticity',
    takeaway: 'Consistent hydration throughout morning hours preserves ideal blood viscosity and helps maintain optimal cardiac output.',
    clinicalImpact: 'Reduces early morning hemodynamic stress and supports stable endothelial function.',
    source: 'European Society of Cardiology Consensus 2025',
    reviewedBy: 'Dr. Priya Sharma (Interventional Cardiologist)'
  },
  {
    id: 'tip-03',
    dayIndex: 2,
    category: 'Sleep & Recovery',
    title: 'Circadian Light Anchoring',
    takeaway: 'Exposing your eyes to indirect natural sunlight within 45 minutes of waking sets your suprachiasmatic nucleus clock and boosts melatonin release 14 hours later.',
    clinicalImpact: 'Improves slow-wave deep sleep latency by an average of 18 minutes.',
    source: 'Harvard Division of Sleep Medicine Clinical Review',
    reviewedBy: 'Dr. Vikramaditya Rao (Chest & Sleep Specialist)'
  },
  {
    id: 'tip-04',
    dayIndex: 3,
    category: 'Nutrition',
    title: 'Viscous Soluble Fiber Intake',
    takeaway: 'Consuming 10g of soluble fiber (oats, psyllium, legumes, chia seeds) binds bile acids in the small intestine, prompting hepatic LDL clearance.',
    clinicalImpact: 'Clinically correlated with a 5% to 8% reduction in serum LDL-C across 8 weeks.',
    source: 'Mayo Clinic Preventive Cardiology Research',
    reviewedBy: 'Dr. Priya Sharma (Interventional Cardiologist)'
  },
  {
    id: 'tip-05',
    dayIndex: 4,
    category: 'Mental Health',
    title: 'Vagal Nerve Activation via Slow Exhalation',
    takeaway: 'Practicing a 4-second nasal inhale followed by an elongated 6-second exhale engages the parasympathetic nervous branch.',
    clinicalImpact: 'Downregulates salivary cortisol and decreases resting heart rate within 5 minutes.',
    source: 'Journal of Psychoneuroendocrinology',
    reviewedBy: 'Dr. Sameer Kapoor (Chief of Internal Medicine)'
  },
  {
    id: 'tip-06',
    dayIndex: 5,
    category: 'Physical Fitness',
    title: 'Intermittent Micro-Movements for Posture',
    takeaway: 'Breaking static sitting every 45 minutes with 60 seconds of calf raises and thoracic extensions relieves lumbar compression.',
    clinicalImpact: 'Maintains spinal disc hydration and boosts lower-limb venous return.',
    source: 'American College of Sports Medicine (ACSM)',
    reviewedBy: 'Dr. Rohit Mehta (Joint Replacement Surgeon)'
  },
  {
    id: 'tip-07',
    dayIndex: 6,
    category: 'Cardiovascular',
    title: 'Dietary Potassium & Sodium Balance',
    takeaway: 'Increasing potassium-dense whole foods (spinach, bananas, avocados, coconut water) promotes renal sodium excretion.',
    clinicalImpact: 'Aids natural vascular relaxation and supports healthy systolic BP maintenance.',
    source: 'World Health Organization Cardiovascular Directives',
    reviewedBy: 'Dr. Priya Sharma (Interventional Cardiologist)'
  }
];

export const getDailyHealthTip = (): HealthTip => {
  const day = new Date().getDay();
  return HEALTH_TIPS[day % HEALTH_TIPS.length];
};
