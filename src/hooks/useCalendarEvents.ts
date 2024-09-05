// hooks/useCalendarEvents.ts
import { useState, useEffect, useContext } from "react";
import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import { UserContext } from "@/app/provider/UserProvider";
import useScheduleStore from "@/store/schedule";
import { Event } from "@/types/calendar";
import { updatePostDates } from "@/utils/axios/fetcher/schedule";

export const useCalendarEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingEventId, setLoadingEventId] = useState<string | null>(null);
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);

  const posts = useScheduleStore((state) => state.posts);
  const updatePost = useScheduleStore((state) => state.updatePost);
  const fetchPosts = useScheduleStore((state) => state.fetchPosts);
  const user = useContext(UserContext);

  useEffect(() => {
    if (Array.isArray(posts)) {
      const events = posts.map((post) => ({
        id: post.id,
        title: post.title as string,
        date: post.startDate,
        end: post.endDate,
        classNames: [
          `priority-${post.priority ? post.priority.toLowerCase() : "default"}`,
        ],
        content: post.content,
        priority: post.priority,
      }));

      if (process.env.NODE_ENV === "development") {
        console.log("All events:", events);
      }
      setCalendarEvents(events);
    } else {
      console.error("posts가 배열이 아닙니다:", posts);
      setCalendarEvents([]);
    }
  }, [posts]);

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
    if (!user) {
      console.error("User is not logged in");
      return;
    }

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

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedEvent(null);
  };

  return {
    selectedEvent,
    isOpen,
    loadingEventId,
    calendarEvents,
    handleEventClick,
    handleEventDrop,
    handleCloseModal,
    user,
  };
};
