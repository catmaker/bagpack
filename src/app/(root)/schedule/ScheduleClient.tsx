"use client";
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
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
// zustand
import useScheduleStore from "@/store/schedule";

const ScheduleClient = () => {
  const user = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const {
    selectedMood,
    setSelectedMood,
    selectedDate,
    setSelectedDate,
    selectedDayOfWeek,
    setSelectedDayOfWeek,
  } = useScheduleStore();

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

    // info.dateStr을 "YYYYMMDD" 형식으로 변환
    const formattedDate = info.dateStr.replace(/-/g, "");

    // "YYYYMMDD" 형식의 문자열을 "YYYY", "MM", "DD"로 분리
    const year = formattedDate.substring(0, 4);
    const month = formattedDate.substring(4, 6);
    const day = formattedDate.substring(6, 8);

    // "YYYY-MM-DD" 형식의 문자열로 변환
    const dateForDateObject = `${year}-${month}-${day}`;

    // Date 객체로 변환하여 setSelectedDate에 전달
    setSelectedDate(new Date(dateForDateObject));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className={styles.container}>
      <SideBar />
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.5 }} // 초기 상태
        animate={{ opacity: 1, scale: 1 }} // 최종 상태: 완전 불투명하고, 원래 크기
        transition={{ duration: 0.3 }} // 애니메이션 지속 시간: 0.5초
        className={`${styles.calendar} ${isModalOpen ? styles.modalBackground : ""}`}
      >
        <Calendar onDateClick={handleDateClick} />
        <StepOneModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          handleGoToNextModal={handleGoToNextModal} // 다음 모달로 이동하는 함수
          user={user} // 사용자 정보
          handleMoodClick={handleMoodClick} // 기분 아이콘 클릭 핸들러
        />
        <StepTwoModal
          isOpen={isNextModalOpen} // 다음 모달 열림 상태
          onClose={() => setIsNextModalOpen(false)} // 다음 모달 닫기 함수
          setIsModalOpen={setIsModalOpen} // 현재 모달 열림 상태 변경 함수
          setIsNextModalOpen={setIsNextModalOpen} // 다음 모달 열림 상태 변경 함수
        />
      </motion.div>
    </div>
  );
};

export default ScheduleClient;
