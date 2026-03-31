import React, { useState, useMemo, useEffect } from 'react';
import { documentData, Question, Section } from './data';
import { Search, Download, BookOpen, Star, RefreshCw, FileText, X, Mic, Volume2, Eye, EyeOff, Highlighter, ListPlus, BrainCircuit, ListMusic } from 'lucide-react';
import { PdfDocument } from './components/PdfDocument';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { useLocalStorage } from './store';
import { Pomodoro } from './components/Pomodoro';
import { Chatbot } from './components/Chatbot';
import { FlashcardMode } from './components/FlashcardMode';
import { Dashboard } from './components/Dashboard';
import { Playlists, Playlist } from './components/Playlists';
import { QuizMode } from './components/QuizMode';

const PriorityStars = ({ priority }: { priority: number }) => {
  return (
    <div className="flex space-x-0.5">
      {[...Array(3)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < priority ? "fill-current" : "text-transparent"
          )}
        />
      ))}
    </div>
  );
};

const InteractiveCard: React.FC<{ question: Question; onPrint: (q: Question) => void }> = ({ question, onPrint }) => {
  const appearanceCount = question.papers.length;
  
  const priorityColors = {
    3: "bg-rose-100 text-rose-800 border-rose-200",
    2: "bg-orange-100 text-orange-800 border-orange-200",
    1: "bg-amber-100 text-amber-800 border-amber-200",
  };

  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('physics-bookmarks', []);
  const [playlists, setPlaylists] = useLocalStorage<Playlist[]>('physics-playlists', []);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

  const isBookmarked = bookmarks.includes(question.title);

  const toggleBookmark = () => {
    if (isBookmarked) {
      setBookmarks(bookmarks.filter(b => b !== question.title));
    } else {
      setBookmarks([...bookmarks, question.title]);
    }
  };

  const addToPlaylist = (playlistId: string) => {
    setPlaylists(playlists.map(p => {
      if (p.id === playlistId && !p.questions.includes(question.title)) {
        return { ...p, questions: [...p.questions, question.title] };
      }
      return p;
    }));
    setShowPlaylistMenu(false);
  };

  const [showAnswer, setShowAnswer] = useState(true);
  const [highlightMode, setHighlightMode] = useState(false);

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const renderPoint = (point: string) => {
    if (!highlightMode) return point;
    // Simple highlight logic: highlight words longer than 6 chars or specific keywords
    const keywords = ['velocity', 'frequency', 'wavelength', 'amplitude', 'diffraction', 'interference', 'polarization', 'reflection', 'refraction', 'transducer', 'microphone', 'loudspeaker'];
    const words = point.split(' ');
    return words.map((word, i) => {
      const cleanWord = word.replace(/[.,()]/g, '').toLowerCase();
      if (keywords.includes(cleanWord) || cleanWord.length > 8) {
        return <mark key={i} className="bg-yellow-200 rounded px-1">{word}</mark>;
      }
      return word + ' ';
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all relative"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-snug flex-1 pr-24 relative">
          {question.title}
          <div className="absolute top-0 right-0 flex items-center gap-1">
            <button 
              onClick={() => onPrint(question)}
              className="p-1 text-slate-400 hover:text-violet-500 transition-colors"
              title="Download PDF"
            >
              <Download className="w-5 h-5" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
                className="p-1 text-slate-400 hover:text-violet-500 transition-colors"
                title="Add to Playlist"
              >
                <ListPlus className="w-5 h-5" />
              </button>
              {showPlaylistMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-10 py-1">
                  {playlists.length === 0 ? (
                    <div className="px-4 py-2 text-sm text-slate-500">No playlists yet</div>
                  ) : (
                    playlists.map(p => (
                      <button
                        key={p.id}
                        onClick={() => addToPlaylist(p.id)}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                      >
                        {p.name}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
            <button 
              onClick={toggleBookmark}
              className="p-1 text-slate-400 hover:text-amber-500 transition-colors"
              title="Bookmark"
            >
              <Star className={cn("w-5 h-5", isBookmarked && "fill-amber-500 text-amber-500")} />
            </button>
          </div>
        </h3>
        <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
          <span className="bg-violet-100 text-violet-800 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap flex items-center">
            <FileText className="w-3 h-3 mr-1.5" />
            Appeared {appearanceCount} {appearanceCount === 1 ? 'time' : 'times'}
          </span>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
            Papers: {question.papers.join(', ')}
          </span>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <div className={cn("flex items-center px-2.5 py-1 rounded-md text-xs font-bold border", priorityColors[question.priority as keyof typeof priorityColors])}>
          <PriorityStars priority={question.priority} />
          <span className="ml-1.5">
            {question.priority === 3 ? 'MUST STUDY' : question.priority === 2 ? 'SHOULD STUDY' : 'IF TIME PERMITS'}
          </span>
        </div>
        
        <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-200">
          {question.marks}
        </span>

        {question.recycled && (
          <span className="flex items-center text-xs font-bold uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md text-emerald-700 border border-emerald-200">
            <RefreshCw className="w-3 h-3 mr-1.5" />
            Recycled
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <button onClick={() => setShowAnswer(!showAnswer)} className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
          {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showAnswer ? 'Hide Answer' : 'Show Answer'}</span>
        </button>
        <button onClick={() => setHighlightMode(!highlightMode)} className={cn("flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors", highlightMode ? "bg-yellow-100 text-yellow-800" : "bg-slate-100 text-slate-600 hover:bg-slate-200")}>
          <Highlighter className="w-4 h-4" />
          <span>Highlight</span>
        </button>
        <button onClick={() => speak(question.points.join('. '))} className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
          <Volume2 className="w-4 h-4" />
          <span>Listen</span>
        </button>
      </div>

      <AnimatePresence>
        {showAnswer && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 bg-slate-50 rounded-2xl p-5 border border-slate-100 overflow-hidden"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Key Points to Cover:</p>
            <ul className="space-y-2.5">
              {question.points.map((point, idx) => (
                <li key={idx} className="flex items-start text-sm text-slate-700 leading-relaxed">
                  <div className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                  <span>{renderPoint(point)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [viewMode, setViewMode] = useState<'interactive' | 'print'>('interactive');
  const [printData, setPrintData] = useState<{ title: string; subtitle?: string; description?: string; sections: Section[] } | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'browse' | 'flashcards' | 'dashboard' | 'playlists' | 'quiz'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);

  const [, setTimeSpent] = useLocalStorage<number>('physics-time', 0);

  // Time tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(t => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setTimeSpent]);

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in your browser.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const filteredSections = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return documentData.sections.map(section => {
      const filteredQs = section.questions.filter(q => {
        const matchesSearch = !searchQuery.trim() || 
          q.title.toLowerCase().includes(lowerQuery) ||
          q.points.some(p => p.toLowerCase().includes(lowerQuery)) ||
          q.papers.some(p => p.toLowerCase().includes(lowerQuery));
        
        const matchesDifficulty = difficultyFilter === null || q.priority === difficultyFilter;

        return matchesSearch && matchesDifficulty;
      });
      return { ...section, questions: filteredQs };
    }).filter(section => section.questions.length > 0);
  }, [searchQuery, difficultyFilter]);

  const totalFilteredQuestions = filteredSections.reduce((acc, section) => acc + section.questions.length, 0);

  const handlePrintFull = () => {
    setPrintData(undefined);
    setViewMode('print');
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handlePrintSection = (section: Section) => {
    setPrintData({
      title: section.title,
      subtitle: "Topic Study Guide",
      sections: [section]
    });
    setViewMode('print');
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handlePrintQuestion = (question: Question) => {
    setPrintData({
      title: "Question Study Guide",
      sections: [{ title: "Selected Question", questions: [question] }]
    });
    setViewMode('print');
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handlePrintPlaylist = (playlist: Playlist) => {
    const questions: Question[] = [];
    for (const section of documentData.sections) {
      for (const q of section.questions) {
        if (playlist.questions.includes(q.title)) {
          questions.push(q);
        }
      }
    }
    
    setPrintData({
      title: playlist.name,
      subtitle: "Custom Playlist Study Guide",
      sections: [{ title: "Playlist Questions", questions }]
    });
    setViewMode('print');
    setTimeout(() => {
      window.print();
    }, 100);
  };

  if (viewMode === 'print') {
    return (
      <div className="min-h-screen bg-slate-100 font-sans">
        <div className="fixed top-4 right-4 z-50 print:hidden">
          <button
            onClick={() => setViewMode('interactive')}
            className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium shadow-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Close Print View</span>
          </button>
        </div>
        <PdfDocument data={printData} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-violet-200 selection:text-violet-900 pb-24">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shadow-inner">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg hidden sm:block">Physics II Explorer</span>
          </div>
          
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar">
            <button onClick={() => setActiveTab('browse')} className={cn("px-3 py-1.5 rounded-lg font-bold text-sm transition-colors whitespace-nowrap", activeTab === 'browse' ? "bg-violet-100 text-violet-700" : "text-slate-500 hover:bg-slate-100")}>Browse</button>
            <button onClick={() => setActiveTab('flashcards')} className={cn("px-3 py-1.5 rounded-lg font-bold text-sm transition-colors whitespace-nowrap", activeTab === 'flashcards' ? "bg-violet-100 text-violet-700" : "text-slate-500 hover:bg-slate-100")}>Flashcards</button>
            <button onClick={() => setActiveTab('quiz')} className={cn("px-3 py-1.5 rounded-lg font-bold text-sm transition-colors whitespace-nowrap", activeTab === 'quiz' ? "bg-violet-100 text-violet-700" : "text-slate-500 hover:bg-slate-100")}>Quizzes</button>
            <button onClick={() => setActiveTab('playlists')} className={cn("px-3 py-1.5 rounded-lg font-bold text-sm transition-colors whitespace-nowrap", activeTab === 'playlists' ? "bg-violet-100 text-violet-700" : "text-slate-500 hover:bg-slate-100")}>Playlists</button>
            <button onClick={() => setActiveTab('dashboard')} className={cn("px-3 py-1.5 rounded-lg font-bold text-sm transition-colors whitespace-nowrap", activeTab === 'dashboard' ? "bg-violet-100 text-violet-700" : "text-slate-500 hover:bg-slate-100")}>Dashboard</button>
          </div>

          <div className="flex items-center shrink-0 space-x-4">
            <Pomodoro />
            <button
              onClick={handlePrintFull}
              className="hidden lg:flex items-center space-x-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl font-medium transition-all shadow-sm hover:shadow"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'flashcards' && <FlashcardMode />}
        {activeTab === 'playlists' && <Playlists onPrintPlaylist={handlePrintPlaylist} />}
        {activeTab === 'quiz' && <QuizMode />}
        
        {activeTab === 'browse' && (
          <>
            {/* Search & Filters */}
            <div className="mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-11 pr-24 py-3.5 border border-slate-300 rounded-2xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm transition-all shadow-sm"
                    placeholder="Search questions, topics, or papers (e.g., 'Doppler', 'P3')..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center space-x-1">
                    <button 
                      onClick={handleVoiceSearch}
                      className={cn("p-2 rounded-xl transition-colors", isListening ? "bg-rose-100 text-rose-600 animate-pulse" : "text-slate-400 hover:text-violet-600 hover:bg-violet-50")}
                      title="Voice Search"
                    >
                      <Mic className="h-4 w-4" />
                    </button>
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
                  <button onClick={() => setDifficultyFilter(null)} className={cn("px-4 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-colors", difficultyFilter === null ? "bg-slate-800 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50")}>All</button>
                  <button onClick={() => setDifficultyFilter(3)} className={cn("px-4 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-colors", difficultyFilter === 3 ? "bg-rose-600 text-white" : "bg-white border border-slate-200 text-rose-700 hover:bg-rose-50")}>Must Study</button>
                  <button onClick={() => setDifficultyFilter(2)} className={cn("px-4 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-colors", difficultyFilter === 2 ? "bg-orange-500 text-white" : "bg-white border border-slate-200 text-orange-700 hover:bg-orange-50")}>Should Study</button>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-12">
              <AnimatePresence mode="popLayout">
                {filteredSections.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                      <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">No questions found</h3>
                    <p className="text-slate-500">Try adjusting your search terms or clear the filter.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setDifficultyFilter(null); }}
                      className="mt-4 text-violet-600 font-medium hover:text-violet-700"
                    >
                      Clear all filters
                    </button>
                  </motion.div>
                ) : (
                  filteredSections.map((section, sIdx) => (
                    <motion.section 
                      key={section.title}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="scroll-mt-24"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-1.5 h-6 bg-violet-600 rounded-full" />
                          <h2 className="text-2xl font-bold text-slate-800">{section.title}</h2>
                          <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-full">
                            {section.questions.length}
                          </span>
                        </div>
                        <button
                          onClick={() => handlePrintSection(section)}
                          className="flex items-center space-x-1.5 text-sm font-bold text-violet-600 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span className="hidden sm:inline">Download Topic</span>
                        </button>
                      </div>
                      
                      <div className="grid gap-6">
                        <AnimatePresence mode="popLayout">
                          {section.questions.map((question, qIdx) => (
                            <InteractiveCard key={`${section.title}-${qIdx}`} question={question} onPrint={handlePrintQuestion} />
                          ))}
                        </AnimatePresence>
                      </div>
                    </motion.section>
                  ))
                )}
              </AnimatePresence>
            </div>
          </>
        )}
      </main>

      <Chatbot />
    </div>
  );
}
