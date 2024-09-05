import React from "react";
import { EventContentArg } from "@fullcalendar/core";

const EventContent: React.FC<{ arg: EventContentArg }> = ({ arg }) => {
  const priorityClass = `priority-${arg.event.extendedProps.priority ? arg.event.extendedProps.priority.toLowerCase() : "default"}`;
  return (
    <div className={`event-content ${priorityClass}`}>
      <b>{arg.timeText}</b>
      <i>{arg.event.title}</i>
    </div>
  );
};

export default EventContent;
