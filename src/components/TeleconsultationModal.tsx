import React, { useState } from 'react';
import { 
  X, 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  PhoneOff, 
  MessageSquare, 
  ShieldCheck, 
  Send 
} from 'lucide-react';
import { Doctor } from '../types';

interface TeleconsultationModalProps {
  doctor: Doctor | null;
  onClose: () => void;
}

export const TeleconsultationModal: React.FC<TeleconsultationModalProps> = ({
  doctor,
  onClose,
}) => {
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([
    { sender: doctor?.name || 'Doctor', text: 'Hello Harshit, I am reviewing your recent CBC report. Can you hear me clearly?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  if (!doctor) return null;

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, { sender: 'Harshit', text: chatInput.trim() }]);
    setChatInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 rounded-3xl max-w-4xl w-full h-[85vh] overflow-hidden shadow-2xl border border-slate-700 flex flex-col text-white">
        
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/80 border-b border-slate-700/80 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                Vital AI Teleconsultation Suite · {doctor.name}
              </h3>
              <p className="text-[11px] text-slate-400">{doctor.specialty} · Encrypted Clinical Link</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
              04:18
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative bg-slate-950 overflow-hidden flex">
          
          {/* Main Doctor Video Frame */}
          <div className="flex-1 relative flex items-center justify-center">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              className="w-full h-full object-cover opacity-90"
            />
            
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-semibold">
              {doctor.name} (Attending Specialist)
            </div>

            {/* Patient Self-View PIP */}
            <div className="absolute bottom-5 right-5 w-36 h-28 sm:w-44 sm:h-32 rounded-2xl overflow-hidden border-2 border-slate-600 bg-slate-800 shadow-xl">
              {videoOff ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[10px]">
                  <VideoOff className="w-6 h-6 mb-1 text-slate-500" />
                  Camera Off
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-slate-800 to-slate-700 flex flex-col items-center justify-center text-white text-xs font-bold">
                  <div className="w-10 h-10 rounded-full bg-[#0878E8] flex items-center justify-center text-sm font-black mb-1">
                    HJ
                  </div>
                  Harshit (You)
                </div>
              )}
            </div>
          </div>

          {/* Side In-Call Chat Drawer */}
          {chatOpen && (
            <div className="w-72 sm:w-80 bg-slate-800 border-l border-slate-700 flex flex-col h-full text-xs animate-in slide-in-from-right">
              <div className="p-3 border-b border-slate-700 font-bold flex items-center justify-between">
                <span>In-Call Clinical Chat</span>
                <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.sender === 'Harshit' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] text-slate-400 mb-0.5">{msg.sender}</span>
                    <div className={`p-2.5 rounded-xl max-w-[90%] leading-relaxed ${msg.sender === 'Harshit' ? 'bg-[#0878E8] text-white' : 'bg-slate-700 text-slate-200'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="p-2 border-t border-slate-700 flex items-center gap-1.5">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-slate-700 rounded-lg px-2.5 py-1.5 outline-none text-white text-xs"
                />
                <button type="submit" className="p-1.5 bg-[#0878E8] rounded-lg text-white">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Video Call Controls Toolbar */}
        <div className="h-20 bg-slate-800/90 border-t border-slate-700 px-6 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-400 hidden sm:flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-Bit Encrypted WebRTC Session</span>
          </div>

          <div className="flex items-center gap-3 mx-auto sm:mx-0">
            <button
              onClick={() => setMicMuted(!micMuted)}
              className={`p-3.5 rounded-2xl transition-colors ${
                micMuted ? 'bg-red-500/20 text-red-400 border border-red-500' : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
              title={micMuted ? 'Unmute Mic' : 'Mute Mic'}
            >
              {micMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setVideoOff(!videoOff)}
              className={`p-3.5 rounded-2xl transition-colors ${
                videoOff ? 'bg-red-500/20 text-red-400 border border-red-500' : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
              title={videoOff ? 'Start Camera' : 'Stop Camera'}
            >
              {videoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setChatOpen(!chatOpen)}
              className={`p-3.5 rounded-2xl transition-colors ${
                chatOpen ? 'bg-[#0878E8] text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
              title="Toggle In-Call Chat"
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            <button
              onClick={onClose}
              className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2 shadow-lg shadow-red-600/30 transition-transform active:scale-95"
            >
              <PhoneOff className="w-5 h-5" />
              <span>End Call</span>
            </button>
          </div>

          <div className="hidden sm:block text-xs font-semibold text-slate-300">
            HD 1080p · 60fps
          </div>
        </div>

      </div>
    </div>
  );
};
