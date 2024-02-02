import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";
import { Post } from "@/model/Post";
import { MouseEventHandler } from "react";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  noImage?: boolean;
  post: Post;
};

const stopPropagation: MouseEventHandler<HTMLAnchorElement> = (e) => {
  e.stopPropagation();
};

export default function Post({ noImage, post }: Props) {
  const target = post;

  return (
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        {/* 포스트 유저 섹션 */}
        <div className={style.postUserSection}>
          <Link
            href={`/${target.User.id}`}
            className={style.postUserImage}
            onClick={stopPropagation}
          >
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        {/* 포스트 바디 */}
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`} onClick={stopPropagation}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          <div>{target.content}</div>
          {!noImage && (
            <div>
              <PostImages post={target} />
            </div>
          )}
          {/* 액션버튼 3개 좋아요... */}
          <ActionButtons post={target} />
        </div>
      </div>
    </PostArticle>
  );
}
