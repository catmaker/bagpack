"use client";

import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import Link from "next/link";
import {
  DayCellContentArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { format } from "date-fns";
import { UserContext } from "@/app/provider/UserProvider";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/modal/Modal";
import useScheduleStore from "@/store/schedule";
import { CalendarProps, Event, EventContentProps } from "@/types/calendar";
import { Post } from "@/types/schedule";
import { updatePostDates } from "@/utils/axios/fetcher/schedule";
import styles from "./Calendar.module.scss";
import "./styles.css";

// 날짜 셀의 내용을 렌더링하는 함수 ex 1일 2일 3일
const renderDayCellContent = (info: DayCellContentArg) => {
  const number = document.createElement("a");
  number.classList.add("fc-daygrid-day-number");
  number.innerHTML = info.dayNumberText.replace("일", "").replace("日", "");
  return { html: number.outerHTML };
};

// 각 이벤트 내용 렌더링 함수
const renderEventContent = (eventInfo: EventContentArg) => {
  const priorityClass = `priority-${eventInfo.event.extendedProps.priority ? eventInfo.event.extendedProps.priority.toLowerCase() : "default"}`;
  return (
    <div className={`event-content ${priorityClass}`}>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
};

// 캘린더 컴포넌트
const Calendar = ({ onDateClick }: CalendarProps) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingEventId, setLoadingEventId] = useState<string | null>(null);
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);

  const posts = useScheduleStore((state) => state.posts);
  const updatePost = useScheduleStore((state) => state.updatePost);
  const fetchPosts = useScheduleStore((state) => state.fetchPosts);
  const user = useContext(UserContext);
  const calendarRef = useRef<FullCalendar | null>(null);
  const [maxEventRows, setMaxEventRows] = useState<number | undefined>(
    undefined,
  );
  const memoizedRenderDayCellContent = useCallback(renderDayCellContent, []);

  useEffect(() => {
    if (Array.isArray(posts)) {
      const events = posts.map((post) => ({
        id: post.id,
        title: post.title as string,
        date: post.startDate,
        end: post.endDate,
        classNames: [
          `priority-${post.priority ? post.priority.toLowerCase() : "default"}`,
        ],
        content: post.content,
        priority: post.priority,
      }));

      if (process.env.NODE_ENV === "development") {
        console.log("All events:", events);
      }
      setCalendarEvents(events);
    } else {
      console.error("posts가 배열이 아닙니다:", posts);
      setCalendarEvents([]);
    }
  }, [posts]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMaxEventRows(2);
      } else {
        setMaxEventRows(undefined); // 768px 초과 시 제한 없음
      }
    };

    // 초기 실행
    handleResize();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      date: clickInfo.event.startStr,
      end: clickInfo.event.endStr || clickInfo.event.startStr,
      backgroundColor: clickInfo.event.backgroundColor,
      content: clickInfo.event.extendedProps.content,
    });
    setIsOpen(true);
  };

  const handleEventDrop = async (dropInfo: EventDropArg) => {
    if (!dropInfo || !dropInfo.event) {
      console.error("dropInfo 또는 dropInfo.event가 null입니다", dropInfo);
      return;
    }

    setLoadingEventId(dropInfo.event.id);

    const updatedEvent = {
      email: user.email,
      id: dropInfo.event.id,
      startDate: dropInfo.event.startStr,
      endDate: dropInfo.event.endStr || dropInfo.event.startStr,
      priority: dropInfo.event.extendedProps.priority,
      content: dropInfo.event.extendedProps.content,
      title: dropInfo.event.extendedProps.title,
      mood: dropInfo.event.extendedProps.mood,
    };

    console.log("이벤트 업데이트됨:", updatedEvent);
    updatePost(updatedEvent);

    try {
      await updatePostDates(
        user.email,
        dropInfo.event.id,
        dropInfo.event.startStr,
        dropInfo.event.endStr || dropInfo.event.startStr,
        dropInfo.event.extendedProps.priority,
      );
      fetchPosts(user);
    } catch (error) {
      console.error("이벤트 업데이트 중 오류 발생:", error);
    } finally {
      setLoadingEventId(null);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };

  const formatDate = (dateStr: string) =>
    format(new Date(dateStr), "yyyy-MM-dd HH:mm");

  if (!user) return null;

  return (
    <div className={styles.calendar}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        selectable
        editable
        select={onDateClick}
        height="100%"
        aspectRatio={1.35}
        events={calendarEvents}
        eventDisplay="block"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        headerToolbar={{
          left: "today",
          center: "prev title next",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
        titleFormat={{
          year: "numeric",
          month: "long",
        }}
        locale="ko"
        dayCellContent={memoizedRenderDayCellContent}
        contentHeight="100%"
        fixedWeekCount={false}
        dayMaxEventRows={maxEventRows}
      />
      {selectedEvent && (
        <Modal
          className={styles.modal}
          isOpen={isOpen}
          onClose={handleCloseModal}
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
          <p
            dangerouslySetInnerHTML={{ __html: selectedEvent?.content || "" }}
          />
          <div className={styles.button_box}>
            <Button
              backgroundColor="#e6e6e6"
              padding="10px 20px 10px 20px"
              onClick={handleCloseModal}
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
      )}
    </div>
  );
};

export default Calendar;
