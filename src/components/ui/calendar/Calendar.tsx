import React, { useState, useEffect, useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import useScheduleStore from "@/store/schedule";
import styles from "./Calendar.module.scss";
import Modal from "../modal/Modal";
import { UserContext } from "@/app/provider/UserProvider";
import "./styles.css";
type CalendarProps = {
  onDateClick?: (info: any) => void;
  event?: [];
};

type Event = {
  id: string;
  title: string;
  date: string;
  backgroundColor: string;
  end: string;
  content?: string;
};

const Calendar = ({ onDateClick }: CalendarProps) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingEventId, setLoadingEventId] = useState<string | null>(null); // 로딩 중인 이벤트 ID 추가
  const [eventTitles, setEventTitles] = useState<{ [key: string]: string }>({}); // 이벤트 타이틀 추가
  const posts = useScheduleStore((state) => state.posts);
  const updatePost = useScheduleStore((state) => state.updatePost);
  const fetchPosts = useScheduleStore((state) => state.fetchPosts);
  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchPosts(user);
    }
  }, [user, fetchPosts]);

  useEffect(() => {
    if (Array.isArray(posts)) {
      const titles = posts.reduce(
        (acc, post) => {
          acc[post.id] = post.title as string;
          return acc;
        },
        {} as { [key: string]: string },
      );
      setEventTitles((prevTitles) => ({
        ...prevTitles,
        ...titles,
      }));
    }
  }, [posts]);

  useEffect(() => {
    console.log("Event titles updated:", eventTitles);
  }, [eventTitles]);

  if (!user) {
    return null;
  }

  const userEmail = user.email;
  let event: Event[] = [];
  if (Array.isArray(posts)) {
    posts.map((post) => {
      event.push({
        id: post.id,
        title: post.title as string,
        date: post.startDate,
        end: post.endDate,
        backgroundColor: "#fe9a8a ",
        content: post.content,
      });
    });
  } else {
    console.error("posts가 배열이 아닙니다:", posts);
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    setSelectedEvent({
      id: clickInfo.event.id,
      title: clickInfo.event.title,
      date: clickInfo.event.startStr,
      end: clickInfo.event.endStr,
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

    setLoadingEventId(dropInfo.event.id); // 로딩 중인 이벤트 ID 설정

    const updatedEvent = {
      email: userEmail,
      id: dropInfo.event.id,
      startDate: dropInfo.event.startStr,
      endDate: dropInfo.event.endStr,
    };

    console.log("이벤트 업데이트됨:", updatedEvent);
    updatePost(updatedEvent);

    try {
      const response = await fetch(`/api/user/updatePostDates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      const data = await response.json();
      console.log("이벤트 업데이트됨:", data);
      fetchPosts(user); // 상태를 다시 불러와서 캘린더를 리렌더링
    } catch (error) {
      console.error("이벤트 업데이트 중 오류 발생:", error);
    } finally {
      setLoadingEventId(null); // 로딩 중인 이벤트 ID 초기화
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };

  console.log(selectedEvent);

  return (
    <div className={styles.calendar}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        select={onDateClick}
        events={event}
        height={"100%"}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        eventContent={(arg) => {
          console.log(arg.event._def);
          return (
            <div className={styles["event-content"]}>
              <b>{arg.timeText}</b>
              <span>
                <i className={styles["title"]}>
                  {eventTitles !== undefined
                    ? eventTitles[arg.event.id]
                    : arg.event.title || ""}
                </i>
              </span>
            </div>
          );
        }}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        headerToolbar={{
          left: "today", // 왼쪽에 이전/다음/오늘 버튼 배치
          center: "prev title next", // 중앙에 제목 배치
          right: "dayGridMonth,dayGridWeek,dayGridDay", // 오른쪽에 보기 선택 버튼 배치
        }}
        titleFormat={{
          year: "numeric",
          month: "long",
        }}
        locale={"ko"}
        dayCellContent={function (info) {
          var number = document.createElement("a");
          number.classList.add("fc-daygrid-day-number");
          number.innerHTML = info.dayNumberText
            .replace("일", "")
            .replace("日", "");

          return {
            html: number.outerHTML,
          };
        }}
      />

      {selectedEvent && (
        <Modal
          className={styles.modal}
          isOpen={isOpen}
          onClose={handleCloseModal}
          maxHeight="600px"
        >
          <h2>{selectedEvent.title}</h2>
          <p>Start: {selectedEvent.date}</p>
          <p>End: {selectedEvent.end}</p>
          <p
            dangerouslySetInnerHTML={{ __html: selectedEvent?.content || "" }}
          ></p>
        </Modal>
      )}
    </div>
  );
};

export default Calendar;
