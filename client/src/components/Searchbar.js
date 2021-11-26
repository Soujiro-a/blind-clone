import styles from "../../styles/components/Searchbar.module.css";
import { MdSearch } from "react-icons/md";

export default function Searchbar() {
  return (
    <div className={styles["wrap-searchbar"]}>
      <MdSearch size={25} className={styles["search-icon"]} />
      <input
        type="text"
        name="query"
        placeholder="관심있는 내용을 검색해보세요!"
      ></input>
    </div>
  );
}
