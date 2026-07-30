import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Hospital, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { UserRole } from '../../types';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, quickLoginAsRole } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const success = await login(email, password);
    setLoading(false);

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Check email and password.');
    }
  };

  const handleRoleQuickSelect = (role: UserRole) => {
    quickLoginAsRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-xl shadow-sky-500/30 mb-4">
            <Hospital className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            MedFlow <span className="text-sky-400">AI</span>
          </h1>
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mt-1">
            Smart Hospital & Clinical AI Platform
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="text-xl font-bold text-white mb-2">Hospital Sign In</h2>
          <p className="text-xs text-slate-400 mb-6">Access your role-based clinical workspace</p>

          {error && (
            <div className="mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs font-medium text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@medflow.com"
                  className="w-full rounded-xl bg-slate-950/80 border border-slate-800 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl bg-slate-950/80 border border-slate-800 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/25 hover:from-sky-400 hover:to-blue-500 transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Quick Demo Role Selector */}
          <div className="mt-8 border-t border-slate-800/80 pt-6">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3">
              <UserCheck className="h-4 w-4 text-sky-400" />
              <span>Instant One-Click Demo Login</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleRoleQuickSelect('ADMIN')}
                className="rounded-lg bg-slate-800/80 border border-slate-700/60 py-2 px-3 text-xs font-medium text-slate-200 hover:bg-sky-500/20 hover:border-sky-500/40 hover:text-sky-300 transition-all text-left"
              >
                👔 Admin
              </button>
              <button
                onClick={() => handleRoleQuickSelect('DOCTOR')}
                className="rounded-lg bg-slate-800/80 border border-slate-700/60 py-2 px-3 text-xs font-medium text-slate-200 hover:bg-sky-500/20 hover:border-sky-500/40 hover:text-sky-300 transition-all text-left"
              >
                🩺 Doctor
              </button>
              <button
                onClick={() => handleRoleQuickSelect('RECEPTIONIST')}
                className="rounded-lg bg-slate-800/80 border border-slate-700/60 py-2 px-3 text-xs font-medium text-slate-200 hover:bg-sky-500/20 hover:border-sky-500/40 hover:text-sky-300 transition-all text-left"
              >
                📋 Receptionist
              </button>
              <button
                onClick={() => handleRoleQuickSelect('NURSE')}
                className="rounded-lg bg-slate-800/80 border border-slate-700/60 py-2 px-3 text-xs font-medium text-slate-200 hover:bg-sky-500/20 hover:border-sky-500/40 hover:text-sky-300 transition-all text-left"
              >
                💉 Nurse
              </button>
              <button
                onClick={() => handleRoleQuickSelect('LAB_TECH')}
                className="rounded-lg bg-slate-800/80 border border-slate-700/60 py-2 px-3 text-xs font-medium text-slate-200 hover:bg-sky-500/20 hover:border-sky-500/40 hover:text-sky-300 transition-all text-left"
              >
                🔬 Lab Tech
              </button>
              <button
                onClick={() => handleRoleQuickSelect('PHARMACIST')}
                className="rounded-lg bg-slate-800/80 border border-slate-700/60 py-2 px-3 text-xs font-medium text-slate-200 hover:bg-sky-500/20 hover:border-sky-500/40 hover:text-sky-300 transition-all text-left"
              >
                💊 Pharmacist
              </button>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          MedFlow AI • Enterprise Multi-Tenant Healthcare Architecture
        </p>
      </div>
    </div>
  );
};
