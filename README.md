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

:pushpin: [코드 확인](bit.ly/3EjPknQ)

</div>
</details>
