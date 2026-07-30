import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { MessageSquare, Send, Paperclip, CheckCheck, User, Stethoscope } from 'lucide-react';

export const SecureMessaging: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: 'Dr. Sarah Jenkins', text: 'Good morning Arthur! How are your chest symptoms today?', time: '09:15 AM', isDoc: true },
    { sender: 'Arthur Pendelton', text: 'Good morning Doctor. No discomfort today. Took my 8 AM Amoxicillin.', time: '09:20 AM', isDoc: false },
    { sender: 'Dr. Sarah Jenkins', text: 'Excellent! Please remember to join our telemedicine call at 10:30 AM.', time: '09:22 AM', isDoc: true },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setMessages([...messages, { sender: 'Arthur Pendelton', text: inputText, time: 'Just now', isDoc: false }]);
    setInputText('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Encrypted Patient-Care Team Messaging
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            HIPAA-compliant end-to-end clinical chat channel
          </p>
        </div>
        <Badge variant="success">Socket.IO WebSockets Active</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[560px]">
        {/* Contact List */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 p-2">Care Team Contacts</div>
          <div className="rounded-2xl bg-sky-500/10 border border-sky-500/30 p-3 flex items-center gap-3 cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500 text-white font-bold">
              SJ
            </div>
            <div className="overflow-hidden text-xs">
              <p className="font-bold text-slate-900 dark:text-white truncate">Dr. Sarah Jenkins</p>
              <p className="text-sky-500 font-semibold truncate">Cardiology Attending</p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/40 p-3 flex items-center gap-3 cursor-pointer opacity-75">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-white font-bold">
              CO
            </div>
            <div className="overflow-hidden text-xs">
              <p className="font-bold text-slate-900 dark:text-white truncate">Nurse Clara Oswald</p>
              <p className="text-slate-500 truncate">ICU Station Nurse</p>
            </div>
          </div>
        </div>

        {/* Active Chat Conversation Window */}
        <div className="md:col-span-2 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white font-bold text-xs">
                SJ
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Dr. Sarah Jenkins</h3>
                <p className="text-[11px] text-emerald-500 font-semibold">Online • Cardiology OPD</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.isDoc ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-md rounded-2xl p-3.5 text-xs leading-relaxed ${
                    m.isDoc
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
                      : 'bg-sky-500 text-white font-medium rounded-tr-none'
                  }`}
                >
                  <p>{m.text}</p>
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] opacity-75">
                    <span>{m.time}</span>
                    {!m.isDoc && <CheckCheck className="h-3 w-3" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="mt-4 flex gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Attach Document or Image"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type secure clinical message..."
              className="flex-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-400"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
