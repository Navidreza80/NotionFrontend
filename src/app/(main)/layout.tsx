
import Sidebar from "@/components/common/sidebar";
import { getServerCookie } from "@/helper/server-cookie";
import { Bell, MoreHorizontal } from "lucide-react";
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

      {/* Top right actions */}
      <div className="fixed w-full right-3 top-0 z-40 md:mt-3 mt-5 flex justify-end items-center">
        <div className="rounded-lg flex gap-2 text-zinc-400 bg-[#222222] px-2 py-1 w-fit">
          <button className="p-1.5 cursor-pointer rounded-md hover:bg-zinc-800">
            <Bell size={18} />
          </button>
          <button className="p-1.5 cursor-pointer rounded-md hover:bg-zinc-800">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
