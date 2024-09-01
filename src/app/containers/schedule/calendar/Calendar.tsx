import React, { useState, useEffect, useContext, useCallback } from "react";
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
  const priorityClass = `priority-${eventInfo.event.extendedProps.priority ? eventInfo.event.extendedProps.priority.toLowerCase() : "default"}`; // priority 확인 추가
  return (
    <div className={`event-content ${priorityClass}`}>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </div>
  );
};

// 캘린더 컴포넌트
const Calendar = ({ onDateClick }: CalendarProps) => {
  // 상태 관리
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // 선택된 이벤트
  const [isOpen, setIsOpen] = useState(false); // 모달 열림 상태
  const [loadingEventId, setLoadingEventId] = useState<string | null>(null); // 로딩 중인 이벤트 ID
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]); // 캘린더 이벤트 목록

  // 스케줄 스토어에서 데이터 가져오기
  const posts = useScheduleStore((state) => state.posts);
  const updatePost = useScheduleStore((state) => state.updatePost);
  const fetchPosts = useScheduleStore((state) => state.fetchPosts);
  const user = useContext(UserContext); // 사용자 정보

  // 날짜 셀 내용 렌더링 함수 메모이제이션
  const memoizedRenderDayCellContent = useCallback(renderDayCellContent, []);

  // 포스트 데이터가 변경될 때 이벤트 생성
  useEffect(() => {
    if (Array.isArray(posts)) {
      // 이벤트 객체 생성
      const events = posts.map((post) => {
        return {
          id: post.id,
          title: post.title as string,
          date: post.startDate,
          end: post.endDate,
          classNames: [
            `priority-${post.priority ? post.priority.toLowerCase() : "default"}`,
          ], // post.priority 확인 추가
          content: post.content,
          priority: post.priority,
        };
      });

      if (process.env.NODE_ENV === "development") {
        console.log("All events:", events);
      }
      setCalendarEvents(events);
    } else {
      console.error("posts가 배열이 아닙니다:", posts);
      setCalendarEvents([]);
    }
  }, [posts]);

  // 사용자 정보가 없으면 null 반환
  if (!user) return null;

  // 이벤트 클릭 핸들러
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

  // 이벤트 드래그 앤 드롭 핸들러
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

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };

  // 날짜 포맷 함수
  const formatDate = (dateStr: string) =>
    format(new Date(dateStr), "yyyy-MM-dd HH:mm");

  if (process.env.NODE_ENV === "development") {
    console.log("calendarEvents:", calendarEvents);
  }

  return (
    <div className={styles.calendar}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable
        editable
        select={onDateClick}
        events={calendarEvents} // 이벤트 목록
        height="100%"
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        eventContent={renderEventContent} // 이벤트 컨텐츠 렌더링
        eventClick={handleEventClick} // 이벤트 클릭 핸들러
        eventDrop={handleEventDrop} // 이벤트 드래그 앤 드롭 핸들러
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
        dayCellContent={memoizedRenderDayCellContent} // 날짜 셀 컨텐츠 렌더링
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
