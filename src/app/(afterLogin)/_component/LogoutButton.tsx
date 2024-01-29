"use client";

import { signOut, useSession } from "next-auth/react";
import style from "./logoutButton.module.css";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  // const me = {
  //   id: "david",
  //   nickname: "데이비드",
  //   mage: "/5Udwvqim.jpg",
  // };
  const { data: me } = useSession();

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace("/");
    });
  };

  //방어코드
  if (!me) return null;

  return (
    <div className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image as string} alt={me.user?.email as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </div>
  );
}
