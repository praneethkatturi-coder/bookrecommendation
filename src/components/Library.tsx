import React, { useState } from 'react';
import { BookOpen, Calendar, HelpCircle, Save, Sliders, Sparkles, Star, Trash2 } from 'lucide-react';
import { UserBookState, Book, LibraryStatus } from '../types';
import { BOOKS_DATABASE } from '../data/books';

interface LibraryProps {
  library: UserBookState[];
  onUpdateBookProgress: (bookId: string, progress: number, status?: LibraryStatus) => void;
  onRemoveBook: (bookId: string) => void;
  onOpenBook: (bookId: string) => void;
  onAddNote: (bookId: string, note: string) => void;
}

export default function Library({
  library,
  onUpdateBookProgress,
  onRemoveBook,
  onOpenBook,
  onAddNote
}: LibraryProps) {
  const [activeTab, setActiveTab] = useState<'All' | LibraryStatus>('All');
  const [noteInputs, setNoteInputs] = useState<{ [bookId: string]: string }>({});

  const booksWithState = library.map((stateItem) => {
    const staticBook = BOOKS_DATABASE.find((b) => b.id === stateItem.bookId);
    return {
      ...stateItem,
      book: staticBook
    };
  }).filter(item => item.book !== undefined) as (UserBookState & { book: Book })[];

  // Filter books based on selected tab
  const filteredBooks = booksWithState.filter((b) => {
    if (activeTab === 'All') return true;
    return b.status === activeTab;
  });

  const getStatusBadgeColor = (status: LibraryStatus) => {
    switch (status) {
      case 'Reading': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const handleProgressChange = (bookId: string, value: number) => {
    let status: LibraryStatus = 'Reading';
    if (value === 0) status = 'Want to Read';
    if (value === 100) status = 'Completed';
    onUpdateBookProgress(bookId, value, status);
  };

  const handleNoteSubmit = (bookId: string) => {
    const txt = noteInputs[bookId];
    if (!txt || !txt.trim()) return;
    onAddNote(bookId, txt.trim());
    setNoteInputs({ ...noteInputs, [bookId]: '' });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">My Personal Library</h1>
        <p className="text-slate-500 text-sm">
          Keep track of your active reading goals, log continuous summaries progress, and store key reflections.
        </p>
      </div>

      {/* Tab Filter buttons */}
      <div className="flex bg-slate-100 p-1 rounded-xl w-fit gap-1 text-sm font-medium">
        {(['All', 'Want to Read', 'Reading', 'Completed'] as const).map((tab) => {
          const count = tab === 'All' 
            ? booksWithState.length 
            : booksWithState.filter(b => b.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition text-xs font-semibold cursor-pointer ${
                activeTab === tab
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{tab}</span>
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-slate-200/50 text-[10px] text-slate-600 font-mono">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Library Content */}
      {filteredBooks.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
          <BookOpen className="w-10 h-10 text-slate-350 mx-auto opacity-70 animate-bounce" />
          <div className="space-y-1">
            <h4 className="font-semibold text-slate-700">Empty Reading Shelf</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              You do not have any books added under the "{activeTab}" filter. Head to the Discover tab to search and save summaries!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* AI Streak Hint advisory */}
          <div className="bg-indigo-50 border border-indigo-100/50 rounded-2xl p-4 flex items-start gap-3">
            <Sparkles className="text-indigo-600 shrink-0 mt-0.5" size={16} />
            <div className="text-xs">
              <span className="font-bold text-indigo-950">💡 AI Personal Reading Strategy:</span>
              <p className="text-slate-600 mt-0.5">
                You should read at least 10 minutes today to maintain your streak. Priority is highest on the books with high priority scores. To log progress, simply drag the reading percentage slider.
              </p>
            </div>
          </div>

          {/* Book Cards Shelf */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBooks.map((item) => (
              <div
                key={item.bookId}
                className="bg-white rounded-2xl border border-slate-200/80 hover:shadow-sm transition p-5 flex flex-col justify-between gap-5 relative"
              >
                {/* Upper info */}
                <div className="space-y-4">
                  {/* Title and Badge row */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-slate-400">
                        {item.book.author}
                      </span>
                      <h4 className="font-bold text-slate-900 leading-snug">{item.book.title}</h4>
                    </div>
                    <span className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wide font-extrabold border uppercase ${getStatusBadgeColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  {/* Progressive Meter slider */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-450 text-slate-500 font-medium flex items-center gap-1">
                        <Sliders size={12} />
                        Progress Log
                      </span>
                      <span className="text-slate-805 font-bold text-slate-800">{item.progress}% completed</span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={item.progress}
                      onChange={(e) => handleProgressChange(item.bookId, parseInt(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 transition"
                    />

                    <div className="grid grid-cols-3 gap-1.5 pt-1.5">
                      {[
                        { label: 'Set Start', value: 10 },
                        { label: 'Mid-point', value: 50 },
                        { label: 'Set Done', value: 100 }
                      ].map(mark => (
                        <button
                          key={mark.label}
                          onClick={() => handleProgressChange(item.bookId, mark.value)}
                          className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded py-1 text-[10px] font-mono transition text-center select-none cursor-pointer"
                        >
                          {mark.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Priority Affiliation */}
                  <div className="flex items-center justify-between text-xs font-sans">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Star size={13} className="text-slate-400 fill-slate-300" />
                      <span>AI Affinity Match Score</span>
                    </div>
                    <span className="font-bold font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 border border-indigo-100 rounded">
                      Match Score: {item.priorityScore}%
                    </span>
                  </div>

                  {/* Saved Reflections list */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <span className="font-semibold text-slate-405 text-slate-500 block">Personal Reflections & Notes</span>
                    {item.notes && item.notes.length > 0 ? (
                      <div className="space-y-1.5 max-h-24 overflow-y-auto bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        {item.notes.map((note, i) => (
                          <div key={i} className="text-slate-600 border-b border-dashed border-slate-200/60 pb-1 last:border-0 last:pb-0">
                            {note}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic block">No reflections registered yet. Type one below.</span>
                    )}

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={noteInputs[item.bookId] || ''}
                        onChange={(e) => setNoteInputs({ ...noteInputs, [item.bookId]: e.target.value })}
                        placeholder="Add a key learning takeaways..."
                        onKeyDown={(e) => { if (e.key === 'Enter') handleNoteSubmit(item.bookId); }}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-505"
                      />
                      <button
                        onClick={() => handleNoteSubmit(item.bookId)}
                        className="px-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 rounded text-xs font-bold transition select-none flex items-center justify-center cursor-pointer"
                        title="Save note"
                      >
                        <Save size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Lower Action bar */}
                <div className="flex gap-2 pt-2 border-t border-slate-100 justify-end">
                  <button
                    onClick={() => onRemoveBook(item.bookId)}
                    className="h-9 w-9 border border-rose-100 bg-white hover:bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center transition shrink-0 active:scale-95 cursor-pointer"
                    title="Remove from Shelf"
                  >
                    <Trash2 size={15} />
                  </button>
                  <button
                    onClick={() => onOpenBook(item.bookId)}
                    className="h-9 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 select-none cursor-pointer active:scale-95"
                  >
                    <BookOpen size={13} />
                    <span>Open Learning Center</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
