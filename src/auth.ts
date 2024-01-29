import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import KakaoProvider from "next-auth/providers/kakao";

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
