import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Grid } from 'lucide-react';
import { CategoryCountData } from '../types';

interface CategoryCountChartProps {
  data: CategoryCountData[];
}

export const CategoryCountChart: React.FC<CategoryCountChartProps> = ({ data }) => {
  const displayData = data.slice(0, 15);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: CategoryCountData = payload[0].payload;
      return (
        <div className="custom-recharts-tooltip">
          <p className="font-bold text-sm text-indigo-400 mb-1">{item.category}</p>
          <div className="text-xs space-y-1 text-slate-300 font-mono">
            <p className="flex justify-between space-x-4">
              <span className="text-slate-400">Total Apps:</span>
              <span className="font-bold text-white">{item.appCount.toLocaleString()}</span>
            </p>
            <p className="flex justify-between space-x-4">
              <span className="text-slate-400">Avg Rating:</span>
              <span className="text-amber-400 font-bold">{item.avgRating ? `${item.avgRating} ★` : 'N/A'}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl">
      <div className="mb-6">
        <div className="flex items-center space-x-2">
          <Grid className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">App Category Distribution</h3>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Number of unique applications published per category
        </p>
      </div>

      <div className="h-[360px] w-full">
        {displayData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-sm">
            No categories available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={displayData}
              margin={{ top: 10, right: 10, left: 0, bottom: 65 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis
                dataKey="category"
                stroke="#64748B"
                fontSize={10}
                angle={-45}
                textAnchor="end"
                interval={0}
                tickLine={false}
              />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="appCount"
                fill="url(#indigoGradient)"
                radius={[6, 6, 0, 0]}
                maxBarSize={32}
              />
              <defs>
                <linearGradient id="indigoGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.3} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
