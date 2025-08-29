"use client";

import { handleSelect } from "@/lib/actions/workspaces.action";
import SelectWorkspaceCard from "./WorkspaceCard";
import { Workspace } from "@/generated/prisma";
import { use } from "react";
import { redirect } from "next/navigation";

const WorkspaceList = ({ data }: { data: Promise<Workspace[]> }) => {
  const workspaces = use(data);
  return (
    <div className="space-y-4">
      {workspaces.map((workspace: Workspace) => (
        <SelectWorkspaceCard
          key={workspace.id}
          workspace={workspace}
          handleWorkspaceSelect={async () => {
            await handleSelect(workspace.id);
            redirect("/");
          }}
        />
      ))}
      {!(workspaces.length > 0) && <div>No Workspaces</div>}
    </div>
  );
};
export default WorkspaceList;
