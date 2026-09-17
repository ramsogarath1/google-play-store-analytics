import React from 'react';
import { Database, CheckCircle, AlertTriangle, FileCode, Sparkles } from 'lucide-react';

interface DataQualitySectionProps {
  totalRecords: number;
}

export const DataQualitySection: React.FC<DataQualitySectionProps> = ({ totalRecords }) => {
  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800 shadow-xl mb-12">
      <div className="flex items-center space-x-3 mb-5">
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">Data Methodology & Quality Assurance</h3>
          <p className="text-xs text-slate-400">
            Pipeline standards, data preprocessing workflow, and null-safety guarantees
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Cleaning Pipeline Card */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 mb-2">
            <FileCode className="w-4 h-4" />
            <span>Python Pre-processing</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Raw Google Play Store data was cleaned using Python pandas scripts. Duplicate records were removed, column headers standardized, and invalid categories consolidated.
          </p>
        </div>

        {/* Type Conversion Card */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 mb-2">
            <CheckCircle className="w-4 h-4" />
            <span>Sanitized Numerical Parsing</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Formatting characters such as commas and <code className="text-cyan-300">+</code> signs in <code className="text-cyan-300">Installs</code> (e.g. "1,000,000+") and currency symbols in <code className="text-cyan-300">Price</code> (e.g. "$4.99") were programmatically stripped and parsed into exact integers/floats.
          </p>
        </div>

        {/* Null Rating Handling Card */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Zero Imputation Policy</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Missing ratings are strictly preserved as <code className="text-amber-300">null</code> values. Missing ratings are excluded from mean calculations rather than replaced with artificial zeroes or imputed medians.
          </p>
        </div>
      </div>

      {/* Audit Stats Banner */}
      <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>
            Dataset verification complete: <strong className="text-white">{totalRecords.toLocaleString()} sanitized app records</strong> loaded into client state.
          </span>
        </div>
        <span className="text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded-md">
          data/googleplaystore_clean.csv
        </span>
      </div>
    </div>
  );
};
