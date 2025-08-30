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