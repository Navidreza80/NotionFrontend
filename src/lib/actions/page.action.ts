"use server";

import { revalidateTag } from "next/cache";
import { getJWTToken } from "./jwt.action";
import { getServerCookie } from "@/helper/server-cookie";
import { Page } from "@/generated/prisma";

export const fetchPageById = async (pageId: string) => {
  const rawJWT = await getJWTToken();
  try {
    const res = await fetch(
      `https://notionbackend-production-8193.up.railway.app/api/pages/${pageId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${rawJWT}`,
          "Content-Type": "application/json",
        },
      }
    );
    const page = await res.json();
    return page;
  } catch (error) {
    throw error;
  }
};

export const fetchPageByParentId = async (parentPageId: string) => {
  const rawJWT = await getJWTToken();
  try {
    const res = await fetch(
      `https://notionbackend-production-8193.up.railway.app/api/sub-pages/${parentPageId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${rawJWT}`,
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        next: { tags: ["SUBPAGES"] },
      }
    );
    const page = await res.json();
    return page;
  } catch (error) {
    throw error;
  }
};

export const fetchPages = async () => {
  const rawJWT = await getJWTToken();
  try {
    const res = await fetch(
      `https://notionbackend-production-8193.up.railway.app/api/pages`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${rawJWT}`,
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        next: { tags: ["PAGES"] },
      }
    );
    const page = await res.json();
    return page;
  } catch (error) {
    throw error;
  }
};

export const updatePageById = async (
  pageId: string,
  data: { title?: string; content?: string }
) => {
  const rawJWT = await getJWTToken();
  try {
    const res = await fetch(
      `https://notionbackend-production-8193.up.railway.app/api/pages/${pageId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${rawJWT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
        }),
      }
    );
    const page = await res.json();
    revalidateTag("PAGES");
    revalidateTag("SUBPAGES");
    return page;
  } catch (error) {
    throw error;
  }
};

export const createPage = async (data: {
  title: string;
  content?: string;
  parentPageId?: string;
}) => {
  const rawJWT = await getJWTToken();
  const workspaceId = await getServerCookie("workspaceId");
  try {
    const res = await fetch(
      `https://notionbackend-production-8193.up.railway.app/api/pages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${rawJWT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          content: data.content,
          workspaceId,
          parentPageId: data.parentPageId,
        }),
      }
    );
    const page: Page = await res.json();
    revalidateTag("PAGES");
    revalidateTag("SUBPAGES");
    return page;
  } catch (error) {
    throw error;
  }
};

export const deletePageById = async (pageId: string) => {
  const rawJWT = await getJWTToken();
  try {
    const res = await fetch(
      `https://notionbackend-production-8193.up.railway.app/api/pages/${pageId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${rawJWT}`,
        },
      }
    );
    const response = await res.json();
    revalidateTag("PAGES");
    revalidateTag("SUBPAGES");
    return response;
  } catch (error) {
    throw error;
  }
};
