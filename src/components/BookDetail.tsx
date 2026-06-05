import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Sparkles, BookOpen, Clock, HelpCircle, Send, CheckCircle2, Star } from 'lucide-react';
import { Book, ChatMessage } from '../types';
import AudioPlayer from './AudioPlayer';

interface BookDetailProps {
  book: Book;
  onBack: () => void;
  onMarkReadDay?: () => void;
  onIncrementProgress?: () => void;
}

const DEFAULT_CHATS: { [bookId: string]: ChatMessage[] } = {
  atomic_habits: [
    { sender: 'assistant', text: "Hello! I have fully indexed 'Atomic Habits' by James Clear under your profile priorities. Ask me detailed questions like 'Give me a concrete environment design example' or 'How do I apply the 2-minute rule today?'", timestamp: 'Just now' }
  ],
  deep_work: [
    { sender: 'assistant', text: "Welcome! I have mapped 'Deep Work' by Cal Newport. Ask me anything about building distraction-resistant depth rituals or defeating attention residue.", timestamp: 'Just now' }
  ],
  psychology_of_money: [
    { sender: 'assistant', text: "Greetings! I've loaded Housel's 'Psychology of Money'. Ask me about ego control, time sovereignty, or managing risk buffer plans.", timestamp: 'Just now' }
  ],
  thinking_fast_slow: [
    { sender: 'assistant', text: "Indexed: 'Thinking, Fast and Slow' by Daniel Kahneman. Ask me how to spot System 1 statistical errors or control loss aversion.", timestamp: 'Just now' }
  ]
};

const SUGGESTED_QUESTIONS: { [bookId: string]: string[] } = {
  atomic_habits: [
    'How do I apply the 2-Minute Rule to flossing or programming?',
    'Explain the compound impact of 1% daily changes.',
    'What is a concrete example of environment design?'
  ],
  deep_work: [
    'Explain how task-switching causes attention residue.',
    'Which of the four depth philosophies matches a busy manager?',
    'How do I overcome the urge to scroll social media?'
  ],
  psychology_of_money: [
    'Define the difference between Rich and Wealth.',
    'Why is a cash buffer not financially inefficient?',
    'How do I maintain compounding during market panics?'
  ],
  thinking_fast_slow: [
    'What is the lazy System 2 and how do I activate it?',
    'Give a real-world example of anchoring bias.',
    'Explain prospect theory and why humans dread loss twice as much.'
  ]
};

export default function BookDetail({ book, onBack, onMarkReadDay, onIncrementProgress }: BookDetailProps) {
  const [activeTab, setActiveTab] = useState<'1min' | '5min'>('1min');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load default books chats or general chat stubs
    const baseline = DEFAULT_CHATS[book.id] || [
      { sender: 'assistant', text: `Hi there! I have indexed '${book.title}' by ${book.author}. Ask me how to apply its key insights into your personal habits or daily strategies!`, timestamp: 'Just now' }
    ];
    setChatHistory(baseline);
    setActiveTab('1min');
  }, [book.id]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory]);

  const handleAskQuestion = (questionText: string) => {
    if (!questionText.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: questionText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    setChatInput('');

    // Formulate a highly targeted custom response representing full AI capabilities
    setTimeout(() => {
      let aiResponseText = `That is an excellent point about '${book.title}'. Under your target learning metrics, this principle represents an absolute core rule. To apply this effectively: \n\n1. Establish immediate physical feedback.\n2. Shrink the friction down to an atomic level.\n3. Keep accurate visual track of your compounding daily streak.`;
      const q = questionText.toLowerCase();

      // Specific Atomic Habits responses
      if (book.id === 'atomic_habits') {
        if (q.includes('2-minute') || q.includes('two-minute')) {
          aiResponseText = "In Atomic Habits, James Clear postulates that starting a new habit should take less than 120 seconds. For example, 'Read 30 pages daily' becomes 'Read one page'. By reducing starting friction, you bypass System 2 lazy procrastination. Once you start, momentum usually carries you forward.";
        } else if (q.includes('environment') || q.includes('physic')) {
          aiResponseText = "Clear argues that environment is the invisible hand structuring human behavior. Stop trying to fight friction with raw willpower. To start drinking more water, place insulated jugs flatly on every desk. To write code, leave your editor maximized on your second monitor.";
        } else if (q.includes('1%') || q.includes('compound')) {
          aiResponseText = "The mathematics of atomic habits: Improving by a mere 1% daily leads to a staggering 37.7x improvement in 365 days. Conversely, declining 1% daily shrinks your abilities down to almost zero. Continuous systems yield trajectories that vastly outshine raw, transient milestones.";
        }
      }

      // Specific Deep Focus responses
      if (book.id === 'deep_work') {
        if (q.includes('residue') || q.includes('switching')) {
          aiResponseText = "Cal Newport defines Attention Residue as the cognitive cost when bouncing from Task A (like coding) to Task B (answering a Slack notification). Even if you return to A in 20 seconds, a cognitive trace of 'Task B' stays stuck in your prefrontal cortex, heavily lowering your intelligence quotient for up to 20 minutes.";
        } else if (q.includes('philosoph')) {
          aiResponseText = "Cal Newport defines four philosophies of focus: (a) Monastic (full digital isolation for months), (b) Bimodal (secluding days of the week), (c) Rhythmic (fixed daily 90-minute morning slots), and (d) Journalistic. For busy professionals, the Rhythmic philosophy (e.g. daily 7:00 AM to 8:30 AM undistracted blocks) is the most sustainable.";
        } else if (q.includes('scroll') || q.includes('bored')) {
          aiResponseText = "To train your focus muscles, Newport argues we must embrace systematic boredom. If your brain is trained to receive cheap dopamine scrolls every single minute you wait in a supermarket line, you render your neural pathways incapable of deep cognitive stamina when hard problems surface.";
        }
      }

      if (book.id === 'psychology_of_money') {
        if (q.includes('rich') || q.includes('wealth')) {
          aiResponseText = "Morgan Housel warns that 'Rich' is your current active cash inflow—visible in expensive leased sports cars and luxury items. 'Wealth' is the money saved, investments left untouched, and options unspent. Rich is showing off; Wealth is the options and sovereignty to control your time.";
        } else if (q.includes('buffer') || q.includes('cash')) {
          aiResponseText = "Housel states that holding logical plans for your plan not going according to plan is the ultimate rule of compound survival. Cash buffers are not inefficient dry powder; they represent the insurance premium that prevents you from panic-liquidating stocks during cyclical economic market corrections.";
        }
      }

      const aiMsg: ChatMessage = {
        sender: 'assistant',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatHistory(prev => [...prev, aiMsg]);
      
      // Auto trigger progress tracking increments when user interacts with book details
      if (onIncrementProgress) {
        onIncrementProgress();
      }
    }, 850);
  };

  const currentQuestions = SUGGESTED_QUESTIONS[book.id] || [
    `How do I apply ${book.title}'s core principle today?`,
    `What is a real story or example described in ${book.title}?`,
    `What is the contrarian view of ${book.author}'s work?`
  ];

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition select-none cursor-pointer"
      >
        <ChevronLeft size={16} />
        <span>Back to Feed</span>
      </button>

      {/* Grid structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cover, Progress, speech element player */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className={`h-48 rounded-xl bg-gradient-to-br ${book.coverGradient} flex flex-col justify-end p-5 text-white shadow-inner relative overflow-hidden group`}>
              <div className="absolute right-4 top-4 bg-white/25 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase">
                {book.category}
              </div>
              <h2 className="text-2xl font-black font-display drop-shadow leading-none">{book.title}</h2>
              <span className="text-sm font-mono text-white/80 mt-1 block">{book.author}</span>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-semibold text-slate-400 font-mono tracking-wider uppercase">Book Overview</span>
              <p className="text-sm font-semibold text-slate-800 leading-snug">{book.overallAim}</p>
              <div className="pt-2 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500 font-mono">
                <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 font-bold uppercase">{book.level}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {book.timeToFinish}
                </span>
              </div>
            </div>
          </div>

          {/* Core Interactive TTS Speech Module */}
          <AudioPlayer 
            book={book} 
            onFinishedReading={() => {
              if (onMarkReadDay) onMarkReadDay();
            }} 
          />
        </div>

        {/* Right Column: Key takeaways summary & interactive AI Ask assist */}
        <div className="lg:col-span-7 space-y-6">
          {/* Summary toggle tab */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex bg-slate-100 p-1 rounded-xl w-fit gap-1 text-sm font-medium">
              <button
                onClick={() => setActiveTab('1min')}
                className={`px-4 py-2 rounded-lg transition text-xs font-semibold cursor-pointer ${
                  activeTab === '1min' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-505 text-slate-500 hover:text-slate-750'
                }`}
              >
                1-Min Highlights
              </button>
              <button
                onClick={() => setActiveTab('5min')}
                className={`px-4 py-2 rounded-lg transition text-xs font-semibold cursor-pointer ${
                  activeTab === '5min' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-505 text-slate-500 hover:text-slate-750'
                }`}
              >
                5-Min Executive Chapter Digest
              </button>
            </div>

            {/* Render selected tabs */}
            {activeTab === '1min' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <ul className="space-y-3.5">
                  {book.summary1Min.map((bullet, i) => (
                    <li key={i} className="flex gap-2.5 items-start text-sm text-slate-650 leading-relaxed text-slate-600">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <hr className="border-slate-100" />

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-slate-400 font-mono tracking-wider uppercase">Action takeaways of '{book.title}'</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {book.insights.map((ins, i) => (
                      <div key={i} className="bg-indigo-50/20 p-3 rounded-xl border border-indigo-100/30 text-xs">
                        <span className="font-extrabold text-[10px] font-mono text-indigo-700 block mb-1">Takeaway #{i+1}</span>
                        <p className="text-slate-700 font-medium leading-relaxed">{ins}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                {book.summary5Min.map((block, i) => (
                  <div key={i} className="space-y-2 border-b border-dashed border-slate-200/60 pb-3 last:border-0 last:pb-0">
                    <h4 className="font-bold text-sm text-indigo-950 font-display">{block.chapter}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{block.text}</p>
                    <div className="bg-slate-50 p-2.5 rounded-lg text-[11px] text-slate-700 font-semibold border border-slate-100">
                      🎯 Action point: {block.takeaway}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* AI Interactive Chat Assistant "Ask this book" */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-slate-905 text-slate-900 font-display flex items-center gap-1.5">
                <Sparkles size={16} className="text-indigo-600" />
                <span>Contextual Book Chat Bot</span>
              </h3>
              <p className="text-slate-405 text-slate-400 text-xs">Ask specific application queries and receive diagnostic contextual non-fiction responses.</p>
            </div>

            {/* Chat Box contents */}
            <div className="bg-slate-900 text-slate-200 rounded-xl p-4 h-48 overflow-y-auto border border-slate-800 space-y-3.5 text-xs">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-755/60 border-slate-800/80 shadow-md whitespace-pre-line'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Presets Row */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Suggested Queries</span>
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                {currentQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAskQuestion(q)}
                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-medium rounded-lg px-2.5 py-1.5 transition text-left shrink-0 max-w-full truncate cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Form input slot */}
            <div className="flex gap-2.5">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask e.g. How does Cal Newport overcome fatigue?"
                onKeyDown={(e) => { if (e.key === 'Enter') handleAskQuestion(chatInput); }}
                className="flex-1 bg-slate-50 hover:bg-slate-50/50 border border-slate-200 rounded-xl text-xs text-slate-800 px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-650"
              />
              <button
                onClick={() => handleAskQuestion(chatInput)}
                className="px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer select-none"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
