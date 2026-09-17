import React, { useState, useEffect, useMemo } from 'react';
import { AppData, FilterState } from './types';
import { fetchAndParseCSV } from './utils/csvParser';
import {
  filterApps,
  calculateKpis,
  getCategoryInstalls,
  getTopApps,
  getScatterData,
  getFreeVsPaidData,
  getContentRatingData,
  getYearlyTrendData,
  generateKeyInsights,
} from './utils/analytics';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProjectOverviewCards } from './components/ProjectOverviewCards';
import { FilterBar } from './components/FilterBar';
import { KpiSection } from './components/KpiSection';
import { CategoryInstallsChart } from './charts/CategoryInstallsChart';
import { RatingVsReviewsScatter } from './charts/RatingVsReviewsScatter';
import { FreeVsPaidChart } from './charts/FreeVsPaidChart';
import { ContentRatingChart } from './charts/ContentRatingChart';
import { YearlyTrendChart } from './charts/YearlyTrendChart';
import { TopAppsTable } from './components/TopAppsTable';
import { KeyInsightsSection } from './components/KeyInsightsSection';
import { BusinessImpactSection } from './components/BusinessImpactSection';
import { MethodologySection } from './components/MethodologySection';
import { AlertCircle, RefreshCw, LayoutDashboard } from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  category: 'All',
  type: 'All',
  contentRating: 'All',
  year: 'All',
  searchQuery: '',
  sortByInstalls: 'highest',
};

export const App: React.FC = () => {
  const [allApps, setAllApps] = useState<AppData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortOrder, setSortOrder] = useState<'highest' | 'lowest'>('highest');

  // Load CSV data on mount with dynamic base URL resolution for public hosting
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        // Dynamically resolve CSV path based on Vite BASE_URL
        const baseUrl = import.meta.env.BASE_URL || './';
        const csvPath = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}data/googleplaystore_clean.csv`;

        const data = await fetchAndParseCSV(csvPath);
        setAllApps(data);
      } catch (err: any) {
        console.error('Failed to load dataset:', err);
        setError(err.message || 'An error occurred while loading dataset.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filtered dataset
  const filteredApps = useMemo(() => {
    return filterApps(allApps, filters);
  }, [allApps, filters]);

  // Derived filter options from complete dataset
  const categories = useMemo(() => {
    const set = new Set<string>();
    allApps.forEach((a) => set.add(a.category));
    return Array.from(set).sort();
  }, [allApps]);

  const contentRatings = useMemo(() => {
    const set = new Set<string>();
    allApps.forEach((a) => set.add(a.contentRating));
    return Array.from(set).sort();
  }, [allApps]);

  const years = useMemo(() => {
    const set = new Set<number>();
    allApps.forEach((a) => {
      if (a.updatedYear && a.updatedYear >= 2010 && a.updatedYear <= 2026) {
        set.add(a.updatedYear);
      }
    });
    return Array.from(set).sort((a, b) => b - a);
  }, [allApps]);

  // Calculate metrics dynamically based on filtered dataset
  const kpis = useMemo(() => calculateKpis(filteredApps), [filteredApps]);
  const categoryInstallsData = useMemo(() => getCategoryInstalls(filteredApps, sortOrder), [filteredApps, sortOrder]);
  const scatterData = useMemo(() => getScatterData(filteredApps, 300), [filteredApps]);
  const freeVsPaidData = useMemo(() => getFreeVsPaidData(filteredApps), [filteredApps]);
  const contentRatingData = useMemo(() => getContentRatingData(filteredApps), [filteredApps]);
  const yearlyTrendData = useMemo(() => getYearlyTrendData(filteredApps), [filteredApps]);
  const keyInsightsData = useMemo(() => generateKeyInsights(filteredApps), [filteredApps]);

  // Active filters counter
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== 'All') count++;
    if (filters.type !== 'All') count++;
    if (filters.contentRating !== 'All') count++;
    if (filters.year !== 'All') count++;
    if (filters.searchQuery.trim() !== '') count++;
    return count;
  }, [filters]);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const handleExportView = () => {
    const jsonStr = JSON.stringify(filteredApps.slice(0, 100), null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `playstore-analytics-dataset-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex flex-col items-center justify-center p-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl flex items-center space-x-3 text-cyan-400">
          <RefreshCw className="w-6 h-6 animate-spin" />
          <div className="text-left">
            <h2 className="text-sm font-bold text-white">Loading Dataset</h2>
            <p className="text-xs text-slate-400">Parsing googleplaystore_clean.csv...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B0F17] flex flex-col items-center justify-center p-4">
        <div className="max-w-md p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 shadow-2xl text-center font-sans">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-white mb-1">Dataset Load Error</h2>
          <p className="text-xs text-rose-200 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      
      {/* Sticky Header Navigation */}
      <Header
        totalAppsCount={allApps.length}
        filteredCount={filteredApps.length}
        onExport={handleExportView}
      />

      {/* Main Case Study Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. HERO SECTION */}
        <HeroSection />

        {/* 2. PROJECT OVERVIEW (OBJECTIVE | DATASET | KEY QUESTIONS) */}
        <ProjectOverviewCards
          totalAppsCount={allApps.length}
          totalCategoriesCount={categories.length}
        />

        {/* 3. DASHBOARD PREVIEW SECTION */}
        <section id="dashboard" className="mb-14 scroll-mt-20">
          
          {/* Section Header */}
          <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-slate-800/80">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">DASHBOARD PREVIEW</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Interactive exploration of Google Play Store app performance
              </p>
            </div>
          </div>

          {/* 4 Primary KPI Cards in 1 Row */}
          <KpiSection kpis={kpis} />

          {/* Interactive Filter Bar */}
          <FilterBar
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            contentRatings={contentRatings}
            years={years}
            onReset={handleResetFilters}
            activeFilterCount={activeFilterCount}
          />

          {/* Structured Analytics Grid */}
          <div className="space-y-6">
            
            {/* ROW 1: Installs by Category (2-col) + App Type Distribution (1-col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <div className="lg:col-span-2">
                <CategoryInstallsChart
                  data={categoryInstallsData}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                />
              </div>
              <div className="lg:col-span-1">
                <FreeVsPaidChart data={freeVsPaidData} avgPaidPrice={kpis.avgPaidPrice} />
              </div>
            </div>

            {/* ROW 2: Install Trend Over Time (1-col) + Content Rating Distribution (1-col) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <YearlyTrendChart data={yearlyTrendData} />
              <ContentRatingChart data={contentRatingData} />
            </div>

            {/* ROW 3: Rating vs Reviews (2-col) + Top 10 Apps Leaderboard (1-col) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <div className="lg:col-span-2">
                <RatingVsReviewsScatter data={scatterData} />
              </div>
              <div className="lg:col-span-1">
                <TopAppsTable apps={filteredApps} />
              </div>
            </div>

          </div>
        </section>

        {/* 4. KEY INSIGHTS SECTION */}
        <section id="insights" className="scroll-mt-20">
          <KeyInsightsSection insights={keyInsightsData} />
        </section>

        {/* 5. BUSINESS IMPACT SECTION */}
        <BusinessImpactSection />

        {/* 6. METHODOLOGY SECTION */}
        <MethodologySection totalRecords={allApps.length} />

      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <div className="font-bold text-slate-200 text-sm">GOOGLE PLAY STORE ANALYTICS</div>
            <div className="text-slate-400">Data Analytics Portfolio Case Study</div>
          </div>
          <div className="text-slate-400 font-mono text-[11px]">
            Python Data Cleaning • EDA • React • TypeScript • Tailwind CSS • Recharts
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
