import create from "zustand";

// 스토어 상태와 함수에 대한 인터페이스 정의
interface ScheduleState {
  selectedMood: string | null;
  setSelectedMood: (mood: string | null) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedDayOfWeek: string;
  setSelectedDayOfWeek: (day: string) => void;
}

// 스토어 생성
const useScheduleStore = create<ScheduleState>((set) => ({
  selectedMood: null,
  setSelectedMood: (mood) => set({ selectedMood: mood }),
  selectedDate: new Date(), // 기본값을 오늘 날짜로 설정
  setSelectedDate: (date) => {
    // 요일을 계산하여 selectedDayOfWeek 상태 업데이트
    const dayOfWeek = date
      ? ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"][
          date.getDay()
        ]
      : "";
    set({ selectedDate: date, selectedDayOfWeek: dayOfWeek });
  },
  selectedDayOfWeek: "", // 기본값은 빈 문자열로 설정
  setSelectedDayOfWeek: (day) => set({ selectedDayOfWeek: day }),
}));

export default useScheduleStore;
