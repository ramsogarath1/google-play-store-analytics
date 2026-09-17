import React from 'react';
import { BarChart3, Code2, Database, Sparkles, Layers, Terminal } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const badges = [
    { label: 'Python', icon: Terminal, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    { label: 'Data Cleaning', icon: Database, color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
    { label: 'EDA', icon: BarChart3, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    { label: 'Data Visualization', icon: Layers, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    { label: 'React', icon: Code2, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { label: 'Analytics', icon: Sparkles, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  ];

  return (
    <section id="overview" className="relative py-6 sm:py-8 border-b border-slate-800/80 mb-6 overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-48 bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center px-4">
        
        {/* Compact Category Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400">Data Analytics Case Study</span>
          <span className="text-slate-600">•</span>
          <span>Google Play Store</span>
        </div>

        {/* Main Title - Compact Professional Size */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-1.5">
          GOOGLE PLAY STORE ANALYTICS
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent mb-3">
          Turning App Data Into Growth Insights
        </p>

        {/* Tech Badges */}
        <div className="flex flex-wrap justify-center items-center gap-1.5 mb-3">
          {badges.map((b) => {
            const Icon = b.icon;
            return (
              <span
                key={b.label}
                className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${b.color}`}
              >
                <Icon className="w-3 h-3" />
                <span>{b.label}</span>
              </span>
            );
          })}
        </div>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          An end-to-end analytics project exploring Google Play Store apps, user engagement, ratings, installs and category-level performance.
        </p>
      </div>
    </section>
  );
};
