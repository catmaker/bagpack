import { StatisticsItemProps } from "@/types/home";
import styles from "./MainSection.module.scss";

const StatisticsItem = ({ title, value }: StatisticsItemProps) => (
  <div className={styles.mainSectionStatisticsItem}>
    <h3 className={styles.mainSectionStatisticsItemTitle}>{title}</h3>
    <span
      className={styles.mainSectionStatisticsItemValue}
      aria-label={`${title}: ${value}`}
    >
      {value}
    </span>
  </div>
);

export default StatisticsItem;
