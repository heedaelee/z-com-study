"use client";

import style from "./logoutButton.module.css";

export default function LogoutButton() {
  const me = {
    id: "david",
    nickname: "데이비드",
    mage: "/5Udwvqim.jpg",
  };

  const onLogout = () => {};

  return (
    <div className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.mage} alt={me.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.nickname}</div>
        <div>@{me.id}</div>
      </div>
    </div>
  );
}
