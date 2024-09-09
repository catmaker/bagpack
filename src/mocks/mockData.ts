import { Timestamp } from "firebase/firestore";
import { User } from "@/types/user";

export const mockUser: User = {
  email: "test@example.com",
  isDone: false,
  nickname: "테스트",
  palette: ["#000000", "#FFFFFF"],
  created_at: Timestamp.fromDate(new Date()),
  posts: [],
  id: "1",
  profilePictureUrl: "test.jpg",
};
