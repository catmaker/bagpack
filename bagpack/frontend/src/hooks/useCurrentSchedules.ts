import { useMemo } from "react";
import { Post } from "@/types/schedule";

const useCurrentSchedules = (posts: Post[]) => {
  return useMemo(() => {
    const now = new Date();
    return posts
      .filter((post) => {
        const startDate = new Date(post.startDate);
        const endDate = new Date(post.endDate);
        return startDate <= now && now <= endDate;
      })
      .map((post) => ({ id: post.id, title: post.title }));
  }, [posts]);
};

export default useCurrentSchedules;

// 현재 진행중인 일정들은 현재 날짜를 기준으로 시작 날짜와 종료 날짜를 비교하여 판단합니다.
// 현재 날짜가 시작 날짜와 종료 날짜 사이에 있으면 현재 진행중인 일정으로 판단합니다.
// 현재 진행중인 일정들은 일정의 아이디와 일정의 제목을 반환합니다.
