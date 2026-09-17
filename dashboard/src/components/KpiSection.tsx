import React from 'react';
import { Smartphone, Download, Star, MessageSquare } from 'lucide-react';
import { KpiMetrics } from '../types';
import { formatLargeNumber } from '../utils/analytics';

interface KpiSectionProps {
  kpis: KpiMetrics;
}

export const KpiSection: React.FC<KpiSectionProps> = ({ kpis }) => {
  const cards = [
    {
      title: 'TOTAL APPS',
      value: kpis.totalApps.toLocaleString(),
      subtext: 'Apps in cleaned dataset',
      icon: Smartphone,
      accent: 'from-cyan-500 to-blue-600',
      textAccent: 'text-cyan-400',
      glow: 'shadow-cyan-500/10',
    },
    {
      title: 'TOTAL ESTIMATED INSTALLS',
      value: formatLargeNumber(kpis.totalInstalls),
      subtext: 'Estimated download volume',
      icon: Download,
      accent: 'from-indigo-500 to-purple-600',
      textAccent: 'text-indigo-400',
      glow: 'shadow-indigo-500/10',
    },
    {
      title: 'AVERAGE RATING',
      value: kpis.averageRating !== null ? `${kpis.averageRating.toFixed(2)} ★` : 'N/A',
      subtext: 'Average score among rated apps',
      icon: Star,
      accent: 'from-amber-400 to-orange-500',
      textAccent: 'text-amber-400',
      glow: 'shadow-amber-500/10',
    },
    {
      title: 'TOTAL USER REVIEWS',
      value: formatLargeNumber(kpis.totalReviews),
      subtext: 'Total review volume',
      icon: MessageSquare,
      accent: 'from-emerald-400 to-teal-500',
      textAccent: 'text-emerald-400',
      glow: 'shadow-emerald-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`glass-card glass-card-hover rounded-2xl p-4 border border-slate-800 shadow-md ${card.glow} flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {card.title}
              </span>
              <div
                className={`p-1.5 rounded-lg bg-gradient-to-tr ${card.accent} shadow-sm text-white`}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-0.5 font-mono">
                {card.value}
              </div>
              <div className="text-[11px] font-medium text-slate-400">
                {card.subtext}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
