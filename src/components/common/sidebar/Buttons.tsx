"use client";

import { Workspace } from "@/generated/prisma";
import { useSession } from "next-auth/react";
import { use, useState } from "react";
import { ITEMS, LEFTITEMS } from "./ActionBtnsItems";
import { useSidebar } from "./";

interface ButtonsProps {
  data: Promise<Workspace[]>;
  currentWorkspace: string | null;
  isLeft?: boolean;
}

const Buttons = ({ data, currentWorkspace, isLeft = false }: ButtonsProps) => {
  const fetchedWorkspaces = use(data);
  const { onClose } = useSidebar();
  const [optimisticId, setOptimisticId] = useState(currentWorkspace);
  const [workspaces, setWorkspaces] = useState(fetchedWorkspaces);
  const session = useSession();

  if (!session.data) return;

  const actions = isLeft
    ? LEFTITEMS(onClose)
    : ITEMS(session.data, workspaces, optimisticId, setOptimisticId, setWorkspaces);

  return actions.map((item, index) => (
    <span
      key={index}
      className="rounded p-1 hover:bg-zinc-800 cursor-pointer w-6 h-6 flex items-center justify-center"
      onClick={item.onClick} 
    >
      {item.icon}
    </span>
  ));
};

export default Buttons;
