export const DEMO_USERS = [
  "gauri",
  "kritika", 
  "user1",
  "user2",
  "user3"
];

export const INTENT_MODES = {
  STUDENT: {
    id: "STUDENT",
    label: "Student",
    description: "Learn the basics of data analysis. Explains statistical concepts simply.",
    tone: "Educational & Encouraging",
    complexity: "Beginner",
    icon: "GraduationCap"
  },
  BUSINESS: {
    id: "BUSINESS",
    label: "Business",
    description: "Focus on KPIs, ROI, and actionable insights for decision making.",
    tone: "Professional & Direct",
    complexity: "Executive Summary",
    icon: "Briefcase"
  },
  RESEARCH: {
    id: "RESEARCH",
    label: "Research", 
    description: "Deep dive into correlations, statistical significance, and outliers.",
    tone: "Academic & Rigorous",
    complexity: "Advanced",
    icon: "Microscope"
  }
};

export const MOCK_REPORTS = [
  {
    id: "rep_123",
    title: "Q3 Sales Analysis",
    createdAt: "2023-10-15",
    intent: "BUSINESS",
    dataset: "sales_q3.csv"
  },
  {
    id: "rep_456",
    title: "Housing Market Trends",
    createdAt: "2023-11-02",
    intent: "RESEARCH",
    dataset: "housing_data.csv"
  },
  {
    id: "rep_789",
    title: "Titanic Survival Factors",
    createdAt: "2023-12-10",
    intent: "STUDENT",
    dataset: "titanic.csv"
  }
];

// DATASETS FOR EACH REPORT

const DATA_TITANIC = {
  summary: {
    rows: 891,
    columns: 12,
    col1: "38% (Avg Survival)",
    col2: "29.7 (Avg Age)"
  },
  charts: [
    {
      id: "survival_by_class",
      title: "Survival Rate by Passenger Class",
      desc: "Breakdown of survival probability across socio-economic classes",
      type: "bar_vertical",
      data: [
        { name: '1st Class', value: 63, count: 216 },
        { name: '2nd Class', value: 47, count: 184 },
        { name: '3rd Class', value: 24, count: 491 },
      ],
      xKey: "value",
      yKey: "name",
      fill: "#6366f1",
      insightTitle: "What this shows",
      insightText: "First class passengers had the highest survival rate at 63%, while 3rd class dropped significantly to 24%.",
      deepInsightTitle: "Why it matters",
      deepInsightText: "Premium customers (1st Class) showed 2.6x higher retention (survival) rates vs economy segments. Future safety investments should target the economy segment to mitigate liability."
    },
    {
      id: "age_dist",
      title: "Age Demographics",
      desc: "Distribution of passenger ages on board",
      type: "bar",
      data: [
        { name: '0-10', value: 64 },
        { name: '11-20', value: 115 },
        { name: '21-30', value: 230 },
        { name: '31-40', value: 155 },
        { name: '41-50', value: 86 },
        { name: '51-60', value: 42 },
        { name: '60+', value: 22 },
      ],
      xKey: "name",
      yKey: "value",
      fill: "#14b8a6",
      insightTitle: "What this shows",
      insightText: "The majority of passengers were between 20-30 years old, creating a right-skewed distribution.",
      deepInsightTitle: "Why it matters",
      deepInsightText: "The core demographic is 21-30 year olds, representing the largest market segment. Marketing efforts should target this age group for maximum conversion."
    },
    {
      id: "embarked",
      title: "Embarkation Ports",
      desc: "Where passengers boarded the ship",
      type: "pie",
      data: [
        { name: 'Southampton', value: 644 },
        { name: 'Cherbourg', value: 168 },
        { name: 'Queenstown', value: 77 },
      ],
      insightTitle: "Analysis",
      insightText: "Southampton represents the primary logistics hub, accounting for 72% of total boarding volume. Operational efficiency should focus here."
    },
    {
      id: "fare",
      title: "Average Fare by Class",
      desc: "Economic segmentation analysis",
      type: "bar",
      data: [
        { name: '1st Class', value: 84.15 },
        { name: '2nd Class', value: 20.66 },
        { name: '3rd Class', value: 13.67 },
      ],
      xKey: "name",
      yKey: "value",
      fill: "#fbbf24",
      insightTitle: "Analysis",
      insightText: "Revenue per user (ARPU) scales non-linearly with class tier. 1st Class generates 4x revenue of 2nd Class, validating the premium pricing strategy."
    }
  ],
  conclusion: "In conclusion, the Titanic dataset shows us that survival wasn't random. Class and Age played big roles. As a student of data, notice how grouping data (like by 'Class') reveals hidden patterns!"
};

const DATA_SALES = {
  summary: {
    rows: 12450,
    columns: 8,
    col1: "$1.2M (Total Rev)",
    col2: "15% (Growth)"
  },
  charts: [
    {
      id: "monthly_rev",
      title: "Monthly Revenue Trend",
      desc: "Revenue performance over Q3",
      type: "bar",
      data: [
        { name: 'July', value: 340000 },
        { name: 'August', value: 420000 },
        { name: 'September', value: 480000 },
      ],
      xKey: "name",
      yKey: "value",
      fill: "#6366f1",
      insightTitle: "What this shows",
      insightText: "Revenue has consistently increased month-over-month, peaking in September at $480k.",
      deepInsightTitle: "Business Impact",
      deepInsightText: "The 14% MoM growth rate exceeds Q3 projections. This trajectory suggests we will hit Q4 targets early if inventory levels are maintained."
    },
    {
      id: "region_split",
      title: "Sales by Region",
      desc: "Geographic distribution of sales",
      type: "pie",
      data: [
        { name: 'North America', value: 45 },
        { name: 'Europe', value: 30 },
        { name: 'Asia Pacific', value: 15 },
        { name: 'LATAM', value: 10 },
      ],
      insightTitle: "Regional Analysis",
      insightText: "North America remains the dominant market (45%), but Europe is showing strong consolidation."
    },
    {
      id: "top_products",
      title: "Top 5 Products",
      desc: "Best selling SKUs by volume",
      type: "bar",
      data: [
        { name: 'Pro License', value: 1200 },
        { name: 'Ent. Plan', value: 850 },
        { name: 'Starter', value: 600 },
        { name: 'Add-ons', value: 320 },
      ],
      xKey: "name",
      yKey: "value",
      fill: "#14b8a6",
      insightTitle: "Product Mix",
      insightText: "Enterprise Plans generate 60% of revenue despite lower volume, confirming the shift to B2B focus."
    }
  ],
  conclusion: "Q3 performance was robust, driven by strong enterprise adoption in North America. The consistent month-over-month growth validates the new sales strategy implemented in June."
};

const DATA_HOUSING = {
  summary: {
    rows: 5000,
    columns: 18,
    col1: "$450k (Med Price)",
    col2: "2.5k (Avg SqFt)"
  },
  charts: [
    {
      id: "price_sqft",
      title: "Price vs SqFt Correlation",
      desc: "Relationship between size and listing price",
      type: "bar", // Using bar as a proxy for scatter in this simple mock
      data: [
        { name: '<1000', value: 250000 },
        { name: '1000-2000', value: 380000 },
        { name: '2000-3000', value: 550000 },
        { name: '3000+', value: 890000 },
      ],
      xKey: "name",
      yKey: "value",
      fill: "#0ea5e9",
      insightTitle: "Correlation",
      insightText: "There is a strong positive correlation (r=0.85) between square footage and price, as expected.",
      deepInsightTitle: "Outlier Detection",
      deepInsightText: "Properties >3000 sqft show higher price variance, indicating 'luxury' premiums that decouple from pure utility value."
    },
    {
      id: "neighborhood",
      title: "Price by Neighborhood",
      desc: "Median prices across key zones",
      type: "bar_vertical",
      data: [
        { name: 'Downtown', value: 650000 },
        { name: 'Suburbs', value: 420000 },
        { name: 'Rural', value: 310000 },
        { name: 'Industrial', value: 280000 },
      ],
      xKey: "value",
      yKey: "name",
      fill: "#fbbf24",
      insightTitle: "Zone Analysis",
      insightText: "Downtown properties command a 55% premium over suburban counterparts."
    }
  ],
  conclusion: "The housing market data indicates a strong segmentation by zone. While size is the primary predictor of value, location (Neighborhood) acts as a significant multiplier, especially in the Downtown sector."
};

export const DATA_GENERIC = {
  summary: {
    rows: 1500,
    columns: 10,
    col1: "85% (Accuracy)",
    col2: "4.2 (Avg Score)"
  },
  charts: [
    {
      id: "dist_1",
      title: "Primary Variable Distribution",
      desc: "Frequency distribution of the main dataset column",
      type: "bar",
      data: [
        { name: 'Category A', value: 450 },
        { name: 'Category B', value: 320 },
        { name: 'Category C', value: 210 },
        { name: 'Category D', value: 180 },
        { name: 'Category E', value: 340 },
      ],
      xKey: "name",
      yKey: "value",
      fill: "#8b5cf6",
      insightTitle: "Distribution Analysis",
      insightText: "Category A appears most frequently (30%), suggesting it is the dominant mode in this dataset.",
      deepInsightTitle: "Statistical Significance",
      deepInsightText: "The variance between categories exceeds random chance (p < 0.05), indicating structural differences in the data generation process."
    },
    {
      id: "trend_1",
      title: "Time Series / Sequence",
      desc: "Data progression over the index",
      type: "bar",
      data: [
        { name: 'Q1', value: 120 },
        { name: 'Q2', value: 145 },
        { name: 'Q3', value: 190 },
        { name: 'Q4', value: 220 },
      ],
      xKey: "name",
      yKey: "value",
      fill: "#ec4899",
      insightTitle: "Trend Analysis",
      insightText: "There is a clear upward trend observed across the quartiles, with Q4 showing an 83% increase over Q1.",
    },
    {
      id: "composition",
      title: "Data Composition",
      desc: "Part-to-whole relationship",
      type: "pie",
      data: [
        { name: 'Segment 1', value: 40 },
        { name: 'Segment 2', value: 35 },
        { name: 'Segment 3', value: 25 },
      ],
      insightTitle: "Composition",
      insightText: "The dataset is fairly balanced, with no single segment controlling the majority (>50%) of the share."
    }
  ],
  conclusion: "This custom dataset reveals interesting structural patterns. The primary variable shows significant modal clustering, while the secondary sequential data indicates positive momentum."
};

export const REPORT_DATA: Record<string, any> = {
  "rep_123": DATA_SALES,
  "rep_456": DATA_HOUSING,
  "rep_789": DATA_TITANIC
};

// Default fallback for new reports
export const DEFAULT_REPORT_DATA = DATA_GENERIC;

// Keep these for backward compatibility if needed, or remove
export const MOCK_DATASET_SUMMARY = DATA_TITANIC.summary;
