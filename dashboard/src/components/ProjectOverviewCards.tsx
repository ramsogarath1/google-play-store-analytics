import React from 'react';
import { Target, Database, HelpCircle, CheckCircle2 } from 'lucide-react';

interface ProjectOverviewCardsProps {
  totalAppsCount: number;
  totalCategoriesCount: number;
}

export const ProjectOverviewCards: React.FC<ProjectOverviewCardsProps> = ({
  totalAppsCount,
  totalCategoriesCount,
}) => {
  const keyQuestions = [
    'Which categories have the highest installs?',
    'Which apps receive the most user reviews?',
    'How are ratings related to user engagement?',
    'How do free and paid apps differ?',
    'Which categories have the largest app presence?',
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 items-stretch">
      
      {/* CARD 1: OBJECTIVE */}
      <div className="glass-card rounded-2xl p-4.5 sm:p-5 border border-slate-800 shadow-lg flex flex-col justify-between hover:border-cyan-500/30 transition-all">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-white tracking-tight">Objective</h3>
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            Understand what factors are associated with app popularity, user engagement and ratings on the Google Play Store, and translate the findings into actionable insights.
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-[11px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
          <span>Goal-driven analytics workflow</span>
        </div>
      </div>

      {/* CARD 2: DATASET */}
      <div className="glass-card rounded-2xl p-4.5 sm:p-5 border border-slate-800 shadow-lg flex flex-col justify-between hover:border-indigo-500/30 transition-all">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-white tracking-tight">Dataset</h3>
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Database className="w-4 h-4" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2.5">
            <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800 text-center">
              <div className="text-base font-extrabold text-white font-mono">
                {totalAppsCount > 0 ? totalAppsCount.toLocaleString() : '9,659'}
              </div>
              <div className="text-[10px] text-slate-400 font-medium">Cleaned Apps</div>
            </div>
            <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800 text-center">
              <div className="text-base font-extrabold text-indigo-400 font-mono">
                {totalCategoriesCount > 0 ? totalCategoriesCount : '33'}
              </div>
              <div className="text-[10px] text-slate-400 font-medium">Categories</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 text-[10px] font-mono text-slate-300">
            {['Ratings', 'Reviews', 'Installs', 'Pricing', 'Content Ratings', 'Last Updated'].map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center text-[11px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2" />
          <span>Dynamically parsed from CSV</span>
        </div>
      </div>

      {/* CARD 3: KEY QUESTIONS */}
      <div className="glass-card rounded-2xl p-4.5 sm:p-5 border border-slate-800 shadow-lg flex flex-col justify-between hover:border-purple-500/30 transition-all">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-white tracking-tight">Key Questions</h3>
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            {keyQuestions.map((q, idx) => (
              <div key={idx} className="flex items-start space-x-1.5 text-[11px] text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span className="leading-snug">{q}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center text-[11px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-2" />
          <span>Exploratory data hypotheses</span>
        </div>
      </div>

    </div>
  );
};
