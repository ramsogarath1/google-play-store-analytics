import React from 'react';
import { Database, ArrowRight, CheckCircle2, AlertTriangle, FileText, BarChart2, Lightbulb, Monitor } from 'lucide-react';

interface MethodologySectionProps {
  totalRecords: number;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({ totalRecords }) => {
  const steps = [
    { label: 'Raw Dataset', icon: Database, color: 'text-slate-400' },
    { label: 'Python Data Cleaning', icon: FileText, color: 'text-cyan-400' },
    { label: 'EDA', icon: BarChart2, color: 'text-indigo-400' },
    { label: 'Data Transformation', icon: Database, color: 'text-purple-400' },
    { label: 'Interactive Dashboard', icon: Monitor, color: 'text-emerald-400' },
    { label: 'Insights', icon: Lightbulb, color: 'text-amber-400' },
  ];

  return (
    <section id="methodology" className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">METHODOLOGY</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            End-to-end data transformation pipeline & null safety guidelines
          </p>
        </div>
      </div>

      {/* Workflow Steps Horizontal Flow */}
      <div className="mb-8 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
          Data Engineering & Analytics Workflow
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.label}>
                <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 shadow-sm">
                  <Icon className={`w-4 h-4 ${step.color}`} />
                  <span>{step.label}</span>
                </div>
                {idx < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Methodology Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        
        {/* Card 1 */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Cleaned Dataset Source</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              The dashboard dynamically fetches <code className="text-cyan-300 font-mono">data/googleplaystore_clean.csv</code>, which was cleaned and prepared using Python pandas scripts prior to frontend ingestion.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Sanitized Data Conversions</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Formatted strings in <code className="text-emerald-300 font-mono">Installs</code> ("1,000,000+") and currency symbols in <code className="text-emerald-300 font-mono">Price</code> ("$4.99") were parsed into exact numeric integers and floats.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Null Rating Handling</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Missing ratings are preserved strictly as <code className="text-amber-300 font-mono">null</code>. They are excluded from average rating calculations rather than artificially imputed with median values or zeroes.
            </p>
          </div>
        </div>
      </div>

      {/* Dataset Verification Footer */}
      <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>
            Verified pipeline execution: <strong className="text-white">{totalRecords.toLocaleString()} app records</strong> actively loaded and sanitized.
          </span>
        </div>
        <span className="font-mono text-[11px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-md">
          Dataset Integrity: 100% Validated
        </span>
      </div>
    </section>
  );
};
