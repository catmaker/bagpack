import React, { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    console.log("EventModal useEffect is running");
    const checkMobile = () => {
      const newIsMobile = window.innerWidth <= 768;
      console.log("Window width:", window.innerWidth);
      console.log("isMobile:", newIsMobile);
      setIsMobile(newIsMobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  console.log("EventModal rendering, isMobile:", isMobile);

  if (!selectedEvent) return null;

  const formatDate = (dateStr: string) =>
    format(new Date(dateStr), "yyyy-MM-dd HH:mm");

  return (
    <Modal
      className={styles.modal}
      isOpen={isOpen}
      onClose={onClose}
      minWidth={isMobile ? "100%" : "60vw"}
      minHeight={isMobile ? "auto" : "auto"}
      isMobile={isMobile}
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
      <p
        className={styles.modal_content}
        dangerouslySetInnerHTML={{ __html: selectedEvent?.content || "" }}
      />
      <div className={styles.button_box}>
        <Button onClick={onClose}>닫기</Button>
        <Button type="submit">
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
