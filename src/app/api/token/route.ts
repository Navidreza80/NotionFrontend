import { getToken } from "next-auth/jwt";

export async function GET(req: Request) {
  const raw = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    raw: true,
  });

  return new Response(JSON.stringify({ raw }));
}
