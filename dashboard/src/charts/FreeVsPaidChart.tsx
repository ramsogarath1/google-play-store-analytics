import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { PieChart as PieIcon, DollarSign } from 'lucide-react';
import { FreePaidData } from '../types';

interface FreeVsPaidChartProps {
  data: FreePaidData[];
  avgPaidPrice: number;
}

export const FreeVsPaidChart: React.FC<FreeVsPaidChartProps> = ({ data, avgPaidPrice }) => {
  const totalApps = data.reduce((acc, curr) => acc + curr.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: FreePaidData = payload[0].payload;
      return (
        <div className="custom-recharts-tooltip">
          <p className="font-bold text-sm text-white mb-1">{item.name}</p>
          <div className="text-xs space-y-1 text-slate-300 font-mono">
            <p className="flex justify-between space-x-4">
              <span className="text-slate-400">App Count:</span>
              <span className="font-bold text-white">{item.value.toLocaleString()}</span>
            </p>
            <p className="flex justify-between space-x-4">
              <span className="text-slate-400">Share:</span>
              <span className="font-bold text-cyan-400">{item.percentage}%</span>
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
        <div className="flex items-center space-x-2 mb-1">
          <PieIcon className="w-4 h-4 text-purple-400" />
          <h3 className="text-base font-bold text-white">APP TYPE DISTRIBUTION</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          What is the monetization split across apps?
        </p>

        <div className="h-[210px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#0B0F17" strokeWidth={3} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-extrabold text-white font-mono">
              {totalApps.toLocaleString()}
            </span>
            <span className="text-[9px] text-slate-400 uppercase font-semibold">Total Apps</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mt-2 pt-3 border-t border-slate-800">
        <div className="grid grid-cols-2 gap-2">
          {data.map((item) => (
            <div key={item.name} className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-center">
              <div className="flex items-center justify-center space-x-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-semibold text-slate-300">{item.name}</span>
              </div>
              <div className="text-base font-bold text-white font-mono">{item.percentage}%</div>
              <div className="text-[10px] text-slate-400 font-mono">{item.value.toLocaleString()} apps</div>
            </div>
          ))}
        </div>

        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-2 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5 text-purple-300 font-medium text-[11px]">
            <DollarSign className="w-3.5 h-3.5 text-purple-400" />
            <span>Avg Paid App Price:</span>
          </div>
          <span className="font-bold text-white font-mono text-[11px]">
            ${avgPaidPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
