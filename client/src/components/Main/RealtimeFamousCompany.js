import styles from "../../../styles/components/Main/RealtimeFamousCompany.module.css";
import { BiInfoCircle } from "react-icons/bi";

export default function RealtimeFamousCompany({ famousCompanyList }) {
  return (
    <aside className={styles["aside"]}>
      <div className={styles["head"]}>실시간 인기 회사</div>
      <ol className={styles["company-list"]}>
        {famousCompanyList.map((company, index) => {
          return (
            <li key={company._id}>
              <em>{index + 1}</em>
              {company.name}
            </li>
          );
        })}
      </ol>
      <p className={styles["company-rank-title"]}>
        <BiInfoCircle size={15} />
        <span style={{ marginLeft: "5px" }}>
          블라인드에서 실시간으로 많이 검색된 회사 순위
        </span>
      </p>
    </aside>
  );
}
