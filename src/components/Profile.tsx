import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, BookCheck, Flame, Sliders, ChevronRight, Settings } from 'lucide-react';
import { UserProfile, UserBookState } from '../types';

interface ProfileProps {
  profile: UserProfile;
  library: UserBookState[];
  streak: number;
  streakHistory: string[];
  onTriggerOnboarding: () => void;
  onToggleStreakDate: (dateStr: string) => void;
}

const PERSONA_DESCRIPTIONS: { [key: string]: { subtitle: string; desc: string; gradient: string } } = {
  'Systems Builder': {
    subtitle: 'Efficiency Optimizer',
    desc: 'You focus heavily on productivity models, incremental behavioral loops, and strategic systems that help you achieve compound biological improvements daily.',
    gradient: 'from-amber-500 via-orange-600 to-rose-700'
  },
  'Socratic Explorer': {
    subtitle: 'Deeper Philosophy Seeker',
    desc: 'You dive into classical stoic frameworks, high-level behavioral sciences, and cognitive systems. You care about core wisdom over simple life-hacks.',
    gradient: 'from-violet-600 via-indigo-700 to-slate-900'
  },
  'Wealth Architect': {
    subtitle: 'Strategic Compounder',
    desc: 'You look at career growth, personal wealth management, behavioral investing, and long-tail systemic predictions. You seek time-sovereignty.',
    gradient: 'from-emerald-600 via-teal-700 to-indigo-800'
  },
  'Pragmatic Academic': {
    subtitle: 'In-depth Researcher',
    desc: 'You enjoy advanced, theoretically demanding materials, statistical indicators, and deep analytical frameworks.',
    gradient: 'from-blue-600 via-indigo-600 to-violet-900'
  }
};

export default function Profile({
  profile,
  library,
  streak,
  streakHistory,
  onTriggerOnboarding,
  onToggleStreakDate
}: ProfileProps) {
  // Grab correct persona meta or default
  const personaMeta = PERSONA_DESCRIPTIONS[profile.persona] || {
    subtitle: 'Curious Lifelong Learner',
    desc: 'You enjoy a high variety of non-fiction masterworks covering psychology, growth, and continuous strategy, building wide multi-disciplinary knowledge.',
    gradient: 'from-indigo-600 via-purple-600 to-pink-700'
  };

  const completedCount = library.filter(b => b.progress === 100).length;
  const activeCount = library.filter(b => b.status === 'Reading').length;

  // Generate last 30 days grid array for the Streak Grid
  const generateLast30Days = () => {
    const arr = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayNum = d.getDate();
      const weekdayStr = d.toLocaleDateString('en-US', { weekday: 'short' });
      arr.push({ dateStr, dayNum, weekdayStr });
    }
    return arr;
  };

  const last30Days = generateLast30Days();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">AI Reading Hub Profile</h1>
          <p className="text-slate-500 text-sm">
            Review your dynamic persona matrix, analyze streak milestones, and customize deep filtering criteria.
          </p>
        </div>
        <button
          onClick={onTriggerOnboarding}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-650 h-9 rounded-lg text-xs font-bold transition select-none cursor-pointer"
        >
          <Settings size={14} />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Core Persona Banner */}
        <div className={`md:col-span-2 rounded-2xl bg-gradient-to-tr ${personaMeta.gradient} text-white p-6 sm:p-8 flex flex-col justify-between relative shadow-lg overflow-hidden group`}>
          {/* Subtle decoration elements */}
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-white/5 group-hover:scale-105 transition duration-500 pointer-events-none" />
          
          <div className="space-y-4">
            <div className="inline-flex gap-1.5 items-center px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-mono font-bold tracking-wider uppercase text-amber-300">
              <Sparkles size={13} className="text-amber-400 rotate-12" />
              <span>{personaMeta.subtitle}</span>
            </div>
            <div className="space-y-1.5">
              <span className="text-white/60 text-xs font-mono">Your AI Analyzed Reading Persona</span>
              <h2 className="text-3xl font-black font-display tracking-tight text-white leading-none">
                {profile.persona}
              </h2>
            </div>
            <p className="text-white/90 text-sm leading-relaxed max-w-lg mt-2">
              {personaMeta.desc}
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap gap-4 text-xs font-mono text-white/80">
            <span>Level Target: <strong className="text-white font-sans">{profile.level}</strong></span>
            <span>Allocated Speed: <strong className="text-white font-sans">{profile.time}</strong></span>
            <span>Summary Format: <strong className="text-white font-sans">{profile.format}</strong></span>
          </div>
        </div>

        {/* Rapid Counter Panels */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="bg-white rounded-2xl border border-slate-205 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono">Grit Streak</span>
              <Flame size={20} className="text-orange-500 animate-pulse fill-orange-100" />
            </div>
            <div className="mt-4">
              <h3 className="text-4xl font-extrabold text-slate-900 font-display leading-none">{streak} Days</h3>
              <p className="text-[11px] text-slate-400 mt-2">Keep reading daily to feed the habit flame.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-205 p-5 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono">Books Completed</span>
              <BookCheck size={20} className="text-emerald-500" />
            </div>
            <div className="mt-4">
              <h3 className="text-4xl font-extrabold text-slate-900 font-display leading-none">{completedCount}</h3>
              <p className="text-[11px] text-slate-400 mt-2">{activeCount} books currently in progress.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grit Streak Grid Calendar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-805 text-slate-900 font-display">Daily Grit Habit Grid</h3>
            <p className="text-slate-400 text-xs">
              Interact with the grid to toggle days you completed your reading targets. Green represents successful habit days.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-slate-100 border border-slate-250 rounded" />
              <span>Rest Day</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 bg-emerald-500 rounded" />
              <span>Read Day</span>
            </div>
          </div>
        </div>

        {/* Contributor Grid system */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {last30Days.map((day) => {
            const isCompleted = streakHistory.includes(day.dateStr);
            return (
              <button
                key={day.dateStr}
                type="button"
                onClick={() => onToggleStreakDate(day.dateStr)}
                className={`py-2 px-1 rounded-xl border text-center transition flex flex-col items-center justify-center cursor-pointer select-none relative group ${
                  isCompleted
                    ? 'bg-emerald-500 border-emerald-600 text-white shadow-sm shadow-emerald-100'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-650'
                }`}
                title={`Click to toggle habit record for ${day.dateStr}`}
              >
                <span className="text-[9px] font-mono uppercase tracking-wider block opacity-70">
                  {day.weekdayStr}
                </span>
                <span className="text-sm font-extrabold leading-none mt-1">
                  {day.dayNum}
                </span>
                
                {/* Micro tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-white text-[9px] px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap mb-1 z-10">
                  {day.dateStr} — {isCompleted ? 'Finished Read' : 'No Log'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Domain list tags */}
      <div className="bg-slate-100/60 p-4 rounded-xl border border-slate-200/50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 leading-none">
        <span className="font-semibold text-slate-705 text-slate-750">Registered Interest Spheres</span>
        <div className="flex flex-wrap gap-1.5">
          {profile.interests.map((interest) => (
            <span
              key={interest}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-[10px] font-semibold text-slate-700"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
