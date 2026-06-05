import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Sparkles, Plus, Check, ChevronRight, BookOpen, AlertCircle, HelpCircle } from 'lucide-react';
import { UserProfile, Book } from '../types';
import { BOOKS_DATABASE } from '../data/books';

interface DiscoveryProps {
  profile: UserProfile;
  libraryIds: string[];
  onSaveBook: (bookId: string, matchScore: number) => void;
  onOpenBook: (bookId: string) => void;
}

const PRESET_PROMPTS = [
  { label: '🚀 Startups', text: "I'm launching a new product and need frameworks for rapid feedback, lean building, and avoiding competition." },
  { label: '💰 Personal Wealth', text: "How to manage personal finance, invest efficiently, and build healthy habits around saving money." },
  { label: '🧠 Deep Focus & ADHD', text: "Practical advice on stopping distractions, fighting procrastination, and building an unbreakable focus schedule." },
  { label: '🏛 Stoicism & Resilience', text: "Philosophy that helps deal with stress, manage high pressure environments, and cultivate mental toughness." },
  { label: '🌱 Self-Discipline', text: "I want to build highly consistent habits and get 1% better every day through systems." }
];

const ENRICHMENT_STAGES = [
  'Extracting core semantic targets...',
  'Merging user Onboarding context...',
  'Evaluating cognitive reading level constraints...',
  'Pruning low-affinity non-fiction books...',
  'Constructing explainable affinity matches...'
];

export default function Discovery({ profile, libraryIds, onSaveBook, onOpenBook }: DiscoveryProps) {
  const [prompt, setPrompt] = useState('');
  const [useProfileContext, setUseProfileContext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [enrichmentStage, setEnrichmentStage] = useState('');
  const [results, setResults] = useState<(Book & { matchScore: number; customReason: string })[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const calculateDynamicScoreAndReason = (book: Book, query: string): { score: number; reason: string } => {
    const textToMatch = `${query.toLowerCase()} ${profile.goals.toLowerCase()} ${profile.interests.join(' ').toLowerCase()}`;
    let matchPoints = 75; // baseline

    // Keyword Match multipliers
    if (book.category === 'Productivity') {
      if (textToMatch.includes('focus') || textToMatch.includes('habit') || textToMatch.includes('procrastinat') || textToMatch.includes('discipline')) matchPoints += 18;
    }
    if (book.category === 'Personal Finance' || book.id === 'intelligent_investor') {
      if (textToMatch.includes('money') || textToMatch.includes('invest') || textToMatch.includes('wealth') || textToMatch.includes('finance')) matchPoints += 19;
    }
    if (book.category === 'Bis/Startup') {
      if (textToMatch.includes('startup') || textToMatch.includes('business') || textToMatch.includes('product') || textToMatch.includes('launch')) matchPoints += 20;
    }
    if (book.category === 'Philosophy') {
      if (textToMatch.includes('stoic') || textToMatch.includes('resilien') || textToMatch.includes('stress') || textToMatch.includes('calm') || textToMatch.includes('mind')) matchPoints += 17;
    }
    if (book.category === 'Psychology') {
      if (textToMatch.includes('growth') || textToMatch.includes('effort') || textToMatch.includes('think') || textToMatch.includes('bias')) matchPoints += 15;
    }

    // Profile level match bonus
    if (book.level === profile.level) {
      matchPoints += 5;
    }

    // Caps
    const score = Math.min(matchPoints, 99);

    // Formulate personalized dynamic reason
    let reason = book.baselineReason;
    if (useProfileContext && profile.goals) {
      reason = `Matches your preference for "${profile.level}" reading levels. Perfectly fits your goal: "${profile.goals.length > 50 ? profile.goals.slice(0, 50) + '...' : profile.goals}" by teaching ${book.overallAim.toLowerCase()}`;
    } else {
      reason = `High matching score of ${score}% due to your focus in ${book.genre}. ${book.baselineReason}`;
    }

    return { score, reason };
  };

  const handleSearch = () => {
    if (!prompt.trim()) {
      alert("Please enter a question or topic so our AI can run searches!");
      return;
    }

    setIsLoading(true);
    setResults([]);
    setHasSearched(false);

    // Run custom sequence of prompt enrichment simulation
    let currentStageIndex = 0;
    setEnrichmentStage(ENRICHMENT_STAGES[currentStageIndex]);

    const stageTimer = setInterval(() => {
      currentStageIndex += 1;
      if (currentStageIndex < ENRICHMENT_STAGES.length) {
        setEnrichmentStage(ENRICHMENT_STAGES[currentStageIndex]);
      } else {
        clearInterval(stageTimer);
        
        // Match selection
        const mapped = BOOKS_DATABASE.map(book => {
          const { score, reason } = calculateDynamicScoreAndReason(book, prompt);
          return {
            ...book,
            matchScore: score,
            customReason: reason
          };
        });

        // Sort descending and grab exactly 3
        const sorted = mapped.sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
        
        setResults(sorted);
        setIsLoading(false);
        setHasSearched(true);
      }
    }, 350);
  };

  const fillAndTrigger = (txt: string) => {
    setPrompt(txt);
    // Give transient delay so user sees selection
    setTimeout(() => {
      setPrompt(txt);
    }, 50);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight flex items-center gap-2">
          <Sparkles className="text-indigo-600 animate-spin-pulse" size={24} />
          <span>Semantic Discovery Engine</span>
        </h1>
        <p className="text-slate-500 text-sm">
          Explain what skills you want to build or what questions you hope to answer. Our AI will align your profile indicators.
        </p>
      </div>

      {/* Main Search Command Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full text-base border border-slate-200 rounded-xl pl-4 pr-12 py-4 bg-slate-50 hover:bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/15 focus:border-indigo-600 min-h-[110px] transition text-slate-800 placeholder-slate-400 font-sans"
            placeholder="Type your current challenge or learning desire... e.g. 'I want to build a better business plan with continuous feedback loop' or 'How do I master investing?'"
            id="mainPrompt"
          />
          <div className="absolute bottom-4 right-4">
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-4 h-10 bg-indigo-600 hover:bg-indigo-505 hover:bg-indigo-500 active:scale-95 disabled:opacity-40 disabled:scale-100 rounded-lg text-white font-semibold text-sm transition shadow-md shadow-indigo-100"
              id="get-recs-btn"
            >
              <Search size={15} />
              <span>Get AI Matches</span>
            </button>
          </div>
        </div>

        {/* Options Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs leading-none">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="use-context"
              checked={useProfileContext}
              onChange={(e) => setUseProfileContext(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4 border-slate-300"
            />
            <label htmlFor="use-context" className="text-slate-605 font-medium select-none text-slate-600">
              Correlate with Onboarding Profile ({profile.level} • {profile.persona})
            </label>
          </div>
          <span className="text-slate-400 font-mono">Exactly 3 explainable suggestions per prompt</span>
        </div>

        {/* Quick presets */}
        <div className="pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-2">Popular Prompts</span>
          <div className="flex flex-wrap gap-2">
            {PRESET_PROMPTS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => fillAndTrigger(preset.text)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-indigo-50/50 hover:border-indigo-150 text-slate-600 text-left cursor-pointer transition font-medium"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Block */}
      {isLoading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col items-center justify-center space-y-4 animate-fade-in">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
          <div className="space-y-1 text-center">
            <h4 className="font-semibold text-sm text-slate-800">Enriching AI Prompt Matrix...</h4>
            <div className="text-xs text-indigo-600 font-mono bg-indigo-50 px-3 py-1 rounded-full animate-pulse inline-block">
              {enrichmentStage}
            </div>
          </div>
        </div>
      )}

      {/* Search results */}
      {hasSearched && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex justify-between items-center bg-indigo-50/40 px-4 py-3 rounded-xl border border-indigo-100/50">
            <p className="text-xs text-indigo-950 font-medium">
              We parsed your intent and extracted 3 highly relevant masterpiece books matching your {profile.level} parameters.
            </p>
            <span className="text-xs font-mono font-bold text-indigo-700 uppercase bg-white px-2 py-1 rounded border border-indigo-100 shadow-sm shrink-0">
              3 Ranked Results
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((book) => {
              const isSaved = libraryIds.includes(book.id);
              return (
                <div
                  key={book.id}
                  className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-5 space-y-4">
                    {/* Cover gradient */}
                    <div className={`h-36 rounded-xl bg-gradient-to-br ${book.coverGradient} flex flex-col justify-end p-4 text-white relative shadow-inner overflow-hidden group`}>
                      <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-md rounded-lg px-2 py-1 text-[10px] font-mono tracking-wider font-bold">
                        {book.category}
                      </div>
                      <div className="space-y-1 translate-y-0 transform transition duration-300">
                        <span className="text-xs text-white/90 font-mono">{book.author}</span>
                        <h3 className="font-extrabold text-base leading-tight font-display drop-shadow">
                          {book.title}
                        </h3>
                      </div>
                    </div>

                    {/* Book Metadata Indicators */}
                    <div className="flex items-center justify-between text-xs font-mono border-b border-slate-100 pb-2">
                      <span className="text-slate-400">Match Affinity</span>
                      <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        {book.matchScore}% Approved
                      </span>
                    </div>

                    {/* AI Explanation reasoning */}
                    <div className="bg-slate-50 rounded-xl p-3 text-xs leading-relaxed border-l-2 border-indigo-500/80 text-slate-650 space-y-1.5">
                      <p className="font-semibold text-indigo-950 flex items-center gap-1">
                        <Sparkles size={12} className="text-indigo-600" />
                        <span>Why this fits:</span>
                      </p>
                      <p className="text-slate-600">{book.customReason}</p>
                    </div>

                    {/* Meta specifics */}
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wide font-extrabold bg-slate-100 text-slate-600">
                        {book.level}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wide font-extrabold bg-indigo-50 text-indigo-700">
                        {book.timeToFinish}
                      </span>
                    </div>
                  </div>

                  {/* Actions bar */}
                  <div className="p-4 bg-slate-50/50 border-t border-slate-100 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenBook(book.id)}
                      className="h-10 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 select-none active:scale-95"
                    >
                      <BookOpen size={13} />
                      <span>Read Summary</span>
                    </button>
                    {isSaved ? (
                      <button
                        className="h-10 bg-emerald-50 border border-emerald-250 text-emerald-700 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 select-none"
                        disabled
                      >
                        <Check size={13} />
                        <span>Saved ✓</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onSaveBook(book.id, book.matchScore)}
                        className="h-10 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 select-none active:scale-95"
                      >
                        <Plus size={13} />
                        <span>Save to List</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
