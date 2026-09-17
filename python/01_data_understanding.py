import pandas as pd
import matplotlib.pyplot as plt

# Load the raw dataset
df = pd.read_csv("data/googleplaystore_raw.csv")

print("FIRST 5 ROWS")
print(df.head())

print("\nDATASET SHAPE")
print(df.shape)

print("\nCOLUMN NAMES")
print(df.columns.tolist())

print("\nDATASET INFORMATION")
df.info()

print("\nMISSING VALUES")
print(df.isnull().sum())

print("\nDUPLICATE ROWS")
print(df.duplicated().sum())

print("\nUNIQUE CATEGORIES")
print(df["Category"].nunique())
print(df["Category"].unique())

print("\nFREE vs PAID")
print(df["Type"].value_counts())

print("\nRATING SUMMARY")
print(df["Rating"].describe())

print("\nSAMPLE REVIEWS")
print(df["Reviews"].head(10))

print("\nSAMPLE INSTALLS")
print(df["Installs"].head(10))

print("\nSAMPLE PRICE")
print(df["Price"].head(10))
print("\nSUSPICIOUS CATEGORY ROW")
print(df[df["Category"] == "1.9"])

print("\nSUSPICIOUS TYPE ROW")
print(df[df["Type"] == "0"])

print("\nSUSPICIOUS RATING ROW")
print(df[df["Rating"] > 5])
print("\nFULL SUSPICIOUS ROW")
print(df.loc[10472].to_string())
# Remove duplicate rows
df_clean = df.drop_duplicates()
# Fix invalid ratings
df_clean.loc[df_clean["Rating"] > 5, "Rating"] = pd.NA

print("\nINVALID RATINGS AFTER CLEANING")
print(df_clean[df_clean["Rating"] > 5])

print("\nBEFORE REMOVING DUPLICATES")
print(df.shape)

print("\nAFTER REMOVING DUPLICATES")
print(df_clean.shape)

print("\nDUPLICATE ROWS REMOVED")
print(df.shape[0] - df_clean.shape[0])
# Fix invalid Type value
df_clean.loc[~df_clean["Type"].isin(["Free", "Paid"]), "Type"] = pd.NA

print("\nTYPE VALUES AFTER CLEANING")
print(df_clean["Type"].value_counts(dropna=False))
# Remove malformed row
df_clean = df_clean[df_clean["Category"] != "1.9"]

print("\nAFTER REMOVING MALFORMED ROW")
print(df_clean.shape)

print("\nTYPE VALUES")
print(df_clean["Type"].value_counts(dropna=False))
# Convert Reviews to numeric
df_clean["Reviews"] = pd.to_numeric(df_clean["Reviews"], errors="coerce")

print("\nREVIEWS DATA TYPE")
print(df_clean["Reviews"].dtype)

print("\nSAMPLE REVIEWS AFTER CLEANING")
print(df_clean["Reviews"].head(10))
# Convert Installs to numeric
df_clean["Installs"] = (
    df_clean["Installs"]
    .str.replace(",", "", regex=False)
    .str.replace("+", "", regex=False)
)

df_clean["Installs"] = pd.to_numeric(df_clean["Installs"], errors="coerce")

print("\nINSTALLS DATA TYPE")
print(df_clean["Installs"].dtype)

print("\nSAMPLE INSTALLS AFTER CLEANING")
print(df_clean["Installs"].head(10))
# Convert Price to numeric
df_clean["Price"] = (
    df_clean["Price"]
    .str.replace("$", "", regex=False)
)

df_clean["Price"] = pd.to_numeric(df_clean["Price"], errors="coerce")

print("\nPRICE DATA TYPE")
print(df_clean["Price"].dtype)

print("\nSAMPLE PRICES AFTER CLEANING")
print(df_clean["Price"].head(20))
# Convert Size to MB

def convert_size(size):
    if size == "Varies with device":
        return pd.NA

    if isinstance(size, str):
        if size.endswith("M"):
            return float(size.replace("M", ""))
        elif size.endswith("k"):
            return float(size.replace("k", "")) / 1024

    return pd.to_numeric(size, errors="coerce")


df_clean["Size_MB"] = df_clean["Size"].apply(convert_size)

print("\nSIZE DATA TYPE")
print(df_clean["Size_MB"].dtype)

print("\nSAMPLE SIZE AFTER CLEANING")
print(df_clean[["Size", "Size_MB"]].head(20))
# Convert Last Updated to date

df_clean["Last Updated"] = pd.to_datetime(
    df_clean["Last Updated"],
    errors="coerce"
)

print("\nLAST UPDATED DATA TYPE")
print(df_clean["Last Updated"].dtype)

print("\nSAMPLE LAST UPDATED")
print(df_clean["Last Updated"].head(10))
# Check missing values after cleaning

print("\nMISSING VALUES AFTER CLEANING")
print(df_clean.isnull().sum())
print("\nMISSING TYPE ROW")
print(df_clean[df_clean["Type"].isna()].to_string())
print("\nMISSING TYPE - PRICE CHECK")
print(df_clean[df_clean["App"] == "Command & Conquer: Rivals"][["App", "Type", "Price", "Installs"]].to_string())
print("\nMISSING CURRENT VERSION ROWS")
print(
    df_clean[df_clean["Current Ver"].isna()]
    [["App", "Category", "Rating", "Reviews", "Installs", "Type", "Current Ver", "Android Ver"]]
    .to_string()
)
print("\nMISSING ANDROID VERSION ROWS")
print(
    df_clean[df_clean["Android Ver"].isna()]
    [["App", "Category", "Rating", "Reviews", "Installs",
      "Type", "Current Ver", "Android Ver"]]
    .to_string()
)
print("\nMISSING RATING ANALYSIS")

print(
    df_clean[df_clean["Rating"].isna()]
    [["App", "Category", "Reviews", "Installs", "Type"]]
    .head(20)
    .to_string()
)
print("\nCATEGORY CHECK AFTER CLEANING")

print("Total Categories:", df_clean["Category"].nunique())

print("\nCategories:")
print(df_clean["Category"].unique())
print("\nDUPLICATE APP NAMES")

duplicate_apps = df_clean[df_clean["App"].duplicated(keep=False)]

print("Total rows with duplicate app names:", len(duplicate_apps))

print("\nTop repeated apps:")
print(
    df_clean["App"]
    .value_counts()
    .head(20)
)
print("\nROBLOX DUPLICATE RECORDS")

print(
    df_clean[df_clean["App"] == "ROBLOX"]
    [["App", "Category", "Rating", "Reviews", "Installs", "Type", "Price", "Last Updated", "Current Ver"]]
    .to_string(index=False)
)
print("\nROBLOX - APP + CATEGORY CHECK")

print(
    df_clean[df_clean["App"] == "ROBLOX"]
    .groupby(["App", "Category"])
    .size()
)
print("\nROBLOX - FULL DETAILS")

print(
    df_clean[df_clean["App"] == "ROBLOX"]
    [["App", "Category", "Rating", "Reviews", "Installs", "Type", "Price",
      "Content Rating", "Genres", "Last Updated", "Current Ver", "Android Ver"]]
    .to_string(index=False)
)
print("\nAPP NAME DUPLICATE SUMMARY")

app_counts = df_clean["App"].value_counts()

print("Total unique apps:", df_clean["App"].nunique())

print("Apps appearing more than once:", (app_counts > 1).sum())

print("Apps appearing only once:", (app_counts == 1).sum())
print("\nDUPLICATE APP + CATEGORY CHECK")

app_category_duplicates = (
    df_clean
    .groupby(["App", "Category"])
    .size()
    .reset_index(name="Count")
)

print(
    app_category_duplicates[
        app_category_duplicates["Count"] > 1
    ]
    .sort_values("Count", ascending=False)
    .head(20)
    .to_string(index=False)
)
print("\nCREATING ONE RECORD PER APP")

# Keep the record with the highest number of reviews for each app
df_clean = (
    df_clean
    .sort_values("Reviews", ascending=False)
    .drop_duplicates(subset="App", keep="first")
)

print("Rows after keeping one record per app:", df_clean.shape[0])
print("Unique apps:", df_clean["App"].nunique())

print("\nCHECK ROBLOX AFTER CLEANING")

print(
    df_clean[df_clean["App"] == "ROBLOX"]
    [["App", "Category", "Rating", "Reviews", "Installs", "Type"]]
    .to_string(index=False)
)
# Save cleaned dataset

df_clean.to_csv(
    "data/googleplaystore_clean.csv",
    index=False
)

print("\nCLEANED DATASET SAVED")
print("Rows:", df_clean.shape[0])
print("Columns:", df_clean.shape[1])
# ==========================================
# BASIC EDA - DATASET OVERVIEW
# ==========================================

print("\n===== BASIC EDA =====")

print("\nTotal Apps:")
print(df_clean["App"].nunique())

print("\nTotal Categories:")
print(df_clean["Category"].nunique())

print("\nFree vs Paid Apps:")
print(df_clean["Type"].value_counts(dropna=False))

print("\nTop 10 Categories by Number of Apps:")
print(
    df_clean["Category"]
    .value_counts()
    .head(10)
)
# ==========================================
# CATEGORY DISTRIBUTION - PERCENTAGE
# ==========================================

print("\n===== CATEGORY DISTRIBUTION =====")

category_count = df_clean["Category"].value_counts()

category_percentage = (
    df_clean["Category"]
    .value_counts(normalize=True)
    .mul(100)
    .round(2)
)

category_summary = pd.DataFrame({
    "App_Count": category_count,
    "Percentage": category_percentage
})

print("\nTop 10 Categories by App Count and Percentage:")
print(category_summary.head(10))
# ==========================================
# TOP CATEGORIES BY INSTALLS
# ==========================================

print("\n===== CATEGORY INSTALL ANALYSIS =====")

category_installs = (
    df_clean
    .groupby("Category")["Installs"]
    .sum()
    .sort_values(ascending=False)
)

print("\nTop 10 Categories by Total Installs:")
print(category_installs.head(10))
# ==========================================
# CATEGORY: APP COUNT vs TOTAL INSTALLS
# ==========================================

print("\n===== APP COUNT vs TOTAL INSTALLS =====")

category_analysis = df_clean.groupby("Category").agg(
    App_Count=("App", "count"),
    Total_Installs=("Installs", "sum")
)

category_analysis = category_analysis.sort_values(
    "Total_Installs",
    ascending=False
)

print("\nTop 10 Categories:")
print(category_analysis.head(10))
# ==========================================
# AVERAGE INSTALLS PER APP
# ==========================================

print("\n===== AVERAGE INSTALLS PER APP =====")

category_analysis["Avg_Installs_Per_App"] = (
    category_analysis["Total_Installs"] /
    category_analysis["App_Count"]
).round(0)

print("\nTop 10 Categories by Average Installs per App:")
print(
    category_analysis
    .sort_values("Avg_Installs_Per_App", ascending=False)
    .head(10)
)
# ==========================================
# FREE vs PAID APP ANALYSIS
# ==========================================

print("\n===== FREE vs PAID ANALYSIS =====")

type_analysis = df_clean.groupby("Type").agg(
    App_Count=("App", "count"),
    Total_Installs=("Installs", "sum"),
    Avg_Installs=("Installs", "mean"),
    Avg_Rating=("Rating", "mean")
).round(2)

print("\nFree vs Paid Performance:")
print(type_analysis)
# ==========================================
# RATING vs POPULARITY ANALYSIS
# ==========================================

print("\n===== RATING vs POPULARITY ANALYSIS =====")

rating_analysis = df_clean.groupby(
    pd.cut(
        df_clean["Reviews"],
        bins=[0, 1000, 10000, 100000, 1000000, float("inf")],
        labels=[
            "0-1K",
            "1K-10K",
            "10K-100K",
            "100K-1M",
            "1M+"
        ]
    )
).agg(
    App_Count=("App", "count"),
    Avg_Rating=("Rating", "mean"),
    Avg_Installs=("Installs", "mean")
).round(2)

print("\nRating vs Reviews:")
print(rating_analysis)
# ==========================================
# TOP APPS BY INSTALLS
# ==========================================

print("\n===== TOP APPS BY INSTALLS =====")

top_apps = (
    df_clean[
        ["App", "Category", "Rating", "Reviews", "Installs", "Type"]
    ]
    .sort_values("Installs", ascending=False)
    .head(20)
)

print("\nTop 20 Apps by Installs:")
print(top_apps.to_string(index=False))
# ==========================================
# RATING DISTRIBUTION
# ==========================================

print("\n===== RATING DISTRIBUTION =====")

rating_distribution = pd.cut(
    df_clean["Rating"],
    bins=[0, 3, 4, 4.5, 5],
    labels=[
        "Below 3",
        "3 - 4",
        "4 - 4.5",
        "4.5 - 5"
    ],
    include_lowest=True
).value_counts().sort_index()

print("\nApps by Rating Range:")
print(rating_distribution)

print("\nMissing Ratings:")
print(df_clean["Rating"].isna().sum())
# ==========================================
# CATEGORY vs RATING ANALYSIS
# ==========================================

print("\n===== CATEGORY vs RATING ANALYSIS =====")

category_rating = df_clean.groupby("Category").agg(
    App_Count=("App", "count"),
    Avg_Rating=("Rating", "mean"),
    Avg_Reviews=("Reviews", "mean"),
    Total_Installs=("Installs", "sum")
).round(2)

category_rating = category_rating.sort_values(
    "Avg_Rating",
    ascending=False
)

print("\nTop Categories by Average Rating:")
print(category_rating.head(10))
print("\nAverage Rating by Category:")

print(
    category_rating[
        ["App_Count", "Avg_Rating", "Total_Installs"]
    ].head(15).to_string()
)
# ==========================================
# CATEGORY OPPORTUNITY ANALYSIS
# ==========================================

print("\n===== CATEGORY OPPORTUNITY ANALYSIS =====")

opportunity = df_clean.groupby("Category").agg(
    App_Count=("App", "count"),
    Avg_Rating=("Rating", "mean"),
    Total_Installs=("Installs", "sum"),
    Avg_Installs=("Installs", "mean")
)

opportunity["Avg_Installs_Per_App"] = (
    opportunity["Total_Installs"] /
    opportunity["App_Count"]
)

# Keep categories with at least 50 apps
opportunity = opportunity[
    opportunity["App_Count"] >= 50
]

# Rank each metric
opportunity["Rating_Rank"] = opportunity["Avg_Rating"].rank(
    ascending=False
)

opportunity["Install_Rank"] = opportunity["Avg_Installs_Per_App"].rank(
    ascending=False
)

opportunity["Competition_Rank"] = opportunity["App_Count"].rank(
    ascending=True
)

# Combined opportunity score
opportunity["Opportunity_Score"] = (
    opportunity["Rating_Rank"] * -1
    + opportunity["Install_Rank"] * -1
    + opportunity["Competition_Rank"]
)

opportunity = opportunity.sort_values(
    "Opportunity_Score",
    ascending=False
)

print("\nTop Categories by Opportunity Score:")

print(
    opportunity[
        [
            "App_Count",
            "Avg_Rating",
            "Avg_Installs_Per_App",
            "Opportunity_Score"
        ]
    ].head(15).round(2).to_string()
)
# ==========================================
# CATEGORY OPPORTUNITY SHORTLIST
# ==========================================

print("\n===== CATEGORY OPPORTUNITY SHORTLIST =====")

opportunity_shortlist = df_clean.groupby("Category").agg(
    App_Count=("App", "count"),
    Avg_Rating=("Rating", "mean"),
    Avg_Installs_Per_App=("Installs", "mean")
)

# Minimum 50 apps for a more reliable comparison
opportunity_shortlist = opportunity_shortlist[
    opportunity_shortlist["App_Count"] >= 50
]

# Demand threshold = median average installs
demand_threshold = opportunity_shortlist[
    "Avg_Installs_Per_App"
].median()

# Rating threshold = median average rating
rating_threshold = opportunity_shortlist[
    "Avg_Rating"
].median()

# Lower competition = below median app count
competition_threshold = opportunity_shortlist[
    "App_Count"
].median()

opportunity_shortlist["High_Demand"] = (
    opportunity_shortlist["Avg_Installs_Per_App"]
    >= demand_threshold
)

opportunity_shortlist["High_Rating"] = (
    opportunity_shortlist["Avg_Rating"]
    >= rating_threshold
)

opportunity_shortlist["Lower_Competition"] = (
    opportunity_shortlist["App_Count"]
    <= competition_threshold
)

# Categories satisfying all three conditions
shortlist = opportunity_shortlist[
    (opportunity_shortlist["High_Demand"]) &
    (opportunity_shortlist["High_Rating"]) &
    (opportunity_shortlist["Lower_Competition"])
]

print("\nDemand Threshold:")
print(round(demand_threshold, 2))

print("\nRating Threshold:")
print(round(rating_threshold, 2))

print("\nCompetition Threshold:")
print(round(competition_threshold, 2))

print("\nPotential Opportunity Categories:")

print(
    shortlist.sort_values(
        "Avg_Installs_Per_App",
        ascending=False
    ).round(2).to_string()
)
# ==========================================
# CONTENT RATING ANALYSIS
# ==========================================

print("\n===== CONTENT RATING ANALYSIS =====")

content_analysis = df_clean.groupby("Content Rating").agg(
    App_Count=("App", "count"),
    Total_Installs=("Installs", "sum"),
    Avg_Installs=("Installs", "mean"),
    Avg_Rating=("Rating", "mean")
).sort_values(
    "Total_Installs",
    ascending=False
).round(2)

print("\nContent Rating Performance:")

print(
    content_analysis.to_string()
)
# ==========================================
# PAID APP CATEGORY ANALYSIS
# ==========================================

print("\n===== PAID APP CATEGORY ANALYSIS =====")

paid_category = (
    df_clean[df_clean["Type"] == "Paid"]
    .groupby("Category")
    .agg(
        Paid_App_Count=("App", "count"),
        Avg_Price=("Price", "mean"),
        Avg_Installs=("Installs", "mean"),
        Avg_Rating=("Rating", "mean")
    )
    .sort_values(
        "Avg_Installs",
        ascending=False
    )
    .round(2)
)

print("\nPaid Apps by Category:")

print(
    paid_category
    .head(15)
    .to_string()
)
# ==========================================
# PRICE vs INSTALLS ANALYSIS
# ==========================================

print("\n===== PRICE vs INSTALLS ANALYSIS =====")

price_analysis = df_clean[
    (df_clean["Type"] == "Paid") &
    (df_clean["Price"] > 0)
][
    ["App", "Category", "Price", "Installs", "Rating", "Reviews"]
].copy()

print("\nPaid Apps - Price vs Installs:")

print(
    price_analysis
    .sort_values("Price", ascending=False)
    .head(20)
    .to_string(index=False)
)
# ==========================================
# PAID APP PRICE RANGE ANALYSIS
# ==========================================

print("\n===== PAID APP PRICE RANGE ANALYSIS =====")

paid_apps = df_clean[
    (df_clean["Type"] == "Paid") &
    (df_clean["Price"] > 0)
].copy()

paid_apps["Price_Range"] = pd.cut(
    paid_apps["Price"],
    bins=[0, 5, 10, 25, 50, float("inf")],
    labels=[
        "$0-$5",
        "$5-$10",
        "$10-$25",
        "$25-$50",
        "$50+"
    ],
    include_lowest=True
)

price_range_analysis = paid_apps.groupby(
    "Price_Range",
    observed=True
).agg(
    App_Count=("App", "count"),
    Avg_Installs=("Installs", "mean"),
    Avg_Rating=("Rating", "mean")
).round(2)

print("\nPaid Apps by Price Range:")

print(
    price_range_analysis.to_string()
)
# ==========================================
# CORRELATION ANALYSIS
# ==========================================

print("\n===== CORRELATION ANALYSIS =====")

correlation_data = df_clean[
    [
        "Rating",
        "Reviews",
        "Installs",
        "Price"
    ]
].copy()

correlation_matrix = correlation_data.corr(
    numeric_only=True
).round(3)

print("\nCorrelation Matrix:")

print(
    correlation_matrix.to_string()
)
# ==========================================
# PROFESSIONAL CHART 1
# TOP 10 CATEGORIES BY TOTAL INSTALLS
# ==========================================

top_categories = (
    df_clean.groupby("Category")["Installs"]
    .sum()
    .sort_values(ascending=False)
    .head(10)
)

plt.figure(figsize=(11, 6))

ax = top_categories.sort_values().plot(
    kind="barh"
)

plt.title(
    "Top 10 App Categories by Total Installs",
    fontsize=16,
    fontweight="bold"
)

plt.xlabel("Estimated Total Installs")
plt.ylabel("Category")

for i, value in enumerate(top_categories.sort_values()):
    ax.text(
        value,
        i,
        f" {value / 1_000_000_000:.2f}B",
        va="center"
    )

plt.tight_layout()

plt.show()


# ==========================================
# VISUALIZATION 2
# APP COUNT VS TOTAL INSTALLS
# ==========================================

category_analysis = df_clean.groupby("Category").agg(
    App_Count=("App", "count"),
    Total_Installs=("Installs", "sum")
)

plt.figure(figsize=(10, 6))

plt.scatter(
    category_analysis["App_Count"],
    category_analysis["Total_Installs"]
)

plt.title("App Count vs Total Installs by Category")
plt.xlabel("Number of Apps")
plt.ylabel("Total Installs")

plt.tight_layout()

#plt.show()
# ==========================================
# VISUALIZATION 3
# FREE VS PAID APPS
# ==========================================

type_analysis = df_clean.groupby("Type").agg(
    App_Count=("App", "count"),
    Total_Installs=("Installs", "sum")
)

plt.figure(figsize=(8, 5))

type_analysis["App_Count"].plot(
    kind="bar"
)

plt.title("Free vs Paid Apps")
plt.xlabel("App Type")
plt.ylabel("Number of Apps")

plt.xticks(rotation=0)

plt.tight_layout()

#plt.show()
# ==========================================
# VISUALIZATION 4
# FREE VS PAID - TOTAL INSTALLS
# ==========================================

plt.figure(figsize=(8, 5))

type_analysis["Total_Installs"].plot(
    kind="bar"
)

plt.title("Free vs Paid Apps - Total Installs")
plt.xlabel("App Type")
plt.ylabel("Total Installs")

plt.xticks(rotation=0)

plt.tight_layout()

#plt.show()
# ==========================================
# VISUALIZATION 5
# REVIEWS VS INSTALLS
# ==========================================

plt.figure(figsize=(10, 6))

plt.scatter(
    df_clean["Reviews"],
    df_clean["Installs"],
    alpha=0.5
)

plt.title("Reviews vs Installs")
plt.xlabel("Number of Reviews")
plt.ylabel("Estimated Installs")

plt.tight_layout()

#plt.show()
# ==========================================
# VISUALIZATION 6
# RATING DISTRIBUTION
# ==========================================

rating_distribution = pd.cut(
    df_clean["Rating"],
    bins=[0, 3, 4, 4.5, 5],
    labels=[
        "Below 3",
        "3 - 4",
        "4 - 4.5",
        "4.5 - 5"
    ],
    include_lowest=True
).value_counts().sort_index()

plt.figure(figsize=(9, 5))

rating_distribution.plot(
    kind="bar"
)

plt.title("Distribution of App Ratings")
plt.xlabel("Rating Range")
plt.ylabel("Number of Apps")

plt.xticks(rotation=0)

plt.tight_layout()

#plt.show()
# ==========================================
# VISUALIZATION 7
# CATEGORY VS AVERAGE RATING
# ==========================================

category_rating_chart = (
    df_clean.groupby("Category")["Rating"]
    .mean()
    .sort_values(ascending=False)
    .head(10)
)

plt.figure(figsize=(10, 6))

category_rating_chart.sort_values().plot(
    kind="barh"
)

plt.title("Top 10 Categories by Average Rating")
plt.xlabel("Average Rating")
plt.ylabel("Category")

plt.xlim(3.5, 4.6)

plt.tight_layout()

#plt.show()
# ==========================================
# VISUALIZATION 8
# PRICE VS INSTALLS
# ==========================================

paid_apps = df_clean[
    (df_clean["Type"] == "Paid") &
    (df_clean["Price"] > 0)
].copy()

plt.figure(figsize=(10, 6))

plt.scatter(
    paid_apps["Price"],
    paid_apps["Installs"],
    alpha=0.5
)

plt.title("Price vs Installs for Paid Apps")
plt.xlabel("Price ($)")
plt.ylabel("Estimated Installs")

plt.tight_layout()

#plt.show()
# ==========================================
# VISUALIZATION 9
# PRICE RANGE VS AVERAGE INSTALLS
# ==========================================

paid_apps = df_clean[
    (df_clean["Type"] == "Paid") &
    (df_clean["Price"] > 0)
].copy()

paid_apps["Price_Range"] = pd.cut(
    paid_apps["Price"],
    bins=[0, 5, 10, 25, 50, float("inf")],
    labels=["$0-$5", "$5-$10", "$10-$25", "$25-$50", "$50+"],
    include_lowest=True
)

price_range_chart = (
    paid_apps
    .groupby("Price_Range", observed=True)["Installs"]
    .mean()
)

plt.figure(figsize=(9, 5))

price_range_chart.plot(
    kind="bar"
)

plt.title("Average Installs by Paid App Price Range")
plt.xlabel("Price Range")
plt.ylabel("Average Estimated Installs")

plt.xticks(rotation=0)

plt.tight_layout()

#plt.show()
# ==========================================
# VISUALIZATION 10
# CATEGORY OPPORTUNITY MATRIX
# ==========================================

opportunity_chart = df_clean.groupby("Category").agg(
    Avg_Installs_Per_App=("Installs", "mean"),
    Avg_Rating=("Rating", "mean")
).dropna()

plt.figure(figsize=(10, 6))

plt.scatter(
    opportunity_chart["Avg_Installs_Per_App"],
    opportunity_chart["Avg_Rating"],
    alpha=0.6
)

plt.title("Category Opportunity Matrix")
plt.xlabel("Average Estimated Installs per App")
plt.ylabel("Average Rating")

plt.tight_layout()

#plt.show()
import matplotlib.pyplot as plt

test_data = [10, 20, 30, 40, 50]

plt.bar(
    ["A", "B", "C", "D", "E"],
    test_data
)

plt.title("Chart Test")

plt.show()