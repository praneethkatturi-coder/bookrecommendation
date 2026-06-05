import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, Clock, Flame, GraduationCap, ChevronRight, CheckCircle2, UserCheck, Compass, Library as LibIcon, User, LogOut } from 'lucide-react';
import { UserProfile, UserBookState, LibraryStatus, ReadingLevel, PreferredFormat } from './types';
import { BOOKS_DATABASE } from './data/books';
import Onboarding from './components/Onboarding';
import Discovery from './components/Discovery';
import Library from './components/Library';
import Profile from './components/Profile';
import BookDetail from './components/BookDetail';
import Auth, { AppUser } from './components/Auth';

const LOCAL_USERS_KEY = 'book_rec_ai_users_list_v2';
const LOCAL_ACTIVE_USER_EMAIL = 'book_rec_ai_active_user_email_v2';
const LOCAL_PROFILE_KEY = 'book_rec_ai_profile_v2';
const LOCAL_LIBRARY_KEY = 'book_rec_ai_library_v2';
const LOCAL_STREAK_KEY = 'book_rec_ai_streak_v2';
const LOCAL_STREAK__HISTORY_KEY = 'book_rec_ai_streak_history_v2';

const DEFAULT_PROFILE: UserProfile = {
  level: 'Intermediate',
  goals: 'Build physical discipline, stop digital distractions, and read 15 minutes daily.',
  format: 'Both',
  time: '30 mins',
  persona: 'Systems Builder',
  interests: ['Productivity', 'Psychology', 'Philosophy & Stoicism']
};

const DEFAULT_LIBRARY: UserBookState[] = [
  { bookId: 'atomic_habits', status: 'Reading', progress: 45, priorityScore: 98, addedAt: new Date(Date.now() - 3 * 86400000).toISOString(), notes: ['The 2-minute rule is a fantastic anti-procrastination hack.', 'Always align physical environments with cues.'] },
  { bookId: 'deep_work', status: 'Want to Read', progress: 0, priorityScore: 92, addedAt: new Date().toISOString(), notes: [] }
];

const DEFAULT_STREAK_HISTORY = [
  new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
  new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0]
];

export default function App() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [library, setLibrary] = useState<UserBookState[]>(DEFAULT_LIBRARY);
  const [streak, setStreak] = useState<number>(3);
  const [streakHistory, setStreakHistory] = useState<string[]>(DEFAULT_STREAK_HISTORY);
  const [activeTab, setActiveTab] = useState<'Home' | 'Discover' | 'Library' | 'Profile'>('Home');
  const [activeBookId, setActiveBookId] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Authentication states
  const [allUsers, setAllUsers] = useState<AppUser[]>([]);
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);

  // Load state on mount
  useEffect(() => {
    try {
      // 1. Get or create registered user database
      let storedUsersStr = localStorage.getItem(LOCAL_USERS_KEY);
      let usersList: AppUser[] = [];
      if (storedUsersStr) {
        usersList = JSON.parse(storedUsersStr);
      } else {
        // Seed the default system user James Clear as instructed!
        const seedUser: AppUser = {
          id: 'james@atomic.com',
          email: 'james@atomic.com',
          name: 'James Clear',
          passwordHash: 'password',
          avatarColor: 'bg-gradient-to-br from-indigo-500 to-purple-600',
          profile: DEFAULT_PROFILE,
          library: DEFAULT_LIBRARY,
          streak: 3,
          streakHistory: DEFAULT_STREAK_HISTORY
        };
        usersList = [seedUser];
        localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(usersList));
      }
      setAllUsers(usersList);

      // 2. Get active email session
      const activeEmail = localStorage.getItem(LOCAL_ACTIVE_USER_EMAIL);
      if (activeEmail) {
        const found = usersList.find(u => u.id === activeEmail);
        if (found) {
          setCurrentUser(found);
          setProfile(found.profile);
          setLibrary(found.library);
          setStreak(found.streak);
          setStreakHistory(found.streakHistory);
        }
      }
    } catch (e) {
      console.error("Local Storage parsing error:", e);
    }
  }, []);

  // Save states helper & Syncing changes to DB
  useEffect(() => {
    if (!currentUser) return;

    const updatedUser: AppUser = {
      ...currentUser,
      profile,
      library,
      streak,
      streakHistory
    };

    // Update inside the user pool
    const updatedUsersList = allUsers.map(u => u.id === currentUser.id ? updatedUser : u);
    setAllUsers(updatedUsersList);
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(updatedUsersList));
  }, [profile, library, streak, streakHistory, currentUser?.id]);

  const saveProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(updatedProfile));
    setShowOnboarding(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(LOCAL_ACTIVE_USER_EMAIL);
    // Reset states back to guest default values
    setProfile(DEFAULT_PROFILE);
    setLibrary([]);
    setStreak(0);
    setStreakHistory([]);
    setActiveTab('Home');
    setActiveBookId(null);
  };

  const handleLoginSuccess = (user: AppUser, isNew: boolean) => {
    // Check if user already exists in allUsers, if not append it
    let updatedUsers = [...allUsers];
    if (!allUsers.some(u => u.id === user.id)) {
      updatedUsers.push(user);
      setAllUsers(updatedUsers);
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(updatedUsers));
    }
    
    // Update current active state
    setCurrentUser(user);
    setProfile(user.profile);
    setLibrary(user.library);
    setStreak(user.streak);
    setStreakHistory(user.streakHistory);
    localStorage.setItem(LOCAL_ACTIVE_USER_EMAIL, user.id);

    // Show onboarding profile configurations ONLY if it's a new registration
    if (isNew) {
      setShowOnboarding(true);
    } else {
      setShowOnboarding(false);
    }
    setActiveTab('Home');
  };

  const handleRegisterUser = (newUser: AppUser) => {
    if (allUsers.some(u => u.id === newUser.id)) return;
    const updated = [...allUsers, newUser];
    setAllUsers(updated);
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(updated));
  };

  const handleUpdateBookProgress = (bookId: string, progress: number, status?: LibraryStatus) => {
    const updated = library.map((item) => {
      if (item.bookId === bookId) {
        return {
          ...item,
          progress,
          status: status || item.status
        };
      }
      return item;
    });
    setLibrary(updated);
    localStorage.setItem(LOCAL_LIBRARY_KEY, JSON.stringify(updated));
  };


  const handleAddNoteToBook = (bookId: string, noteText: string) => {
    const updated = library.map((item) => {
      if (item.bookId === bookId) {
        return {
          ...item,
          notes: [...(item.notes || []), noteText]
        };
      }
      return item;
    });
    setLibrary(updated);
    localStorage.setItem(LOCAL_LIBRARY_KEY, JSON.stringify(updated));
  };

  const handleSaveBookToLibrary = (bookId: string, priorityScore: number) => {
    if (library.some(b => b.bookId === bookId)) return;
    const newEntry: UserBookState = {
      bookId,
      status: 'Want to Read',
      progress: 0,
      priorityScore,
      addedAt: new Date().toISOString(),
      notes: []
    };
    const updated = [...library, newEntry];
    setLibrary(updated);
    localStorage.setItem(LOCAL_LIBRARY_KEY, JSON.stringify(updated));
  };

  const handleRemoveBookFromLibrary = (bookId: string) => {
    const updated = library.filter(b => b.bookId !== bookId);
    setLibrary(updated);
    localStorage.setItem(LOCAL_LIBRARY_KEY, JSON.stringify(updated));
  };

  const handleToggleStreakDate = (dateStr: string) => {
    let newHistory = [];
    if (streakHistory.includes(dateStr)) {
      newHistory = streakHistory.filter(d => d !== dateStr);
    } else {
      newHistory = [...streakHistory, dateStr];
    }
    setStreakHistory(newHistory);
    localStorage.setItem(LOCAL_STREAK__HISTORY_KEY, JSON.stringify(newHistory));

    // Dynamic simple recalculation of streak count based on consecutive logged history
    const uniqueDates = Array.from(new Set(newHistory)).sort();
    let currentStreak = 0;
    if (uniqueDates.length > 0) {
      currentStreak = 1;
      // Loop backward to find continuities
      let testDate = new Date();
      let formatTest = testDate.toISOString().split('T')[0];
      
      while (uniqueDates.includes(formatTest)) {
        currentStreak += 1;
        testDate.setDate(testDate.getDate() - 1);
        formatTest = testDate.toISOString().split('T')[0];
      }
      setStreak(currentStreak);
      localStorage.setItem(LOCAL_STREAK_KEY, String(currentStreak));
    } else {
      setStreak(0);
      localStorage.setItem(LOCAL_STREAK_KEY, '0');
    }
  };

  const handleMarkActiveDayRead = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (!streakHistory.includes(todayStr)) {
      handleToggleStreakDate(todayStr);
    }
  };

  const handleIncrementProgressOnAsk = () => {
    if (!activeBookId) return;
    const item = library.find(b => b.bookId === activeBookId);
    if (item && item.progress < 95) {
      const nextProgress = Math.min(item.progress + 5, 100);
      let nextStatus = item.status;
      if (nextProgress === 100) nextStatus = 'Completed';
      else if (item.status === 'Want to Read') nextStatus = 'Reading';
      handleUpdateBookProgress(activeBookId, nextProgress, nextStatus);
    }
  };

  const activeBookObj = BOOKS_DATABASE.find(b => b.id === activeBookId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased">
      {/* Top Banner Navigation bar */}
      <header className="sticky top-0 bg-white border-b border-slate-200/80 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="p-1.5 bg-indigo-600 rounded-lg text-white font-extrabold rotate-3 hover:rotate-0 transition">
              <BookOpen size={18} />
            </span>
            <span className="font-extrabold text-lg leading-none font-display tracking-tight text-slate-900">
              BookRecommendation<span className="text-indigo-600">AI</span>
            </span>
          </div>

          {/* Right section: Navigation and User Session Card */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            {/* Navigation Controls */}
            {!showOnboarding && currentUser && (
              <nav className="flex items-center bg-slate-100/80 border border-slate-200 p-0.5 rounded-xl text-xs font-semibold gap-1 shrink-0">
                {[
                  { id: 'Home', label: 'Home', icon: Compass },
                  { id: 'Discover', label: 'Discover', icon: Sparkles },
                  { id: 'Library', label: 'My List', icon: LibIcon },
                  { id: 'Profile', label: 'Profile', icon: User }
                ].map((tab) => {
                  const TabIcon = tab.icon;
                  const isFocused = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id as any);
                        setActiveBookId(null);
                      }}
                      className={`flex items-center gap-1.5 px-2 px-3.5 py-2 py-2.5 rounded-lg transition relative cursor-pointer select-none ${
                        isFocused
                          ? 'bg-white text-indigo-700 shadow-sm'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <TabIcon size={12} />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            )}

            {currentUser && (
              <div className="flex items-center gap-2.5 border-l border-slate-200 pl-3 shrink-0">
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-800 leading-none">{currentUser.name}</span>
                  <span className="text-[9px] font-mono text-slate-400 mt-0.5">{currentUser.email}</span>
                </div>
                <div className={`w-8 h-8 rounded-full ${currentUser.avatarColor} flex items-center justify-center text-white text-xs font-black shadow-inner`}>
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                  title="Logout Session"
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 pb-16">
        {!currentUser ? (
          <Auth
            onLoginSuccess={handleLoginSuccess}
            allUsers={allUsers}
            onRegisterUser={handleRegisterUser}
          />
        ) : showOnboarding ? (
          <Onboarding initialProfile={profile} onSave={saveProfile} />
        ) : activeBookId && activeBookObj ? (
          <BookDetail
            book={activeBookObj}
            onBack={() => setActiveBookId(null)}
            onMarkReadDay={handleMarkActiveDayRead}
            onIncrementProgress={handleIncrementProgressOnAsk}
          />
        ) : (
          <div>
            {/* 1. HOME LANDING TAB */}
            {activeTab === 'Home' && (
              <div className="space-y-8 animate-fade-in">
                {/* Visual Intro Hero Card */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-150 text-indigo-700 rounded-full text-xs font-mono font-bold tracking-wider uppercase animate-pulse">
                      <Sparkles size={12} className="text-indigo-650" />
                      <span>Premium Cohort Access</span>
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight text-slate-900 leading-none">
                      Stop searching.<br />Start compounding knowledge.
                    </h1>
                    <p className="text-slate-505 text-slate-500 max-w-md text-base leading-relaxed">
                      Describe your life-long desires, career goals or focus struggles. Our AI extracts core insights, designs adaptive habit trees, and speaks executive summaries to you.
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => {
                          setActiveTab('Discover');
                        }}
                        className="h-12 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-100 transition active:scale-95 cursor-pointer select-none"
                      >
                        <Compass size={15} />
                        <span>Launch Discovery Engine</span>
                      </button>
                      <button
                        onClick={() => setShowOnboarding(true)}
                        className="h-12 px-5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-bold rounded-xl text-sm transition active:scale-95 cursor-pointer"
                      >
                        Adjust Learning Goals
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Daily Brief Info Card */}
                  <div className="md:col-span-5 bg-white rounded-2xl border border-slate-205 p-6 shadow-sm space-y-4 relative overflow-hidden">
                    <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-32 h-32 rounded-full bg-slate-50 pointer-events-none" />
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono tracking-widest font-extrabold text-slate-400 block uppercase">Continuous Goal Tracker</span>
                        <h3 className="font-bold font-display text-sm text-slate-900">✨ Today's Daily brief Summary</h3>
                      </div>
                      <span className="flex items-center gap-1 font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 border border-amber-100 rounded">
                        <Flame size={12} className="fill-amber-100" />
                        Streak: {streak}d
                      </span>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                      <div>
                        <span className="text-[10px] font-mono text-indigo-700 font-extrabold uppercase bg-white px-2 py-0.5 border border-indigo-100 rounded shadow-sm inline-block mb-1.5">
                          Daily Highlight Focus
                        </span>
                        <h4 className="font-bold text-slate-950 leading-tight">Identity Shift in Atomic Habits</h4>
                        <p className="text-xs text-slate-505 text-slate-500 leading-normal mt-1.5">
                          "Spend 10 minutes today on Clear's Identity-Based Habits summary checklist. Aligning behavioral loops with who you want to become makes progress completely inevitable."
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveBookId('atomic_habits')}
                        className="w-full h-10 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-bold transition flex items-center justify-center gap-1 select-none border border-indigo-200 rounded-lg cursor-pointer"
                      >
                        <BookOpen size={13} />
                        <span>Read Atomic Habits Summary</span>
                      </button>
                    </div>

                    <div className="flex justify-between items-center text-xs text-slate-500 leading-none">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        Allocated format: {profile.format === 'Both' ? 'Read & Listen' : profile.format}
                      </span>
                      <span>Audio available ✓</span>
                    </div>
                  </div>
                </div>

                {/* Micro-Features grid Section */}
                <div className="pt-6 border-t border-slate-200/60">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-widest text-slate-400 block mb-4">Core Ecosystem Capabilities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-inner flex items-start gap-3">
                      <GraduationCap className="text-indigo-600 shrink-0" size={20} />
                      <div>
                        <span className="font-semibold block text-slate-900">Explainable AI Recs</span>
                        <p className="text-xs text-slate-450 mt-1 leading-normal text-slate-500">Each selected book shows a concrete matching score mapping back to your goals.</p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-205 shadow-inner flex items-start gap-3">
                      <Flame className="text-orange-500 shrink-0" size={20} />
                      <div>
                        <span className="font-semibold block text-slate-900">Interactive Grit Streaks</span>
                        <p className="text-xs text-slate-455 mt-1 leading-normal text-slate-500">Click dates on your Profile streak logs to mark dates you finished reading.</p>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-205 shadow-inner flex items-start gap-3">
                      <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                      <div>
                        <span className="font-semibold block text-slate-900">Natural Read Audio</span>
                        <p className="text-xs text-slate-460 mt-1 leading-normal text-slate-500">Uses natural browser voice synthesis with Speed controls & live transcripts.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. DISCOVER SCREEN */}
            {activeTab === 'Discover' && (
              <Discovery
                profile={profile}
                libraryIds={library.map(l => l.bookId)}
                onSaveBook={handleSaveBookToLibrary}
                onOpenBook={(id) => setActiveBookId(id)}
              />
            )}

            {/* 3. LIBRARY / SHELF SCREEN */}
            {activeTab === 'Library' && (
              <Library
                library={library}
                onUpdateBookProgress={handleUpdateBookProgress}
                onRemoveBook={handleRemoveBookFromLibrary}
                onOpenBook={(id) => setActiveBookId(id)}
                onAddNote={handleAddNoteToBook}
              />
            )}

            {/* 4. PROFILE SCREEN */}
            {activeTab === 'Profile' && (
              <Profile
                profile={profile}
                library={library}
                streak={streak}
                streakHistory={streakHistory}
                onTriggerOnboarding={() => setShowOnboarding(true)}
                onToggleStreakDate={handleToggleStreakDate}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
