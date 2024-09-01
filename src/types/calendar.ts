import {
  DayCellContentArg,
  EventClickArg,
  EventContentArg,
  EventDropArg,
} from "@fullcalendar/core";

export type CalendarProps = {
  onDateClick?: (info: any) => void;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  backgroundColor?: string;
  end: string;
  content?: string;
  classNames?: string[];
};

export type EventContentProps = {
  arg: EventContentArg;
  eventTitles: { [key: string]: string };
};
