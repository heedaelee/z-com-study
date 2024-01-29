"use client";

import { Hashtag } from "@/model/Hashtag";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "@/app/(afterLogin)/_lib/getTrends";
import Trend from "../../_component/Trend";

export default function TrendSection() {
  const { data } = useQuery<Hashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  return data?.map((trend) => <Trend trend={trend} key={trend.tagId} />);
}
