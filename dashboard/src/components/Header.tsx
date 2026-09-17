import React from 'react';
import { BarChart2, ShieldCheck, Download, Target, LayoutDashboard, Lightbulb, Briefcase, Database } from 'lucide-react';

interface HeaderProps {
  totalAppsCount: number;
  filteredCount: number;
  onExport?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalAppsCount,
  filteredCount,
  onExport,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'insights', label: 'Key Insights', icon: Lightbulb },
    { id: 'impact', label: 'Business Impact', icon: Briefcase },
    { id: 'methodology', label: 'Methodology', icon: Database },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F17]/95 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-3">
          
          {/* Title Branding */}
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-cyan-500/20">
              <BarChart2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-white">
                  GOOGLE PLAY STORE ANALYTICS
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1 animate-pulse" />
                  Portfolio Case Study
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Turning App Data Into Growth Insights
              </p>
            </div>
          </div>

          {/* Stats Badge & Action Buttons */}
          <div className="flex items-center justify-between md:justify-end space-x-3">
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>
                <strong className="text-white">{filteredCount.toLocaleString()}</strong> of {totalAppsCount.toLocaleString()} Apps
              </span>
            </div>

            {onExport && (
              <button
                onClick={onExport}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export Dataset</span>
              </button>
            )}
          </div>
        </div>

        {/* Anchor Navigation Links */}
        <div className="flex space-x-1 border-t border-slate-800/60 overflow-x-auto no-scrollbar py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-slate-100 hover:bg-slate-900/80 transition-all whitespace-nowrap"
              >
                <Icon className="w-3.5 h-3.5 text-slate-500" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
