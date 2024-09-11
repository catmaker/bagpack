// components/calendar/DayCellContent.tsx
import React from "react";
import { DayCellContentArg } from "@fullcalendar/core";

const DayCellContent: React.FC<{ arg: DayCellContentArg }> = ({ arg }) => {
  const dayNumber = arg.dayNumberText.replace("일", "").replace("日", "");
  return <span className="fc-daygrid-day-number">{dayNumber}</span>;
};

export default DayCellContent;
