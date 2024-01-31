import style from "./profile.module.css";

import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import UserPosts from "./_component/UserPosts";
import { getUserPosts } from "./_lib/getUserPosts";
import { getUser } from "./_lib/getUser";
import UserInfo from "@/app/(afterLogin)/[username]/_component/UserInfo";

type Props = { params: { username: string } };

export default async function Profile({ params }: Props) {
  const { username } = params;
  const queryClient = new QueryClient();
  /* 사용자 정보 가져오기 */
  await queryClient.prefetchQuery({ queryKey: ["users", username], queryFn: getUser });

  /* 해당 유저의 포스트글 */
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} />

        {/* 포스트 */}
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
