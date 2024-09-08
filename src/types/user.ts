export type Timestamp = {
  nanoseconds: number;
  seconds: number;
};

export type Mood = "terrible" | "sad" | "natural" | "smile" | "happy" | "error";

export type Post = {
  mood: Mood;
  content: string;
  endDate: string;
  id: string;
  title: string;
  startDate: string;
};

export type User = {
  email: string;
  isDone: boolean;
  nickname: string;
  palette?: string[];
  created_at: Timestamp;
  posts?: Post[];
  id: string;
  profilePictureUrl: string;
};

export type UserProps = {
  user: User | null;
};
