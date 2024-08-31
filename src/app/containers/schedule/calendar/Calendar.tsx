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
import Loading from "@/components/Loading";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/modal/Modal";
import useScheduleStore from "@/store/schedule";
import { CalendarProps, Event, EventContentProps } from "@/types/calendar";
import { updatePostDates } from "@/utils/axios/fetcher/schedule";
import styles from "./Calendar.module.scss";
import "./styles.css";

const EventContent = ({ arg, eventTitles }: EventContentProps) => (
  <div className={styles["event-content"]}>
    <b>{arg.timeText}</b>
    <span>
      <i className={styles.title}>
        {eventTitles !== undefined
          ? eventTitles[arg.event.id]
          : arg.event.title || ""}
      </i>
    </span>
  </div>
);

const renderDayCellContent = (info: DayCellContentArg) => {
  const number = document.createElement("a");
  number.classList.add("fc-daygrid-day-number");
  number.innerHTML = info.dayNumberText.replace("일", "").replace("日", "");
  return { html: number.outerHTML };
};

const Calendar = ({ onDateClick }: CalendarProps) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingEventId, setLoadingEventId] = useState<string | null>(null);
  const [eventTitles, setEventTitles] = useState<{ [key: string]: string }>({});
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);

  const posts = useScheduleStore((state) => state.posts);
  const updatePost = useScheduleStore((state) => state.updatePost);
  const fetchPosts = useScheduleStore((state) => state.fetchPosts);
  const user = useContext(UserContext);

  const renderEventContent = useCallback(
    (arg: EventContentArg) => (
      <EventContent arg={arg} eventTitles={eventTitles} />
    ),
    [eventTitles],
  );

  const memoizedRenderDayCellContent = useCallback(renderDayCellContent, []);

  useEffect(() => {
    if (user) {
      fetchPosts(user);
    }
  }, [user, fetchPosts]);

  useEffect(() => {
    if (Array.isArray(posts)) {
      const titles = posts.reduce(
        (acc, post) => ({ ...acc, [post.id]: post.title as string }),
        {} as { [key: string]: string },
      );
      setEventTitles((prevTitles) => ({ ...prevTitles, ...titles }));

      const events = posts.map((post) => ({
        id: post.id,
        title: post.title as string,
        date: post.startDate,
        end: post.endDate,
        backgroundColor: "#fe9a8a",
        content: post.content,
      }));
      setCalendarEvents(events);
    } else {
      console.error("posts가 배열이 아닙니다:", posts);
      setCalendarEvents([]);
    }
  }, [posts]);

  if (!user) return null;

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
    };

    console.log("이벤트 업데이트됨:", updatedEvent);
    updatePost(updatedEvent);

    try {
      await updatePostDates(
        user.email,
        dropInfo.event.id,
        dropInfo.event.startStr,
        dropInfo.event.endStr || dropInfo.event.startStr,
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

  return (
    <div className={styles.calendar}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable
        editable
        select={onDateClick}
        events={calendarEvents}
        height="100%"
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
            <Button backgroundColor="#e6e6e6" padding="10px 20px 10px 20px">
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
