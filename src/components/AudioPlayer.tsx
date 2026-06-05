import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, FastForward, Headphones, Sparkles, AlertCircle } from 'lucide-react';
import { Book } from '../types';

interface AudioPlayerProps {
  book: Book;
  onFinishedReading?: () => void;
}

export default function AudioPlayer({ book, onFinishedReading }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentTime, setCurrentTime] = useState(0); // in seconds
  const [playbackRate, setPlaybackRate] = useState(1); // 0.75, 1, 1.25, 1.5, 2
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const [speechSupported, setSpeechSupported] = useState(true);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);
  const durationSecondsRef = useRef<number>(book.audioDurationSeconds);

  // Split script into beautiful small sentences for the scrolling transcript
  const sentencesRef = useRef<string[]>([]);
  if (sentencesRef.current.length === 0) {
    sentencesRef.current = book.audioScript
      .split(/(?<=[.!?])\s+/)
      .filter(s => s.trim().length > 0);
  }

  // Reload voices on mount and voice change
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
      const updateVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        // Filter to English or standard high quality voices
        const englishVoices = availableVoices.filter(v => v.lang.toLowerCase().includes('en'));
        setVoices(englishVoices.length > 0 ? englishVoices : availableVoices);
        
        // Select a default voice like Google US English or standard female/male English if possible
        if (englishVoices.length > 0) {
          const defaultVoice = englishVoices.find(v => v.name.includes('Google') || v.name.includes('Natural')) || englishVoices[0];
          setSelectedVoiceName(defaultVoice.name);
        } else if (availableVoices.length > 0) {
          setSelectedVoiceName(availableVoices[0].name);
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    } else {
      setSpeechSupported(false);
    }

    // Clean up speaking when leaving
    return () => {
      stopSpeech();
    };
  }, [book.id]);

  useEffect(() => {
    sentencesRef.current = book.audioScript
      .split(/(?<=[.!?])\s+/)
      .filter(s => s.trim().length > 0);
    stopSpeech();
  }, [book.id, book.audioScript]);

  // Keep track of current speaking timer
  useEffect(() => {
    if (isPlaying && !isPaused) {
      const interval = 100 / playbackRate; // Speed up tick frequency based on playbackRate
      timerRef.current = window.setInterval(() => {
        setCurrentTime(prevTime => {
          const nextTime = prevTime + 0.1 * playbackRate;
          if (nextTime >= durationSecondsRef.current) {
            handleSpeechEnd();
            return durationSecondsRef.current;
          }
          
          // Calculate active sentence based on proportion of text spoken
          const progressPercent = nextTime / durationSecondsRef.current;
          const sentenceCount = sentencesRef.current.length;
          const currentSentenceIdx = Math.min(
            Math.floor(progressPercent * sentenceCount),
            sentenceCount - 1
          );
          setActiveSentenceIndex(currentSentenceIdx);
          setProgress(progressPercent * 100);
          
          return nextTime;
        });
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isPaused, playbackRate]);

  const startSpeech = () => {
    if (!speechSupported) return;

    // Stop current
    window.speechSynthesis.cancel();

    const textToSpeak = book.audioScript;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    // Configure voice
    if (selectedVoiceName) {
      const voiceObj = voices.find(v => v.name === selectedVoiceName);
      if (voiceObj) {
        utterance.voice = voiceObj;
      }
    }

    // Config parameters
    utterance.rate = playbackRate * 0.95; // Slightly fine-tune for better natural cadence
    utterance.pitch = 1.0;

    // Utterance boundary event tracking (fallback update trigger)
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        const totalChars = textToSpeak.length;
        const textPercent = charIndex / totalChars;
        
        // Dynamically align index
        const index = Math.min(
          Math.floor(textPercent * sentencesRef.current.length),
          sentencesRef.current.length - 1
        );
        setActiveSentenceIndex(index);
      }
    };

    utterance.onend = () => {
      handleSpeechEnd();
    };

    utterance.onerror = (e) => {
      console.log('Speech error:', e);
      // Don't treat intermittent cancellations as failure
      if (e.error !== 'interrupted') {
        setIsPlaying(false);
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    
    setIsPlaying(true);
    setIsPaused(false);
  };

  const pauseSpeech = () => {
    if (!speechSupported) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resumeSpeech = () => {
    if (!speechSupported) return;
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      startSpeech();
    }
  };

  const stopSpeech = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (speechSupported) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    setCurrentTime(0);
    setActiveSentenceIndex(0);
  };

  const handleSpeechEnd = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(100);
    setCurrentTime(durationSecondsRef.current);
    setActiveSentenceIndex(sentencesRef.current.length - 1);
    if (onFinishedReading) {
      onFinishedReading();
    }
  };

  const changeRate = (newRate: number) => {
    setPlaybackRate(newRate);
    if (isPlaying) {
      // Re-initialize speech to apply rate change immediately
      const savedTimeRatio = progress / 100;
      startSpeech();
      // Fast-forward simulated clock to previous state
      const targetTime = savedTimeRatio * durationSecondsRef.current;
      setCurrentTime(targetTime);
      setProgress(savedTimeRatio * 100);
    }
  };

  const formatSeconds = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = Math.floor(totalSec % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-wider">
          <Headphones size={15} />
          <span>AI Audio Summary</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles size={13} className="text-amber-400 animate-pulse" />
          <span>Natural Voice Simulation</span>
        </div>
      </div>

      {speechSupported ? (
        <div className="space-y-5">
          {/* Cover Placeholder & Dynamic Audio Wave */}
          <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800/60">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${book.coverGradient} flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-md`}>
              {book.title.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="font-semibold text-sm text-slate-150 truncate leading-snug">{book.title}</h4>
              <p className="text-xs text-slate-400 truncate">{book.author}</p>
            </div>
            
            {/* Pulsing Visual Waveform */}
            <div className="flex items-end justify-center gap-0.5 h-6 w-12 px-1">
              {[0.4, 0.9, 0.5, 0.75, 0.3, 0.8].map((val, i) => (
                <div
                  key={i}
                  className={`w-1 bg-gradient-to-t from-indigo-500 to-sky-400 rounded-full transition-all duration-300`}
                  style={{
                    height: isPlaying && !isPaused ? `${val * 100}%` : '15%',
                    animation: isPlaying && !isPaused ? `pulse 1.2s infinite ease-in-out` : 'none',
                    animationDelay: `${i * 0.15}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Scrolling Interactive Transcript */}
          <div className="h-28 overflow-y-auto bg-slate-950 p-4 rounded-xl text-sm border border-slate-800/80 leading-relaxed scroll-smooth text-slate-300">
            {sentencesRef.current.map((sentence, idx) => {
              const isActive = idx === activeSentenceIndex && isPlaying;
              return (
                <span
                  key={idx}
                  className={`transition-all duration-300 inline mr-2 px-1 rounded cursor-pointer ${
                    isActive 
                      ? 'bg-indigo-900/80 text-white font-medium border-l-2 border-indigo-400 shadow-sm shadow-indigo-950 scale-102 inline-block' 
                      : idx < activeSentenceIndex && isPlaying
                        ? 'text-slate-500 line-through/none decoration-slate-600 opacity-60'
                        : 'text-slate-400 hover:text-slate-300'
                  }`}
                  onClick={() => {
                    // Quick seek
                    const ratio = idx / sentencesRef.current.length;
                    const targetTime = ratio * durationSecondsRef.current;
                    setProgress(ratio * 100);
                    setCurrentTime(targetTime);
                    setActiveSentenceIndex(idx);
                    if (isPlaying) {
                      startSpeech();
                    }
                  }}
                >
                  {sentence}
                </span>
              );
            })}
          </div>

          {/* Timeline slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-1.5">
              <span>{formatSeconds(currentTime)}</span>
              <span>{formatSeconds(durationSecondsRef.current)}</span>
            </div>
            <div className="relative group cursor-pointer">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setProgress(val);
                  const targetTime = (val / 100) * durationSecondsRef.current;
                  setCurrentTime(targetTime);
                  // Approximate active sentence
                  const activeIdx = Math.min(
                    Math.floor((val / 100) * sentencesRef.current.length),
                    sentencesRef.current.length - 1
                  );
                  setActiveSentenceIndex(activeIdx);
                  if (isPlaying) {
                    // Restart speech from this approximate percent
                    startSpeech();
                  }
                }}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 group-hover:bg-slate-700 transition"
              />
            </div>
          </div>

          {/* Action Panel: Play, speed, voice */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
            {/* Control Buttons */}
            <div className="flex items-center justify-center sm:justify-start gap-3">
              {isPlaying && !isPaused ? (
                <button
                  onClick={pauseSpeech}
                  className="w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 hover:scale-105 active:scale-95 transition flex items-center justify-center group shadow-md"
                  title="Pause Summary"
                >
                  <Pause size={18} className="text-slate-200 fill-slate-200" />
                </button>
              ) : (
                <button
                  onClick={resumeSpeech}
                  className="w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-500 hover:scale-105 active:scale-95 transition flex items-center justify-center group shadow-lg shadow-indigo-950/40"
                  title="Play Summary Out Loud"
                >
                  <Play size={18} className="translate-x-0.5 text-white fill-white" />
                </button>
              )}

              {(isPlaying || isPaused) && (
                <button
                  onClick={stopSpeech}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-red-900/40 hover:text-red-400 hover:scale-105 active:scale-95 transition flex items-center justify-center"
                  title="Restart / Stop"
                >
                  <Square size={13} className="text-slate-350 fill-current" />
                </button>
              )}
            </div>

            {/* Speeds and Voice selections */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Playback speed selector */}
              <div className="flex bg-slate-950 border border-slate-800 p-0.5 rounded-lg text-xs font-mono">
                {[0.75, 1, 1.25, 1.5, 2].map(speed => (
                  <button
                    key={speed}
                    onClick={() => changeRate(speed)}
                    className={`px-2 py-1 rounded transition ${
                      playbackRate === speed
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>

              {/* Voice selector */}
              {voices.length > 0 && (
                <select
                  value={selectedVoiceName}
                  onChange={(e) => {
                    setSelectedVoiceName(e.target.value);
                    if (isPlaying) {
                      // Apply immediately
                      setTimeout(() => startSpeech(), 100);
                    }
                  }}
                  className="bg-slate-950 border border-slate-800 rounded-lg text-xs py-1.5 px-2.5 max-w-[160px] text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  {voices.map(voice => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name.replace(/Microsoft|Google|Apple/g, '').trim()} ({voice.lang.split('-')[0].toUpperCase()})
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-amber-950/20 text-amber-300 border border-amber-900/50 rounded-xl flex gap-3 text-xs">
          <AlertCircle size={20} className="shrink-0 text-amber-400" />
          <div>
            <p className="font-semibold mb-1">Web Speech Synthesis Unsupported</p>
            <p className="opacity-80 leading-normal">Your browser does not support full TTS audio. We will simulate the playback timeline on screen, but audio will remain disabled.</p>
          </div>
        </div>
      )}
    </div>
  );
}
