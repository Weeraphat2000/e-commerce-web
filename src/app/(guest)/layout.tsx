import MainNav from "../components/MainNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainNav />
      {children}
    </div>
  );
}
