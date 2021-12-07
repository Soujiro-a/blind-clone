# :pushpin: Blind-Clone

> 직장인 커뮤니티 [Blind](https://www.teamblind.com/kr/) 사이트의 Clone-Coding 프로젝트

## :calendar: 1. 제작 기간 & 참여 인원

- 2021.11.16 ~ 현재
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

:pushpin: [코드 확인](https://bit.ly/3EjPknQ)

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
<summary>token 저장 문제</summary>
<div markdown="1">

- 초기에는 localStorage에 저장하고 있었습니다.
- 그러나 getServerSideProps를 사용하여 데이터 Fetch를 시도할 때, localStorage에 접근할 수 없는 문제가 발생하였습니다.
- localStorage 토큰 저장 -> cookie 토큰 저장으로 수정하였습니다.

:pushpin: [참고 링크](https://lemontia.tistory.com/1012)
:pushpin: [코드 확인]()

</div>
</details>

<details>
<summary>next-redux-wrapper 상태값 중첩 문제</summary>
<div markdown="1">

- next-redux-wrapper로 Hydrate를 시켜줄 때마다 값이 중첩되어 나오고 있었습니다.

![redux 수정 전 상태](https://user-images.githubusercontent.com/68040092/144962247-d2557cd0-3cf1-4781-8d73-114e8f2579f4.png)

- Hydrate를 할 때의 데이터를 항상 state와 action 모두 그대로 반환하는게 문제였습니다.
- Hydrate단계에서 Object.assign 메소드를 사용하여 각 상태에 맞게 데이터를 수정한 후 반환해줌으로서 원하는 상태로 수정할 수 있었습니다.

![redux 수정 후 상태](https://user-images.githubusercontent.com/68040092/144962721-8db505e4-348c-43ec-bddb-b6477e10178d.png)

:pushpin: [참고 링크](https://lemontia.tistory.com/1012)
:pushpin: [코드 확인]()

</div>
</details>
