import FeatureItem from "./FeatureItem";
import Image from "next/image";
import styles from "./index.module.scss";

const FeaturesSection = () => (
  <section className={styles.secondSection}>
    <h2 className={styles.secondTitle}>왜 TimeInK를 사용해야 할까요?</h2>
    <div className={styles.sectionContentFlex}>
      <div className={styles.sectionContentBox}>
        <FeatureItem
          iconSrc="/bagpackIcon/schedule.png"
          title="효율적인 일정 관리"
          description="여행 준비 과정에서 다양한 일정을 체계적으로 관리할 수 있습니다."
        />
        <FeatureItem
          iconSrc="/bagpackIcon/record.png"
          title="소중한 기억 기록하기"
          description="여행 중의 특별한 순간들을 사진과 함께 기록할 수 있습니다."
        />
      </div>
      <Image
        src={"/bagpackIcon/world.gif"}
        width={444}
        height={444}
        style={{ objectFit: "contain" }}
        alt=""
        className={styles.earth}
      />
      <div className={styles.sectionContentBox}>
        <FeatureItem
          iconSrc="/bagpackIcon/interface.png"
          title="사용자 친화적인 인터페이스"
          description="직관적이고 깔끔한 디자인으로 누구나 쉽게 사용할 수 있습니다."
        />
        <FeatureItem
          iconSrc="/bagpackIcon/function.png"
          title="다양한 기능 제공"
          description="일정 관리뿐만 아니라, 여행 팁, 장소 추천, 예산 관리 등의 다양한 기능을 제공합니다."
        />
      </div>
    </div>
  </section>
);

export default FeaturesSection;
