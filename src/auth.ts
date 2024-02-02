import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import KakaoProvider from "next-auth/providers/kakao";
import { cookies } from "next/headers";
import cookie from "cookie";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  /* NEXT가 기본페이지 제공해주지만 우리가 커스텀 한게 있으니 연결시킴 */
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        /* 백엔드에서 로그인, 후 토큰을 쿠키에 넣어서 보내줌. 브라우저에서 확인한 connect.sid가 authResponse에 받겨짐 */
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        });

        // 쿠키를 받아옴 (로그인 상태 유지)
        let setCookie = authResponse.headers.get("Set-Cookie");
        console.log("set-cookie", setCookie);
        if (setCookie) {
          const parsed = cookie.parse(setCookie); // 문자열로 된 쿠키를 객체로 바꿔줌
          cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심어줌
        }

        if (!authResponse.ok) {
          return null;
        }

        /* 받아오는 user값이 return으로 우리의 세션 데이터가 된다  */
        const user = await authResponse.json();

        console.log("user", user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
    /* 카카오 예시 */
    // KakaoProvider({

    // })
  ],
});
