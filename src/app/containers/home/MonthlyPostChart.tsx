import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { MonthlyPostChartProps } from "@/types/home";
import styles from "./MainSection.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const MonthlyPostChart = ({ monthlyPostCounts }: MonthlyPostChartProps) => {
  const chartData = useMemo(
    () => ({
      labels: [
        "1월",
        "2월",
        "3월",
        "4월",
        "5월",
        "6월",
        "7월",
        "8월",
        "9월",
        "10월",
        "11월",
        "12월",
      ],
      datasets: [
        {
          label: "월별 글 수",
          data: monthlyPostCounts,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    }),
    [monthlyPostCounts],
  );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        onClick: () => {},
      },
      title: {
        display: true,
        text: "월별 글 통계",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className={styles.mainSectionStatisticsItem}>
      <p className={styles.mainSectionStatisticsItemTitle}>월별 글 수</p>
      <div className={styles.mainSectionStatisticsChart}>
        <Bar data={chartData} options={chartOptions} height={300} />
      </div>
    </div>
  );
};

export default MonthlyPostChart;
