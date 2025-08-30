import { getServerCookie } from "@/helper/server-cookie";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const workspaceId = await getServerCookie("workspaceId");
  if (!workspaceId) redirect("/select-workspace");
  return <>{children}</>;
}
