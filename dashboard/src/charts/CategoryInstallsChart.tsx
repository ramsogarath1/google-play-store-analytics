import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';
import { ArrowUpDown, Download } from 'lucide-react';
import { CategoryInstallData } from '../types';
import { formatLargeNumber } from '../utils/analytics';

interface CategoryInstallsChartProps {
  data: CategoryInstallData[];
  sortOrder: 'highest' | 'lowest';
  setSortOrder: (order: 'highest' | 'lowest') => void;
}

export const CategoryInstallsChart: React.FC<CategoryInstallsChartProps> = ({
  data,
  sortOrder,
  setSortOrder,
}) => {
  const [viewLimit, setViewLimit] = useState<'top10' | 'all'>('top10');

  const displayData = viewLimit === 'top10' ? data.slice(0, 10) : data.slice(0, 25);

  const colors = [
    '#06B6D4', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899',
    '#F43F5E', '#10B981', '#14B8A6', '#0284C7', '#4F46E5',
    '#7C3AED', '#D946EF', '#F59E0B', '#84CC16', '#06B6D4',
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: CategoryInstallData = payload[0].payload;
      return (
        <div className="custom-recharts-tooltip">
          <p className="font-bold text-sm text-cyan-400 mb-1">{item.category}</p>
          <div className="text-xs space-y-1 text-slate-300 font-mono">
            <p className="flex justify-between space-x-4">
              <span className="text-slate-400">Total Installs:</span>
              <span className="font-bold text-white">{formatLargeNumber(item.installs)} ({item.installs.toLocaleString()})</span>
            </p>
            <p className="flex justify-between space-x-4">
              <span className="text-slate-400">App Count:</span>
              <span className="text-slate-200">{item.appCount.toLocaleString()} apps</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl flex flex-col justify-between h-full">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center space-x-2">
              <Download className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white">INSTALLS BY CATEGORY</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Which categories attract the most downloads?
            </p>
          </div>

          {/* View Limit & Sort Controls */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewLimit('top10')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  viewLimit === 'top10'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Top 10
              </button>
              <button
                onClick={() => setViewLimit('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  viewLimit === 'all'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
            </div>

            <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setSortOrder('highest')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  sortOrder === 'highest'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ArrowUpDown className="w-3 h-3" />
                <span>Highest</span>
              </button>
              <button
                onClick={() => setSortOrder('lowest')}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  sortOrder === 'lowest'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ArrowUpDown className="w-3 h-3 rotate-180" />
                <span>Lowest</span>
              </button>
            </div>
          </div>
        </div>

        <div className={`w-full ${viewLimit === 'all' ? 'h-[500px]' : 'h-[320px]'}`}>
          {displayData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs">
              No category data available for active filters.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={displayData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 45, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                <XAxis
                  type="number"
                  tickFormatter={(val) => formatLargeNumber(val)}
                  stroke="#64748B"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  stroke="#94A3B8"
                  fontSize={10}
                  width={120}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="installs" radius={[0, 6, 6, 0]} maxBarSize={22}>
                  {displayData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};
