import Sidebar from "@/components/common/sidebar";
import { getServerCookie } from "@/helper/server-cookie";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const workspaceId = await getServerCookie("workspaceId");
  if (!workspaceId) redirect("/select-workspace");
  return (
    <main className="max-h-screen flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </main>
  );
};
export default Layout;
