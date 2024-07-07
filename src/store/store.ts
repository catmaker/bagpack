import create from "zustand";

interface MoodState {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
}

const useStore = create<MoodState>((set) => ({
  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
  selectedMood: "",
  setSelectedMood: (mood) => set({ selectedMood: mood }),
}));

export default useStore;
