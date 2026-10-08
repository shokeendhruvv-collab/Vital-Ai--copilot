import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Bed, 
  FileText, 
  CheckCircle2, 
  Download, 
  Plus, 
  ShieldCheck, 
  AlertCircle,
  Building 
} from 'lucide-react';
import { Doctor, Appointment, HospitalExpense, HospitalStaffSalary, PatientProfile } from '../types';
import { HOSPITAL_CONTACT_INFO } from '../data/initialData';

interface AdminPageProps {
  doctors: Doctor[];
  appointments: Appointment[];
  expenses: HospitalExpense[];
  salaries: HospitalStaffSalary[];
  patient: PatientProfile;
  onUpdateDoctorDuty: (doctorId: string, isOnDuty: boolean) => void;
  onUpdateAppointmentStatus: (appointmentId: string, status: 'Upcoming' | 'Completed' | 'Cancelled') => void;
  onDisburseSalary: (salaryId: string) => void;
  onAddExpense: (expense: Omit<HospitalExpense, 'id'>) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  doctors,
  appointments,
  expenses,
  salaries,
  patient,
  onUpdateDoctorDuty,
  onUpdateAppointmentStatus,
  onDisburseSalary,
  onAddExpense,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'doctors' | 'salaries' | 'expenses'>('overview');

  // Expense Form Modal State
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [expTitle, setExpTitle] = useState('');
  const [expCategory, setExpCategory] = useState<HospitalExpense['category']>('Liquid Oxygen & Gases');
  const [expAmount, setExpAmount] = useState('');

  const totalPayroll = salaries.reduce((acc, curr) => acc + curr.netSalary, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expTitle || !expAmount) return;
    onAddExpense({
      voucherNumber: `EXP-SGT-${Math.floor(1000 + Math.random() * 9000)}`,
      title: expTitle,
      category: expCategory,
      amount: parseFloat(expAmount),
      date: new Date().toISOString().split('T')[0],
      approvedBy: 'Admin / Medical Supdt.',
      status: 'Approved'
    });
    setExpTitle('');
    setExpAmount('');
    setShowExpenseModal(false);
  };

  const handleExportAudit = () => {
    const reportData = {
      facility: HOSPITAL_CONTACT_INFO.name,
      address: HOSPITAL_CONTACT_INFO.address,
      dateGenerated: new Date().toISOString(),
      activeDoctorsCount: doctors.filter(d => d.isOnDuty).length,
      totalAppointments: appointments.length,
      monthlyPayrollINR: totalPayroll,
      operationalExpensesINR: totalExpenses,
      salariesLedger: salaries,
      expensesLedger: expenses,
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VitalAI_Hospital_Audit_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen bg-[#F7FAFC] py-10">
      <div className="w-full px-4 sm:px-6 lg:px-10 2xl:px-14 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                Hospital Governance & Operations
              </span>
              <span className="text-xs text-slate-400">Vital AI ERP Suite</span>
            </div>
            <h1 className="text-3xl font-black text-[#102A43] tracking-tight mt-1">
              SGT Hospital Administrative Control Center
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Real-time patient census, doctor duties, salary ledger & operational expense approvals.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowExpenseModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#0878E8] hover:bg-[#0665c7] text-white text-xs font-bold shadow-xs flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Record OpEx Voucher</span>
            </button>

            <button
              onClick={handleExportAudit}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Audit Data</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'Overview & KPIs' },
            { id: 'appointments', label: `Appointments (${appointments.length})` },
            { id: 'doctors', label: `Staff Doctors (${doctors.length})` },
            { id: 'salaries', label: 'Salaries & Payroll' },
            { id: 'expenses', label: 'Hospital Expenses' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-[#0878E8] shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Patients Admitted/OPD</span>
                <p className="text-2xl sm:text-3xl font-black text-slate-900">1,482</p>
                <span className="text-[10px] text-emerald-600 font-bold">▲ +5.4% this week</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active On-Duty Doctors</span>
                <p className="text-2xl sm:text-3xl font-black text-[#0878E8]">
                  {doctors.filter((d) => d.isOnDuty).length} / {doctors.length}
                </p>
                <span className="text-[10px] text-slate-500">All super-specialties manned</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monthly Staff Payroll</span>
                <p className="text-2xl sm:text-3xl font-black text-purple-700">₹{(totalPayroll / 100000).toFixed(2)} L</p>
                <span className="text-[10px] text-slate-500">{salaries.length} clinical employees</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Operational Expenses (OpEx)</span>
                <p className="text-2xl sm:text-3xl font-black text-amber-600">₹{(totalExpenses / 100000).toFixed(2)} L</p>
                <span className="text-[10px] text-slate-500">Oxygen, AMC & Pharmacy</span>
              </div>
            </div>

            {/* Department Bed Occupancy Matrix */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Hospital Department Capacity & Bed Census</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>Cardiology & CCU Block</span>
                    <span className="text-emerald-600">92% Occupied</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="w-[92%] h-full bg-[#0878E8] rounded-full" />
                  </div>
                  <p className="text-[11px] text-slate-500">46 Beds / 50 Beds Total (4 Available)</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>Trauma & Emergency ICU</span>
                    <span className="text-amber-600">75% Occupied</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="w-[75%] h-full bg-amber-500 rounded-full" />
                  </div>
                  <p className="text-[11px] text-slate-500">18 Beds / 24 Beds Total (6 Available)</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between font-bold text-slate-800">
                    <span>General Surgery & Inpatient</span>
                    <span className="text-emerald-600">68% Occupied</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="w-[68%] h-full bg-emerald-500 rounded-full" />
                  </div>
                  <p className="text-[11px] text-slate-500">82 Beds / 120 Beds Total (38 Available)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-sm text-slate-800">
              Central Appointments Directory
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Patient</th>
                    <th className="p-3">Doctor</th>
                    <th className="p-3">Date & Time</th>
                    <th className="p-3">Mode</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {appointments.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono text-slate-500">{app.id}</td>
                      <td className="p-3 font-bold text-slate-900">{app.patientName}</td>
                      <td className="p-3 text-slate-700">{app.doctorName} ({app.specialty})</td>
                      <td className="p-3 text-slate-600">{app.date} · {app.time}</td>
                      <td className="p-3">{app.type}</td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          app.status === 'Upcoming' ? 'bg-blue-50 text-[#0878E8]' : app.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1.5">
                        {app.status === 'Upcoming' && (
                          <>
                            <button
                              onClick={() => onUpdateAppointmentStatus(app.id, 'Completed')}
                              className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-[10px]"
                            >
                              Mark Completed
                            </button>
                            <button
                              onClick={() => onUpdateAppointmentStatus(app.id, 'Cancelled')}
                              className="px-2 py-1 rounded bg-red-50 text-red-600 hover:bg-red-100 font-bold text-[10px]"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: DOCTORS */}
        {activeTab === 'doctors' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-sm text-slate-800">
              Hospital Doctors Roster & On-Duty Toggles
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Physician</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Experience</th>
                    <th className="p-3">Consult Fee</th>
                    <th className="p-3">Duty Status</th>
                    <th className="p-3 text-right">Duty Switch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {doctors.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50">
                      <td className="p-3 flex items-center gap-2">
                        <img src={doc.avatar} alt={doc.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <strong className="text-slate-900 block">{doc.name}</strong>
                          <span className="text-[10px] text-slate-400">{doc.qualifications}</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate-700">{doc.department}</td>
                      <td className="p-3 text-slate-600">{doc.experienceYears} Years</td>
                      <td className="p-3 font-bold text-slate-900">₹{doc.consultationFee}</td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          doc.isOnDuty ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {doc.isOnDuty ? '● On-Duty Active' : '○ Off-Duty'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => onUpdateDoctorDuty(doc.id, !doc.isOnDuty)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                            doc.isOnDuty
                              ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >
                          {doc.isOnDuty ? 'Mark Off-Duty' : 'Set On-Duty'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: SALARIES */}
        {activeTab === 'salaries' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden space-y-4">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-800">Monthly Clinical Staff Salaries Ledger</h3>
                <p className="text-[11px] text-slate-500">October 2026 Payroll Cycle · Currency: INR (₹)</p>
              </div>
              <span className="font-black text-slate-900 text-sm">
                Total Monthly Payroll: ₹{totalPayroll.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Staff Member</th>
                    <th className="p-3">Role & Wing</th>
                    <th className="p-3">Base Pay</th>
                    <th className="p-3">Allowances</th>
                    <th className="p-3">Deductions</th>
                    <th className="p-3">Net Salary</th>
                    <th className="p-3">Bank Account</th>
                    <th className="p-3 text-right">Disbursal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {salaries.map((sal) => (
                    <tr key={sal.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{sal.employeeName}</td>
                      <td className="p-3 text-slate-600">{sal.role} · {sal.department}</td>
                      <td className="p-3">₹{sal.baseSalary.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-emerald-600">+₹{sal.allowances.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-red-500">-₹{sal.deductions.toLocaleString('en-IN')}</td>
                      <td className="p-3 font-black text-slate-900">₹{sal.netSalary.toLocaleString('en-IN')}</td>
                      <td className="p-3 font-mono text-slate-500">{sal.accountMask}</td>
                      <td className="p-3 text-right">
                        {sal.paymentStatus === 'Disbursed' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3" />
                            Disbursed
                          </span>
                        ) : (
                          <button
                            onClick={() => onDisburseSalary(sal.id)}
                            className="px-2.5 py-1 rounded bg-[#0878E8] text-white hover:bg-blue-700 font-bold text-[10px]"
                          >
                            Disburse Pay
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: EXPENSES */}
        {activeTab === 'expenses' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden space-y-4">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-slate-800">Hospital Operational Expenses (OpEx) Approved Ledger</h3>
                <p className="text-[11px] text-slate-500">Biomedical maintenance, liquid oxygen & pharmaceuticals</p>
              </div>
              <span className="font-black text-slate-900 text-sm">
                Total Expenses: ₹{totalExpenses.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Voucher #</th>
                    <th className="p-3">Title / Description</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Amount (INR)</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Approved By</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {expenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-[#0878E8]">{exp.voucherNumber}</td>
                      <td className="p-3 font-medium text-slate-800">{exp.title}</td>
                      <td className="p-3 text-slate-600">{exp.category}</td>
                      <td className="p-3 font-black text-slate-900">₹{exp.amount.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-slate-500">{exp.date}</td>
                      <td className="p-3 text-slate-600">{exp.approvedBy}</td>
                      <td className="p-3 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                          {exp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Record OpEx Expense */}
        {showExpenseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Record New Hospital Expense</h3>
              <form onSubmit={handleCreateExpense} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Expense Description</label>
                  <input
                    type="text"
                    value={expTitle}
                    onChange={(e) => setExpTitle(e.target.value)}
                    placeholder="e.g., Cryogenic Oxygen Refill Tank 2"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={expCategory}
                    onChange={(e) => setExpCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  >
                    <option value="Liquid Oxygen & Gases">Liquid Oxygen & Gases</option>
                    <option value="Equipment Maintenance">Equipment Maintenance</option>
                    <option value="Pharmaceutical Stock">Pharmaceutical Stock</option>
                    <option value="Ambulance & Fuel">Ambulance & Fuel</option>
                    <option value="Utilities & Facility">Utilities & Facility</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Amount (₹ INR)</label>
                  <input
                    type="number"
                    value={expAmount}
                    onChange={(e) => setExpAmount(e.target.value)}
                    placeholder="e.g., 85000"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowExpenseModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#0878E8] text-white font-bold"
                  >
                    Approve & Record
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
