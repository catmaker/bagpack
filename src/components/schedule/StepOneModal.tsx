"use client";
import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/modal/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TerribleIcon from "@/asset/svg/terrible.svg";
import HappyIcon from "@/asset/svg/happy.svg";
import NaturalIcon from "@/asset/svg/natural.svg";
import SmileIcon from "@/asset/svg/smile.svg";
import SadIcon from "@/asset/svg/sad.svg";
import styles from "@/app/(root)/schedule/ScheduleClient.module.scss";
// zustand
import useScheduleStore from "@/store/schedule";

type StepOneModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleGoToNextModal: () => void;
  user: any;
  handleMoodClick: (mood: string) => void;
};
const StepOneModal = ({
  isOpen,
  onClose,
  handleGoToNextModal,
  user,
  handleMoodClick,
}: StepOneModalProps) => {
  const mood = useScheduleStore((state) => state.selectedMood);
  const selectedDate = useScheduleStore((state) => state.selectedDate);
  const setSelectedDate = useScheduleStore((state) => state.setSelectedDate);
  const iconStyle = { width: "35px", height: "35px" };
  const startDate = useScheduleStore((state) => state.startDate);
  const setStartDate = useScheduleStore((state) => state.setStartDate);
  const endDate = useScheduleStore((state) => state.endDate);
  const setEndDate = useScheduleStore((state) => state.setEndDate);

  console.log(startDate, endDate);
  useEffect(() => {
    if (selectedDate) {
      setStartDate(selectedDate);
      setEndDate(selectedDate);
    }
  }, [selectedDate, setStartDate, setEndDate]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="500px"
      minHeight="300px"
      className={styles.modal}
      buttonClassName={styles.modal_close_button}
    >
      <h1 className={styles.modal_h1}>기분이 어땠나요?</h1>
      <div>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date || undefined);
            if (endDate && date && date > endDate) {
              // 첫 번째 피커에서 선택한 날짜가 두 번째 피커의 날짜보다 높은 경우, 두 번째 피커의 날짜도 변경
              setEndDate(date);
            }
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy.MM.dd HH:mm"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          minDate={new Date("2000-01-01")}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date || undefined)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy.MM.dd HH:mm"
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          minDate={startDate} // 종료일은 시작일 이후로 설정
        />
      </div>
      <div className={styles.modal_moodIcon_wrapper}>
        {user?.palette && (
          <TerribleIcon
            className={
              mood === "terrible" ? styles.modal_moodIcon_selected : ""
            }
            style={{ ...iconStyle, color: user.palette[0] }}
            viewBox="0 0 478.125 478.125"
            onClick={() => handleMoodClick("terrible")}
          />
        )}
        {user?.palette && (
          <SadIcon
            className={mood === "sad" ? styles.modal_moodIcon_selected : ""}
            style={{ ...iconStyle, color: user.palette[4] }}
            viewBox="0 0 478.125 478.125"
            onClick={() => handleMoodClick("sad")}
          />
        )}
        {user?.palette && (
          <NaturalIcon
            className={mood === "natural" ? styles.modal_moodIcon_selected : ""}
            style={{ ...iconStyle, color: user.palette[2] }}
            viewBox="0 0 478.125 478.125"
            onClick={() => handleMoodClick("natural")}
          />
        )}
        {user?.palette && (
          <SmileIcon
            className={mood === "smile" ? styles.modal_moodIcon_selected : ""}
            style={{ ...iconStyle, color: user.palette[3] }}
            viewBox="0 0 478.125 478.125"
            onClick={() => handleMoodClick("smile")}
          />
        )}
        {user?.palette && (
          <HappyIcon
            className={mood === "happy" ? styles.modal_moodIcon_selected : ""}
            style={{ ...iconStyle, color: user.palette[1] }}
            viewBox="0 0 478.125 478.125"
            onClick={() => handleMoodClick("happy")}
          />
        )}
      </div>
      <button
        className={styles.modal_next_button}
        onClick={handleGoToNextModal}
      >
        다음
      </button>
    </Modal>
  );
};

export default StepOneModal;
