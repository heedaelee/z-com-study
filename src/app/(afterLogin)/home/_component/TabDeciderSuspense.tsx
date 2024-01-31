import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";

export default async function TabDeciderSuspense() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // [[1,2,3,4,5], [6,7,8,9,10], [11,12,13,14,15]]
  });
  const dehydratedState = dehydrate(queryClient);
  /* TabDeciderSuspense는 서버컴포넌트, <TabDecider />가 클라이언트 컴포넌트임  */
  return (
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  );
}
