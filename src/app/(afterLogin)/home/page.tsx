import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import style from "./home.module.css";

export default function Home() {
  return (
    <main className={style.main}>
      {/* TabProvider는 클라이언트 컴포넌트임  */}
      <TabProvider>
        <Tab />
        {/* <PostForm />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post /> */}
      </TabProvider>
    </main>
  );
}
