# 📱 Google Play Store Analytics — Turning App Data Into Growth Insights

[![Live Dashboard](https://img.shields.io/badge/Live_Dashboard-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://google-play-store-analytics-henna.vercel.app/)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ramsogarath1/google-play-store-analytics)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

An end-to-end data analytics portfolio case study exploring **9,659 Google Play Store applications** across 33 categories. This project combines a **Python data cleaning pipeline** with an **interactive React + Vite analytics dashboard** to translate raw mobile marketplace data into actionable growth strategies.

---

## 🚀 Live Demo

> **🌐 Interactive Web Analytics Dashboard**: [google-play-store-analytics-henna.vercel.app](https://google-play-store-analytics-henna.vercel.app/)  
> **📦 GitHub Repository**: [github.com/ramsogarath1/google-play-store-analytics](https://github.com/ramsogarath1/google-play-store-analytics)

---

## 📌 Project Overview

The Google Play Store processes billions of downloads daily across millions of active applications. For developers, product managers, and investors, understanding marketplace dynamics—such as category saturation, pricing friction, review viral loops, and rating drivers—is critical for commercial success.

This project delivers an interactive, portfolio-grade analytics platform that explores app performance, monetization models, audience demographics, and maintenance trends.

---

## 🎯 Business Objective

The primary objective of this case study is to:
1. **Identify Key Drivers**: Determine factors associated with high install volume, user engagement, and customer satisfaction.
2. **Evaluate Market Dynamics**: Contrast category download density against developer competition density.
3. **Quantify Monetization Performance**: Evaluate the performance and pricing friction of Free vs. Paid app models.
4. **Deliver Actionable Growth Insights**: Formulate grounded recommendations for App Developers, Product Teams, Marketing Teams, and Business Analysts.

---

## ❓ Key Questions Investigated

- **Install Distribution**: Which app categories command the highest cumulative download volume?
- **User Engagement**: Which individual apps and categories receive the highest volume of user reviews?
- **Rating vs Engagement**: How does review volume correlate with average star ratings?
- **Monetization Mechanics**: How do Free and Paid apps differ in catalog presence, install conversion, and pricing?
- **Developer Saturation**: Which categories suffer from hyper-fragmentation and heavy competitor density?

---

## 📁 Dataset Overview

The project relies on two dataset files located under the `data/` directory:

| Dataset File | Description | Records | Attributes | Primary Uses |
| :--- | :--- | :---: | :---: | :--- |
| **`data/googleplaystore_raw.csv`** | Raw uncleaned Google Play Store dataset | ~10,841 | 13 | Initial exploration & raw auditing |
| **`data/googleplaystore_clean.csv`** | Cleaned, deduplicated, & type-sanitized dataset | **9,659** | **14** | Live dashboard analytics & visualization |

### Key Dataset Fields
- `App`: Application name
- `Category`: App classification (e.g. GAME, TOOLS, FAMILY, COMMUNICATION)
- `Rating`: Average customer star rating score (1.0 to 5.0)
- `Reviews`: Total user review count
- `Size` / `Size_MB`: App package file size
- `Installs`: Estimated cumulative download bucket (e.g. 1,000,000+)
- `Type`: Monetization classification (`Free` or `Paid`)
- `Price`: App purchase price in USD
- `Content Rating`: Target age maturity classification (e.g. Everyone, Teen, Mature 17+)
- `Genres`: Detailed primary and secondary app genres
- `Last Updated`: Release date of latest app update
- `Current Ver` / `Android Ver`: Version string and minimum OS requirement

---

## 🧹 Data Cleaning & Preparation (Python Pipeline)

Before dashboard visualization, raw data was cleaned and structured using Python scripts located in `python/`:

```
Raw CSV → Duplicate Removal → Column Standardization → Numeric Sanitization → Null Preservation → Clean CSV
```

### Key Processing Steps

1. **Deduplication**: Removed exact and near-duplicate app entries, keeping the record with the highest review count to accurately represent current engagement.
2. **Numeric Sanitization (`Installs`)**: Stripped formatting characters such as commas (`,`) and plus signs (`+`) from strings like `"1,000,000+"` to convert them into exact numeric integers (`1000000`).
3. **Currency Conversion (`Price`)**: Stripped dollar signs (`$`) from pricing strings like `"$4.99"` and converted them to floating-point numbers (`4.99`).
4. **File Size Normalization (`Size_MB`)**: Standardized megabyte (`M`) and kilobyte (`k`) strings into a unified floating-point `Size_MB` numeric column.
5. **Date & Year Extraction (`Last Updated`)**: Parsed release dates into ISO format (`YYYY-MM-DD`) and extracted integer `updatedYear` values (`2010–2018`).
6. **Zero-Imputation Policy (`Rating`)**: **Missing ratings were preserved as `null`**. Missing ratings were excluded from average rating calculations rather than artificially imputed with zeroes or medians, preventing skew in customer satisfaction analysis.

---

## 📈 Exploratory Data Analysis (EDA)

The exploratory analysis conducted via Python scripts (`python/01_data_understanding.py`, `python/03_kpi_analysis.py`) revealed key statistical patterns:

- **Heavy Skew in Downloads**: App installs follow a power-law distribution, where top-tier apps (100M+ installs) drive over 80% of aggregate store downloads.
- **Logarithmic Review Scaling**: Review counts span multiple orders of magnitude (from 1 review to 78M+ reviews on Facebook), requiring logarithmic scaling ($10^x$) for linear correlation analysis.
- **Overwhelming Freemium Dominance**: Over **92%** of published apps are offered for Free, establishing in-app monetization as the primary industry model.

---

## 💻 Interactive Dashboard Features

The web analytics dashboard (`dashboard/`) provides an interactive interface to explore app metrics dynamically:

```
[ HERO SECTION ]
GOOGLE PLAY STORE ANALYTICS — Turning App Data Into Growth Insights

↓

[ PROJECT OVERVIEW ]
OBJECTIVE  |  DATASET (9,659 Apps, 33 Categories)  |  KEY QUESTIONS

↓

[ DASHBOARD PREVIEW ]
-----------------------------------------------------------------------------------
4 KPI CARDS: Total Apps | Total Estimated Installs | Average Rating | Total Reviews
-----------------------------------------------------------------------------------
FILTER BAR:  Search apps... | Category | Type | Content Rating | Year | Reset
-----------------------------------------------------------------------------------
ROW 1:  Installs by Category (Bar Chart)   | App Type Distribution (Donut Chart)
ROW 2:  Install Trend Over Time (Area)     | Content Rating Distribution (Bar)
ROW 3:  Rating vs Reviews (Scatter Plot)   | Top 10 Apps Leaderboard (Table)
-----------------------------------------------------------------------------------

↓

[ KEY INSIGHTS ] (6 Dynamic Data Cards)

↓

[ BUSINESS IMPACT ] (4 Stakeholder Role Cards)

↓

[ METHODOLOGY ] (Pipeline Flow Diagram & Null Safety Notes)
```

### Core Features
- **4 Dynamic KPI Cards**: Reactively calculate Total Apps, Total Estimated Installs, Average Star Rating, and Total User Reviews based on active filters.
- **Multi-Field Filter Panel**: Universal search box + Category, Monetization Type (`Free`/`Paid`), Content Rating, and Last Updated Year dropdowns with active filter counter and instant reset button.
- **Installs by Category Chart**: Horizontal bar chart featuring a **Top 10 / All** view limit toggle and **Highest / Lowest** sort order controls.
- **App Type Distribution Chart**: Donut chart displaying Free vs. Paid app counts, percentages, and average paid app price.
- **Install Trend Over Time Chart**: Line/area chart mapping app maintenance volume per update year.
- **Content Rating Distribution**: Bar chart displaying audience maturity distribution across Everyone, Teen, Everyone 10+, Mature 17+, etc.
- **Rating vs Reviews Scatter Plot**: Logarithmic scatter plot mapping user review volume against star ratings with custom dark hover tooltips.
- **Top 10 Apps Leaderboard**: Ranked table displaying top performers by install volume, star scores, review counts, and category tags.

---

## 💡 Key Insights

All insights are calculated dynamically from the underlying dataset:

1. **Install Concentration**: The **GAME** and **COMMUNICATION** categories dominate overall download volume, driving billions of cumulative installs.
2. **Market Saturation**: Developer competition is highest in **FAMILY** and **GAME** categories, which contain the largest number of published applications.
3. **Freemium Dominance**: Free applications represent **~92%** of the catalog, while Paid apps account for **~8%** with an average price of **~$3.60**.
4. **High Customer Satisfaction**: Categories with substantial app counts maintain an average customer star rating between **4.0★ and 4.3★**.
5. **Logarithmic Viral Loops**: Apps that cross the 1M+ review threshold experience exponential install velocity compared to low-review counterparts.
6. **Maintenance Velocity**: App update activity peaked significantly in recent release years (**2018**), reflecting active platform developer maintenance.

---

## 💼 Business Impact

Recommendations for key stakeholder groups grounded in empirical data:

### 🛠️ App Developers
- **Update Cadence**: Maintain regular release cycles; apps updated within the last year demonstrate higher store visibility and rating retention.
- **Package Optimization**: Optimize app size (`Size_MB`) to reduce download abandonment in emerging markets.
- **Engagement Proxies**: Treat user review volume as a core metric for product usage and active user retention.

### 📐 Product Teams
- **Monetization Architecture**: Adopt freemium models with in-app purchases rather than upfront paywalls to minimize acquisition friction.
- **Niche Paid Positioning**: Restrict upfront pricing strictly to specialized utility or professional niches (e.g., Medical or Specialized Tools).
- **Correlation Caution**: Note that while high review volume correlates with popularity, review volume alone does not prove that high ratings directly cause higher download conversion.

### 📣 Marketing Teams
- **Review Prompting**: Implement early in-app feedback prompts to build social proof required to cross discovery thresholds.
- **Audience Scope**: Target "Everyone" content ratings where possible, as this demographic covers over 80% of total catalog installs.

### 📊 Business & Data Analysts
- **TAM Addressability**: Contrast category download volume against developer count to identify under-served, high-install opportunities.
- **Maintenance Tracking**: Monitor app release velocity as a leading indicator of developer commitment and long-term app survival.

---

## ⚙️ Methodology & Architecture

The project follows a modular 6-stage data analytics workflow:

```text
1. Raw Dataset         → Ingest 10,800+ raw records from Google Play Store CSV
2. Python Cleaning     → Deduplicate, sanitize Installs/Price, parse dates, preserve null ratings
3. EDA                 → Perform statistical profiling, distributions, and correlation checks
4. Data Transformation → Export sanitized googleplaystore_clean.csv (9,659 rows)
5. Web Dashboard       → Stream CSV dynamically into React + Vite + TypeScript client state
6. Insights & Impact   → Calculate dynamic KPIs, render Recharts visuals, and form strategic takeaways
```

---

## 🛠️ Tech Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Data Processing** | `Python 3.10+` | Scripting environment for data cleaning and EDA |
| **Data Manipulation** | `Pandas` | Dataframes, string regex cleaning, deduplication, date parsing |
| **Data Visualization (CLI)** | `Matplotlib` / `Seaborn` | Exploratory chart generation during Python EDA |
| **Frontend Framework** | `React 18` | Declarative component-based user interface |
| **Type Safety** | `TypeScript 5` | Strict interface definitions for app records, filters, and metrics |
| **Build System & Tooling** | `Vite 6` | Fast development server and production bundler |
| **Styling & UI Design** | `Tailwind CSS` | Utility-first dark navy aesthetic & responsive grid layout |
| **Dashboard Charts** | `Recharts` | Interactive SVG visualizations (Bar, Scatter, Donut, Area) |
| **CSV Parsing** | `PapaParse` | Dynamic browser-side CSV fetching and parsing |
| **Icons** | `Lucide React` | Clean modern visual icons |

---

## 📂 Project Structure

```text
01_Google_Play_Store_Analytics/
├── README.md                           # Portfolio case study documentation
├── .gitignore                          # Git ignore rules for node_modules, dist, logs
├── data/
│   ├── googleplaystore_raw.csv         # Raw original Google Play Store CSV dataset
│   └── googleplaystore_clean.csv       # Cleaned dataset (9,659 records)
├── python/
│   ├── 01_data_understanding.py        # Dataset structure analysis & cleaning script
│   ├── 02_proffesional_chart_01.py     # Python exploratory chart script
│   └── 03_kpi_analysis.py              # CLI KPI calculation script
└── dashboard/                          # React + Vite + TypeScript web application
    ├── public/
    │   └── data/
    │       └── googleplaystore_clean.csv # Served CSV dataset for web application
    ├── src/
    │   ├── charts/                     # Interactive Recharts components
    │   │   ├── CategoryCountChart.tsx
    │   │   ├── CategoryInstallsChart.tsx
    │   │   ├── ContentRatingChart.tsx
    │   │   ├── FreeVsPaidChart.tsx
    │   │   ├── RatingVsReviewsScatter.tsx
    │   │   └── YearlyTrendChart.tsx
    │   ├── components/                 # Page section UI components
    │   │   ├── BusinessImpactSection.tsx
    │   │   ├── DataQualitySection.tsx
    │   │   ├── FilterBar.tsx
    │   │   ├── Header.tsx
    │   │   ├── HeroSection.tsx
    │   │   ├── KeyInsightsSection.tsx
    │   │   ├── KpiSection.tsx
    │   │   ├── MethodologySection.tsx
    │   │   ├── ProjectOverviewCards.tsx
    │   │   └── TopAppsTable.tsx
    │   ├── utils/
    │   │   ├── analytics.ts            # Dynamic aggregation & metric calculation engine
    │   │   └── csvParser.ts            # PapaParse CSV reader with type sanitization
    │   ├── types.ts                    # TypeScript interface definitions
    │   ├── vite-env.d.ts               # Vite client environment declarations
    │   ├── App.tsx                     # Main single-page case study layout
    │   ├── index.css                   # Tailwind directives & glassmorphism styles
    │   └── main.tsx                    # React DOM entry point
    ├── index.html                      # HTML entry template
    ├── package.json                    # Dependencies & build scripts
    ├── package-lock.json
    ├── postcss.config.js               # PostCSS plugin configuration
    ├── tailwind.config.js              # Tailwind CSS dark theme configuration
    ├── tsconfig.json                   # TypeScript compiler options
    ├── tsconfig.node.json
    └── vite.config.ts                  # Vite production build configuration
```

---

## 🏃 How to Run Locally

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Step-by-Step Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ramsogarath1/google-play-store-analytics.git
   cd google-play-store-analytics
   ```

2. **Navigate to the dashboard directory**:
   ```bash
   cd dashboard
   ```

3. **Install project dependencies**:
   ```bash
   npm install
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to `http://localhost:3000` to view the interactive dashboard.

---

## 🌐 Production Deployment

The dashboard is configured for automatic static bundling via Vite.

### Production Build
To test the production build locally:

```bash
cd dashboard
npm run build
npm run preview
```

### Deploying to Vercel / Netlify
- **Root Directory**: `dashboard`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Live Vercel Production Deployment**: [google-play-store-analytics-henna.vercel.app](https://google-play-store-analytics-henna.vercel.app/)

---

## 🔮 Future Improvements

- **Sentiment Analysis**: Integrate user review text analysis using Natural Language Processing (NLP) to extract feature feedback.
- **Predictive Machine Learning**: Train regression models to predict app download success based on initial size, rating, price, and category.
- **Automated Data Ingestion**: Set up automated web scraping or API pipelines to refresh Google Play Store app data periodically.
