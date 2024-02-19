"use client";

import { useRouter } from "next/navigation";
import style from "./post.module.css";
import { Post } from "@/model/Post";

type Props = {
  children: React.ReactNode;
  post: Post;
};

export default function PostArticle({ post, children }: Props) {
  const router = useRouter();
  let target = post;
  if (post.Original) {
    target = post.Original;
  }

  const onclick = () => {
    router.push(`/${target.User.id}/status/${target.postId}`);
  };

  return (
    /* onClickCapture를 아래와 같이 사용하면, 자식단에서 클릭를 해도 onClick이 실행되지 않는다. 딱 article 타겟까지 
    4강에서 onclick으로 변경함
    */
    <article className={style.post} onClick={onclick}>
      {children}
    </article>
  );
}
