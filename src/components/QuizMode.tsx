import React, { useState, useMemo } from 'react';
import { documentData, Question } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, BrainCircuit, RefreshCw, ChevronRight, Play } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLocalStorage } from '../store';

export const QuizMode = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);

  const [quizScores, setQuizScores] = useLocalStorage<Record<string, number>>('physics-quiz-scores', {});

  const topicQuestions = useMemo(() => {
    if (!selectedTopic) return [];
    const section = documentData.sections.find(s => s.title === selectedTopic);
    return section ? section.questions : [];
  }, [selectedTopic]);

  const currentQuestion = topicQuestions[currentQuestionIndex];

  const handleStartQuiz = (topic: string) => {
    setSelectedTopic(topic);
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
    setQuizFinished(false);
    setScore(0);
    setUserAnswers([]);
  };

  const handleAnswer = (correct: boolean) => {
    const newAnswers = [...userAnswers, correct];
    setUserAnswers(newAnswers);
    if (correct) setScore(s => s + 1);

    if (currentQuestionIndex < topicQuestions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setShowAnswer(false);
    } else {
      setQuizFinished(true);
      const finalScore = correct ? score + 1 : score;
      const percentage = Math.round((finalScore / topicQuestions.length) * 100);
      setQuizScores({ ...quizScores, [selectedTopic!]: percentage });
    }
  };

  if (!selectedTopic) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 flex items-center mb-2">
            <BrainCircuit className="w-6 h-6 mr-2 text-violet-500" />
            Topic Quizzes
          </h2>
          <p className="text-slate-500">Test your knowledge on specific topics. Self-evaluate your answers against the key points.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {documentData.sections.map((section) => {
            const previousScore = quizScores[section.title];
            return (
              <motion.button
                key={section.title}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStartQuiz(section.title)}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-violet-300 hover:shadow-md transition-all text-left flex flex-col justify-between h-full"
              >
                <div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2 leading-tight">{section.title}</h3>
                  <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md">
                    {section.questions.length} questions
                  </span>
                </div>
                
                <div className="mt-6 flex items-center justify-between">
                  {previousScore !== undefined ? (
                    <span className={cn(
                      "text-sm font-bold px-2.5 py-1 rounded-md",
                      previousScore >= 80 ? "bg-emerald-100 text-emerald-700" : 
                      previousScore >= 50 ? "bg-amber-100 text-amber-700" : 
                      "bg-rose-100 text-rose-700"
                    )}>
                      Last Score: {previousScore}%
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-slate-400">Not attempted</span>
                  )}
                  
                  <div className="w-8 h-8 rounded-full bg-violet-50 flex items-center justify-center text-violet-600">
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  if (quizFinished) {
    const percentage = Math.round((score / topicQuestions.length) * 100);
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center max-w-2xl mx-auto"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-violet-50">
          <BrainCircuit className="w-12 h-12 text-violet-500" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
        <p className="text-slate-500 mb-8">{selectedTopic}</p>
        
        <div className="flex justify-center items-center gap-8 mb-10">
          <div className="text-center">
            <p className="text-5xl font-black text-violet-600 mb-2">{percentage}%</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Score</p>
          </div>
          <div className="w-px h-16 bg-slate-200" />
          <div className="text-center">
            <p className="text-3xl font-bold text-slate-700 mb-2">{score} / {topicQuestions.length}</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Correct</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => handleStartQuiz(selectedTopic)}
            className="flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Retry Quiz</span>
          </button>
          <button 
            onClick={() => setSelectedTopic(null)}
            className="flex items-center justify-center space-x-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-bold transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
            <span>Back to Topics</span>
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={() => setSelectedTopic(null)}
          className="text-sm font-bold text-slate-500 hover:text-violet-600 transition-colors"
        >
          ← Back to Topics
        </button>
        <div className="text-sm font-bold text-slate-400">
          Question {currentQuestionIndex + 1} of {topicQuestions.length}
        </div>
      </div>

      <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-violet-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${((currentQuestionIndex) / topicQuestions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-200">
              {currentQuestion.marks}
            </span>
            <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-bold border border-slate-200">
              Priority: {currentQuestion.priority}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-slate-800 leading-snug mb-8">
            {currentQuestion.title}
          </h3>

          {!showAnswer ? (
            <div className="text-center py-8">
              <button
                onClick={() => setShowAnswer(true)}
                className="bg-violet-100 hover:bg-violet-200 text-violet-700 font-bold py-4 px-8 rounded-2xl transition-colors text-lg"
              >
                Reveal Answer
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-6"
            >
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Key Points to Cover:</p>
                <ul className="space-y-3">
                  {currentQuestion.points.map((point, idx) => (
                    <li key={idx} className="flex items-start text-slate-700 leading-relaxed">
                      <div className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <p className="text-center font-bold text-slate-600 mb-4">Did you get it right?</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => handleAnswer(false)}
                    className="flex-1 max-w-[200px] flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-700 py-4 rounded-2xl font-bold transition-colors border border-rose-200"
                  >
                    <XCircle className="w-5 h-5" />
                    Incorrect
                  </button>
                  <button
                    onClick={() => handleAnswer(true)}
                    className="flex-1 max-w-[200px] flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-4 rounded-2xl font-bold transition-colors border border-emerald-200"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Correct
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
