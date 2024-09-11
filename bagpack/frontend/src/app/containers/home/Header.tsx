import styles from "@/app/containers/home/Header.module.scss";
import { User } from "@/types/user";

const Header = ({ user }: { user: User }) => {
  return <header className={styles.header} />;
};

export default Header;
