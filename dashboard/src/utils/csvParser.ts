import Papa from 'papaparse';
import { AppData } from '../types';

export function parseInstalls(value: any): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return isNaN(value) ? 0 : value;
  const cleaned = String(value).replace(/[^0-9]/g, '');
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? 0 : parsed;
}

export function parsePrice(value: any): number {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return isNaN(value) ? 0 : value;
  const cleaned = String(value).replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function parseRating(value: any): number | null {
  if (value === null || value === undefined || value === '') return null;
  const parsed = parseFloat(String(value));
  if (isNaN(parsed) || parsed <= 0 || parsed > 5.0) return null;
  return parsed;
}

export function parseReviews(value: any): number {
  if (value === null || value === undefined) return 0;
  const cleaned = String(value).replace(/[^0-9]/g, '');
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? 0 : parsed;
}

export function parseYear(dateStr: any): number | null {
  if (!dateStr) return null;
  const str = String(dateStr).trim();
  const match = str.match(/\b(20\d\d|19\d\d)\b/);
  if (match) return parseInt(match[1], 10);
  const dateObj = new Date(str);
  if (!isNaN(dateObj.getFullYear())) {
    return dateObj.getFullYear();
  }
  return null;
}

export async function fetchAndParseCSV(csvUrl: string): Promise<AppData[]> {
  const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error(`Failed to load dataset CSV: ${response.statusText}`);
  }
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      complete: (results) => {
        const records: AppData[] = [];
        results.data.forEach((row: any, index: number) => {
          if (!row || !row.App) return;

          const appName = String(row.App).trim();
          if (!appName) return;

          const category = String(row.Category || 'UNCATEGORIZED').trim().toUpperCase();
          const rating = parseRating(row.Rating);
          const reviews = parseReviews(row.Reviews);
          const size = String(row.Size || 'Varies with device').trim();
          const sizeMb = row.Size_MB ? parseFloat(row.Size_MB) : null;
          const installs = parseInstalls(row.Installs);
          const typeStr = String(row.Type || '').trim().toLowerCase();
          const type: 'Free' | 'Paid' = typeStr === 'paid' || parsePrice(row.Price) > 0 ? 'Paid' : 'Free';
          const price = parsePrice(row.Price);
          const contentRating = String(row['Content Rating'] || 'Unrated').trim();
          const genres = String(row.Genres || category).trim();
          const lastUpdated = String(row['Last Updated'] || '').trim();
          const updatedYear = parseYear(lastUpdated);
          const currentVer = String(row['Current Ver'] || 'Varies with device').trim();
          const androidVer = String(row['Android Ver'] || 'Varies with device').trim();

          records.push({
            id: `${appName}-${index}`,
            app: appName,
            category,
            rating,
            reviews,
            size,
            sizeMb: isNaN(sizeMb as number) ? null : sizeMb,
            installs,
            type,
            price,
            contentRating,
            genres,
            lastUpdated,
            updatedYear,
            currentVer,
            androidVer,
          });
        });

        resolve(records);
      },
      error: (error: any) => {
        reject(error);
      },
    });
  });
}
