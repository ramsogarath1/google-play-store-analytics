import React from 'react';
import { Filter, RotateCcw, Search, Calendar, Tag, ShieldAlert, DollarSign } from 'lucide-react';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  categories: string[];
  contentRatings: string[];
  years: number[];
  onReset: () => void;
  activeFilterCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  categories,
  contentRatings,
  years,
  onReset,
  activeFilterCount,
}) => {
  const handleChange = (field: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="glass-card rounded-2xl p-3.5 sm:p-4 mb-6 border border-slate-800 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Filter Bar Header & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:w-1/3">
          <div className="flex items-center space-x-2 text-slate-300 font-semibold text-xs sm:text-sm">
            <Filter className="w-4 h-4 text-cyan-400" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {activeFilterCount} Active
              </span>
            )}
          </div>

          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search apps..."
              value={filters.searchQuery}
              onChange={(e) => handleChange('searchQuery', e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900/90 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:w-2/3">
          
          {/* Category Dropdown */}
          <div className="relative">
            <div className="flex items-center text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
              <Tag className="w-2.5 h-2.5 mr-1 text-cyan-400" />
              Category
            </div>
            <select
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-2 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="All">All Categories ({categories.length})</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Type Dropdown (Free / Paid) */}
          <div className="relative">
            <div className="flex items-center text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
              <DollarSign className="w-2.5 h-2.5 mr-1 text-purple-400" />
              Type
            </div>
            <select
              value={filters.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-2 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 focus:outline-none focus:border-purple-500 cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="Free">Free Only</option>
              <option value="Paid">Paid Only</option>
            </select>
          </div>

          {/* Content Rating Dropdown */}
          <div className="relative">
            <div className="flex items-center text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
              <ShieldAlert className="w-2.5 h-2.5 mr-1 text-amber-400" />
              Content Rating
            </div>
            <select
              value={filters.contentRating}
              onChange={(e) => handleChange('contentRating', e.target.value)}
              className="w-full px-2 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="All">All Content Ratings</option>
              {contentRatings.map((cr) => (
                <option key={cr} value={cr}>
                  {cr}
                </option>
              ))}
            </select>
          </div>

          {/* Year Dropdown */}
          <div className="relative">
            <div className="flex items-center text-[9px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">
              <Calendar className="w-2.5 h-2.5 mr-1 text-emerald-400" />
              Last Updated Year
            </div>
            <select
              value={filters.year}
              onChange={(e) => handleChange('year', e.target.value)}
              className="w-full px-2 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="All">All Years</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Clear Filters Row */}
      {activeFilterCount > 0 && (
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">
            Filtering active: <span className="text-cyan-400 font-medium">filtered subset active</span>
          </span>
          <button
            onClick={onReset}
            className="flex items-center space-x-1 text-slate-300 hover:text-cyan-400 font-semibold transition-colors text-xs"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};
