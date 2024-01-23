import { ReactNode } from "react";
import style from "@/app/(afterLogin)/layout.module.css";
import Link from "next/link";
import Image from "next/image";
import ZLogo from "../../../public/zlogo.png";
import NavMenu from "./_component/NavMenu";
import LogoutButton from "@/app/(afterLogin)/_component/LogoutButton";
import TrendSection from "@/app/(afterLogin)/_component/TrendSection";
import FollowRecommend from "@/app/(afterLogin)/_component/FollowRecommend";
import RightSearchZone from "./_component/RightSearchZone";

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function AfterLoginLayout({ children, modal }: Props) {
  return (
    <div className={style.container}>
      {/* 왼쪽 섹션 : 헤더*/}
      <header className={style.leftSectionWrapper}>
        <section className={style.leftSection}>
          <div className={style.leftSectionFixed}>
            <Link className={style.logo} href="/home">
              <div className={style.logoPill}>
                <Image src={ZLogo} alt="z.com로고" width={40} height={40} />
              </div>
            </Link>
            <nav>
              <ul>
                {/* 왼쪽 네비게이션 메뉴 홈/탐색하기/쪽지/프로필 */}
                <NavMenu />
              </ul>
              <Link href="/compose/tweet" className={style.postButton}>
                게시하기
              </Link>
            </nav>
            <LogoutButton />
          </div>
        </section>
      </header>

      {/* 오른쪽 섹션 */}
      <div className={style.rightSectionWrapper}>
        <div className={style.rightSectionInner}>
          {/* 라우팅 된 페이지 : 왼쪽 사이드바 네비에서 url 라우팅 된 페이지(page.tsx)는 아래 children 에서 랜더링 됨 ex) /home, /expore,... */}
          <main className={style.main}>{children}</main>
          <section className={style.rightSection}>
            <RightSearchZone />
            <TrendSection />
            <div className={style.followRecommend}>
              <h3>팔로우 추천</h3>
              <FollowRecommend />
              <FollowRecommend />
              <FollowRecommend />
            </div>
          </section>
        </div>
      </div>
      {/* 패러럴 라우터 */}
      {modal}
    </div>
  );
}
