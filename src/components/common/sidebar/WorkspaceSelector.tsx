"use server";

import { Workspace } from "@/generated/prisma";
import { getServerCookie } from "@/helper/server-cookie";
import {
  fetchWorkspaceById,
  fetchWorkspaces,
} from "@/lib/actions/workspaces.action";
import { redirect } from "next/navigation";
import Buttons from "./Buttons";

const WorkspaceSelector = async () => {
  const workspaces = fetchWorkspaces();
  const workspaceId = await getServerCookie("workspaceId");
  if (!workspaceId) redirect("/select-workspace");
  const currentWorkspace: Workspace = await fetchWorkspaceById(workspaceId);

  return (
    <div className="flex items-center justify-between gap-2 px-2 ml-1 py-1 group w-[224px] hover:bg-zinc-800/70 rounded-md mt-1 cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded bg-white/10 grid place-items-center text-white/50 font-semibold text-xs">
          {currentWorkspace.name.slice(0, 1).toUpperCase()}
        </div>
        <div className="text-sm font-bold md:max-w-[120px] md:group-hover:w-[70px] max-w-[70px] whitespace-nowrap overflow-hidden text-ellipsis">
          {currentWorkspace.name}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Buttons currentWorkspace={workspaceId} data={workspaces} />
      </div>
    </div>
  );
};
export default WorkspaceSelector;
