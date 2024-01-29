import Main from "@/app/(beforeLogin)/_component/Main";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  /* 서버 컴포넌트에선 우리가 만든 auth를 가져 올 수 있다. */
  const session = await auth();
  /* 로그인이 안되어있다면 /home으로 강제 송출 */
  if (session?.user) {
    redirect("/home");
    return null;
  }

  return <Main />;
}
