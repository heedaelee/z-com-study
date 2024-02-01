type Props = { pageParam?: number };
export async function getPostRecommends({ pageParam }: Props) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/recommends?cursor=${pageParam}`, //0, 5, 10 이런식으로 1페이지, 2페이지.. 이렇게 호출
    {
      next: {
        tags: ["posts", "recommends"],
      },
    }
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
