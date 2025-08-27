import { auth } from "@/auth";
import { Workspace } from "@/generated/prisma";
import { setServerCookie } from "@/helper/server-cookie";
import { Plus } from "lucide-react";
import Head from "next/head";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import SelectWorkspaceCard from "./WorkspaceCard";
export async function generateMetadata() {
  return {
    title: "Select workspace",
    description: "Select your workspace to continue",
  };
}
export default async function SelectWorkspace() {
  const session = await auth();
  if (!session) return;
  const cookieStore = cookies();
  const res = await fetch("http://localhost:3000/api/token", {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  const { raw } = await res.json();
  const fetchWorkspaces = async () => {
    "use server";
    try {
      const res = await fetch(
        "https://notionbackend-production-8193.up.railway.app/api/me/workspaces",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${raw}`,
            "Content-Type": "application/json",
          },
        }
      );
      const workspaces = await res.json();
      return workspaces;
    } catch (error) {
      throw error;
    }
  };
  const workspaces = await fetchWorkspaces();
  const handleWorkspaceSelect = async (id: string) => {
    "use server";
    await setServerCookie("workspaceId", id);
    redirect("/");
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Head>
        <title>Select Workspace</title>
        <meta name="description" content="Choose your workspace" />
      </Head>

      <main className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-title mb-2">
            Continue to your workspace
          </h1>
          <p className="text-title">
            Select a workspace below to get started
          </p>
        </div>

        <div className="space-y-4">
          {workspaces.map((workspace: Workspace) => (
            <SelectWorkspaceCard
              key={workspace.id}
              workspace={workspace}
              handleWorkspaceSelect={handleWorkspaceSelect}
            />
          ))}
          {!(workspaces.length > 0) && <div>No Workspaces</div>}
        </div>

        <div className="mt-6 flex justify-center">
          <Link href={"/create-workspace"}>
            <button className="flex text-zinc-400 cursor-pointer items-center gap-2">
              <Plus size={16} /> Create new workspace
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
