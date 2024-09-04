import { useMemo } from "react";
import { Post } from "@/types/schedule";

const usePostStatistics = (posts: Post[]) => {
  return useMemo(() => {
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
};

export default usePostStatistics;

// 이 훅은 포스트의 통계를 관리합니다.
// 월별 포스트 수, 총 포스트 수, 각 기분별 포스트 수를 관리합니다.
// 월별 포스트 수는 포스트의 시작 날짜를 기준으로 월별로 포스트 수를 계산합니다.
// 총 포스트 수는 포스트의 개수를 계산합니다.
// 각 기분별 포스트 수는 포스트의 기분을 기준으로 기분별로 포스트 수를 계산합니다.
