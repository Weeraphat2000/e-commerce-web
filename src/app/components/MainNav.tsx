"use client";

import Link from "next/link";
import React from "react";
import { useUserStore } from "../provider/user-provider";

type Props = {};

export default function MainNav({}: Props) {
  const { logout, id, role } = useUserStore((store) => store);

  return (
    <div className="flex justify-between items-center p-2 bg-green-400">
      <div className="flex space-x-4 items-center">
        <Link href="/" className="p-2 font-bold text-2xl">
          Logo
        </Link>
        <Link href="/" className="p-2">
          Home
        </Link>
        <Link href="/shop" className="p-2">
          Shop
        </Link>
        {role === "admin" && (
          <Link href="/admin" className="p-2">
            Admin
          </Link>
        )}
        {role === "user" && (
          <>
            <Link href="/user" className="p-2">
              User
            </Link>

            <Link href="/user/cart" className="p-2">
              Cart
            </Link>
          </>
        )}
      </div>

      <div className="flex space-x-4 items-center ">
        {!id && (
          <>
            <Link href="/register" className="p-2">
              Register
            </Link>
            <Link href="/login" className="p-2">
              Login
            </Link>
          </>
        )}
        {id && (
          <>
            <div>{role}</div>
            <button
              className="p-2 cursor-pointer"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}
