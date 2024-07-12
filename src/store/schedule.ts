import create from "zustand";
import { UserContext } from "@/app/provider/UserProvider";
import { useContext } from "react";
// 스토어 상태와 함수에 대한 인터페이스 정의
type Post = {
  id: string;
  content?: string;
  mood?: string;
  title?: string;
  startDate: string;
  endDate: string;
};
type User = {
  email: string;
};
interface ScheduleState {
  selectedMood: string | null;
  setSelectedMood: (mood: string | null) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedDayOfWeek: string;
  setSelectedDayOfWeek: (day: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  postsUpdate: boolean;
  setPostsUpdate: (update: boolean) => void;
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  updatePost: (updatePost: Post) => void;
  fetchPosts: (user: User) => Promise<void>;
}
// 스토어 생성
const useScheduleStore = create<ScheduleState>((set) => ({
  selectedMood: null,
  setSelectedMood: (mood) => set({ selectedMood: mood }),
  selectedDate: new Date(),
  setSelectedDate: (date) => {
    const dayOfWeek = date
      ? ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"][
          date.getDay()
        ]
      : "";
    set({ selectedDate: date, selectedDayOfWeek: dayOfWeek });
  },
  selectedDayOfWeek: "",
  setSelectedDayOfWeek: (day) => set({ selectedDayOfWeek: day }),
  startDate: new Date(), // 초기값 설정
  setStartDate: (date) => set({ startDate: date }), // 함수 구현
  endDate: new Date(), // 초기값 설정
  setEndDate: (date) => set({ endDate: date }), // 함수 구현
  postsUpdate: false,
  setPostsUpdate: (update) => set({ postsUpdate: update }),
  posts: [],
  setPosts: (posts) => set({ posts }),
  updatePost: (updatePost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === updatePost.id ? updatePost : post,
      ),
    })),
  fetchPosts: async (user) => {
    try {
      const response = await fetch("/api/user/getPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      }); // 서버에서 데이터 가져오기
      const data = await response.json();
      console.log("Fetched data:", data.data); // 응답 데이터 로그 출력
      if (Array.isArray(data.data)) {
        set({ posts: data.data }); // 상태 업데이트
      } else {
        console.error("Fetched data.data is not an array:", data.data);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  },
}));

export default useScheduleStore;
