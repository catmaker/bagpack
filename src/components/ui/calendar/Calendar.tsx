"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // 필요한 플러그인!
// zustand
import useScheduleStore from "@/store/schedule";
// styles
import styles from "./Calendar.module.scss";
type CalendarProps = {
  onDateClick?: (info: any) => void;
  event?: [];
};
type Event = {
  title: string;
  date: string;
  backgroundColor: string;
};

const Calendar = ({ onDateClick }: CalendarProps) => {
  let event: Event[] = []; // 'event' 변수에 명시적인 타입 선언
  const posts = useScheduleStore((state) => state.posts);
  posts.map((post) => {
    event.push({
      title: post.title,
      date: post.startDate,
      backgroundColor: "red",
    });
  });

  return (
    <div className={styles.calendar}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true} // 날짜 선택 가능
        select={onDateClick} // 날짜 클릭 시 이벤트
        events={event}
        height={"100%"}
      />
    </div>
  );
};

export default Calendar;
