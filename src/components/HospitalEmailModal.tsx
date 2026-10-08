import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Send, 
  Inbox, 
  Star, 
  Trash2, 
  Paperclip, 
  CheckCircle2, 
  Reply,
  ShieldCheck
} from 'lucide-react';
import { HospitalEmailMessage } from '../types';
import { INITIAL_EMAILS } from '../data/emailData';

interface HospitalEmailModalProps {
  onClose: () => void;
}

export const HospitalEmailModal: React.FC<HospitalEmailModalProps> = ({ onClose }) => {
  const [emails, setEmails] = useState<HospitalEmailMessage[]>(() => {
    const saved = localStorage.getItem('vital_ai_emails');
    return saved ? JSON.parse(saved) : INITIAL_EMAILS;
  });
  const [activeFolder, setActiveFolder] = useState<'inbox' | 'sent' | 'compose'>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<HospitalEmailMessage | null>(emails[0] || null);

  // Compose states
  const [composeTo, setComposeTo] = useState('medicalsupdt@sgtuniversity.org');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const filteredEmails = emails.filter((e) => {
    if (activeFolder === 'inbox') return e.folder === 'inbox';
    if (activeFolder === 'sent') return e.folder === 'sent';
    return true;
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeSubject.trim() || !composeBody.trim()) return;

    const newSentMessage: HospitalEmailMessage = {
      id: `em-sent-${Date.now()}`,
      sender: 'Harshit Jakhar (Patient)',
      senderRole: 'Patient ID: LH982736',
      recipient: composeTo,
      subject: composeSubject,
      body: composeBody,
      timestamp: 'Just now',
      isRead: true,
      folder: 'sent',
    };

    const updated = [newSentMessage, ...emails];
    setEmails(updated);
    localStorage.setItem('vital_ai_emails', JSON.stringify(updated));

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setComposeSubject('');
      setComposeBody('');
      setActiveFolder('sent');
      setSelectedEmail(newSentMessage);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full h-[85vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
        
        {/* Top Header */}
        <div className="p-4 px-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0878E8] flex items-center justify-center font-bold">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Vital AI Hospital Email & Secure Messaging
              </h3>
              <p className="text-[11px] text-slate-500">Official medical correspondence vault · SGT Hospital</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workspace Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Sidebar Tabs */}
          <div className="w-48 bg-slate-50/80 border-r border-slate-200 p-3 flex flex-col gap-1.5 text-xs">
            <button
              onClick={() => setActiveFolder('compose')}
              className="w-full py-2.5 px-3 rounded-xl bg-[#0878E8] hover:bg-[#0665c7] text-white font-bold flex items-center gap-2 shadow-xs mb-2 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Compose Message</span>
            </button>

            <button
              onClick={() => {
                setActiveFolder('inbox');
                setSelectedEmail(emails.find((e) => e.folder === 'inbox') || null);
              }}
              className={`w-full py-2 px-3 rounded-xl font-bold flex items-center justify-between text-left transition-colors ${
                activeFolder === 'inbox' ? 'bg-white text-[#0878E8] shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Inbox className="w-4 h-4" />
                <span>Inbox</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-[#0878E8]">
                {emails.filter((e) => e.folder === 'inbox').length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveFolder('sent');
                setSelectedEmail(emails.find((e) => e.folder === 'sent') || null);
              }}
              className={`w-full py-2 px-3 rounded-xl font-bold flex items-center justify-between text-left transition-colors ${
                activeFolder === 'sent' ? 'bg-white text-[#0878E8] shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span>Sent Desk</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600">
                {emails.filter((e) => e.folder === 'sent').length}
              </span>
            </button>

            <div className="mt-auto p-2.5 rounded-xl bg-slate-100 border border-slate-200/80 text-[10px] text-slate-500 leading-tight">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mb-1" />
              <span>End-to-end encrypted clinical messaging server.</span>
            </div>
          </div>

          {/* Email List or Compose */}
          {activeFolder === 'compose' ? (
            <div className="flex-1 p-6 overflow-y-auto text-xs space-y-4">
              <h4 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
                Compose Secure Hospital Email
              </h4>

              {sentSuccess ? (
                <div className="p-8 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <p className="font-bold text-slate-900 text-sm">Message Delivered Successfully!</p>
                  <p className="text-slate-500 text-xs">Your clinical inquiry was sent to the designated desk.</p>
                </div>
              ) : (
                <form onSubmit={handleSend} className="space-y-3.5 max-w-xl">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">To Department / Doctor</label>
                    <select
                      value={composeTo}
                      onChange={(e) => setComposeTo(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0878E8]"
                    >
                      <option value="medicalsupdt@sgtuniversity.org">Medical Superintendent Office (medicalsupdt@sgtuniversity.org)</option>
                      <option value="priya.sharma@sgthospital.org">Dr. Priya Sharma — Cardiology Clinic</option>
                      <option value="pathology@sgthospital.org">Central Diagnostic Pathology Lab</option>
                      <option value="pharmacy@sgthospital.org">SGT Hospital Pharmacy & Refills</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Subject</label>
                    <input
                      type="text"
                      value={composeSubject}
                      onChange={(e) => setComposeSubject(e.target.value)}
                      placeholder="e.g., Query regarding Lipid Profile medication adjustment"
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0878E8]"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Clinical Message</label>
                    <textarea
                      value={composeBody}
                      onChange={(e) => setComposeBody(e.target.value)}
                      rows={7}
                      placeholder="Type your message here..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0878E8]"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveFolder('inbox')}
                      className="px-4 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-100"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#0878E8] hover:bg-[#0665c7] text-white font-bold shadow-md flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Dispatch</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="flex-1 flex overflow-hidden">
              {/* Mail list */}
              <div className="w-72 sm:w-80 border-r border-slate-200 overflow-y-auto divide-y divide-slate-100 text-xs">
                {filteredEmails.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedEmail(msg)}
                    className={`p-3.5 cursor-pointer transition-colors ${
                      selectedEmail?.id === msg.id ? 'bg-blue-50/70 border-l-4 border-l-[#0878E8]' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 truncate">{msg.sender}</span>
                      <span className="text-[10px] text-slate-400 shrink-0">{msg.timestamp}</span>
                    </div>
                    <p className="font-semibold text-slate-800 text-[11px] truncate mt-0.5">{msg.subject}</p>
                    <p className="text-slate-500 line-clamp-1 text-[11px] mt-0.5">{msg.body}</p>
                  </div>
                ))}

                {filteredEmails.length === 0 && (
                  <div className="text-center py-12 text-slate-400">Folder is empty.</div>
                )}
              </div>

              {/* Mail viewer */}
              <div className="flex-1 p-6 overflow-y-auto text-xs space-y-4">
                {selectedEmail ? (
                  <div className="space-y-4">
                    <div className="pb-3 border-b border-slate-100 space-y-1">
                      <h4 className="text-base font-bold text-slate-900">{selectedEmail.subject}</h4>
                      <div className="flex items-center justify-between text-slate-500 text-[11px]">
                        <div>
                          <strong>From: </strong>{selectedEmail.sender} ({selectedEmail.senderRole})
                        </div>
                        <span>{selectedEmail.timestamp}</span>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        <strong>To: </strong>{selectedEmail.recipient}
                      </div>
                    </div>

                    <div className="text-slate-700 leading-relaxed whitespace-pre-wrap font-sans text-xs">
                      {selectedEmail.body}
                    </div>

                    {selectedEmail.hasAttachment && (
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between max-w-sm">
                        <div className="flex items-center gap-2">
                          <Paperclip className="w-4 h-4 text-[#0878E8]" />
                          <span className="font-bold text-slate-800 text-xs">{selectedEmail.attachmentName}</span>
                        </div>
                        <button
                          onClick={() => alert(`Downloading attachment: ${selectedEmail.attachmentName}`)}
                          className="text-[#0878E8] font-bold hover:underline text-[11px]"
                        >
                          Download
                        </button>
                      </div>
                    )}

                    <div className="pt-4 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setComposeTo(selectedEmail.sender.includes('@') ? selectedEmail.sender : 'medicalsupdt@sgtuniversity.org');
                          setComposeSubject(`Re: ${selectedEmail.subject}`);
                          setComposeBody(`\n\n--- On ${selectedEmail.timestamp}, ${selectedEmail.sender} wrote:\n>${selectedEmail.body.slice(0, 150)}...`);
                          setActiveFolder('compose');
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center gap-2 text-xs transition-colors"
                      >
                        <Reply className="w-3.5 h-3.5" />
                        <span>Reply to Dispatch</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-24 text-slate-400">Select an email to view contents.</div>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
