import Image from "next/image";
import styles from "./FeatureItem.module.scss";

interface Props {
  iconSrc: string;
  title: string;
  description?: string;
}
const FeatureItem = ({ iconSrc, title, description }: Props) => (
  <div className={styles.content}>
    <div className={styles.titleContainer}>
      <Image src={iconSrc} width={20} height={20} alt={title} />
      <span className={styles.title}>{title}</span>
    </div>
    <span className={styles.description}>{description}</span>
  </div>
);

export default FeatureItem;
