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
  console.log(monthlyPostCounts);
  // 데이터가 없으면 0으로 채워지기 때문에 length가 0이면 조건은 사용불가
  let isEmpty = true;
  for (let i = 0; i < monthlyPostCounts.length; i++) {
    if (monthlyPostCounts[i] !== 0) {
      isEmpty = false;
      break;
    }
  }
  return (
    <div className={styles.mainSectionStatisticsItem}>
      <p className={styles.mainSectionStatisticsItemTitle}>월별 글 수</p>
      <div className={styles.mainSectionStatisticsChart}>
        {isEmpty ? (
          <p>작성한 글이 없어 월별 글 수를 확인할 수 없습니다.</p>
        ) : (
          <Bar data={chartData} options={chartOptions} height={300} />
        )}
      </div>
    </div>
  );
};

export default MonthlyPostChart;
