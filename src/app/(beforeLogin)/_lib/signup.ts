/* eslint-disable import/no-anonymous-default-export */
"use server";
import { signIn } from "@/auth";
/* use server 사용시 서버코드를 아래에 적을 수 있다, 브라우저에 노출이 되지 않음*/

import { redirect } from "next/navigation";

export default async (
  prevState: { message: string | null | undefined },
  formData: FormData
) => {
  /* FormData는 input 태그의 name을 통해 value를 받아올 수 있음 */
  if (!formData.get("id") || !(formData.get("id") as string)?.trim()) {
    return { message: "no_id" };
  }
  if (!formData.get("name") || !(formData.get("name") as string)?.trim()) {
    return { message: "no_name" };
  }
  if (!formData.get("password") || !(formData.get("password") as string)?.trim()) {
    return { message: "no_password" };
  }
  if (!formData.get("image")) {
    return { message: "no_image" };
  }

  let shouldRedirect = false;
  await signIn("credentials", {
    username: formData.get("id"),
    password: formData.get("password"),
    redirect: false,
  });
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
      method: "post",
      body: formData,
      credentials: "include",
    });
    console.log(response.status);

    if (response.status === 403) {
      alert("이미 존재하는 아이디입니다.");
      return { message: "user_exists" };
    }

    console.log(await response.json());
    shouldRedirect = true;
  } catch (e) {
    console.error(e);
    alert("회원가입에 실패했습니다.");
  }

  if (shouldRedirect) redirect("/home"); // try catch문 안에서 X
};
