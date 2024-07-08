import create from "zustand";

// 스토어 상태와 함수에 대한 인터페이스 정의
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
}));

export default useScheduleStore;
