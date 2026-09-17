import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { ScatterChart as ScatterIcon, Layers } from 'lucide-react';
import { ScatterPoint } from '../types';
import { formatLargeNumber } from '../utils/analytics';

interface RatingVsReviewsScatterProps {
  data: ScatterPoint[];
}

export const RatingVsReviewsScatter: React.FC<RatingVsReviewsScatterProps> = ({ data }) => {
  const [scaleType, setScaleType] = useState<'log' | 'linear'>('log');

  const chartData = data.map((d) => ({
    ...d,
    xValue: scaleType === 'log' ? Math.log10(Math.max(1, d.reviews)) : d.reviews,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: ScatterPoint = payload[0].payload;
      return (
        <div className="custom-recharts-tooltip max-w-xs">
          <p className="font-bold text-sm text-white truncate">{item.app}</p>
          <div className="inline-block my-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {item.category}
          </div>
          <div className="text-xs space-y-1 text-slate-300 font-mono mt-1">
            <p className="flex justify-between space-x-4">
              <span className="text-slate-400">Rating:</span>
              <span className="text-amber-400 font-bold">{item.rating} ★</span>
            </p>
            <p className="flex justify-between space-x-4">
              <span className="text-slate-400">User Reviews:</span>
              <span className="text-white font-bold">{formatLargeNumber(item.reviews)} ({item.reviews.toLocaleString()})</span>
            </p>
            <p className="flex justify-between space-x-4">
              <span className="text-slate-400">Est. Installs:</span>
              <span className="text-slate-200">{formatLargeNumber(item.installs)}</span>
            </p>
            <p className="flex justify-between space-x-4">
              <span className="text-slate-400">Type:</span>
              <span className={item.type === 'Free' ? 'text-cyan-400' : 'text-purple-400'}>
                {item.type} {item.price > 0 ? `($${item.price.toFixed(2)})` : ''}
              </span>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <ScatterIcon className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-bold text-white">RATING VS REVIEWS</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              How does user engagement correlate with ratings?
            </p>
          </div>

          <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setScaleType('log')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                scaleType === 'log'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Log Scale</span>
            </button>
            <button
              onClick={() => setScaleType('linear')}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                scaleType === 'linear'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>Linear</span>
            </button>
          </div>
        </div>

        <div className="h-[340px] w-full">
          {data.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs">
              No scatter data available for active filters.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 15, right: 15, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis
                  type="number"
                  dataKey="xValue"
                  name="Reviews"
                  stroke="#64748B"
                  fontSize={10}
                  tickFormatter={(val) => {
                    if (scaleType === 'log') {
                      return `10^${Math.round(val)}`;
                    }
                    return formatLargeNumber(val);
                  }}
                  label={{
                    value: scaleType === 'log' ? 'Reviews (Log10 Scale)' : 'Reviews Count',
                    position: 'insideBottom',
                    offset: -12,
                    fill: '#64748B',
                    fontSize: 10,
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="rating"
                  name="Rating"
                  domain={[1.0, 5.0]}
                  stroke="#64748B"
                  fontSize={10}
                  tickFormatter={(val) => `${val}★`}
                  label={{
                    value: 'Rating',
                    angle: -90,
                    position: 'insideLeft',
                    fill: '#64748B',
                    fontSize: 10,
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Scatter name="Apps" data={chartData} fill="#F59E0B">
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.type === 'Free' ? '#06B6D4' : '#8B5CF6'}
                      opacity={0.7}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center space-x-6 text-[11px] text-slate-400">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span>Free Apps</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
          <span>Paid Apps</span>
        </div>
      </div>
    </div>
  );
};
