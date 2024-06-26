"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
// components
import Calendar from "@/components/ui/calendar/Calendar";
import SideBar from "@/components/ui/SideBar/SideBar";
import Modal from "@/components/ui/modal/Modal";
import StepOneModal from "@/components/schedule/StepOneModal";
import StepTwoModal from "@/components/schedule/StepTwoModal";
// context
import { UserContext } from "@/app/provider/UserProvider";
// css
import styles from "./ScheduleClient.module.scss";
import "react-datepicker/dist/react-datepicker.css";

const ScheduleClient = () => {
  const user = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState("");

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleGoToNextModal = () => {
    setIsModalOpen(false); // 현재 모달 닫기
    setIsNextModalOpen(true); // 다음 모달 열기
  };

  // 기분 아이콘 클릭 핸들러
  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood);
    console.log(mood);
  };

  const handleDateClick = (info: any) => {
    setIsModalOpen(true); // 날짜 클릭 시 모달을 엽니다.
    setSelectedDate(new Date(info.dateStr)); // info.dateStr을 Date 객체로 변환
    console.log(info.dateStr);

    const weekdays = [
      "일요일",
      "월요일",
      "화요일",
      "수요일",
      "목요일",
      "금요일",
      "토요일",
    ];
    const dayOfWeek = weekdays[new Date(info.dateStr).getDay()];
    setSelectedDayOfWeek(dayOfWeek); // 선택된 요일을 상태에 저장
    console.log(dayOfWeek);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className={styles.container}>
      <SideBar />
      <div
        className={`${styles.calendar} ${isModalOpen ? styles.modalBackground : ""}`}
      >
        <Calendar onDateClick={handleDateClick} />
        <StepOneModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedDate={selectedDate} // 선택된 날짜
          setSelectedDate={setSelectedDate} // 선택된 날짜를 변경하는 함수
          handleGoToNextModal={handleGoToNextModal} // 다음 모달로 이동하는 함수
          selectedMood={selectedMood} // 선택된 기분
          setSelectedMood={setSelectedMood} // 선택된 기분을 변경하는 함수
          user={user} // 사용자 정보
          handleMoodClick={handleMoodClick} // 기분 아이콘 클릭 핸들러
        />
        <StepTwoModal
          dayOfWeek={selectedDayOfWeek} // 선택된 요일
          isOpen={isNextModalOpen} // 다음 모달 열림 상태
          onClose={() => setIsNextModalOpen(false)} // 다음 모달 닫기 함수
          selectedDate={selectedDate} // 선택된 날짜
          selectedDayOfWeek={selectedDayOfWeek} // 선택된 요일
          setIsModalOpen={setIsModalOpen} // 현재 모달 열림 상태 변경 함수
          setIsNextModalOpen={setIsNextModalOpen} // 다음 모달 열림 상태 변경 함수
        />
      </div>
    </div>
  );
};

export default ScheduleClient;
