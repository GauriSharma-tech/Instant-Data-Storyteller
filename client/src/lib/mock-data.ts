export const DEMO_USERS = [
  "gauri",
  "kritika", 
  "user1",
  "user2",
  "user3"
];

export const MOCK_DATASET_SUMMARY = {
  name: "titanic_survival.csv",
  rows: 891,
  columns: 12,
  dtypes: {
    "PassengerId": "int64",
    "Survived": "int64",
    "Pclass": "int64",
    "Name": "object",
    "Sex": "object",
    "Age": "float64",
    "SibSp": "int64",
    "Parch": "int64", 
    "Ticket": "object",
    "Fare": "float64",
    "Cabin": "object",
    "Embarked": "object"
  },
  sample: [
    { PassengerId: 1, Survived: 0, Pclass: 3, Name: "Braund, Mr. Owen Harris", Sex: "male", Age: 22, Fare: 7.25 },
    { PassengerId: 2, Survived: 1, Pclass: 1, Name: "Cumings, Mrs. John Bradley", Sex: "female", Age: 38, Fare: 71.28 },
    { PassengerId: 3, Survived: 1, Pclass: 3, Name: "Heikkinen, Miss. Laina", Sex: "female", Age: 26, Fare: 7.92 },
    { PassengerId: 4, Survived: 1, Pclass: 1, Name: "Futrelle, Mrs. Jacques Heath", Sex: "female", Age: 35, Fare: 53.10 },
    { PassengerId: 5, Survived: 0, Pclass: 3, Name: "Allen, Mr. William Henry", Sex: "male", Age: 35, Fare: 8.05 },
  ]
};

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

export const CHART_DATA_SURVIVAL_BY_CLASS = [
  { name: '1st Class', survivalRate: 63, count: 216 },
  { name: '2nd Class', survivalRate: 47, count: 184 },
  { name: '3rd Class', survivalRate: 24, count: 491 },
];

export const CHART_DATA_AGE_DIST = [
  { range: '0-10', count: 64 },
  { range: '11-20', count: 115 },
  { range: '21-30', count: 230 },
  { range: '31-40', count: 155 },
  { range: '41-50', count: 86 },
  { range: '51-60', count: 42 },
  { range: '60+', count: 22 },
];

export const CHART_DATA_EMBARKED = [
  { name: 'Southampton', value: 644 },
  { name: 'Cherbourg', value: 168 },
  { name: 'Queenstown', value: 77 },
];

export const CHART_DATA_FARE_BY_CLASS = [
  { name: '1st Class', avgFare: 84.15 },
  { name: '2nd Class', avgFare: 20.66 },
  { name: '3rd Class', avgFare: 13.67 },
];

export const INSIGHTS = {
  STUDENT: {
    survival: "We can see that 1st Class passengers had a much higher chance of surviving (63%) compared to 3rd Class (24%). This teaches us that socio-economic status was a major factor.",
    age: "Most passengers were young adults between 20 and 30 years old. This is a common distribution in historical travel data.",
    embarked: "Most passengers boarded at Southampton (S). This is a 'categorical' variable, meaning it puts people into groups.",
    fare: "First class tickets were much more expensive on average. The difference in price is huge!",
    conclusion: "In conclusion, the Titanic dataset shows us that survival wasn't random. Class and Age played big roles. As a student of data, notice how grouping data (like by 'Class') reveals hidden patterns!"
  },
  BUSINESS: {
    survival: "Premium customers (1st Class) showed 2.6x higher retention (survival) rates vs economy segments. Future safety investments should target the economy segment to mitigate liability.",
    age: "The core demographic is 21-30 year olds, representing the largest market segment. Marketing efforts should target this age group for maximum conversion.",
    embarked: "Southampton represents the primary logistics hub, accounting for 72% of total boarding volume. Operational efficiency should focus here.",
    fare: "Revenue per user (ARPU) scales non-linearly with class tier. 1st Class generates 4x revenue of 2nd Class, validating the premium pricing strategy.",
    conclusion: "Actionable Takeaway: To improve overall safety metrics, resource allocation must be prioritized for 3rd Class cabins. Additionally, the 20-30 age demographic represents the highest value segment for future service offerings."
  },
  RESEARCH: {
    survival: "There is a statistically significant correlation (p < 0.05) between Pclass and Survived. The data suggests a strong class-based hierarchy in emergency protocol adherence.",
    age: "The age distribution exhibits a right skew with a mode in the 20-30 bin. Kurtosis indicates a heavy-tailed distribution relative to a normal population.",
    embarked: "Chi-square tests indicate a dependency between Embarked port and Survival rates, likely confounded by Pclass distribution within ports.",
    fare: "Fare distribution is highly positively skewed. Variance in 1st Class fares suggests sub-segmentation (cabins vs suites) not captured in the simple class variable.",
    conclusion: "The null hypothesis that survival is independent of class is rejected (p < 0.01). Further multivariate regression analysis is recommended to isolate the confounding variable of 'Sex' within these class strata."
  }
};