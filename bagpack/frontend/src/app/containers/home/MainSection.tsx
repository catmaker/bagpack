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

  return (
    <section className={styles.mainSectionContainer}>
      <div className={styles.mainSectionWrapper}>
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
