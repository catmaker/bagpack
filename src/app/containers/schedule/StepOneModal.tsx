"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import HappyIcon from "@/asset/svg/happy.svg";
import NaturalIcon from "@/asset/svg/natural.svg";
import SadIcon from "@/asset/svg/sad.svg";
import SmileIcon from "@/asset/svg/smile.svg";
import TerribleIcon from "@/asset/svg/terrible.svg";
import Modal from "@/components/ui/modal/Modal";
import { useDateManagement } from "@/hooks/useDateManagement";
import useScheduleStore from "@/store/schedule";
import { StepOneModalProps } from "@/types/schedule";
import styles from "./StepOneModal.module.scss";
import "./StepOneModalDatePicker.css";

const moodIcons = [
  { Icon: TerribleIcon, mood: "terrible", paletteIndex: 0, label: "매우 나쁨" },
  { Icon: SadIcon, mood: "sad", paletteIndex: 4, label: "나쁨" },
  { Icon: NaturalIcon, mood: "natural", paletteIndex: 2, label: "보통" },
  { Icon: SmileIcon, mood: "smile", paletteIndex: 3, label: "좋음" },
  { Icon: HappyIcon, mood: "happy", paletteIndex: 1, label: "매우 좋음" },
];

const StepOneModal: React.FC<StepOneModalProps> = ({
  isOpen,
  onClose,
  handleGoToNextModal,
  user,
  handleMoodClick,
}) => {
  const mood = useScheduleStore((state) => state.selectedMood);
  const { startDate, endDate, handleStartDateChange, handleEndDateChange } =
    useDateManagement();

  const iconStyle = { width: "35px", height: "35px" };

  const handleNextClick = () => {
    if (!mood) {
      alert("기분을 선택해 주세요.");
      return;
    }
    handleGoToNextModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="500px"
      minHeight="430px"
      className={styles.modal}
    >
      <h1 className={styles.modal_h1}>당신의 소중한 이야기를 남겨보세요!</h1>
      <div className={styles.datePickerBox}>
        <div>
          <p className={styles.pickerLabel}>시작일</p>
          <DatePicker
            selected={startDate}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy.MM.dd HH:mm"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            minDate={new Date("2000-01-01")}
          />
        </div>
        <div>
          <p className={styles.pickerLabel}>종료일</p>
          <DatePicker
            selected={endDate}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy.MM.dd HH:mm"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            minDate={startDate}
          />
        </div>
      </div>
      <div className={styles.modal_moodIcon_wrapper}>
        <div>
          <p className={styles.moodPicker}>오늘의 기분을 선택해 주세요</p>
          <div className={styles.iconBox}>
            {user?.palette &&
              moodIcons.map(({ Icon, mood: iconMood, paletteIndex, label }) => (
                <Icon
                  key={iconMood}
                  className={
                    mood === iconMood ? styles.modal_moodIcon_selected : ""
                  }
                  style={{ ...iconStyle, color: user.palette[paletteIndex] }}
                  viewBox="0 0 478.125 478.125"
                  onClick={() => handleMoodClick(iconMood)}
                  aria-label={label}
                />
              ))}
          </div>
        </div>
      </div>
      <div className={styles.modal_footer}>
        <button
          type="button"
          className={styles.modal_next_button}
          onClick={handleNextClick}
        >
          다음
        </button>
        <button
          type="button"
          onClick={onClose}
          className={styles.modal_close_button}
        >
          닫기
        </button>
      </div>
    </Modal>
  );
};

export default StepOneModal;
