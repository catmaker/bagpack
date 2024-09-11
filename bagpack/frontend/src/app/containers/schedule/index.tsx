"use client";

import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Calendar from "@/app/containers/schedule/calendar/Calendar";
import { UserContext } from "@/app/provider/UserProvider";
import Loading from "@/components/Loading";
import Header from "@/components/ui/header/Header";
import useScheduleStore from "@/store/schedule";
import StepOneModal from "./StepOneModal";
import StepTwoModal from "./StepTwoModal";
import styles from "./index.module.scss";
import "react-datepicker/dist/react-datepicker.css";

const ScheduleClient = () => {
  const user = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const {
    selectedMood,
    setSelectedMood,
    selectedDate,
    setSelectedDate,
    fetchPosts, // 데이터 가져오기 함수 추가
    posts, // 가져온 데이터 추가
  } = useScheduleStore();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await fetchPosts(user); // 사용자 데이터를 기반으로 데이터를 가져옴
        setIsLoading(false); // 데이터가 모두 준비되면 로딩 상태 해제
      } else {
        setIsLoading(false); // 사용자 데이터가 없으면 바로 로딩 상태 해제
      }
    };

    fetchData();
  }, [user, fetchPosts]);

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

    // startStr 값을 사용하여 날짜 문자열을 가져옵니다.
    const dateStr = info.startStr;

    if (typeof dateStr === "string") {
      const formattedDate = dateStr.replace(/-/g, "");

      // "YYYYMMDD" 형식의 문자열을 "YYYY", "MM", "DD"로 분리
      const year = formattedDate.substring(0, 4);
      const month = formattedDate.substring(4, 6);
      const day = formattedDate.substring(6, 8);

      // "YYYY-MM-DD" 형식의 문자열로 변환
      const dateForDateObject = `${year}-${month}-${day}`;

      // Date 객체로 변환하여 setSelectedDate에 전달
      setSelectedDate(new Date(dateForDateObject));
      console.log(selectedDate);
    } else {
      console.error("날짜 정보가 올바르지 않습니다:", dateStr);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  if (isLoading) {
    return <Loading />; // 로딩 중일 때 Loading 컴포넌트 표시
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <motion.div
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
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
    </>
  );
};

export default ScheduleClient;