import pandas as pd
import matplotlib.pyplot as plt

# Load cleaned dataset
df_clean = pd.read_csv("data/googleplaystore_clean.csv")

# Calculate top 10 categories
top_categories = (
    df_clean.groupby("Category")["Installs"]
    .sum()
    .sort_values(ascending=False)
    .head(10)
    .sort_values()
)

# Convert installs to billions
installs_billions = top_categories / 1_000_000_000

# Create figure
fig, ax = plt.subplots(figsize=(12, 7))

# Horizontal bars
bars = ax.barh(
    installs_billions.index,
    installs_billions.values
)

# Add values at the end of every bar
for bar, value in zip(bars, installs_billions.values):

    ax.text(
        value + 0.15,
        bar.get_y() + bar.get_height() / 2,
        f"{value:.2f}B",
        va="center",
        fontsize=10,
        fontweight="bold"
    )

# Title
ax.set_title(
    "Google Play Store: Category Demand",
    fontsize=20,
    fontweight="bold",
    loc="left",
    pad=20
)

# Subtitle
ax.text(
    0,
    1.02,
    "Top 10 categories ranked by estimated total installs",
    transform=ax.transAxes,
    fontsize=11
)

# Axis labels
ax.set_xlabel(
    "Estimated Total Installs (Billions)",
    fontsize=11
)

ax.set_ylabel("")

# Remove unnecessary borders
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.spines["left"].set_visible(False)

# Add light horizontal grid
ax.grid(
    axis="x",
    linestyle="--",
    alpha=0.3
)

# Put grid behind bars
ax.set_axisbelow(True)

# Improve tick size
ax.tick_params(axis="both", labelsize=10)

# Source / methodology note
fig.text(
    0.01,
    0.01,
    "Source: Google Play Store dataset | Installs are lower-bound estimates from bucketed values such as 1,000+.",
    fontsize=8
)

# Better spacing
plt.tight_layout(rect=[0, 0.04, 1, 1])

plt.show()