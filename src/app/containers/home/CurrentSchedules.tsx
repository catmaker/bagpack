import Link from "next/link";
import { Schedule, CurrentSchedulesProps } from "@/types/home";
import styles from "./MainSection.module.scss";

const ScheduleItem = ({ id, title }: Schedule) => (
  <li>
    <Link href={`/schedule/${id}`}>{title}</Link>
  </li>
);

const CurrentSchedules = ({ schedules }: CurrentSchedulesProps) => {
  if (schedules.length === 0) return null;

  return (
    <div className={styles.mainSectionCurrentSchedules}>
      <h3>현재 진행 중인 일정</h3>
      <ul>
        {schedules.map((schedule) => (
          <ScheduleItem key={schedule.id} {...schedule} />
        ))}
      </ul>
    </div>
  );
};

export default CurrentSchedules;
