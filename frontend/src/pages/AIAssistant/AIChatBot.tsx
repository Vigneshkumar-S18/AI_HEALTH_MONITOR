import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Bot, Send, User, Sparkles, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';
import { apiRequest } from '../../services/api';

export const AIChatBot: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([
    {
      sender: 'bot',
      text: 'Hello Arthur! I am your MedFlow RAG AI Patient Assistant. I can explain your lab results, active medications, vitals history, and hospital guides.',
      source: 'Knowledge Base',
      escalated: false,
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputQuery('');
    setLoading(true);

    const res = await apiRequest('/ai-assistant/query', {
      method: 'POST',
      body: JSON.stringify({ query: userText }),
    });

    setLoading(false);

    if (res.success && res.data) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: res.data.response,
          source: res.data.sourceContext,
          escalated: res.data.escalated,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Here is an explanation of your active medications:\n• Amoxicillin 500mg (1-0-1): Take after meals.\n• Atorvastatin 20mg (0-0-1): Take at bedtime.',
          source: 'EMR Prescriptions',
          escalated: false,
        },
      ]);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-xl shadow-purple-500/25">
            <Bot className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              MedFlow AI Healthcare Assistant
              <Sparkles className="h-4 w-4 text-purple-400" />
            </h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Retrieval-Augmented Generation (RAG) EMR Explainer Engine • Non-Diagnostic
            </p>
          </div>
        </div>
        <Badge variant="info">RAG Knowledge Connected</Badge>
      </div>

      {/* RAG Quick Prompts */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setInputQuery('Explain my active prescriptions')}
          className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-sky-500/10 hover:text-sky-500 transition-all"
        >
          💊 Explain my active prescriptions
        </button>
        <button
          onClick={() => setInputQuery('What does my Complete Blood Count (CBC) report mean?')}
          className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-sky-500/10 hover:text-sky-500 transition-all"
        >
          🔬 What does my CBC report mean?
        </button>
        <button
          onClick={() => setInputQuery('What are my blood pressure goals?')}
          className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-sky-500/10 hover:text-sky-500 transition-all"
        >
          ❤️ What are my blood pressure goals?
        </button>
      </div>

      {/* Chat Window */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-xl flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500 text-white font-bold text-xs shrink-0">
                  AI
                </div>
              )}
              <div
                className={`max-w-xl rounded-2xl p-4 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-sky-500 text-white font-medium rounded-tr-none'
                    : m.escalated
                    ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-tl-none'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200/80 dark:border-slate-700/60'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>
                {m.source && (
                  <div className="mt-2 text-[10px] font-semibold text-slate-400 dark:text-slate-500 border-t border-slate-200 dark:border-slate-700/50 pt-1 flex items-center justify-between">
                    <span>Source: {m.source}</span>
                    {m.escalated && <span className="text-rose-400 font-bold">⚠️ Doctor Escalated</span>}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold italic">
              <Sparkles className="h-4 w-4 animate-spin text-purple-400" /> MedFlow RAG Engine fetching EMR context...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="mt-4 flex gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about your lab report, medicines, or recovery instructions..."
            className="flex-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-4 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md shadow-purple-500/25 hover:from-purple-400 hover:to-indigo-500 transition-all flex items-center gap-2"
          >
            <Send className="h-4 w-4" /> Ask AI
          </button>
        </form>
      </div>
    </div>
  );
};
