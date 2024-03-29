"use client";

import { useRouter } from "next/navigation";
import style from "./post.module.css";

type Props = {
  children: React.ReactNode;
  post: {
    postId: number;
    content: string;
    User: {
      id: string;
      nickname: string;
      image: string;
    };
    createdAt: Date;
    Images: any[];
  };
};

export default function PostArticle({ post, children }: Props) {
  const router = useRouter();

  const onclick = () => {
    router.push(`/${post.User.id}/status/${post.postId}`);
  };

  return (
    /* onClickCapture를 아래와 같이 사용하면, 자식단에서 클릭를 해도 onClick이 실행되지 않는다. 딱 article 타겟까지 */
    <article className={style.post} onClickCapture={onclick}>
      {children}
    </article>
  );
}
