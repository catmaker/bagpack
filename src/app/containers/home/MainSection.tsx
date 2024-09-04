import { useEffect, useState } from "react";
import useCurrentSchedules from "@/hooks/useCurrentSchedules";
import usePostStatistics from "@/hooks/usePostStatistics";
import useScheduleStore from "@/store/schedule";
import { User } from "@/types/user";
import CurrentSchedules from "./CurrentSchedules";
import MonthlyPostChart from "./MonthlyPostChart";
import MoodDistributionChart from "./MoodDistributionChart";
import StatisticsItem from "./StatisticsItems";
import styles from "./MainSection.module.scss";

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

  const currentSchedules = useCurrentSchedules(posts);
  const { monthlyPostCounts, totalPosts, moodCounts } =
    usePostStatistics(posts);

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
            <StatisticsItem title="총 글 수" value={totalPosts} />
            <CurrentSchedules schedules={currentSchedules} />
            <div className={styles.flex}>
              <MonthlyPostChart monthlyPostCounts={monthlyPostCounts} />
              <MoodDistributionChart moodCounts={moodCounts} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
