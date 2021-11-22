import { Header } from "semantic-ui-react";
import Image from "next/image";
import GNB from "./GNB";

export default function Top() {
  return (
    <div>
      <div style={{ display: "flex", paddingTop: 20 }}>
        <div style={{ flex: "100px 0 0" }}>
          <Image
            src="/images/blind.png"
            alt="블라인드 로고"
            width={200}
            height={130}
          />
        </div>
        <Header as="h1">KKY</Header>
      </div>
      <GNB />
    </div>
  );
}
