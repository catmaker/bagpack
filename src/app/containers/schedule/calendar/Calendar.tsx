"use client";

import React from "react";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { CalendarProps } from "@/types/calendar";
import "./styles.css";
import EventModal from "./EventModal";
import FullCalendarWrapper from "./FullCalendarWrapper";
import styles from "./Calendar.module.scss";

const Calendar: React.FC<CalendarProps> = ({ onDateClick }) => {
  const {
    selectedEvent,
    isOpen,
    calendarEvents,
    handleEventClick,
    handleEventDrop,
    handleCloseModal,
  } = useCalendarEvents();

  return (
    <div className={styles.calendar}>
      <FullCalendarWrapper
        onDateClick={onDateClick}
        calendarEvents={calendarEvents}
        handleEventClick={handleEventClick}
        handleEventDrop={handleEventDrop}
      />
      <EventModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        selectedEvent={selectedEvent}
      />
    </div>
  );
};

export default Calendar;
