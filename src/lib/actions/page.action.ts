"use server";

import { getJWTToken } from "./jwt.action";

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
    return page;
  } catch (error) {
    throw error;
  }
};
