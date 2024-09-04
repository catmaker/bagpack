import { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { MoodDistributionChartProps } from "@/types/home";
import styles from "./MainSection.module.scss";

ChartJS.register(ArcElement, Tooltip, Legend);

const MoodDistributionChart = ({ moodCounts }: MoodDistributionChartProps) => {
  const chartData = useMemo(
    () => ({
      labels: ["행복", "미소", "중립", "슬픔", "최악"],
      datasets: [
        {
          data: [
            moodCounts.happy,
            moodCounts.smile,
            moodCounts.neutral,
            moodCounts.sad,
            moodCounts.terrible,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
          ],
        },
      ],
    }),
    [moodCounts],
  );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "감정 분포",
      },
    },
  };

  return (
    <div className={styles.mainSectionStatisticsItem}>
      <p className={styles.mainSectionStatisticsItemTitle}>감정 분포</p>
      <div className={styles.mainSectionStatisticsChart}>
        <Doughnut data={chartData} options={chartOptions} height={300} />
      </div>
    </div>
  );
};

export default MoodDistributionChart;
