import { auth } from "./auth";
import { NextResponse } from "next/server";

/*
  아래 matcher는 미들웨어를 적용할 페이지를 정해준다. 
  matcher 페이지에 들어가면 middleware가 실행되어 session 사용이 가능해진다
 */
export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect("http://localhost:3000/i/flow/login");
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/compose/tweet", "/home", "/explore", "/messages", "/search"],
};
