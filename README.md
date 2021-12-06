# :pushpin: Blind-Clone

> 직장인 커뮤니티 [Blind](https://www.teamblind.com/kr/) 사이트의 Clone-Coding 프로젝트

## :calendar: 1. 제작 기간 & 참여 인원

- 2021.11.16 ~ 2021.11.30
- 개인 프로젝트

## :computer: 2. 사용 기술

**Back-end**

- Node.js
- Express.js
- mongoose
- jsonwebtoken

**front-end**

- Next.js
- redux

## :hammer: 3. ERD 설계

![blind-clone ERD](https://user-images.githubusercontent.com/68040092/144699456-bb00e713-a660-453a-9206-05ff4eab7367.png)

## :dart: 4. 핵심 기능

이 서비스의 핵심기능은 크게 2가지입니다.

- 게시글 및 댓글 등록 기능
- 닉네임 익명 처리

## :rotating_light: 5. 트러블 슈팅

<details>
<summary>루트 페이지 게시판 표시 순서 변동문제</summary>
<div markdown="1">

- 기존 루트 페이지에서 매번 게시판 순서가 뒤죽박죽인 상태였습니다.
  - 데이터를 게시판의 고유 id 순서대로 정렬하여 받아옴으로서 해결하였습니다.

:pushpin: [코드 확인](https://github.com/Soujiro-a/blind-clone/blob/c9dc1addb10f321a3996f7c119a772314fcc6cba/server/router/board.js#L33)

</div>
</details>

<details>
<summary>Error: Counter already defined for field</summary>
<div markdown="1">

- mongoose-sequence 패키지를 사용하여 autoincrement를 생성하다 발생한 오류입니다.
- NodeJS 기반 서버에서는 발생하지 않던 오류였으나, NextJS로 서버를 통합하는 과정에서 발생하였습니다.
- autoincrement 생성 전에 컬렉션이 존재하지 않을때만 생성하도록 조건을 걸어주어 중복생성을 방지할 수 있었습니다.

:pushpin: [참고 링크](https://github.com/ramiel/mongoose-sequence/issues/100)
:pushpin: [코드 확인]()

</div>
</details>

<details>
<summary>localStorage 사용 문제</summary>
<div markdown="1">

-

:pushpin: [참고 링크]()
:pushpin: [코드 확인]()

</div>
</details>
