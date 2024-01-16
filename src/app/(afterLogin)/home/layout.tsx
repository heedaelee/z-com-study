export default async function HomeLayout({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <div>
      홈 레이아웃
      {children}
    </div>
  );
}
