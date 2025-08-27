import { getServerCookie } from "@/helper/server-cookie";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const workspaceId = await getServerCookie("workspaceId");
  if (!workspaceId) redirect("/select-workspace");
  return <div>HomePage</div>;
};
export default HomePage;
