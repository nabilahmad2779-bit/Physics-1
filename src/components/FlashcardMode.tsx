import React, { useState, useMemo } from 'react';
import { documentData, Question } from '../data';
import { useLocalStorage } from '../store';
import { BrainCircuit, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FlashcardMode = () => {
  const [srsData, setSrsData] = useLocalStorage<Record<string, { nextReview: number, interval: number, ease: number }>>('physics-srs', {});
  
  const allQuestions = useMemo(() => documentData.sections.flatMap(s => s.questions), []);
  
  const dueQuestions = useMemo(() => {
    const now = Date.now();
    return allQuestions.filter(q => {
      const data = srsData[q.title];
      if (!data) return true; // Never reviewed
      return data.nextReview <= now;
    });
  }, [allQuestions, srsData]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentQ = dueQuestions[currentIndex];

  const handleRate = (quality: number) => {
    if (!currentQ) return;
    
    const data = srsData[currentQ.title] || { interval: 0, ease: 2.5 };
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
      [currentQ.title]: { nextReview, interval, ease }
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

  if (dueQuestions.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <BrainCircuit className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-800">All caught up!</h2>
        <p className="text-slate-500 mt-2">You have reviewed all due flashcards. Check back later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-6 flex justify-between items-center text-sm font-bold text-slate-500">
        <span>Card {currentIndex + 1} of {dueQuestions.length}</span>
        <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full">Spaced Repetition Mode</span>
      </div>

      <div className="relative h-[400px] perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.title + (isFlipped ? '-back' : '-front')}
            initial={{ rotateX: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white rounded-3xl shadow-xl border border-slate-200 p-8 flex flex-col justify-center items-center text-center cursor-pointer"
            onClick={() => !isFlipped && setIsFlipped(true)}
          >
            {!isFlipped ? (
              <>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 leading-snug">{currentQ.title}</h3>
                <p className="text-slate-400 font-medium bg-slate-50 px-4 py-2 rounded-full">Click to reveal answer</p>
              </>
            ) : (
              <div className="w-full h-full flex flex-col text-left overflow-y-auto">
                <div className="flex justify-between items-start mb-6 gap-4">
                  <h3 className="text-xl font-bold text-slate-800">{currentQ.title}</h3>
                  <button 
                    onClick={(e) => { e.stopPropagation(); speak(currentQ.points.join('. ')); }} 
                    className="p-2.5 bg-violet-100 text-violet-600 rounded-full hover:bg-violet-200 transition-colors shrink-0"
                    title="Audio Summary"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <ul className="space-y-4 flex-1">
                  {currentQ.points.map((pt, i) => (
                    <li key={i} className="flex items-start text-slate-700 text-lg">
                      <div className="mr-4 mt-2 w-2 h-2 rounded-full bg-violet-400 shrink-0" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
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
          <button onClick={() => handleRate(0)} className="flex-1 max-w-[150px] px-6 py-4 bg-rose-100 text-rose-700 font-bold rounded-2xl hover:bg-rose-200 transition-colors">
            Again (Hard)
          </button>
          <button onClick={() => handleRate(1)} className="flex-1 max-w-[150px] px-6 py-4 bg-amber-100 text-amber-700 font-bold rounded-2xl hover:bg-amber-200 transition-colors">
            Good
          </button>
          <button onClick={() => handleRate(2)} className="flex-1 max-w-[150px] px-6 py-4 bg-emerald-100 text-emerald-700 font-bold rounded-2xl hover:bg-emerald-200 transition-colors">
            Easy
          </button>
        </motion.div>
      )}
    </div>
  );
};
