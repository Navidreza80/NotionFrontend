"use client";

import { Workspace } from "@/generated/prisma";
import { useSession } from "next-auth/react";
import { use, useState } from "react";
import { ITEMS } from "./ActionBtnsItems";

const Buttons = ({
  data,
  currentWorkspace,
}: {
  data: Promise<Workspace[]>;
  currentWorkspace: string | null;
}) => {
  const fetchedWorkspaces = use(data);

  const [optimisticId, setOptimisticId] = useState(currentWorkspace);
  const [workspaces, setWorkspaces] = useState(fetchedWorkspaces)
  const session = useSession();
  if (!session.data) return;
  return ITEMS(session.data, workspaces, optimisticId, setOptimisticId, setWorkspaces).map(
    (item, index) => (
      <span
        key={index}
        className="rounded p-1 hover:bg-zinc-800 cursor-pointer w-6 h-6 flex items-center justify-center"
      >
        {item.icon}
      </span>
    )
  );
};
export default Buttons;
