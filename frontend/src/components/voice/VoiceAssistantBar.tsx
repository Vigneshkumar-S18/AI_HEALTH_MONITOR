import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Sparkles, X, Check } from 'lucide-react';
import { apiRequest } from '../../services/api';

export const VoiceAssistantBar: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const navigate = useNavigate();

  const handleTriggerVoice = () => {
    setIsListening(true);
    setVoiceText('Order CBC for Arthur Pendelton');

    setTimeout(async () => {
      setIsListening(false);
      const res = await apiRequest('/ai/voice/parse', {
        method: 'POST',
        body: JSON.stringify({ transcript: 'Order CBC for Arthur Pendelton' }),
      });

      setFeedbackMsg('Executing Command: Navigating to Lab Module & Order CBC...');
      setTimeout(() => {
        setFeedbackMsg('');
        navigate('/lab');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {feedbackMsg && (
        <div className="mb-2 rounded-2xl bg-slate-900 border border-sky-500/40 p-3 text-xs font-bold text-sky-400 shadow-2xl animate-bounce">
          {feedbackMsg}
        </div>
      )}

      <button
        onClick={handleTriggerVoice}
        className={`flex items-center gap-2 rounded-full px-5 py-3.5 text-xs font-extrabold text-white shadow-2xl transition-all ${
          isListening
            ? 'bg-rose-500 animate-pulse shadow-rose-500/40'
            : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-105 shadow-purple-500/30'
        }`}
      >
        <Mic className="h-4 w-4" />
        {isListening ? 'Listening Voice Command...' : 'Hands-Free Voice Command'}
      </button>
    </div>
  );
};
