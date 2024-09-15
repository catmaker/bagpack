"use client";

import { useState, useEffect, useContext } from "react";
import MonthlyPostChart from "@/app/containers/home/MonthlyPostChart";
import MoodDistributionChart from "@/app/containers/home/MoodDistributionChart";
import { UserContext } from "@/app/provider/UserProvider";
import Loading from "@/components/Loading";
import usePostStatistics from "@/hooks/usePostStatistics";
import useScheduleStore from "@/store/schedule";
import { ClassificationResult } from "@/types/smart";
import { classify } from "@/utils/axios/fetcher/smart";
import CategoryDistributionChart from "./CategoryDistributionChart";
import styles from "./index.module.scss";

const Dashboard = () => {
  const { posts, fetchPosts } = useScheduleStore();
  const [isLoading, setIsLoading] = useState(true);
  const user = useContext(UserContext);
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({});
  const { monthlyPostCounts, totalPosts, moodCounts } =
    usePostStatistics(posts);
  const [classificationResults, setClassificationResults] = useState<
    ClassificationResult[]
  >([]);
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      if (user) {
        try {
          await fetchPosts(user);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
      setIsLoading(false);
    };
    loadPosts();
  }, [fetchPosts, user]);

  useEffect(() => {
    const classifyPosts = async () => {
      if (posts.length > 0) {
        try {
          const itemsToClassify = posts.map((post) => ({ text: post.title }));
          const response = await classify(itemsToClassify);
          setClassificationResults(response);
        } catch (error) {
          console.error("Error classifying posts:", error);
        }
      }
    };
    classifyPosts();
  }, [posts]);
  useEffect(() => {
    if (classificationResults.length > 0) {
      const categoryResults = classificationResults.map(
        (result) => result.predicted_category,
      );
      const newCategoryCounts = categoryResults.reduce(
        (acc: { [key: string]: number }, category) => {
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        },
        {},
      );
      setCategoryCounts(newCategoryCounts);
    }
  }, [classificationResults]);

  return (
    <div className={styles.dashboard}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <h1 className={styles.title}>대시보드</h1>
          <p className={styles.info}>
            사용자의 모든 게시글 데이터를 기반으로 하여 통계를 표시합니다.
          </p>
          <div className={styles.chartContainer}>
            <div className={styles.chartWrapper}>
              <MonthlyPostChart monthlyPostCounts={monthlyPostCounts} />
            </div>
            <div className={styles.chartWrapper}>
              <MoodDistributionChart moodCounts={moodCounts} />
            </div>
            <div className={styles.chartWrapper}>
              <CategoryDistributionChart categoryCounts={categoryCounts} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
