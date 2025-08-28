"use server"

import { cookies } from "next/headers";

export const getJWTToken = async () => {
  const cookieStore = await cookies();
  const res = await fetch("http://localhost:3000/api/token", {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const { raw } = await res.json();
  return raw;
};
