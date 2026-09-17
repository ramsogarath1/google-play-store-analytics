import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Calendar } from 'lucide-react';
import { YearlyTrendData } from '../types';

interface YearlyTrendChartProps {
  data: YearlyTrendData[];
}

export const YearlyTrendChart: React.FC<YearlyTrendChartProps> = ({ data }) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: YearlyTrendData = payload[0].payload;
      return (
        <div className="custom-recharts-tooltip">
          <p className="font-bold text-sm text-cyan-400 mb-1">Year {item.year}</p>
          <div className="text-xs space-y-1 text-slate-300 font-mono">
            <p className="flex justify-between space-x-4">
              <span className="text-slate-400">Apps Updated:</span>
              <span className="font-bold text-white">{item.count.toLocaleString()}</span>
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
    <div className="glass-card rounded-2xl p-5 border border-slate-800 shadow-xl h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <h3 className="text-base font-bold text-white">INSTALL TREND OVER TIME</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          How has app maintenance evolved annually?
        </p>

        <div className="h-[240px] w-full">
          {data.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs">
              No yearly trend data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 15 }}>
                <defs>
                  <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis dataKey="year" stroke="#64748B" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#06B6D4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#cyanGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};
