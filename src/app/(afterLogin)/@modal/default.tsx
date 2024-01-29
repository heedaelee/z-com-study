/*  클릭 액션이 없을때, 
즉 모달이 안열리는 초기 페이지에서 보여줄 컴포넌트.
afterLogin/layout.tsx 에서 패러럴라우팅 페이지 부분 {modal}에 <Default /> = null 이 들어가있음. 
그래서 초기에 모달이 안열리고, 유저가 게시하기 버튼 클릭시 url이 /compose/tweet을
클릭하면서 @modal/compose/tweet/page.tsx 가 받아서 열리는 것임.

즉, return null 인 이유는 모달이 안열리는 초기 페이지에서 보여줄 컴포넌트이기 때문임.
*/
export default function Default() {
  return null;
}
