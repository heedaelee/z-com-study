import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import Loading from "@/app/(afterLogin)/home/loading";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import PostRecommends from "./_component/PostRecommends";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import { getPostRecommends } from "./_lib/getPostRecommends";
import style from "./home.module.css";
import { auth } from "@/auth";
import { Metadata } from "next";

export type Props = { pageParam?: number };

export const metadata: Metadata = {
  title: "홈 / Z",
  description: "홈",
};

export default async function Home() {
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // pageParam을 0으로 설정
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        {/* TabProvider는 클라이언트 컴포넌트임  */}
        <TabProvider>
          <Tab />
          <PostForm me={session} />
          {/* TabDecider는 나중에 로딩 되길 원하므로, suspense로 둘러침, 
          위의 Tab, PostForm은 미리 서버서 랜더링되고.. */}
          <Suspense fallback={<Loading />}>
            <TabDeciderSuspense />
          </Suspense>
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
