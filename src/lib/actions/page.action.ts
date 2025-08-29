"use server";

import { getJWTToken } from "./jwt.action";
import { revalidateTag } from "next/cache";
import { fetchWorkspaces } from "./workspaces.action";

const BASE_URL = "https://notionbackend-production-8193.up.railway.app/api/pages";

const getActiveWorkspaceId = async () => {
  const workspaces = await fetchWorkspaces();
  const workspaceId = workspaces?.[0]?.id;
  if (!workspaceId) throw new Error("No workspace found");
  return workspaceId;
};

export const fetchPages = async () => {
  const rawJWT = await getJWTToken();
  const workspaceId = await getActiveWorkspaceId();

  try {
    const res = await fetch(BASE_URL, {
      next: { tags: ["pages"] },
      method: "GET",
      headers: {
        Authorization: `Bearer ${rawJWT}`,
        "Content-Type": "application/json",
      },
    });

    const pages = await res.json();
    return pages.filter((page: any) => page.workspaceId === workspaceId);
  } catch (error) {
    throw error;
  }
};

