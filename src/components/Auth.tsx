import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Mail, Lock, User, CheckCircle, ShieldCheck, AlertCircle, ArrowRight, BookOpen, Key, Smile } from 'lucide-react';
import { UserProfile, UserBookState } from '../types';

export interface AppUser {
  id: string; // email as the identifier
  email: string;
  name: string;
  passwordHash: string;
  avatarColor: string;
  profile: UserProfile;
  library: UserBookState[];
  streak: number;
  streakHistory: string[];
}

interface AuthProps {
  onLoginSuccess: (user: AppUser, isNew: boolean) => void;
  allUsers: AppUser[];
  onRegisterUser: (user: AppUser) => void;
}

const AVATAR_COLORS = [
  { class: 'bg-gradient-to-br from-indigo-500 to-purple-600', name: 'Royal Indigo' },
  { class: 'bg-gradient-to-br from-rose-500 to-orange-500', name: 'Sunset Amber' },
  { class: 'bg-gradient-to-br from-emerald-500 to-teal-600', name: 'Emerald Isle' },
  { class: 'bg-gradient-to-br from-sky-500 to-blue-600', name: 'Ocean Breeze' },
  { class: 'bg-gradient-to-br from-amber-500 to-amber-700', name: 'Golden Honey' }
];

const DEFAULT_PROFILE: UserProfile = {
  level: 'Intermediate',
  goals: 'Build life discipline & read focused executive non-fiction daily.',
  format: 'Both',
  time: '30 mins',
  persona: 'Systems Builder',
  interests: ['Productivity', 'Psychology']
};

export default function Auth({ onLoginSuccess, allUsers, onRegisterUser }: AuthProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatarColor, setAvatarColor] = useState(AVATAR_COLORS[0].class);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Validation feedback indicators
  const isEmailValid = email.includes('@') && email.includes('.');
  const isPasswordStrong = password.length >= 6;
  const isFormValid = isRegister
    ? name.trim().length >= 2 && isEmailValid && isPasswordStrong
    : isEmailValid && password.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (isRegister) {
      // REGISTRATION PROCESS
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (!isEmailValid) {
        setError('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }

      const emailLower = email.toLowerCase().trim();
      const existing = allUsers.find(u => u.email.toLowerCase() === emailLower);
      if (existing) {
        setError('An account with this email address already exists. Please login instead.');
        return;
      }

      const newUser: AppUser = {
        id: emailLower,
        email: emailLower,
        name: name.trim(),
        passwordHash: password, // client-side simulation storage
        avatarColor,
        profile: DEFAULT_PROFILE,
        library: [], // Starts with custom blank list
        streak: 0,
        streakHistory: []
      };

      onRegisterUser(newUser);
      setSuccessMsg('Registration successful! Launching your learning space...');
      setTimeout(() => {
        onLoginSuccess(newUser, true);
      }, 1200);

    } else {
      // LOGIN PROCESS
      if (!isEmailValid) {
        setError('Please check your email address format.');
        return;
      }
      if (!password) {
        setError('Please input your password.');
        return;
      }

      const emailLower = email.toLowerCase().trim();
      const foundUser = allUsers.find(
        u => u.email.toLowerCase() === emailLower && u.passwordHash === password
      );

      if (!foundUser) {
        setError('Invalid credentials. Please verify your email and password or Register a new account.');
        return;
      }

      setSuccessMsg(`Welcome back, ${foundUser.name}! Loading priorities...`);
      setTimeout(() => {
        onLoginSuccess(foundUser, false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 border border-transparent">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-6"
      >
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex p-3 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600 mb-2"
          >
            <BookOpen className="w-8 h-8" />
          </motion.div>
          <h2 className="text-3xl font-black tracking-tight text-slate-900 font-display">
            BookRecommendation<span className="text-indigo-600">AI</span>
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Register your secure account to save streak records, configure reading personas, and build habit stacks.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          {/* Tabs header */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => {
                setIsRegister(false);
                setError(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                !isRegister ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsRegister(true);
                setError(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                isRegister ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register New Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {isRegister && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                  key="register-fields"
                >
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">Full Name</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="James Clear"
                        className="w-full pl-9 pr-4 py-2.5 border border-slate-205 rounded-xl text-xs text-slate-800 bg-slate-50 hover:bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition"
                        required
                      />
                    </div>
                  </div>

                  {/* Avatar Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">Select Profile Canvas Accent</label>
                    <div className="flex items-center gap-2.5">
                      {AVATAR_COLORS.map((col) => {
                        const isSelected = avatarColor === col.class;
                        return (
                          <button
                            key={col.class}
                            type="button"
                            onClick={() => setAvatarColor(col.class)}
                            title={col.name}
                            className={`w-9 h-9 rounded-full ${col.class} transition relative flex items-center justify-center cursor-pointer ${
                              isSelected ? 'ring-2 ring-indigo-500 ring-offset-2 scale-105' : 'opacity-85 hover:opacity-100'
                            }`}
                          >
                            {isSelected && <Smile size={14} className="text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-205 rounded-xl text-xs text-slate-800 bg-slate-50 hover:bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 font-mono uppercase tracking-wider block">Secure Password</label>
                {isRegister && password.length > 0 && (
                  <span className={`text-[10px] font-bold ${isPasswordStrong ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {isPasswordStrong ? 'Strong Password' : 'Min 6 characters'}
                  </span>
                )}
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 border border-slate-205 rounded-xl text-xs text-slate-800 bg-slate-50 hover:bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition"
                  required
                />
              </div>
            </div>

            {/* Realtime Feedback Status indicators */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-rose-50 border border-rose-150 rounded-xl text-rose-800 text-xs flex gap-2 items-start"
                >
                  <AlertCircle size={15} className="shrink-0 mt-0.5 text-rose-600" />
                  <span>{error}</span>
                </motion.div>
              )}
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 bg-emerald-50 border border-emerald-150 rounded-xl text-emerald-800 text-xs flex gap-2 items-start animate-fade-in"
                >
                  <CheckCircle size={15} className="shrink-0 mt-0.5 text-emerald-600" />
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!isFormValid || !!successMsg}
              className={`w-full h-11 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition cursor-pointer select-none ${
                isFormValid && !successMsg
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-100 active:scale-98'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              <span>{isRegister ? 'Register and Build Profile' : 'Access AI Console'}</span>
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Dummy Sandbox Credentials Helper */}
          <div className="pt-3 border-t border-slate-150/50 border-t-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <ShieldCheck size={12} className="text-teal-600" />
              <span>Sandbox Access Mode</span>
            </span>
            <p className="text-[11px] text-slate-500 leading-normal mt-1">
              This preview stores individual login settings safely in your browser container. You can register multiple accounts to verify clean, user-specific lists and habits.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
