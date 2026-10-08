import React from 'react';
import { X, Bell, CheckCheck, Trash2, Calendar, FileText, Pill, AlertCircle } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationPanelProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  onClose,
  onMarkAllAsRead,
  onDeleteNotification,
}) => {
  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-4 h-4 text-[#0878E8]" />;
      case 'record':
        return <FileText className="w-4 h-4 text-indigo-500" />;
      case 'refill':
        return <Pill className="w-4 h-4 text-emerald-500" />;
      default:
        return <Bell className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div 
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col z-10 animate-in slide-in-from-right">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#0878E8]" />
            <h3 className="font-bold text-slate-900 text-sm">Notifications Center</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            {notifications.filter((n) => !n.read).length} unread alerts
          </span>
          <button
            onClick={onMarkAllAsRead}
            className="text-[#0878E8] font-bold hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 text-xs">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-4 hover:bg-slate-50/80 transition-colors flex items-start gap-3 group ${
                !item.read ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="p-2 rounded-xl bg-slate-100 mt-0.5 shrink-0">
                {getIcon(item.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{item.message}</p>
              </div>
              <button
                onClick={() => onDeleteNotification(item.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-red-500 transition-opacity"
                title="Dismiss"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              No new notifications right now.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
