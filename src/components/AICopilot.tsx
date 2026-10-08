import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Trash2, 
  ShieldAlert, 
  User, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { AIChatMessage, getSmartAIResponse } from '../data/aiResponses';

interface AICopilotProps {
  initialPrompt?: string;
}

export const AICopilot: React.FC<AICopilotProps> = ({ initialPrompt = '' }) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello Harshit! 👋 I am **Vital AI Health Copilot**.

I can explain your laboratory pathology, verify prescribed drug safety, summarize your vitals, or guide your nutrition.

*How can I help you today?*`,
      timestamp: 'Just now',
      suggestions: [
        'Explain my lab report',
        'Is this medicine safe?',
        'What should I eat for better health?',
        'My health summary'
      ]
    }
  ]);
  const [inputText, setInputText] = useState(initialPrompt);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: AIChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate intelligent response with typing state
    setTimeout(() => {
      const responseText = getSmartAIResponse(text);
      const isEmergency = text.toLowerCase().includes('heart attack') || text.toLowerCase().includes('chest pain') || text.toLowerCase().includes('stroke');
      
      const assistantMsg: AIChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEmergencyNotice: isEmergency,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 700);
  };

  const clearHistory = () => {
    setMessages([
      {
        id: 'msg-welcome-new',
        sender: 'assistant',
        text: 'Conversation history cleared. How can Vital AI assist your health journey now?',
        timestamp: 'Just now',
        suggestions: [
          'Explain my lab report',
          'Is this medicine safe?',
          'What should I eat for better health?',
          'My health summary'
        ]
      }
    ]);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4 flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0878E8] to-[#16B8C4] flex items-center justify-center text-white shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-[#102A43]">Vital AI Health Copilot</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              Ask anything about your health, lab panels, or medicines
            </p>
          </div>
        </div>

        <button
          onClick={clearHistory}
          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-[#0878E8] text-white rounded-tr-xs shadow-xs'
                  : msg.isEmergencyNotice
                  ? 'bg-red-50 text-red-950 border border-red-200 rounded-tl-xs'
                  : 'bg-slate-100/90 text-slate-800 rounded-tl-xs border border-slate-200/60'
              }`}
            >
              {msg.text}

              {/* Suggestions chips */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-wrap gap-1.5">
                  {msg.suggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(sug)}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-blue-50 text-[#0878E8] border border-blue-200 rounded-lg transition-colors"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-[10px] text-slate-400 mt-1 px-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200 w-fit">
            <RefreshCw className="w-3.5 h-3.5 text-[#0878E8] animate-spin" />
            <span>Vital AI is analyzing clinical records...</span>
          </div>
        )}
      </div>

      {/* Safety Notice */}
      <div className="flex items-center gap-1.5 text-[10px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200 shrink-0">
        <ShieldAlert className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span>Vital AI provides clinical insights & does not substitute professional medical diagnosis.</span>
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2 pt-1 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your health question..."
          className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-[#0878E8] focus:bg-white text-slate-800 transition-all"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="w-10 h-10 rounded-xl bg-[#0878E8] hover:bg-[#0665c7] disabled:opacity-40 text-white flex items-center justify-center transition-colors shadow-xs shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
