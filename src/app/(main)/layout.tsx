
import Sidebar from "@/components/common/sidebar";
import { getServerCookie } from "@/helper/server-cookie";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const workspaceId = await getServerCookie("workspaceId");
  if (!workspaceId) redirect("/select-workspace");
  return (
    <div className="min-h-screen w-full bg-[#191919] text-[#ffffffcf] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
