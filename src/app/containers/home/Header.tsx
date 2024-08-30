import { motion } from "framer-motion";
import styles from "@/app/containers/home/Header.module.scss";
import SideBar from "@/components/ui/SideBar/SideBar";
import { User } from "@/types/user";
import SearchSection from "./SearchSection";
import UserSection from "./UserSection";

const Header = ({ user }: { user: User }) => {
  return (
    <header className={styles.header}>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SideBar />
      </motion.div>
      <SearchSection />
      <UserSection user={user} />
    </header>
  );
};

export default Header;
