import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/modal/Modal";
import { Event } from "@/types/calendar";
import styles from "./Calendar.module.scss";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEvent: Event | null;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  selectedEvent,
}) => {
  if (!selectedEvent) return null;

  const formatDate = (dateStr: string) =>
    format(new Date(dateStr), "yyyy-MM-dd HH:mm");

  return (
    <Modal
      className={styles.modal}
      isOpen={isOpen}
      onClose={onClose}
      maxHeight="600px"
      minWidth="60vw"
      minHeight="60vh"
    >
      <h2 className={styles.modal_title}>{selectedEvent.title}</h2>
      {selectedEvent.date === selectedEvent.end ? (
        <p className={styles.modal_day}>
          날짜: {formatDate(selectedEvent.date)}
        </p>
      ) : (
        <>
          <p>시작 날짜: {formatDate(selectedEvent.date)}</p>
          <p>종료 날짜: {formatDate(selectedEvent.end)}</p>
        </>
      )}
      <p className={styles.modal_content_title}>내용</p>
      <p dangerouslySetInnerHTML={{ __html: selectedEvent?.content || "" }} />
      <div className={styles.button_box}>
        <Button
          backgroundColor="#e6e6e6"
          padding="10px 20px 10px 20px"
          onClick={onClose}
        >
          닫기
        </Button>
        <Button
          backgroundColor="#e6e6e6"
          padding="10px 20px 10px 20px"
          type="submit"
        >
          <Link
            href={`schedule/${selectedEvent.id}/modify`}
            className={styles.modal_modify_link}
          >
            수정
          </Link>
        </Button>
      </div>
    </Modal>
  );
};

export default EventModal;
