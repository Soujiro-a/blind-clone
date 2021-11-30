import Link from "next/link";
import styles from "../../../styles/components/Article/Breadcrumb.module.css";

export default function Breadcrumb({ title, slug }) {
  return (
    <section className={styles["breadcrumb"]}>
      <Link href={`/topics/${encodeURIComponent(slug)}`} passHref>
        <a>
          토픽 {`>`} {title}
        </a>
      </Link>
    </section>
  );
}
