"use client";
import React from "react";
import Modal from "@/components/ui/modal/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TerribleIcon from "@/asset/svg/terrible.svg";
import HappyIcon from "@/asset/svg/happy.svg";
import NaturalIcon from "@/asset/svg/natural.svg";
import SmileIcon from "@/asset/svg/smile.svg";
import SadIcon from "@/asset/svg/sad.svg";
import styles from "@/app/(root)/schedule/ScheduleClient.module.scss";
type StepOneModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
  handleGoToNextModal: () => void;
  selectedMood: string | null;
  setSelectedMood: (mood: string) => void;
  user: any;
  handleMoodClick: (mood: string) => void;
};

const StepOneModal = ({
  isOpen,
  onClose,
  selectedDate,
  setSelectedDate,
  handleGoToNextModal,
  selectedMood,
  setSelectedMood,
  user,
  handleMoodClick,
}: StepOneModalProps) => {
  const iconStyle = { width: "35px", height: "35px" };
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
          className={styles["react-datepicker__input-container"]}
          dateFormat="yyyy.MM.dd HH:mm" // 날짜와 시간 형태
          shouldCloseOnSelect={false} // 날짜와 시간을 모두 선택한 후에 닫히도록 설정
          showTimeSelect // 시간 선택 옵션 활성화
          timeFormat="HH:mm" // 시간 형식
          timeIntervals={15} // 시간 선택 간격 (예: 15분)
          minDate={new Date("2000-01-01")} // minDate 이전 날짜 선택 불가
          maxDate={new Date()} // maxDate 이후 날짜 선택 불가
          selected={selectedDate}
          onChange={(date) => {
            console.log(date); // 선택된 날짜를 콘솔에 출력
            if (date) {
              // date가 null이 아닐 때만 setSelectedDate 호출
              setSelectedDate(date);
            }
          }}
        />
      </div>
      <div className={styles.modal_moodIcon_wrapper}>
        {user?.palette && (
          <TerribleIcon
            className={
              selectedMood === "terrible" ? styles.modal_moodIcon_selected : ""
            }
            style={{ ...iconStyle, color: user.palette[0] }}
            viewBox="0 0 478.125 478.125"
            onClick={() => handleMoodClick("terrible")}
          />
        )}
        {user?.palette && (
          <SadIcon
            className={
              selectedMood === "sad" ? styles.modal_moodIcon_selected : ""
            }
            style={{ ...iconStyle, color: user.palette[4] }}
            viewBox="0 0 478.125 478.125"
            onClick={() => handleMoodClick("sad")}
          />
        )}
        {user?.palette && (
          <NaturalIcon
            className={
              selectedMood === "natural" ? styles.modal_moodIcon_selected : ""
            }
            style={{ ...iconStyle, color: user.palette[2] }}
            viewBox="0 0 478.125 478.125"
            onClick={() => handleMoodClick("natural")}
          />
        )}
        {user?.palette && (
          <SmileIcon
            className={
              selectedMood === "smile" ? styles.modal_moodIcon_selected : ""
            }
            style={{ ...iconStyle, color: user.palette[3] }}
            viewBox="0 0 478.125 478.125"
            onClick={() => handleMoodClick("smile")}
          />
        )}
        {user?.palette && (
          <HappyIcon
            className={
              selectedMood === "happy" ? styles.modal_moodIcon_selected : ""
            }
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
