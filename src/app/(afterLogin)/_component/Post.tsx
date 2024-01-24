import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import { faker } from "@faker-js/faker";
import PostArticle from "./PostArticle";
import PostImages from "./PostImages";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  noImage?: boolean;
};

export default function Post({ noImage }: Props) {
  const target = {
    postId: 1,
    User: {
      id: "elonmusk",
      nickname: "Elon Musk",
      image: "/yRsRRjGO.jpg",
    },
    content: "클론코딩 라이브로 하니 너무 힘들어요 ㅠㅠ",
    createdAt: new Date(),
    Images: [] as any[],
  };

  /*  사진은 50% 확률로 생길 수 있고, 사진이 생긴다면 갯수는 #33 행의 Math.random() * 4는 0.0004..~ 3.6666..이고 이걸 내림하면 0~3인데, 거기서 +1, 1~4 까지 
    numImages는 1~4 사이의 정수가 된다. for문에 제한 조건이 동적으로 들어가고, for문은 1번에서 4번까지 돌아가서 같은 확률로 1~4개의 이미지가 생길 수 있다.
  */
  if (Math.random() > 0.5 && !noImage) {
    const numImages = Math.floor(Math.random() * 4) + 1;
    for (let i = 0; i < numImages; i++) {
      target.Images.push({
        imageId: i + 1,
        link: faker.image.urlLoremFlickr(),
      });
    }
  }
  return (
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        {/* 포스트 유저 섹션 */}
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        {/* 포스트 바디 */}
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
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
          <div>
            <PostImages post={target} />
          </div>
          {/* 액션버튼 3개 좋아요... */}
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
