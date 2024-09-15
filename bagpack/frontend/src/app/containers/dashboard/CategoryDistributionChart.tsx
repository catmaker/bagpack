import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import styles from "./CategoryDistributionChart.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryDistributionChartProps {
  categoryCounts: { [key: string]: number };
}

const CategoryDistributionChart: React.FC<CategoryDistributionChartProps> = ({
  categoryCounts,
}) => {
  const data = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        data: Object.values(categoryCounts),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div className={styles.mainSectionStatisticsItem}>
      <p className={styles.mainSectionStatisticsItemTitle}>카테고리 분포</p>
      <div className={styles.mainSectionStatisticsChart}>
        {Object.values(categoryCounts).every((count) => count === 0) ? (
          <p>작성한 글이 없어 카테고리 분포를 확인할 수 없습니다.</p>
        ) : (
          <Pie data={data} height={300} />
        )}
      </div>
    </div>
  );
};

export default CategoryDistributionChart;
