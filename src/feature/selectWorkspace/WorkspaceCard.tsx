"use client";

import { Workspace } from "../../generated/prisma/index.js";

const SelectWorkspaceCard = ({
  workspace,
  handleWorkspaceSelect,
}: {
  workspace: Workspace;
  handleWorkspaceSelect: (id: string) => void;
}) => {
  return (
    <div
      onClick={() => handleWorkspaceSelect(workspace.id)}
      className="p-4 rounded-lg select-none active:scale-95 transition-all duration-200 bg-[#202020] border-[#383838] border cursor-pointer flex items-center"
    >
      <div className="flex-shrink-0 w-14 h-14 rounded-md flex items-center justify-center mr-4 border border-[#383838]">
        <span className="text-title font-medium">
          {workspace.name.charAt(0)}
        </span>
      </div>
      <div className="flex-grow">
        <h3 className="text-zinc-400 font-semibold">{workspace.name}</h3>
      </div>
    </div>
  );
};
export default SelectWorkspaceCard;
