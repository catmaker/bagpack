import Image from "next/image";
import AlarmIcon from "@/asset/svg/alarm.svg";
import Circle from "@/components/ui/Circle";
import { User } from "@/types/user";
import styles from "./UserSection.module.scss";

const UserSection = ({ user }: { user: User }) => {
  return (
    <section className={styles.userSectionContainer}>
      <div className={styles.userInfoWrapper}>
        <Circle className={styles.alarmIconWrapper} color="white" size={38}>
          <AlarmIcon width="16" height="16" fill="rgb(255, 119, 119)" />
        </Circle>
        <div className={styles.userProfileContainer}>
          <Circle className={styles.avatarWrapper} color="white" size={38}>
            <Image
              src="/bagpackIcon/profile.jpg"
              fill
              alt="userProfile"
              style={{ borderRadius: "50%" }}
            />
          </Circle>
          <p className={styles.userNickname}>{user?.nickname}</p>
        </div>
      </div>
    </section>
  );
};

export default UserSection;
