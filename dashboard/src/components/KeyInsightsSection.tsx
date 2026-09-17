import React from 'react';
import { Lightbulb, TrendingUp, Grid, DollarSign, Star, MessageSquare, Clock } from 'lucide-react';
import { KeyInsightItem } from '../types';

interface KeyInsightsSectionProps {
  insights: KeyInsightItem[];
}

export const KeyInsightsSection: React.FC<KeyInsightsSectionProps> = ({ insights }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-cyan-400" />;
      case 'Grid':
        return <Grid className="w-5 h-5 text-indigo-400" />;
      case 'DollarSign':
        return <DollarSign className="w-5 h-5 text-purple-400" />;
      case 'Star':
        return <Star className="w-5 h-5 text-amber-400" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-emerald-400" />;
      case 'Clock':
        return <Clock className="w-5 h-5 text-rose-400" />;
      default:
        return <Lightbulb className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getGradient = (category: string) => {
    switch (category) {
      case 'growth':
        return 'from-cyan-500/10 via-slate-900 to-slate-900 border-cyan-500/30';
      case 'category':
        return 'from-indigo-500/10 via-slate-900 to-slate-900 border-indigo-500/30';
      case 'monetization':
        return 'from-purple-500/10 via-slate-900 to-slate-900 border-purple-500/30';
      case 'rating':
        return 'from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/30';
      case 'engagement':
        return 'from-emerald-500/10 via-slate-900 to-slate-900 border-emerald-500/30';
      case 'trend':
        return 'from-rose-500/10 via-slate-900 to-slate-900 border-rose-500/30';
      default:
        return 'from-slate-800 via-slate-900 to-slate-900 border-slate-700';
    }
  };

  return (
    <div className="mb-10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20">
          <Lightbulb className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Key Insights</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Empirical findings derived from full-dataset aggregations & mathematical metrics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {insights.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl p-5 border bg-gradient-to-b ${getGradient(
              item.category
            )} shadow-xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {item.title}
                </span>
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                  {getIcon(item.icon)}
                </div>
              </div>

              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-1 font-mono">
                {item.metric}
              </div>

              <div className="text-xs font-semibold text-cyan-400 mb-3 font-mono">
                {item.subtitle}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
