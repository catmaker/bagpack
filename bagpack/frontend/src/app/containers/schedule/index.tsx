"use client";

import React, { useContext, useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { UserContext } from "@/app/provider/UserProvider";
import Loading from "@/components/Loading";
import Header from "@/components/ui/header/Header";
import useScheduleStore from "@/store/schedule";
import styles from "./index.module.scss";

const Calendar = dynamic(
  () => import("@/app/containers/schedule/calendar/Calendar"),
  { suspense: true },
);

const ScheduleClient = () => {
  const user = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [StepOneModal, setStepOneModal] =
    useState<React.ComponentType<any> | null>(null);
  const [StepTwoModal, setStepTwoModal] =
    useState<React.ComponentType<any> | null>(null);
  const { setSelectedMood, selectedDate, setSelectedDate, fetchPosts } =
    useScheduleStore();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await fetchPosts(user);
      }
      setIsLoading(false);
    };

    fetchData();

    // 페이지 로드 후 모달 컴포넌트 동적 임포트
    import("./StepOneModal").then((module) =>
      setStepOneModal(() => module.default),
    );
    import("./StepTwoModal").then((module) =>
      setStepTwoModal(() => module.default),
    );
  }, [user, fetchPosts]);

  const handleGoToNextModal = () => {
    setIsModalOpen(false);
    setIsNextModalOpen(true);
  };

  const handleMoodClick = (mood: string) => {
    setSelectedMood(mood);
    console.log(mood);
  };

  const handleDateClick = (info: any) => {
    setIsModalOpen(true);
    const dateStr = info.startStr;
    if (typeof dateStr === "string") {
      const formattedDate = dateStr.replace(/-/g, "");
      const year = formattedDate.substring(0, 4);
      const month = formattedDate.substring(4, 6);
      const day = formattedDate.substring(6, 8);
      const dateForDateObject = `${year}-${month}-${day}`;
      setSelectedDate(new Date(dateForDateObject));
      console.log(selectedDate);
    } else {
      console.error("날짜 정보가 올바르지 않습니다:", dateStr);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loading />;
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
          <Suspense fallback={<Loading />}>
            <Calendar onDateClick={handleDateClick} />
          </Suspense>
          {StepOneModal && isModalOpen && (
            <StepOneModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              handleGoToNextModal={handleGoToNextModal}
              user={user}
              handleMoodClick={handleMoodClick}
            />
          )}
          {StepTwoModal && isNextModalOpen && (
            <StepTwoModal
              isOpen={isNextModalOpen}
              onClose={() => setIsNextModalOpen(false)}
              setIsModalOpen={setIsModalOpen}
              setIsNextModalOpen={setIsNextModalOpen}
            />
          )}
        </motion.div>
      </div>
    </>
  );
};

export default ScheduleClient;
