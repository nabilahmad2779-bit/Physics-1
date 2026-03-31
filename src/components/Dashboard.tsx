import React from 'react';
import { useLocalStorage } from '../store';
import { documentData } from '../data';
import { BarChart3, Clock, Target, Award, Star } from 'lucide-react';

export const Dashboard = () => {
  const [srsData] = useLocalStorage<Record<string, any>>('physics-srs', {});
  const [bookmarks] = useLocalStorage<string[]>('physics-bookmarks', []);
  const [timeSpent] = useLocalStorage<number>('physics-time', 0); // in seconds

  const totalQuestions = documentData.sections.reduce((acc, s) => acc + s.questions.length, 0);
  const reviewedCount = Object.keys(srsData).length;
  const progress = Math.round((reviewedCount / totalQuestions) * 100) || 0;

  const hours = Math.floor(timeSpent / 3600);
  const minutes = Math.floor((timeSpent % 3600) / 60);

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-black text-slate-800 mb-8">Your Progress Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-violet-100 text-violet-600 rounded-2xl"><Target className="w-6 h-6" /></div>
            <h3 className="font-bold text-slate-700">Syllabus Covered</h3>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-3">{progress}%</div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
            <div className="bg-violet-600 h-2.5 rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm font-medium text-slate-500 mt-3">{reviewedCount} of {totalQuestions} questions</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><Clock className="w-6 h-6" /></div>
            <h3 className="font-bold text-slate-700">Time Spent</h3>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-3">{hours}h {minutes}m</div>
          <p className="text-sm font-medium text-slate-500 mt-3">Total active study time</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl"><Star className="w-6 h-6" /></div>
            <h3 className="font-bold text-slate-700">Bookmarks</h3>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-3">{bookmarks.length}</div>
          <p className="text-sm font-medium text-slate-500 mt-3">Saved for later review</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-2xl"><Award className="w-6 h-6" /></div>
            <h3 className="font-bold text-slate-700">Mastery Level</h3>
          </div>
          <div className="text-4xl font-black text-slate-900 mb-3">
            {Math.round(Object.values(srsData).filter((d: any) => d.ease > 2.5).length / (reviewedCount || 1) * 100)}%
          </div>
          <p className="text-sm font-medium text-slate-500 mt-3">Questions marked as easy</p>
        </div>
      </div>
    </div>
  );
};
