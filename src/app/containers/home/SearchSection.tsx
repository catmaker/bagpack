import Image from "next/image";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import styles from "./SearchSection.module.scss";

const SearchSection = () => {
  return (
    <section className={styles.searchSectionContainer}>
      <SearchBar
        width="500px"
        height="50px"
        className={styles.searchBarWrapper}
        placeholder="Search your mood...."
      >
        <Image
          className={styles.searchIconImage}
          src="/bagpackIcon/search.svg"
          width={18}
          height={18}
          alt="Search Icon"
        />
      </SearchBar>
    </section>
  );
};

export default SearchSection;
