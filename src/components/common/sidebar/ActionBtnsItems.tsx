import { Workspace } from "@/generated/prisma";
import { PenSquare } from "lucide-react";
import { Session } from "next-auth";
import CloseSidebar from "./CloseSidebar";
import WorkspacePopover from "./WorkspacePopover";

export const ITEMS = (
  session: Session,
  workspaces: Workspace[],
  currentWorkspace: string | null,
  setOptimisticId: React.Dispatch<React.SetStateAction<string | null>>,
  setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>
) => [
  {
    icon: (
      <WorkspacePopover
        session={session}
        workspaces={workspaces}
        currentWorkspace={currentWorkspace}
        setOptimisticId={setOptimisticId}
        setWorkspaces={setWorkspaces}
      />
    ),
    className: "flex",
  },
  {
    icon: <CloseSidebar />,
    className: "md:hidden md:group-hover:flex flex",
  },
  {
    icon: <PenSquare size={16} className="text-zinc-400" />,
    className: "flex",
  },
];
