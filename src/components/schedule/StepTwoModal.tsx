import React from "react";
import Modal from "@/components/ui/modal/Modal";
import Image from "next/image";
import styles from "@/app/(root)/schedule/ScheduleClient.module.scss";
type StepTwoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  selectedDayOfWeek: string;
  dayOfWeek: string;
  setIsNextModalOpen: (isOpen: boolean) => void;
  setIsModalOpen: (isOpen: boolean) => void;
};
const StepTwoModal = ({
  isOpen,
  onClose,
  selectedDate,
  selectedDayOfWeek,
  dayOfWeek,
  setIsNextModalOpen,
  setIsModalOpen,
}: StepTwoModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} width="1000px" minHeight="700px">
      <div>
        <div className={styles.nextModal_header}>
          <h1 className={styles.nextModal_h1}>
            {selectedDate
              ? `${selectedDate.toLocaleDateString()} ${dayOfWeek}`
              : "날짜를 선택해주세요"}
          </h1>
          <Image
            className={styles.nextModal_plusIcon}
            src={"/bagPackIcon/plus.svg"}
            width={20}
            height={20}
            alt="post_icon"
          />
        </div>
        <button
          onClick={() => {
            setIsNextModalOpen(false); // 현재 모달 닫기
            setIsModalOpen(true); // 이전 모달 열기
          }}
        >
          뒤로가기
        </button>
      </div>
    </Modal>
  );
};

export default StepTwoModal;
