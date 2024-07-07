"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // 필요한 플러그인!
type CalendarProps = {
  onDateClick?: (info: any) => void;
  event?: [];
};

const Calendar = ({ onDateClick, event }: CalendarProps) => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true} // 날짜 선택 가능
      dateClick={onDateClick} // 날짜 클릭 시 이벤트
      events={event}
    />
  );
};

export default Calendar;
