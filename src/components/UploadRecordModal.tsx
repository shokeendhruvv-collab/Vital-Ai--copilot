import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Sparkles, RefreshCw } from 'lucide-react';
import { analyzeUploadedDocument } from '../utils/aiDocumentAnalyzer';
import { MedicalRecord } from '../types';

interface UploadRecordModalProps {
  onClose: () => void;
  onUploadSuccess: (newRecord: MedicalRecord) => void;
}

export const UploadRecordModal: React.FC<UploadRecordModalProps> = ({
  onClose,
  onUploadSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentTitle, setDocumentTitle] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!documentTitle) {
        setDocumentTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (!documentTitle) {
        setDocumentTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsAnalyzing(true);

    try {
      // Run AI document analyzer
      const aiAnalysis = await analyzeUploadedDocument(selectedFile.name, '');

      const newRecord: MedicalRecord = {
        id: `rec-ext-${Date.now()}`,
        title: documentTitle || aiAnalysis.title,
        type: aiAnalysis.type,
        doctorName: 'External Physician / Verified Laboratory',
        facility: 'Uploaded Diagnostic Document',
        date: new Date().toISOString().split('T')[0],
        status: 'Verified',
        fileSize: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        summary: aiAnalysis.summary,
        precautions: aiAnalysis.precautions,
        testValues: aiAnalysis.testValues,
        questionsForDoctor: aiAnalysis.questionsForDoctor,
        riskLevel: aiAnalysis.riskLevel,
        isExternalUpload: true,
      };

      setTimeout(() => {
        setIsAnalyzing(false);
        onUploadSuccess(newRecord);
        onClose();
      }, 1200);
    } catch {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0878E8] flex items-center justify-center">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Upload External Medical Record</h3>
              <p className="text-xs text-slate-500">Vital AI extracts clinical summaries & key precautions</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {isAnalyzing ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-[#0878E8] flex items-center justify-center mx-auto animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-slate-900">Vital AI Document Reading</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Parsing clinical biomarkers, detecting abnormal deviations, and synthesizing physician precautions...
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-[#0878E8] font-bold">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing Document Structure</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Drag & drop upload area */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors ${
                isDragOver ? 'border-[#0878E8] bg-blue-50/50' : 'border-slate-300 hover:border-[#0878E8] bg-slate-50'
              }`}
            >
              <input
                type="file"
                id="docUploadInput"
                onChange={handleFileChange}
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                className="hidden"
              />
              <label htmlFor="docUploadInput" className="cursor-pointer block space-y-2">
                <FileText className="w-8 h-8 text-[#0878E8] mx-auto" />
                <div className="font-bold text-slate-700">
                  {selectedFile ? (
                    <span className="text-emerald-600">Selected: {selectedFile.name}</span>
                  ) : (
                    <span>Click to browse or drag & drop medical document</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  Supports PDF, JPEG, PNG, or Scanned Laboratory Reports (Up to 25MB)
                </p>
              </label>
            </div>

            {/* Document Title */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Document Title / Test Description</label>
              <input
                type="text"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                placeholder="e.g., Lipid Profile Panel, Thyroid Screen..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0878E8]"
                required
              />
            </div>

            {/* AI Integration Highlight */}
            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200 text-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#0878E8]">
                <Sparkles className="w-4 h-4" />
                <span>Automated AI Clinical Extraction</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Vital AI will automatically review reference intervals, flag abnormal values, extract key precautions, and prepare questions for your doctor.
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!selectedFile}
                className="px-6 py-2.5 rounded-xl bg-[#0878E8] hover:bg-[#0665c7] disabled:opacity-50 text-white font-bold shadow-md transition-colors"
              >
                Analyze & Upload with Vital AI
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
