"use client";

import { handleSelect } from "@/lib/actions/workspaces.action";
import SelectWorkspaceCard from "./WorkspaceCard";
import { Workspace } from "@/generated/prisma";
import { use } from "react";
import { redirect } from "next/navigation";
import { Building2 } from "lucide-react";

const WorkspaceList = ({ data }: { data: Promise<Workspace[]> }) => {
  const workspaces = use(data);
  return (
    <div className="space-y-4">
      {!(workspaces.length > 0) ? (
        <div className="flex flex-col items-center gap-y-2">
          <span className="p-4 border border-border rounded-full">
            <Building2 />
          </span>

          <div className="text-center">No Workspaces!</div>
        </div>
      ) : (
        workspaces.map((workspace: Workspace) => (
          <SelectWorkspaceCard
            key={workspace.id}
            workspace={workspace}
            handleWorkspaceSelect={async () => {
              await handleSelect(workspace.id);
              redirect("/");
            }}
          />
        ))
      )}
    </div>
  );
};
export default WorkspaceList;
