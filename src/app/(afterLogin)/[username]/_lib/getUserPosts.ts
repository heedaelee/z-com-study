import { QueryFunction } from "@tanstack/query-core";
import { Post } from "@/model/Post";

export const getUserPosts: QueryFunction<
  Post[],
  [_1: string, _2: string, string]
> = async ({ queryKey }) => {
  const [_1, _2, username] = queryKey;
  const res = await fetch(`http://localhost:9090/api/users/${username}/posts`, {
    next: {
      tags: ["posts", "users", username],
    },
    cache: "no-store",
  });
  // The return value is *not* serialized
  //  You can return Date, Map, Set, etc
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};
