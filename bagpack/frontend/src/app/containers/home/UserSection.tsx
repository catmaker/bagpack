import Image from "next/image";
import { User } from "@/types/user";
import styles from "./UserSection.module.scss";

const UserSection = ({ user }: { user: User }) => {
  return (
    <section className={styles.userSectionContainer}>
      <div className={styles.avatarWrapper}>
        <Image
          src={
            user.profilePictureUrl === undefined
              ? "/bagpackIcon/user.png"
              : user.profilePictureUrl
          }
          width={250}
          height={250}
          alt="userProfile"
          style={{ borderRadius: "50%" }}
        />
      </div>
      <p className={styles.userNickname}>{user?.nickname}</p>
      <p className={styles.userEmail}>{user?.email}</p>
    </section>
  );
};

export default UserSection;
