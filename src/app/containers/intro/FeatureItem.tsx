import Image from "next/image";
import styles from "./FeatureItem.module.scss";

interface FeatureItemProps {
  iconSrc: string;
  title: string;
  description?: string;
}

const FeatureItem = ({ iconSrc, title, description }: FeatureItemProps) => (
  <div className={styles.featureItemWrapper}>
    <div className={styles.featureHeader}>
      <Image src={iconSrc} width={20} height={20} alt={`${title} icon`} />
      <h3 className={styles.featureTitle}>{title}</h3>
    </div>
    {description && <p className={styles.featureDescription}>{description}</p>}
  </div>
);

export default FeatureItem;
