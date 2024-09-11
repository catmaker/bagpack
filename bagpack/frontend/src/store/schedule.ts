import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Post } from "@/types/schedule";
import { User } from "@/types/store";

interface DateState {
  selectedDate: Date | null;
  startDate: Date;
  endDate: Date;
  selectedDayOfWeek: string;
}

interface PostState {
  posts: Post[];
  postsUpdate: boolean;
}

interface ScheduleState extends DateState, PostState {
  selectedMood: string | null;
  setSelectedMood: (mood: string | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  setPostsUpdate: (update: boolean) => void;
  setPosts: (posts: Post[]) => void;
  updatePost: (updatePost: Post) => void;
  fetchPosts: (user: User) => Promise<void>;
}

const useScheduleStore = create<ScheduleState>()(
  devtools(
    (set, get) => ({
      selectedMood: null,
      selectedDate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      selectedDayOfWeek: "",
      posts: [],
      postsUpdate: false,

      setSelectedMood: (mood) => set({ selectedMood: mood }),

      setSelectedDate: (date) => {
        if (date) {
          const dayOfWeek = [
            "일요일",
            "월요일",
            "화요일",
            "수요일",
            "목요일",
            "금요일",
            "토요일",
          ][date.getDay()];
          set({
            selectedDate: date,
            selectedDayOfWeek: dayOfWeek,
            startDate: date,
            endDate: date,
          });
        } else {
          set({ selectedDate: null, selectedDayOfWeek: "" });
        }
      },

      setStartDate: (date) => set({ startDate: date }),
      setEndDate: (date) => set({ endDate: date }),

      setPostsUpdate: (update) => set({ postsUpdate: update }),
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
          });
          const data = await response.json();
          if (Array.isArray(data.data)) {
            set({ posts: data.data });
          } else {
            console.error("Fetched data.data is not an array:", data.data);
          }
        } catch (error) {
          console.error("Failed to fetch posts:", error);
        }
      },
    }),
    { name: "schedule-store" },
  ),
);

export default useScheduleStore;
