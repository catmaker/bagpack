import { StatisticsItemProps } from "@/types/home";
import styles from "./MainSection.module.scss";

const StatisticsItem = ({ title, value }: StatisticsItemProps) => (
  <div className={styles.mainSectionStatisticsItem}>
    <p className={styles.mainSectionStatisticsItemTitle}>{title}</p>
    <p className={styles.mainSectionStatisticsItemValue}>{value}</p>
  </div>
);

export default StatisticsItem;
