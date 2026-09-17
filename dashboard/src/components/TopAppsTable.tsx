import React from 'react';
import { Award, Download, Star } from 'lucide-react';
import { AppData } from '../types';
import { formatLargeNumber } from '../utils/analytics';

interface TopAppsTableProps {
  apps: AppData[];
}

export const TopAppsTable: React.FC<TopAppsTableProps> = ({ apps }) => {
  const top10 = apps.slice(0, 10);

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <Award className="w-4 h-4 text-amber-400" />
          <h3 className="text-base font-bold text-white">TOP 10 APPS BY INSTALLS</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Which individual apps drive the most installs?
        </p>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-2 w-8 text-center">#</th>
                <th className="py-2.5 px-2">App</th>
                <th className="py-2.5 px-2">Category</th>
                <th className="py-2.5 px-2 text-right">Installs</th>
                <th className="py-2.5 px-2 text-center">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
              {top10.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-500 text-xs">
                    No applications match active filter settings.
                  </td>
                </tr>
              ) : (
                top10.map((app, index) => {
                  const rank = index + 1;
                  const rankColor =
                    rank === 1
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : rank === 2
                      ? 'bg-slate-300/20 text-slate-200 border-slate-400/40'
                      : rank === 3
                      ? 'bg-amber-700/20 text-amber-400 border-amber-700/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700/50';

                  return (
                    <tr key={app.id} className="hover:bg-slate-800/40 transition-colors group">
                      <td className="py-2 px-2 text-center">
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-extrabold border ${rankColor}`}>
                          {rank}
                        </span>
                      </td>
                      <td className="py-2 px-2">
                        <div className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors truncate max-w-[140px] sm:max-w-[180px]">
                          {app.app}
                        </div>
                      </td>
                      <td className="py-2 px-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700/60">
                          {app.category}
                        </span>
                      </td>
                      <td className="py-2 px-2 text-right font-mono font-bold text-cyan-400 text-xs">
                        <div className="flex items-center justify-end space-x-1">
                          <Download className="w-3 h-3 text-cyan-500" />
                          <span>{formatLargeNumber(app.installs)}</span>
                        </div>
                      </td>
                      <td className="py-2 px-2 text-center">
                        {app.rating !== null ? (
                          <div className="inline-flex items-center space-x-0.5 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-[11px]">
                            <span>{app.rating.toFixed(1)}</span>
                            <Star className="w-2.5 h-2.5 fill-amber-400" />
                          </div>
                        ) : (
                          <span className="text-slate-500 text-[10px] font-mono">N/A</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
