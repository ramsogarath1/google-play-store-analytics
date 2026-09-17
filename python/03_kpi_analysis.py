import pandas as pd

# Load cleaned dataset
df = pd.read_csv("data/googleplaystore_clean.csv")

# KPI 1: Total Apps
total_apps = df["App"].nunique()

# KPI 2: Total Estimated Installs
total_installs = df["Installs"].sum()

# KPI 3: Average Rating
average_rating = df["Rating"].mean()

# KPI 4: Free Apps Percentage
free_apps_percentage = (
    (df["Type"] == "Free").sum()
    / df["Type"].notna().sum()
) * 100

# Display KPIs
print("===== DASHBOARD KPIs =====")

print(f"Total Apps: {total_apps:,}")

print(
    f"Total Estimated Installs: "
    f"{total_installs / 1_000_000_000:.2f}B"
)

print(f"Average Rating: {average_rating:.2f}")

print(f"Free Apps: {free_apps_percentage:.2f}%")