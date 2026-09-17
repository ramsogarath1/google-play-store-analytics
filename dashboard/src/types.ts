export interface AppData {
  id: string;
  app: string;
  category: string;
  rating: number | null;
  reviews: number;
  size: string;
  sizeMb: number | null;
  installs: number;
  type: 'Free' | 'Paid';
  price: number;
  contentRating: string;
  genres: string;
  lastUpdated: string;
  updatedYear: number | null;
  currentVer: string;
  androidVer: string;
}

export interface FilterState {
  category: string;
  type: string;
  contentRating: string;
  year: string;
  searchQuery: string;
  sortByInstalls: 'highest' | 'lowest';
}

export interface KpiMetrics {
  totalApps: number;
  totalInstalls: number;
  averageRating: number | null;
  totalReviews: number;
  freeAppsCount: number;
  paidAppsCount: number;
  freePercentage: number;
  avgPaidPrice: number;
}

export interface CategoryInstallData {
  category: string;
  installs: number;
  appCount: number;
  formattedInstalls: string;
}

export interface CategoryCountData {
  category: string;
  appCount: number;
  avgRating: number;
}

export interface ScatterPoint {
  app: string;
  reviews: number;
  rating: number;
  installs: number;
  category: string;
  type: 'Free' | 'Paid';
  price: number;
}

export interface FreePaidData {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

export interface ContentRatingData {
  ratingLabel: string;
  count: number;
  percentage: number;
}

export interface YearlyTrendData {
  year: number;
  count: number;
  avgRating: number;
}

export interface KeyInsightItem {
  id: string;
  title: string;
  metric: string;
  subtitle: string;
  description: string;
  category: 'growth' | 'category' | 'monetization' | 'rating' | 'engagement' | 'trend';
  icon: string;
}

export interface BusinessImpactCard {
  role: string;
  title: string;
  summary: string;
  takeaways: string[];
  gradient: string;
  icon: string;
}
