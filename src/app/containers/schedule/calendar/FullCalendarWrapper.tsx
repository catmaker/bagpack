import React, { useCallback, useRef, useState, useEffect } from "react";
import {
  DayCellContentArg,
  EventContentArg,
  DateSelectArg,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Event } from "@/types/calendar";
import DayCellContent from "./DayCellContent";
import EventContent from "./EventContent";
import styles from "./Calendar.module.scss";

interface FullCalendarWrapperProps {
  onDateClick?: (arg: DateSelectArg) => void;
  calendarEvents: Event[];
  handleEventClick: (arg: any) => void;
  handleEventDrop: (arg: any) => void;
}

const FullCalendarWrapper: React.FC<FullCalendarWrapperProps> = ({
  onDateClick,
  calendarEvents,
  handleEventClick,
  handleEventDrop,
}) => {
  const calendarRef = useRef<FullCalendar | null>(null);
  const [maxEventRows, setMaxEventRows] = useState<number | undefined>(
    undefined,
  );

  const memoizedDayCellContent = useCallback(
    (arg: DayCellContentArg) => <DayCellContent arg={arg} />,
    [],
  );
  const memoizedEventContent = useCallback(
    (arg: EventContentArg) => <EventContent arg={arg} />,
    [],
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMaxEventRows(2);
      } else {
        setMaxEventRows(undefined);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
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
      eventContent={memoizedEventContent}
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
      dayCellContent={memoizedDayCellContent}
      contentHeight="100%"
      fixedWeekCount={false}
      dayMaxEventRows={maxEventRows}
      longPressDelay={500}
    />
  );
};

export default FullCalendarWrapper;
