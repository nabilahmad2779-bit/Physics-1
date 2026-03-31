import React from 'react';
import { documentData, Question, Priority, Section } from '../data';
import { Star, FileText, CheckCircle2, Zap, BookOpen, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

const PriorityStars = ({ priority }: { priority: Priority }) => {
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

const QuestionCard: React.FC<{ question: Question }> = ({ question }) => {
  const bgColors = {
    3: "bg-rose-50 border-rose-200 text-rose-900",
    2: "bg-orange-50 border-orange-200 text-orange-900",
    1: "bg-amber-50 border-amber-200 text-amber-900",
  };

  const badgeColors = {
    3: "bg-rose-600 text-white",
    2: "bg-orange-600 text-white",
    1: "bg-amber-600 text-white",
  };

  return (
    <div className={cn("border rounded-xl p-5 mb-6 print-avoid-break shadow-sm", bgColors[question.priority])}>
      <div className="flex items-start justify-between mb-3 gap-4">
        <h3 className="text-lg font-bold leading-snug flex-1">
          {question.title}
        </h3>
        {question.recycled && (
          <span className="flex items-center text-xs font-bold uppercase tracking-wider bg-white/60 px-2 py-1 rounded text-rose-700 border border-rose-200">
            <RefreshCw className="w-3 h-3 mr-1" />
            Recycled
          </span>
        )}
      </div>
      
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className={cn("flex items-center px-2 py-1 rounded-md text-sm font-bold", badgeColors[question.priority])}>
          <PriorityStars priority={question.priority} />
        </div>
        <div className="flex space-x-1">
          {question.papers.map((paper) => (
            <span key={paper} className="bg-white/60 px-2 py-1 rounded text-xs font-bold border border-black/10">
              {paper}
            </span>
          ))}
        </div>
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold border border-blue-200">
          [{question.marks}]
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-wider opacity-70 mb-1">Key Points to Cover:</p>
        <ul className="space-y-1.5">
          {question.points.map((point, idx) => (
            <li key={idx} className="flex items-start text-sm leading-relaxed">
              <span className="mr-2 mt-1.5 w-1.5 h-1.5 rounded-full bg-current opacity-60 shrink-0" />
              <span className="opacity-90">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export interface PdfDocumentProps {
  data?: {
    title: string;
    subtitle?: string;
    description?: string;
    sections: Section[];
  };
}

export const PdfDocument: React.FC<PdfDocumentProps> = ({ data }) => {
  const renderData = data || documentData;
  const isFullDoc = !data;

  return (
    <div className="bg-white text-slate-900 w-full max-w-[210mm] mx-auto min-h-[297mm] p-[15mm] sm:p-[20mm] print:p-0 print:m-0 print:max-w-none print:shadow-none shadow-2xl">
      {/* Header */}
      <div className="text-center mb-12 print-avoid-break">
        <div className="inline-flex items-center justify-center space-x-3 mb-4">
          <div className="w-4 h-4 bg-violet-600" />
          <h1 className="text-4xl font-black tracking-tight text-violet-700 uppercase">
            {renderData.title}
          </h1>
          <div className="w-4 h-4 bg-violet-600" />
        </div>
        {renderData.subtitle && (
          <h2 className="text-2xl font-bold text-violet-600 mb-4">
            {renderData.subtitle}
          </h2>
        )}
        {renderData.description && (
          <p className="text-slate-500 whitespace-pre-line">
            {renderData.description}
          </p>
        )}
      </div>

      {isFullDoc && (
        <>
          {/* Stats Table */}
          <div className="grid grid-cols-2 gap-4 mb-12 print-avoid-break">
            {documentData.stats.map((stat, idx) => (
              <div key={idx} className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-center justify-between">
                <span className="font-bold text-amber-900 flex items-center">
                  <div className="w-2 h-2 bg-amber-900 mr-2" />
                  {stat.label}
                </span>
                <span className="font-bold text-amber-700">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Priority Legend */}
          <div className="mb-12 print-avoid-break">
            <h3 className="text-center font-bold text-slate-500 mb-4 uppercase tracking-wider text-sm">Priority Color Code</h3>
            <div className="border rounded-xl overflow-hidden">
              <div className="flex items-center p-3 bg-rose-50 border-b">
                <div className="w-24 text-rose-600"><PriorityStars priority={3} /></div>
                <div className="flex-1 text-sm text-rose-900">Appears 4-5 times</div>
                <div className="font-bold text-rose-900">MUST STUDY</div>
              </div>
              <div className="flex items-center p-3 bg-orange-50 border-b">
                <div className="w-24 text-orange-600"><PriorityStars priority={2} /></div>
                <div className="flex-1 text-sm text-orange-900">Appears 2-3 times</div>
                <div className="font-bold text-orange-900">Should Study</div>
              </div>
              <div className="flex items-center p-3 bg-amber-50">
                <div className="w-24 text-amber-600"><PriorityStars priority={1} /></div>
                <div className="flex-1 text-sm text-amber-900">Appears 1 time</div>
                <div className="font-bold text-amber-900">If Time Permits</div>
              </div>
            </div>
          </div>

          {/* Page Break for Print */}
          <div className="print-page-break" />

          {/* Quick Start */}
          <div className="mb-12 print-avoid-break">
            <div className="flex items-center space-x-2 mb-6 text-violet-700">
              <Zap className="w-6 h-6" />
              <h2 className="text-2xl font-bold">QUICK START: Study These First!</h2>
            </div>
            <p className="font-bold text-slate-600 mb-4">If you have limited time, focus on these guaranteed marks:</p>
            <div className="space-y-3 pl-4">
              {documentData.quickStart.map((item, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="font-bold text-violet-600 mr-3">{idx + 1}.</span>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <p className="font-bold text-violet-700 mt-6 bg-violet-50 p-3 rounded-lg inline-block">
              These 5 topics alone = 20-25 marks guaranteed!
            </p>
          </div>

          {/* Formulas */}
          <div className="mb-16 print-avoid-break">
            <div className="flex items-center space-x-2 mb-6 text-violet-700">
              <BookOpen className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Essential Formulas</h2>
            </div>
            <div className="border rounded-xl overflow-hidden">
              {documentData.formulas.map((formula, idx) => (
                <div key={idx} className={cn("flex p-4", idx !== documentData.formulas.length - 1 && "border-b")}>
                  <div className="w-32 font-bold text-slate-900">{formula.name}</div>
                  <div className="flex-1 font-mono text-slate-700">{formula.formula}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Sections */}
      {renderData.sections.map((section, sIdx) => (
        <div key={sIdx} className="mb-12">
          {isFullDoc && (
            <div className="flex items-center space-x-3 mb-8 text-violet-700 print-avoid-break">
              <div className="flex space-x-1">
                <div className="w-4 h-4 bg-violet-600" />
                <div className="w-4 h-4 bg-violet-600" />
              </div>
              <h2 className="text-2xl font-bold">{section.title}</h2>
            </div>
          )}
          
          <div className="space-y-6">
            {section.questions.map((question, qIdx) => (
              <QuestionCard key={qIdx} question={question} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
