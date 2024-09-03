import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import useScheduleStore from "@/store/schedule";
import { User } from "@/types/user";
import styles from "./MainSection.module.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const MainSection = ({ user }: { user: User }) => {
  const { posts, fetchPosts } = useScheduleStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      await fetchPosts(user);
      setIsLoading(false);
    };
    loadPosts();
  }, [fetchPosts, user]);

  const { monthlyPostCounts, totalPosts, moodCounts } = useMemo(() => {
    const monthlyCounts = new Array(12).fill(0);
    const moodCountsObj = {
      happy: 0,
      smile: 0,
      neutral: 0,
      sad: 0,
      terrible: 0,
    };
    posts.forEach((post) => {
      const month = new Date(post.startDate).getMonth();
      monthlyCounts[month]++;
      moodCountsObj[post.mood as keyof typeof moodCountsObj]++;
    });
    return {
      monthlyPostCounts: monthlyCounts,
      totalPosts: posts.length,
      moodCounts: moodCountsObj,
    };
  }, [posts]);

  const monthlyChartData = useMemo(
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

  const moodChartData = useMemo(
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

  const moodChartOptions = {
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

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <section className={styles.mainSectionContainer}>
      <div className={styles.mainSectionWrapper}>
        <div className={styles.mainSectionHeader}>
          <h1 className={styles.mainSectionTitle}>
            <span className={styles.mainSectionTitleText}>
              안녕하세요!
              <br />
              {user.nickname} 님👋
              <br />
              TimeInk에 오신 것을 환영합니다.
            </span>
          </h1>
        </div>
        <div className={styles.mainSectionStatistics}>
          <h2 className={styles.mainSectionStatisticsTitle}>통계</h2>
          <div className={styles.mainSectionStatisticsContent}>
            <div className={styles.mainSectionStatisticsItem}>
              <p className={styles.mainSectionStatisticsItemTitle}>총 글 수</p>
              <p className={styles.mainSectionStatisticsItemValue}>
                {totalPosts}
              </p>
            </div>
            <div className={styles.flex}>
              <div className={styles.mainSectionStatisticsItem}>
                <p className={styles.mainSectionStatisticsItemTitle}>
                  월별 글 수
                </p>
                <div className={styles.mainSectionStatisticsChart}>
                  <Bar
                    data={monthlyChartData}
                    options={chartOptions}
                    height={300}
                  />
                </div>
              </div>
              <div className={styles.mainSectionStatisticsItem}>
                <p className={styles.mainSectionStatisticsItemTitle}>
                  감정 분포
                </p>
                <div className={styles.mainSectionStatisticsChart}>
                  <Doughnut
                    data={moodChartData}
                    options={moodChartOptions}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
