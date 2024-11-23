"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../provider/user-provider";
import axios from "../config/axios";
import { getTokens } from "../utils/local-storage";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigate = useRouter();
  const { role, setUser } = useUserStore((store) => store);
  const [loading, setLoading] = useState(true);
  // console.log(role, loading);

  useEffect(() => {
    console.log("layout");
    if (loading) {
      setLoading(false);
    }
    const token = getTokens();
    if (token) {
      axios
        .get("/auth/me")
        .then((response) => {
          const userData = {
            id: response.data.id,
            email: response.data.email,
            role: response.data.role,
            name: response.data.name,
            picture: response.data.picture,
            enabled: response.data.enabled,
            address: response.data.address,
          };
          console.log(response.data.role, "role");
          setUser(userData);
          if (response.data.role !== "user") {
            console.log("first");
            navigate.push("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
}
