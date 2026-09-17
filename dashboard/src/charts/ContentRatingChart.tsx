import React from 'react';
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
import { ShieldCheck } from 'lucide-react';
import { ContentRatingData } from '../types';

interface ContentRatingChartProps {
  data: ContentRatingData[];
}

export const ContentRatingChart: React.FC<ContentRatingChartProps> = ({ data }) => {
  const colors = ['#10B981', '#06B6D4', '#6366F1', '#F59E0B', '#F43F5E', '#8B5CF6'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: ContentRatingData = payload[0].payload;
      return (
        <div className="custom-recharts-tooltip">
          <p className="font-bold text-sm text-emerald-400 mb-1">{item.ratingLabel}</p>
          <div className="text-xs space-y-1 text-slate-300 font-mono">
            <p className="flex justify-between space-x-4">
              <span className="text-slate-400">Apps:</span>
              <span className="font-bold text-white">{item.count.toLocaleString()}</span>
            </p>
            <p className="flex justify-between space-x-4">
              <span className="text-slate-400">Share:</span>
              <span className="font-bold text-emerald-400">{item.percentage}%</span>
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
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h3 className="text-base font-bold text-white">CONTENT RATING DISTRIBUTION</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          How are apps distributed by target audience?
        </p>

        <div className="h-[240px] w-full">
          {data.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs">
              No content rating data available.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 35 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis
                  dataKey="ratingLabel"
                  stroke="#64748B"
                  fontSize={10}
                  angle={-15}
                  textAnchor="end"
                  interval={0}
                  tickLine={false}
                />
                <YAxis stroke="#64748B" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={32}>
                  {data.map((_, index) => (
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
