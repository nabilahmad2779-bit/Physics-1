import React, { useState, useMemo } from 'react';
import { documentData, Question } from '../data';
import { useLocalStorage } from '../store';
import { BrainCircuit, Volume2, Plus, X, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface CustomFlashcard {
  id: string;
  questionTitle: string;
  frontText: string;
  backText: string;
}

interface FlashcardModeProps {
  initialQuestion?: Question | null;
  onCloseCreator?: () => void;
}

export const FlashcardMode: React.FC<FlashcardModeProps> = ({ initialQuestion, onCloseCreator }) => {
  const [srsData, setSrsData] = useLocalStorage<Record<string, { nextReview: number, interval: number, ease: number }>>('physics-srs', {});
  const [customCards, setCustomCards] = useLocalStorage<CustomFlashcard[]>('physics-custom-cards', []);
  
  const allQuestions = useMemo(() => documentData.sections.flatMap(s => s.questions), []);
  
  // Combine standard questions and custom cards for review
  const allReviewItems = useMemo(() => {
    const items: { id: string, title: string, points: string[], isCustom: boolean }[] = [
      ...allQuestions.map(q => ({ id: q.title, title: q.title, points: q.points, isCustom: false })),
      ...customCards.map(c => ({ id: c.id, title: c.frontText, points: [c.backText], isCustom: true }))
    ];
    return items;
  }, [allQuestions, customCards]);

  const dueQuestions = useMemo(() => {
    const now = Date.now();
    return allReviewItems.filter(q => {
      const data = srsData[q.id];
      if (!data) return true; // Never reviewed
      return data.nextReview <= now;
    });
  }, [allReviewItems, srsData]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCreator, setShowCreator] = useState(!!initialQuestion);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(initialQuestion || null);
  const [customFront, setCustomFront] = useState(initialQuestion ? `Part of: ${initialQuestion.title}` : '');
  const [customBack, setCustomBack] = useState('');

  // Handle prop changes
  React.useEffect(() => {
    if (initialQuestion) {
      setShowCreator(true);
      setSelectedQuestion(initialQuestion);
      setCustomFront(`Part of: ${initialQuestion.title}`);
    }
  }, [initialQuestion]);

  const currentQ = dueQuestions[currentIndex];

  const handleRate = (quality: number) => {
    if (!currentQ) return;
    
    const data = srsData[currentQ.id] || { interval: 0, ease: 2.5 };
    let { interval, ease } = data;

    if (quality === 0) {
      interval = 0;
      ease = Math.max(1.3, ease - 0.2);
    } else {
      if (interval === 0) interval = 1;
      else if (interval === 1) interval = 6;
      else interval = Math.round(interval * ease);
      
      if (quality === 2) ease += 0.15; // Easy
      if (quality === 1) ease -= 0.15; // Hard
    }

    const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;

    setSrsData(prev => ({
      ...prev,
      [currentQ.id]: { nextReview, interval, ease }
    }));

    setIsFlipped(false);
    if (currentIndex >= dueQuestions.length - 1) {
      setCurrentIndex(0);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const [selectedPoints, setSelectedPoints] = useState<number[]>([]);

  // Update customBack when selectedPoints changes
  React.useEffect(() => {
    if (selectedQuestion) {
      const newBack = selectedPoints
        .sort((a, b) => a - b)
        .map(i => selectedQuestion.points[i])
        .join('\n\n');
      setCustomBack(newBack);
    }
  }, [selectedPoints, selectedQuestion]);

  const togglePoint = (index: number) => {
    setSelectedPoints(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const handleCreateCustomCard = () => {
    if (!selectedQuestion || !customFront.trim() || !customBack.trim()) return;
    
    const newCard: CustomFlashcard = {
      id: `custom-${Date.now()}`,
      questionTitle: selectedQuestion.title,
      frontText: customFront,
      backText: customBack
    };
    
    setCustomCards([...customCards, newCard]);
    setCustomFront('');
    setCustomBack('');
    setSelectedPoints([]);
    setShowCreator(false);
    setSelectedQuestion(null);
    if (onCloseCreator) onCloseCreator();
  };

  const handleCloseCreator = () => {
    setShowCreator(false);
    setSelectedPoints([]);
    if (onCloseCreator) onCloseCreator();
  };

  if (showCreator) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center">
              <Layers className="w-6 h-6 mr-2 text-violet-500" />
              Create Custom Flashcard
            </h2>
            <button onClick={handleCloseCreator} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Select Source Question</label>
              <select 
                className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                value={selectedQuestion?.title || ''}
                onChange={(e) => {
                  const q = allQuestions.find(q => q.title === e.target.value);
                  setSelectedQuestion(q || null);
                  setSelectedPoints([]);
                  if (q) {
                    setCustomFront(`Part of: ${q.title}`);
                  } else {
                    setCustomFront('');
                  }
                }}
              >
                <option value="">-- Select a question --</option>
                {allQuestions.map(q => (
                  <option key={q.title} value={q.title}>{q.title}</option>
                ))}
              </select>
            </div>

            {selectedQuestion && (
              <div className="bg-violet-50 p-4 rounded-xl border border-violet-100">
                <p className="text-sm font-bold text-violet-800 mb-3">Select Points for the Answer:</p>
                <ul className="space-y-2">
                  {selectedQuestion.points.map((pt, i) => {
                    const isSelected = selectedPoints.includes(i);
                    return (
                      <li 
                        key={i} 
                        onClick={() => togglePoint(i)}
                        className={cn(
                          "text-sm p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-3",
                          isSelected 
                            ? "bg-violet-600 text-white border-violet-700 shadow-sm" 
                            : "bg-white text-slate-700 border-violet-200 hover:bg-violet-100 hover:border-violet-300"
                        )}
                      >
                        <div className={cn(
                          "w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5",
                          isSelected ? "bg-white border-white text-violet-600" : "bg-white border-slate-300"
                        )}>
                          {isSelected && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Front of Card (Question/Prompt)</label>
              <textarea 
                rows={3}
                className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all resize-none"
                placeholder="e.g., Derive the differential equation..."
                value={customFront}
                onChange={(e) => setCustomFront(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Back of Card (Answer)</label>
              <textarea 
                rows={4}
                className="w-full p-3 border border-slate-300 rounded-xl bg-slate-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all resize-none"
                placeholder="The answer goes here..."
                value={customBack}
                onChange={(e) => setCustomBack(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-2">You can manually edit the answer above if needed.</p>
            </div>

            <button 
              onClick={handleCreateCustomCard}
              disabled={!selectedQuestion || !customFront.trim() || !customBack.trim()}
              className="w-full py-4 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Save Custom Flashcard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (dueQuestions.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto">
        <BrainCircuit className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">All caught up!</h2>
        <p className="text-slate-500 mt-2 mb-8">You have reviewed all due flashcards. Check back later.</p>
        <button 
          onClick={() => setShowCreator(true)}
          className="inline-flex items-center px-6 py-3 bg-violet-100 text-violet-700 font-bold rounded-xl hover:bg-violet-200 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Custom Flashcard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-6 flex justify-between items-center">
        <div className="text-sm font-bold text-slate-500">
          <span>Card {currentIndex + 1} of {dueQuestions.length}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-bold">Spaced Repetition</span>
          <button 
            onClick={() => setShowCreator(true)}
            className="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
            title="Create Custom Card"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative h-[450px] perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id + (isFlipped ? '-back' : '-front')}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0, scale: 0.9 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
            className={cn(
              "absolute inset-0 rounded-3xl shadow-2xl border p-8 flex flex-col justify-center items-center text-center cursor-pointer transform-gpu",
              currentQ.isCustom ? "bg-gradient-to-br from-indigo-50 to-violet-100 border-indigo-200" : "bg-gradient-to-br from-white to-slate-50 border-slate-200"
            )}
            onClick={() => !isFlipped && setIsFlipped(true)}
          >
            {!isFlipped ? (
              <>
                {currentQ.isCustom && (
                  <span className="absolute top-6 left-6 text-xs font-bold uppercase tracking-wider text-indigo-600 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm">
                    Custom Card
                  </span>
                )}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
                    {currentQ.title}
                  </h3>
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 8, 0], scale: [1, 1.05, 1] }} 
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="text-violet-500 font-bold bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full mt-auto shadow-sm border border-violet-100 flex items-center gap-2"
                >
                  <BrainCircuit className="w-4 h-4" />
                  Tap to reveal answer
                </motion.div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col text-left overflow-y-auto no-scrollbar">
                <div className="flex justify-between items-start mb-6 gap-4 sticky top-0 bg-inherit z-10 pb-2">
                  <h3 className="text-xl font-bold text-slate-800 border-b border-slate-200 pb-2 w-full">{currentQ.title}</h3>
                  <button 
                    onClick={(e) => { e.stopPropagation(); speak(currentQ.points.join('. ')); }} 
                    className="p-2.5 bg-white text-violet-600 rounded-full hover:bg-violet-50 transition-colors shrink-0 shadow-sm border border-slate-100"
                    title="Audio Summary"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <ul className="space-y-5 flex-1 pb-4">
                  {currentQ.points.map((pt, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start text-slate-700 text-lg bg-white/50 p-4 rounded-2xl border border-white/60 shadow-sm"
                    >
                      <div className="mr-4 mt-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 shrink-0 shadow-sm" />
                      <span className="leading-relaxed whitespace-pre-wrap font-medium">{pt}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {isFlipped && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex justify-center gap-4"
        >
          <button onClick={() => handleRate(0)} className="flex-1 max-w-[150px] px-6 py-4 bg-rose-100 text-rose-700 font-bold rounded-2xl hover:bg-rose-200 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-1">
            Again (Hard)
          </button>
          <button onClick={() => handleRate(1)} className="flex-1 max-w-[150px] px-6 py-4 bg-amber-100 text-amber-700 font-bold rounded-2xl hover:bg-amber-200 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-1">
            Good
          </button>
          <button onClick={() => handleRate(2)} className="flex-1 max-w-[150px] px-6 py-4 bg-emerald-100 text-emerald-700 font-bold rounded-2xl hover:bg-emerald-200 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-1">
            Easy
          </button>
        </motion.div>
      )}
    </div>
  );
};
