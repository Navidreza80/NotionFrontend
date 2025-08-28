"use server";

import { auth } from "@/auth";
import { getJWTToken } from "./jwt.action";
import { setServerCookie } from "@/helper/server-cookie";
import { revalidatePath } from "next/cache";

export const fetchWorkspaces = async () => {
  const rawJWT = await getJWTToken();
  try {
    const res = await fetch(
      "https://notionbackend-production-8193.up.railway.app/api/me/workspaces",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${rawJWT}`,
          "Content-Type": "application/json",
        },
      }
    );
    const workspaces = await res.json();
    return workspaces;
  } catch (error) {
    throw error;
  }
};

export const fetchWorkspaceById = async (workspaceId: string) => {
  const rawJWT = await getJWTToken();
  try {
    const res = await fetch(
      `https://notionbackend-production-8193.up.railway.app/api/workspaces/${workspaceId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${rawJWT}`,
          "Content-Type": "application/json",
        },
      }
    );
    const workspace = await res.json();
    return workspace;
  } catch (error) {
    throw error;
  }
};

export const createWorkspace = async (data: { name: string }) => {
  const rawJWT = await getJWTToken();
  const session = await auth();
  try {
    const res = await fetch(
      `https://notionbackend-production-8193.up.railway.app/api/workspaces`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${rawJWT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creatorId: session?.user?.id,
          name: data.name,
        }),
      }
    );
    const workspace = await res.json();
    await setServerCookie("workspaceId", workspace.id);
    return workspace;
  } catch (error) {
    throw error;
  }
};

export const handleSelect = async (id: string) => {
  await setServerCookie("workspaceId", id);
  revalidatePath("/");
};
