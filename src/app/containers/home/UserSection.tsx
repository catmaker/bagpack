import Image from "next/image";
import { User } from "@/types/user";
import styles from "./UserSection.module.scss";

const UserSection = ({ user }: { user: User }) => {
  return (
    <section className={styles.userSectionContainer} aria-label="사용자 프로필">
      <div className={styles.avatarWrapper}>
        <Image
          src={user?.profilePictureUrl}
          width={250}
          height={250}
          alt={`${user?.nickname}의 프로필 사진`}
          style={{ borderRadius: "50%" }}
        />
      </div>
      <h2 className={styles.userNickname}>{user?.nickname}</h2>
      <p className={styles.userEmail}>
        <span className={styles.srOnly}>이메일:</span> {user?.email}
      </p>
    </section>
  );
};

export default UserSection;
