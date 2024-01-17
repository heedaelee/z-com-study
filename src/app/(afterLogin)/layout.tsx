import { ReactNode } from "react";
import styles from "@/app/(afterLogin)/layout.module.css";

export default function AfterLoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <header className={styles.leftSectionWrapper}>
        <section className={styles.leftSection}></section>
      </header>
      <div className={styles.rightSectionWrapper}>
        <div className={styles.rightSectionInner}>
          {/* <main className={styles.main}>{children}</main> */}
          {/* <section className={styles.rightSection}></section> */}
        </div>
      </div>
    </div>
  );
}
