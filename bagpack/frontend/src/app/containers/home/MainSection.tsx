import { useEffect, useState } from "react";
import useCurrentSchedules from "@/hooks/useCurrentSchedules";
import usePostStatistics from "@/hooks/usePostStatistics";
import useScheduleStore from "@/store/schedule";
import { User } from "@/types/user";
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
      <div className={styles.mainSectionWrapper} />
    </section>
  );
};

export default MainSection;
