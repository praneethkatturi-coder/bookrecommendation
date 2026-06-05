export type ReadingLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type LibraryStatus = 'Want to Read' | 'Reading' | 'Completed';
export type PreferredFormat = 'Read' | 'Listen' | 'Both';

export interface UserProfile {
  level: ReadingLevel;
  goals: string;
  format: PreferredFormat;
  time: string;
  persona: string;
  interests: string[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  category: string;
  level: ReadingLevel;
  timeToFinish: string;
  rating: number;
  difficultyLabel: string;
  coverGradient: string;
  outcome: string;
  overallAim: string;
  summary1Min: string[];
  summary5Min: {
    chapter: string;
    text: string;
    takeaway: string;
  }[];
  insights: string[];
  audioScript: string;
  audioDuration: string; // e.g., "12:04"
  audioDurationSeconds: number; // e.g. 724
  baselineReason: string;
}

export interface UserBookState {
  bookId: string;
  status: LibraryStatus;
  progress: number;
  priorityScore: number;
  addedAt: string;
  notes: string[];
  rating?: number;
}

export interface PromptHistoryItem {
  id: string;
  prompt: string;
  timestamp: string;
  recommendationIds: string[];
  refinement?: string;
}

export interface ChatMessage {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface BookChatHistory {
  [bookId: string]: ChatMessage[];
}
