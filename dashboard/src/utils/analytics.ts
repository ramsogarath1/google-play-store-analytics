import {
  AppData,
  FilterState,
  KpiMetrics,
  CategoryInstallData,
  CategoryCountData,
  ScatterPoint,
  FreePaidData,
  ContentRatingData,
  YearlyTrendData,
  KeyInsightItem,
} from '../types';

export function formatLargeNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toLocaleString();
}

export function filterApps(apps: AppData[], filters: FilterState): AppData[] {
  return apps.filter((app) => {
    if (filters.category !== 'All' && app.category !== filters.category) {
      return false;
    }
    if (filters.type !== 'All' && app.type !== filters.type) {
      return false;
    }
    if (filters.contentRating !== 'All' && app.contentRating !== filters.contentRating) {
      return false;
    }
    if (filters.year !== 'All' && String(app.updatedYear) !== filters.year) {
      return false;
    }
    if (filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase().trim();
      const matchName = app.app.toLowerCase().includes(query);
      const matchCategory = app.category.toLowerCase().includes(query);
      const matchGenre = app.genres.toLowerCase().includes(query);
      if (!matchName && !matchCategory && !matchGenre) return false;
    }
    return true;
  });
}

export function calculateKpis(apps: AppData[]): KpiMetrics {
  const totalApps = apps.length;
  let totalInstalls = 0;
  let totalReviews = 0;
  let ratingSum = 0;
  let ratingCount = 0;
  let freeAppsCount = 0;
  let paidAppsCount = 0;
  let paidPriceSum = 0;

  apps.forEach((app) => {
    totalInstalls += app.installs;
    totalReviews += app.reviews;

    if (app.rating !== null && !isNaN(app.rating)) {
      ratingSum += app.rating;
      ratingCount++;
    }

    if (app.type === 'Free') {
      freeAppsCount++;
    } else {
      paidAppsCount++;
      paidPriceSum += app.price;
    }
  });

  const averageRating = ratingCount > 0 ? ratingSum / ratingCount : null;
  const freePercentage = totalApps > 0 ? (freeAppsCount / totalApps) * 100 : 0;
  const avgPaidPrice = paidAppsCount > 0 ? paidPriceSum / paidAppsCount : 0;

  return {
    totalApps,
    totalInstalls,
    averageRating,
    totalReviews,
    freeAppsCount,
    paidAppsCount,
    freePercentage,
    avgPaidPrice,
  };
}

export function getCategoryInstalls(apps: AppData[], sort: 'highest' | 'lowest' = 'highest'): CategoryInstallData[] {
  const map: Record<string, { installs: number; appCount: number }> = {};

  apps.forEach((app) => {
    if (!map[app.category]) {
      map[app.category] = { installs: 0, appCount: 0 };
    }
    map[app.category].installs += app.installs;
    map[app.category].appCount += 1;
  });

  const result: CategoryInstallData[] = Object.entries(map).map(([category, data]) => ({
    category,
    installs: data.installs,
    appCount: data.appCount,
    formattedInstalls: formatLargeNumber(data.installs),
  }));

  result.sort((a, b) => (sort === 'highest' ? b.installs - a.installs : a.installs - b.installs));
  return result;
}

export function getCategoryAppCounts(apps: AppData[]): CategoryCountData[] {
  const map: Record<string, { count: number; ratingSum: number; ratingCount: number }> = {};

  apps.forEach((app) => {
    if (!map[app.category]) {
      map[app.category] = { count: 0, ratingSum: 0, ratingCount: 0 };
    }
    map[app.category].count += 1;
    if (app.rating !== null) {
      map[app.category].ratingSum += app.rating;
      map[app.category].ratingCount += 1;
    }
  });

  const result: CategoryCountData[] = Object.entries(map).map(([category, data]) => ({
    category,
    appCount: data.count,
    avgRating: data.ratingCount > 0 ? parseFloat((data.ratingSum / data.ratingCount).toFixed(2)) : 0,
  }));

  result.sort((a, b) => b.appCount - a.appCount);
  return result;
}

export function getTopApps(apps: AppData[], limit: number = 10): AppData[] {
  return [...apps]
    .sort((a, b) => {
      if (b.installs !== a.installs) {
        return b.installs - a.installs;
      }
      return b.reviews - a.reviews;
    })
    .slice(0, limit);
}

export function getScatterData(apps: AppData[], sampleLimit: number = 300): ScatterPoint[] {
  const valid = apps.filter((app) => app.rating !== null && app.reviews > 0);
  const sorted = [...valid].sort((a, b) => b.reviews - a.reviews);
  const sampled = sorted.slice(0, sampleLimit);

  return sampled.map((app) => ({
    app: app.app,
    reviews: app.reviews,
    rating: app.rating as number,
    installs: app.installs,
    category: app.category,
    type: app.type,
    price: app.price,
  }));
}

export function getFreeVsPaidData(apps: AppData[]): FreePaidData[] {
  const kpis = calculateKpis(apps);
  return [
    {
      name: 'Free Apps',
      value: kpis.freeAppsCount,
      percentage: parseFloat(kpis.freePercentage.toFixed(1)),
      color: '#06B6D4',
    },
    {
      name: 'Paid Apps',
      value: kpis.paidAppsCount,
      percentage: parseFloat((100 - kpis.freePercentage).toFixed(1)),
      color: '#8B5CF6',
    },
  ];
}

export function getContentRatingData(apps: AppData[]): ContentRatingData[] {
  const map: Record<string, number> = {};
  const total = apps.length;

  apps.forEach((app) => {
    const key = app.contentRating || 'Unrated';
    map[key] = (map[key] || 0) + 1;
  });

  const result: ContentRatingData[] = Object.entries(map).map(([ratingLabel, count]) => ({
    ratingLabel,
    count,
    percentage: total > 0 ? parseFloat(((count / total) * 100).toFixed(1)) : 0,
  }));

  result.sort((a, b) => b.count - a.count);
  return result;
}

export function getYearlyTrendData(apps: AppData[]): YearlyTrendData[] {
  const map: Record<number, { count: number; ratingSum: number; ratingCount: number }> = {};

  apps.forEach((app) => {
    if (app.updatedYear && app.updatedYear >= 2010 && app.updatedYear <= 2026) {
      const year = app.updatedYear;
      if (!map[year]) {
        map[year] = { count: 0, ratingSum: 0, ratingCount: 0 };
      }
      map[year].count += 1;
      if (app.rating !== null) {
        map[year].ratingSum += app.rating;
        map[year].ratingCount += 1;
      }
    }
  });

  const result: YearlyTrendData[] = Object.entries(map).map(([yearStr, data]) => ({
    year: parseInt(yearStr, 10),
    count: data.count,
    avgRating: data.ratingCount > 0 ? parseFloat((data.ratingSum / data.ratingCount).toFixed(2)) : 0,
  }));

  result.sort((a, b) => a.year - b.year);
  return result;
}

export function generateKeyInsights(apps: AppData[]): KeyInsightItem[] {
  if (apps.length === 0) return [];

  const categoryInstalls = getCategoryInstalls(apps, 'highest');
  const categoryCounts = getCategoryAppCounts(apps);
  const kpis = calculateKpis(apps);
  const topApp = getTopApps(apps, 1)[0];
  const yearlyTrend = getYearlyTrendData(apps);

  const topInstallCat = categoryInstalls[0] || { category: 'N/A', installs: 0 };
  const topCountCat = categoryCounts[0] || { category: 'N/A', appCount: 0 };

  const minAppsThreshold = Math.min(10, Math.ceil(apps.length * 0.005));
  const eligibleCats = categoryCounts.filter((c) => c.appCount >= minAppsThreshold);
  eligibleCats.sort((a, b) => b.avgRating - a.avgRating);
  const topRatedCat = eligibleCats[0] || categoryCounts[0] || { category: 'N/A', avgRating: 0 };

  const sortedYears = [...yearlyTrend].sort((a, b) => b.count - a.count);
  const peakYear = sortedYears[0] || { year: 2018, count: 0 };

  return [
    {
      id: 'insight-1',
      title: 'Top Category by Installs',
      metric: topInstallCat.category,
      subtitle: `${formatLargeNumber(topInstallCat.installs)} total estimated installs`,
      description: `The ${topInstallCat.category} category represents the single largest install driver across the Google Play Store catalog.`,
      category: 'growth',
      icon: 'TrendingUp',
    },
    {
      id: 'insight-2',
      title: 'Highest Category App Volume',
      metric: topCountCat.category,
      subtitle: `${topCountCat.appCount.toLocaleString()} published apps`,
      description: `${topCountCat.category} contains the largest number of total apps, indicating high developer competition.`,
      category: 'category',
      icon: 'Grid',
    },
    {
      id: 'insight-3',
      title: 'Catalog Monetization Split',
      metric: `${kpis.freePercentage.toFixed(1)}% Free`,
      subtitle: `Avg paid app price: $${kpis.avgPaidPrice.toFixed(2)}`,
      description: `Free apps represent ${kpis.freePercentage.toFixed(1)}% of the catalog, while paid apps average $${kpis.avgPaidPrice.toFixed(2)}.`,
      category: 'monetization',
      icon: 'DollarSign',
    },
    {
      id: 'insight-4',
      title: 'Highest Average Rating Category',
      metric: topRatedCat.category,
      subtitle: `${topRatedCat.avgRating.toFixed(2)} average star score`,
      description: `The ${topRatedCat.category} category maintains the highest overall customer rating score among categories with significant app counts.`,
      category: 'rating',
      icon: 'Star',
    },
    {
      id: 'insight-5',
      title: 'Most Reviewed Application',
      metric: topApp ? topApp.app : 'N/A',
      subtitle: topApp ? `${formatLargeNumber(topApp.reviews)} reviews (${topApp.rating || 'N/A'}★)` : 'N/A',
      description: `The single most reviewed app in the selected dataset is ${topApp ? topApp.app : 'N/A'}, showing massive engagement volume.`,
      category: 'engagement',
      icon: 'MessageSquare',
    },
    {
      id: 'insight-6',
      title: 'Peak Maintenance Year',
      metric: `Year ${peakYear.year}`,
      subtitle: `${peakYear.count.toLocaleString()} apps updated`,
      description: `The year with the highest number of updated apps in the dataset is ${peakYear.year}, with ${peakYear.count.toLocaleString()} total app updates recorded.`,
      category: 'trend',
      icon: 'Clock',
    },
  ];
}
