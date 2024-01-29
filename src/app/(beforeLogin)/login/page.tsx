"use client";

import { useRouter } from "next/navigation";
import Main from "@/app/(beforeLogin)/_component/Main";
import { useSession } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  /* 서버는 auth를 import해서 쓰는 반면, 
  클라이언트 컴포넌트는 useSession으로 로그인 유무 처리를 할 수 있다.*/
  const { data: session } = useSession();

  if (session?.user) {
    router.replace("/home");
    return null;
  }

  router.replace("/i/flow/login");
  return <Main />;
}
