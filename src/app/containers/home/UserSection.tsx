import Image from "next/image";
import Link from "next/link";
import Circle from "@/components/ui/Circle";
import { User } from "@/types/user";
import styles from "./UserSection.module.scss";

const UserSection = ({ user }: { user: User }) => {
  return (
    <section className={styles.userSectionContainer}>
      <Circle className={styles.avatarWrapper} color="white" size={300}>
        <Image
          src="/bagpackIcon/profile.jpg"
          fill
          alt="userProfile"
          style={{ borderRadius: "50%" }}
        />
      </Circle>
      <p className={styles.userNickname}>{user?.nickname}</p>
      <p className={styles.userEmail}>{user?.email}</p>
    </section>
  );
};

export default UserSection;
