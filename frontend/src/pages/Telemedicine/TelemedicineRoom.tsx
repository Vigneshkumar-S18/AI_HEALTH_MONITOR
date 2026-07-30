import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, Monitor, ShieldCheck, UserCheck, Signal } from 'lucide-react';

export const TelemedicineRoom: React.FC = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isSharingScreen, setIsSharingScreen] = useState(false);
  const [chatText, setChatText] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'Dr. Sarah Jenkins', text: 'Hello Arthur! I am reviewing your recent ECG and lab reports now.', time: '10:31 AM' },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatText.trim()) return;
    setMessages([...messages, { sender: 'You (Patient)', text: chatText, time: 'Just now' }]);
    setChatText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Telemedicine Virtual Consultation Suite
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Encrypted HD Telehealth Video Room • Dr. Sarah Jenkins (Cardiology)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success">WebRTC HD Stream Active</Badge>
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <Signal className="h-3.5 w-3.5" /> Excellent Signal
          </span>
        </div>
      </div>

      {!isInCall ? (
        /* Virtual Waiting Room Card */
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl text-center space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400 shadow-xl shadow-sky-500/20">
            <Video className="h-8 w-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Virtual Consultation Waiting Room</h3>
            <p className="text-xs text-slate-400 mt-1">You are #1 in queue. Dr. Sarah Jenkins is ready to start your video call.</p>
          </div>

          <div className="rounded-2xl bg-slate-950 p-4 border border-slate-800 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-400">Scheduled Time:</span>
              <span className="font-semibold text-white">Today, 10:30 AM (Est. Duration: 20 mins)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Consultation Reason:</span>
              <span className="font-semibold text-white">Post-Op Cardiology Evaluation</span>
            </div>
          </div>

          <button
            onClick={() => setIsInCall(true)}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-blue-500 transition-all"
          >
            <Video className="h-5 w-5" />
            Join Secure Video Consultation Room
          </button>
        </div>
      ) : (
        /* Active Video Call Interface */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video View Container */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl flex items-center justify-center">
              {/* Doctor Main Video Stream Mock */}
              {isVideoOn ? (
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 flex flex-col items-center justify-center">
                  <div className="h-24 w-24 rounded-full bg-sky-500/20 border-2 border-sky-400 flex items-center justify-center text-sky-400 text-3xl font-extrabold mb-3 shadow-2xl">
                    SJ
                  </div>
                  <h4 className="text-base font-bold text-white">Dr. Sarah Jenkins, MD</h4>
                  <p className="text-xs text-sky-400 font-semibold">Chief of Cardiology</p>
                </div>
              ) : (
                <div className="text-slate-500 text-sm font-semibold">Camera Paused</div>
              )}

              {/* Self Video PIP Overlay */}
              <div className="absolute bottom-4 right-4 h-28 w-40 rounded-2xl bg-slate-900 border-2 border-slate-700 shadow-xl overflow-hidden flex items-center justify-center">
                <span className="text-xs font-bold text-slate-300">You (Patient)</span>
              </div>
            </div>

            {/* Video Call Controls Toolbar */}
            <div className="flex items-center justify-center gap-4 rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-xl">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`rounded-2xl p-3.5 text-white transition-all ${
                  isMicOn ? 'bg-slate-800 hover:bg-slate-700' : 'bg-rose-500/80 hover:bg-rose-600'
                }`}
              >
                {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`rounded-2xl p-3.5 text-white transition-all ${
                  isVideoOn ? 'bg-slate-800 hover:bg-slate-700' : 'bg-rose-500/80 hover:bg-rose-600'
                }`}
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </button>

              <button
                onClick={() => setIsSharingScreen(!isSharingScreen)}
                className={`rounded-2xl p-3.5 text-white transition-all ${
                  isSharingScreen ? 'bg-sky-500' : 'bg-slate-800 hover:bg-slate-700'
                }`}
                title="Share Screen"
              >
                <Monitor className="h-5 w-5" />
              </button>

              <button
                onClick={() => setIsInCall(false)}
                className="rounded-2xl bg-rose-500 px-6 py-3 text-xs font-bold text-white hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/30 flex items-center gap-2"
              >
                <PhoneOff className="h-4 w-4" /> End Call
              </button>
            </div>
          </div>

          {/* In-Call Telehealth Chat Side Panel */}
          <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm flex flex-col h-[520px]">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <MessageSquare className="h-4 w-4 text-sky-500" /> Consultation In-Call Chat
            </h3>

            <div className="flex-1 overflow-y-auto space-y-3 p-1">
              {messages.map((m, idx) => (
                <div key={idx} className="rounded-xl bg-slate-100 dark:bg-slate-800/60 p-3 text-xs">
                  <div className="flex justify-between font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    <span>{m.sender}</span>
                    <span className="text-[10px] text-slate-400">{m.time}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">{m.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="mt-3 flex gap-2">
              <input
                type="text"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                placeholder="Type in-call note..."
                className="flex-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-sky-500 px-4 py-2 text-xs font-bold text-white hover:bg-sky-400"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
