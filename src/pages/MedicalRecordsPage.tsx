import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Eye, 
  Download, 
  Search, 
  Filter, 
  Sparkles, 
  ShieldCheck, 
  Clock 
} from 'lucide-react';
import { MedicalRecord } from '../types';

interface MedicalRecordsPageProps {
  records: MedicalRecord[];
  onOpenUpload: () => void;
  onPreviewRecord: (record: MedicalRecord) => void;
}

export const MedicalRecordsPage: React.FC<MedicalRecordsPageProps> = ({
  records,
  onOpenUpload,
  onPreviewRecord,
}) => {
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const types = ['All', 'Lab Report', 'Imaging', 'Prescription', 'Clinical Notes'];

  const filtered = records.filter((rec) => {
    const matchesType = filterType === 'All' || rec.type === filterType;
    const matchesSearch = rec.title.toLowerCase().includes(searchQuery.toLowerCase()) || rec.summary.toLowerCase().includes(searchQuery.toLowerCase()) || rec.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[#F7FAFC] py-10">
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#102A43] tracking-tight">
              Electronic Medical Records Vault
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Encrypted pathology panels, radiology scans, and clinical notes evaluated by Vital AI.
            </p>
          </div>

          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0878E8] hover:bg-[#0665c7] text-white font-bold text-xs sm:text-sm shadow-md transition-all self-start sm:self-auto"
          >
            <Upload className="w-4 h-4" />
            <span>Upload External Record</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports, pathology parameters, physicians..."
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0878E8] focus:bg-white text-slate-800 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  filterType === type
                    ? 'bg-[#0878E8] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 space-y-4 hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#0878E8] border border-blue-200">
                    {record.type}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{record.date}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  {record.title}
                </h3>

                <p className="text-xs text-slate-500 font-medium">
                  {record.facility} · {record.doctorName}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {record.summary}
                </p>

                {record.precautions && record.precautions.length > 0 && (
                  <div className="text-[11px] text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-semibold">{record.precautions.length} AI Precautions identified</span>
                  </div>
                )}
              </div>

              {/* Action footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">{record.fileSize}</span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPreviewRecord(record)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View & AI Summary</span>
                  </button>

                  <button
                    onClick={() => alert(`Downloading record: ${record.title}.pdf`)}
                    className="p-1.5 text-slate-400 hover:text-[#0878E8] hover:bg-blue-50 rounded-lg transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
            No medical records found.
          </div>
        )}

      </div>
    </div>
  );
};
