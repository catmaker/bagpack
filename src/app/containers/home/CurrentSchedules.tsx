import Link from "next/link";
import { Schedule, CurrentSchedulesProps } from "@/types/home";
import styles from "./MainSection.module.scss";

const ScheduleItem = ({ id, title }: Schedule) => (
  <li>
    <Link href={`/schedule/${id}`}>
      <span className={styles.srOnly}>일정: </span>
      {title}
    </Link>
  </li>
);

const CurrentSchedules = ({ schedules }: CurrentSchedulesProps) => {
  return (
    <section
      className={styles.mainSectionCurrentSchedules}
      aria-labelledby="current-schedules-heading"
    >
      <h2
        id="current-schedules-heading"
        className={styles.currentSchedulesHeading}
      >
        현재 진행 중인 일정
      </h2>
      {schedules.length === 0 ? (
        <p role="status" aria-live="polite">
          현재 진행 중인 일정이 없습니다.
        </p>
      ) : (
        <nav aria-label="현재 일정 목록">
          <ul>
            {schedules.map((schedule) => (
              <ScheduleItem key={schedule.id} {...schedule} />
            ))}
          </ul>
        </nav>
      )}
    </section>
  );
};

export default CurrentSchedules;
