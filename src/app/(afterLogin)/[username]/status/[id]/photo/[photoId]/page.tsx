import Home from "@/app/(afterLogin)/home/page";

type Props = {
  params: { username: string; id: string; photoId: string };
};
export default function Page({ params }: Props) {
  params.username; // elonmusk
  params.id; // 1
  params.photoId; // 1
  /* 설명 : 어차피 intercepting 될거기 때문에 home으로 그냥 달아둔 것, 즉 사진 모달의 뒷 배경 부분임 */
  return <Home />;
}
