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

  const isEmpty = Object.values(moodCounts).every((count) => count === 0);

  return (
    <section
      className={styles.mainSectionStatisticsItem}
      aria-labelledby="mood-distribution-title"
    >
      <h2
        id="mood-distribution-title"
        className={styles.mainSectionStatisticsItemTitle}
      >
        감정 분포
      </h2>
      <div className={styles.mainSectionStatisticsChart}>
        {isEmpty ? (
          <p role="status">작성한 글이 없어 감정 분포를 확인할 수 없습니다.</p>
        ) : (
          <Doughnut
            data={chartData}
            options={chartOptions}
            height={300}
            aria-label="감정 분포 차트"
          />
        )}
      </div>
    </section>
  );
};

export default MoodDistributionChart;
