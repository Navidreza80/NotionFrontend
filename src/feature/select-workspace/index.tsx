import { fetchWorkspaces } from "@/lib/actions/workspaces.action";
import { Plus } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import WorkspaceList from "./WorkspaceList";
import { Suspense } from "react";
import Loading from "./Loading";
export async function generateMetadata() {
  return {
    title: "Select workspace",
    description: "Select your workspace to continue",
  };
}
export default async function SelectWorkspace() {
  const workspaces = fetchWorkspaces();
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
          <p className="text-title">Select a workspace below to get started</p>
        </div>

        <Suspense fallback={<Loading />}>
          <WorkspaceList data={workspaces} />
        </Suspense>

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
