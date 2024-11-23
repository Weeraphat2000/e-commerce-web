"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../provider/user-provider";
import MainNav from "../components/MainNav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigate = useRouter();
  const { id, role } = useUserStore((store) => store);
  const [loading, setLoading] = useState(true);
  console.log(id, role);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (role !== "admin") {
    navigate.push("/");
  }

  return (
    <div>
      <MainNav />
      {children}
    </div>
  );
}
