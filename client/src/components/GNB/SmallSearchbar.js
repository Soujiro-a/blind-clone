import Image from "next/image";
import styles from "../../../styles/components/GNB/SmallSearchbar.module.css";
import searchImg from "../../../public/images/search.png";

export default function SmallSearchbar() {
  return (
    <div className={styles["wrap-search"]}>
      <a className={styles["search-icon"]}>
        <Image src={searchImg} alt="검색" width={20} height={20} />
      </a>
      <input type="text" className={styles["input"]} />
    </div>
  );
}
