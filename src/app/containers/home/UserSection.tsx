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
      <Link href="/mypage" className={styles.editProfileLink}>
        Edit Profile
      </Link>
    </section>
  );
};

export default UserSection;
