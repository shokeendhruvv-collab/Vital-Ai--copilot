export interface AnalyzedDocumentResult {
  title: string;
  type: 'Lab Report' | 'Imaging' | 'Prescription' | 'Clinical Notes' | 'Discharge Summary';
  summary: string;
  precautions: string[];
  testValues: {
    parameter: string;
    value: string;
    range: string;
    status: 'Normal' | 'Elevated' | 'Low';
  }[];
  questionsForDoctor: string[];
  riskLevel: 'Low Risk' | 'Moderate Attention' | 'Needs Clinical Review';
}

export const analyzeUploadedDocument = async (fileName: string, _contentSnippet: string): Promise<AnalyzedDocumentResult> => {
  // Simulate intelligent clinical AI parser with high-fidelity outputs
  const nameLower = fileName.toLowerCase();

  if (nameLower.includes('blood') || nameLower.includes('cbc') || nameLower.includes('hemoglobin') || nameLower.includes('lab')) {
    return {
      title: `Lab Panel Analysis (${fileName})`,
      type: 'Lab Report',
      summary: 'Automated AI extraction parsed standard complete blood parameters. Cellular components exhibit robust hematopoietic equilibrium with no acute inflammatory indicators.',
      riskLevel: 'Low Risk',
      testValues: [
        { parameter: 'Hemoglobin (Hb)', value: '14.5 g/dL', range: '13.0 - 17.5 g/dL', status: 'Normal' },
        { parameter: 'Platelet Count', value: '235,000 /mcL', range: '150,000 - 450,000 /mcL', status: 'Normal' },
        { parameter: 'Total Leukocytes (WBC)', value: '7,100 /mcL', range: '4,000 - 11,000 /mcL', status: 'Normal' },
        { parameter: 'Erythrocyte Sed. Rate (ESR)', value: '9 mm/hr', range: '0 - 15 mm/hr', status: 'Normal' },
      ],
      precautions: [
        'Sustain daily adequate hydration of 2.5–3 liters.',
        'Include iron-rich whole foods like leafy greens, legumes, and seeds.',
        'Repeat routine preventive panels in 6 to 12 months as indicated.'
      ],
      questionsForDoctor: [
        'Should any seasonal dietary adjustments be made based on my current ferritin baseline?',
        'Is my current physical activity program suitable for this cardiovascular profile?'
      ]
    };
  }

  if (nameLower.includes('xray') || nameLower.includes('mri') || nameLower.includes('scan') || nameLower.includes('ct') || nameLower.includes('echo')) {
    return {
      title: `Radiology Diagnostic Extraction (${fileName})`,
      type: 'Imaging',
      summary: 'AI computer-vision review scanned radiologic report findings. Anatomical morphology and tissue contours are within expected physiological variations with no focal osseous or parenchymal lesions.',
      riskLevel: 'Low Risk',
      testValues: [
        { parameter: 'Tissue Contours', value: 'Preserved', range: 'Regular & Intact', status: 'Normal' },
        { parameter: 'Bony Alignment', value: 'Normal', range: 'Standard Lordosis', status: 'Normal' },
        { parameter: 'Effusion / Fluid', value: 'Absent', range: 'Negative', status: 'Normal' }
      ],
      precautions: [
        'Continue core strengthening and ergonomic workplace posture hygiene.',
        'Avoid sudden ballistic lumbar twists or unconditioned heavy loads.',
        'Apply mild heat or dynamic warmups prior to sports participation.'
      ],
      questionsForDoctor: [
        'Are there specific rehabilitation stretches recommended for desk-bound postures?',
        'When is the next imaging follow-up warranted?'
      ]
    };
  }

  // Default Clinical Report
  return {
    title: `Clinical Report Analysis (${fileName})`,
    type: 'Clinical Notes',
    summary: 'Vital AI successfully ingested and indexed the external clinical document into your electronic patient vault. Biomarkers and clinical records have been synchronized with your personal health overview.',
    riskLevel: 'Low Risk',
    testValues: [
      { parameter: 'Vital Sign Stability', value: 'Compensated', range: 'Standard Baseline', status: 'Normal' },
      { parameter: 'Clinical Risk Score', value: 'Tier 1 (Mild)', range: 'Tier 1 - 3', status: 'Normal' }
    ],
    precautions: [
      'Store digital copy securely in your personal Vital AI vault.',
      'Review any newly prescribed medications with your primary physician before starting.',
      'Report any unexpected persistent symptoms to your attending healthcare provider.'
    ],
    questionsForDoctor: [
      'Does this document modify any previously recommended therapeutic schedules?',
      'Are there complementary lifestyle modifications I should implement?'
    ]
  };
};
