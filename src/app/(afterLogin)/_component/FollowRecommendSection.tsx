"use client";

import { useQuery } from "@tanstack/react-query";
import { User } from "@/model/User";
import { getFollowRecommends } from "../_lib/getFollowRecommends";
import { useSession } from "next-auth/react";
import FollowRecommend from "./FollowRecommend";

export default function FollowRecommendSection() {
  const { data: session } = useSession();

  const { data } = useQuery<User[]>({
    queryKey: ["users", "followRecommends"],
    queryFn: getFollowRecommends,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 1000 * 60 * 5,
    /* 조건부 쿼리, 로그인한 유저가 있을시 enabled 활성화  */
    enabled: !!session?.user,
  });

  return data?.map((user) => <FollowRecommend user={user} key={user.id} />);
}
