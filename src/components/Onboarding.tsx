import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Target, Clock, Check, Sparkles, BookMarked, Brain, Coins, Shield } from 'lucide-react';
import { UserProfile, ReadingLevel, PreferredFormat } from '../types';

interface OnboardingProps {
  initialProfile: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
}

const INTEREST_OPTIONS = [
  { name: 'Productivity', icon: Clock },
  { name: 'Psychology', icon: Brain },
  { name: 'Finance & Wealth', icon: Coins },
  { name: 'Business & Startups', icon: BookMarked },
  { name: 'Philosophy & Stoicism', icon: Shield },
  { name: 'Cognitive Science', icon: Sparkles }
];

export default function Onboarding({ initialProfile, onSave }: OnboardingProps) {
  const [level, setLevel] = useState<ReadingLevel>(initialProfile.level);
  const [goals, setGoals] = useState(initialProfile.goals);
  const [format, setFormat] = useState<PreferredFormat>(initialProfile.format);
  const [time, setTime] = useState(initialProfile.time);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialProfile.interests || ['Productivity', 'Psychology']);

  const handleInterestToggle = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = () => {
    // Generate AI Reading Persona based on choices
    let persona = 'Growth Strategist';
    const goalsLower = goals.toLowerCase();
    
    if (goalsLower.includes('discipline') || goalsLower.includes('habit') || goalsLower.includes('consistency') || selectedInterests.includes('Productivity')) {
      persona = 'Systems Builder';
    } else if (goalsLower.includes('investing') || goalsLower.includes('money') || goalsLower.includes('finance') || selectedInterests.includes('Finance & Wealth')) {
      persona = 'Wealth Architect';
    } else if (goalsLower.includes('think') || goalsLower.includes('philosophy') || goalsLower.includes('mind') || selectedInterests.includes('Philosophy & Stoicism')) {
      persona = 'Socratic Explorer';
    } else if (level === 'Advanced') {
      persona = 'Pragmatic Academic';
    } else {
      persona = 'Curious Multi-Disciplinarian';
    }

    onSave({
      level,
      goals: goals || "Build long-term habits and master focus in daily life",
      format,
      time,
      persona,
      interests: selectedInterests
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto space-y-8"
      id="onboarding-card-parent"
    >
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-full">
          <BookOpen className="w-8 h-8 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold font-display tracking-tight text-slate-905">
          Configure Your Reading Companion
        </h1>
        <p className="text-slate-500 max-w-md mx-auto">
          We use this data to calculate your personal Affinity Index score, customize daily summaries, and filter out irrelevant noise.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Step 1: Goal Statement */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-800 flex items-center gap-1.5">
            <Target size={16} className="text-indigo-500" />
            What is your primary learning goal?
          </label>
          <textarea
            value={goals}
            onChange={(e) => setGoals(e.target.value)}
            className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 bg-slate-50 hover:bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 min-h-[80px] transition"
            placeholder="e.g., Master investing fundamentals, build solid daily habits and focus..."
          />
        </div>

        {/* Step 2: Reading Level */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['Beginner', 'Intermediate', 'Advanced'] as ReadingLevel[]).map((levelOpt) => {
            const levelMetaDesc = {
              Beginner: 'Practical, story-focused non-fiction. Quick, bite-sized key concepts.',
              Intermediate: 'In-depth, analytical studies. Balance of theories and actionable rules.',
              Advanced: 'Academic transcripts, deep philosophy, cognitive science or financial mathematics.'
            };
            const isSel = level === levelOpt;
            return (
              <button
                key={levelOpt}
                type="button"
                onClick={() => setLevel(levelOpt)}
                className={`p-4 rounded-xl border text-left transition relative ${
                  isSel
                    ? 'border-indigo-600 bg-indigo-50/30 text-indigo-950 shadow-sm'
                    : 'border-slate-205 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {isSel && (
                  <span className="absolute top-3 right-3 bg-indigo-600 text-white rounded-full p-0.5">
                    <Check size={10} />
                  </span>
                )}
                <div className="font-semibold text-sm">{levelOpt}</div>
                <div className="text-xs text-slate-500 mt-1 leading-normal">
                  {levelMetaDesc[levelOpt]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Step 3: Interest Selection Tags */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Select Core Interest Domains
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((interest) => {
              const checked = selectedInterests.includes(interest.name);
              const InterestIcon = interest.icon;
              return (
                <button
                  key={interest.name}
                  type="button"
                  onClick={() => handleInterestToggle(interest.name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition ${
                    checked
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-100'
                      : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-50 hover:border-slate-350'
                  }`}
                >
                  <InterestIcon size={13} />
                  <span>{interest.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 4: Daily Commitment and Summary Format */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">Summary Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as PreferredFormat)}
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-505/10 focus:border-indigo-500"
            >
              <option value="Read">Visual Bullet Highlights Only</option>
              <option value="Listen">Voice Readouts (Audio Players)</option>
              <option value="Both">Bimodal (Read while listening)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-800">Daily Study Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full text-sm border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-505/10 focus:border-indigo-500"
            >
              <option value="15 mins">10-15 Min Summaries</option>
              <option value="30 mins">30 Min Daily Deep Dives</option>
              <option value="60+ mins">Full Immersion (60+ minutes)</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-98 transition mt-3"
          id="save-profile-btn"
        >
          <Sparkles size={16} />
          <span>Generate AI Reading Profile</span>
        </button>
      </div>
    </motion.div>
  );
}
