import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';

export const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (!isBreak) {
        alert('Focus session complete! Time for a break.');
        setIsBreak(true);
        setTimeLeft(5 * 60);
      } else {
        alert('Break over! Back to work.');
        setIsBreak(false);
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };

  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-full shadow-inner border border-slate-200">
      {isBreak ? <Coffee className="w-4 h-4 text-amber-600" /> : <Brain className="w-4 h-4 text-violet-600" />}
      <span className="font-mono font-bold text-slate-700 text-sm">{mins}:{secs}</span>
      <button onClick={toggle} className="text-slate-500 hover:text-violet-600 transition-colors">
        {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>
      <button onClick={reset} className="text-slate-500 hover:text-rose-600 transition-colors">
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
};
