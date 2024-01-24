import { ReactNode } from "react";
import styles from "@/app/(beforeLogin)/_component/main.module.css";

type Props = { children: ReactNode; modal: ReactNode };

export default function Layout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      {children}
      {modal}
    </div>
  );
}
/**
 * 주소가 localhost:3000 일 때는
 *    children -> (beforeLogin)/page.tsx, -> return <Main />
 *    modal -> (beforeLogin)/@modal/default.tsx -> return null(: 모달이 없으니까)
 *
 * 주소가 localhost:3000/i/flow/login 일 때는 Login 버튼을 클릭했으므로,
 * /login 으로 우선감, 그리고 /login 은 인터셉트 라우팅이 일어나서
 *    children -> (beforeLogin)/login/page.tsx, -> return <Main />
 *    modal -> @modal/(.)i/flow/default.tsx -> return 가로채기<LoginModal />
 */
