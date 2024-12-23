import React from "react";
// CurrentSchedules.tsx
export type Schedule = {
  id: string;
  title: string;
};

export type CurrentSchedulesProps = {
  schedules: Schedule[];
};

// MonthlyPostChart.tsx
export type MonthlyPostChartProps = {
  monthlyPostCounts: number[];
};

// MoodDistributionChart.tsx
export type MoodCounts = {
  happy: number;
  smile: number;
  neutral: number;
  sad: number;
  terrible: number;
};

export type MoodDistributionChartProps = {
  moodCounts: MoodCounts;
};

// StatisticsItems.tsx
export type StatisticsItemProps = {
  title: string;
  value: number;
};

// ResponsiveMobileLayout.tsx

export type ResponsiveMobileLayoutProps = {
  isMobile: boolean;
  userSection: React.ReactNode;
  welcomeSection: React.ReactNode;
  mainSection: React.ReactNode;
};
