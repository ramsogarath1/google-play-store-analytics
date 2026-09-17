import React from 'react';
import { Briefcase, Code, Layout, Megaphone, LineChart, CheckCircle2 } from 'lucide-react';
import { BusinessImpactCard } from '../types';

export const BusinessImpactSection: React.FC = () => {
  const impactCards: BusinessImpactCard[] = [
    {
      role: 'APP DEVELOPERS',
      title: 'Technical Optimization & Release Cadence',
      summary:
        'Focus engineering effort on regular updates and Android version compatibility to capture maximum active installs.',
      takeaways: [
        'Apps updated regularly maintain stronger active store positioning and higher overall ratings.',
        'Optimization for smaller app sizes (Size_MB) reduces download friction in markets with limited bandwidth.',
        'Review volume serves as a reliable proxy for user engagement, indicating active product usage.',
      ],
      gradient: 'from-cyan-500/10 via-slate-900 to-slate-900 border-cyan-500/30',
      icon: 'Code',
    },
    {
      role: 'PRODUCT TEAMS',
      title: 'Category Selection & Freemium Strategy',
      summary:
        'Structure product monetization around freemium models with in-app purchases rather than upfront paywalls.',
      takeaways: [
        'Free apps represent over 90% of total catalog volume and capture the vast majority of installs.',
        'Paid apps face significant download friction unless positioned in specialized, high-utility niches.',
        'High review volume indicates strong engagement, but correlation does not imply direct causation with higher ratings.',
      ],
      gradient: 'from-purple-500/10 via-slate-900 to-slate-900 border-purple-500/30',
      icon: 'Layout',
    },
    {
      role: 'MARKETING TEAMS',
      title: 'User Feedback Loops & Target Ratings',
      summary:
        'Prioritize early in-app review prompts and user feedback loops to build essential social proof.',
      takeaways: [
        'Review counts exhibit a strong logarithmic relationship with estimated install scale.',
        'Apps breaking into major review thresholds experience higher organic discovery.',
        'Content ratings dictate market reach; "Everyone" rating covers over 80% of total catalog downloads.',
      ],
      gradient: 'from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/30',
      icon: 'Megaphone',
    },
    {
      role: 'BUSINESS / DATA ANALYSTS',
      title: 'TAM Evaluation & Portfolio Strategy',
      summary:
        'Evaluate market addressability by contrasting category install volume with developer saturation.',
      takeaways: [
        'High-install categories (e.g. GAME, COMMUNICATION) represent large total addressable markets (TAM).',
        'Categories with high app counts but lower average installs signal competitive market fragmentation.',
        'App update velocity acts as a key operational proxy for developer activity and maintenance commitment.',
      ],
      gradient: 'from-emerald-500/10 via-slate-900 to-slate-900 border-emerald-500/30',
      icon: 'LineChart',
    },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code':
        return <Code className="w-5 h-5 text-cyan-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-purple-400" />;
      case 'Megaphone':
        return <Megaphone className="w-5 h-5 text-amber-400" />;
      case 'LineChart':
        return <LineChart className="w-5 h-5 text-emerald-400" />;
      default:
        return <Briefcase className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="impact" className="mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20">
          <Briefcase className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">BUSINESS IMPACT</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Strategic recommendations for stakeholders grounded strictly in analytical data
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {impactCards.map((card, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 border bg-gradient-to-b ${card.gradient} shadow-xl flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-slate-200 border border-slate-700">
                  {card.role}
                </span>
                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                  {getIcon(card.icon)}
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed font-medium">
                {card.summary}
              </p>

              <div className="space-y-2.5 pt-3 border-t border-slate-800/80">
                {card.takeaways.map((takeaway, tIdx) => (
                  <div key={tIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
