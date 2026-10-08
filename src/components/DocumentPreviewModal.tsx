import React from 'react';
import { 
  X, 
  FileText, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { MedicalRecord } from '../types';

interface DocumentPreviewModalProps {
  record: MedicalRecord | null;
  onClose: () => void;
  onDiscussWithCopilot?: (recordTitle: string) => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  record,
  onClose,
  onDiscussWithCopilot,
}) => {
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0878E8] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">{record.title}</h3>
                {record.isExternalUpload && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    AI Analyzed
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                {record.facility} · Ref: {record.doctorName} · {record.date}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs">
          
          {/* Executive Summary */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0878E8]" />
              <span className="font-bold text-[#102A43]">Vital AI Clinical Summary:</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {record.summary}
            </p>
          </div>

          {/* Test Values Table if Available */}
          {record.testValues && record.testValues.length > 0 && (
            <div className="space-y-2">
              <span className="font-bold text-slate-800 text-xs">Observed Biomarkers & Test Parameters:</span>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="p-2.5">Parameter</th>
                      <th className="p-2.5">Observed Value</th>
                      <th className="p-2.5">Reference Range</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {record.testValues.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="p-2.5 font-medium text-slate-900">{row.parameter}</td>
                        <td className="p-2.5 font-bold text-slate-800">{row.value}</td>
                        <td className="p-2.5 text-slate-500">{row.range}</td>
                        <td className="p-2.5">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold ${
                            row.status === 'Normal' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Actionable Precautions */}
          {record.precautions && record.precautions.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Actionable Precautions & Lifestyle Guidance:</span>
              </div>
              <ul className="space-y-1 pl-4 list-disc text-slate-700">
                {record.precautions.map((prec, idx) => (
                  <li key={idx}>{prec}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggested Physician Questions */}
          {record.questionsForDoctor && record.questionsForDoctor.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <HelpCircle className="w-4 h-4 text-[#0878E8]" />
                <span>Recommended Questions for Your Next Doctor Visit:</span>
              </div>
              <ul className="space-y-1.5 pl-4 list-disc text-slate-600">
                {record.questionsForDoctor.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
            <div className="text-slate-400 text-[11px]">
              Document Size: {record.fileSize} · SHA-256 Digitally Signed
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {onDiscussWithCopilot && (
                <button
                  onClick={() => {
                    onDiscussWithCopilot(record.title);
                    onClose();
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-50 text-[#0878E8] hover:bg-blue-100 font-bold text-xs transition-colors"
                >
                  Discuss with Vital AI Copilot
                </button>
              )}

              <button
                onClick={() => {
                  alert(`Downloading digitally signed file: ${record.title}.pdf`);
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#0878E8] hover:bg-[#0665c7] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
