1. Level 2 브랜치
   -> typeScripts를 이용한 TodoList 작성 방법 이용

2. 리덕스 파일을 생성 configstore 및 todoslice모듈을 생성

todoslice.jsx에는 기존 Level_1에서 사용하였던 기능들을 전부 가져온다

action payload에 타입을 지정 시켜준다.

configstore에서

rootstate로 스토어 전체 상태를 나태내준다음에

typeof store.dispatch를 통해 생성된 AppDispatch로 리덕스 액션 디스패치

useAppDispatch로 컴포넌트 내에서 디스패치 메서드를 사용할수 있게 도움

3. 컴포넌트에서 Dispatch를 사용

4. 이하 Level_1 과 같음
