import { useEffect } from "react";
import useScheduleStore from "@/store/schedule";

export const useDateManagement = () => {
  const {
    selectedDate,
    setSelectedDate,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useScheduleStore((state) => ({
    selectedDate: state.selectedDate,
    setSelectedDate: state.setSelectedDate,
    startDate: state.startDate,
    setStartDate: state.setStartDate,
    endDate: state.endDate,
    setEndDate: state.setEndDate,
  }));

  useEffect(() => {
    if (selectedDate) {
      setStartDate(selectedDate);
      setEndDate(selectedDate);
    }
  }, [selectedDate, setStartDate, setEndDate]);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date || new Date());
    setSelectedDate(date);
    if (endDate && date && date > endDate) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date || new Date());
  };

  return {
    selectedDate,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
  };
};

// 이 훅은 날짜 선택 및 변경을 관리합니다.
