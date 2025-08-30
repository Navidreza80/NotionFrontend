import { Workspace } from "@/generated/prisma";
import { handleSelect } from "@/lib/actions/workspaces.action";
import { ChevronDown, Loader, Plus } from "lucide-react";
import { Session } from "next-auth";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Correct from "../svg/Correct";
import DeleteWorkspace from "./DeleteWorkspace";
import EditWorkspace from "./EditWorkspace";
const CustomPopover = dynamic(
  () => import("@/components/custom/CustomPopover"),
  {
    loading: () => <Loader className="animate-spin" />,
    ssr: false,
  }
);

const WorkspacePopover = ({
  session,
  setOptimisticId,
  workspaces,
  currentWorkspace,
  setWorkspaces,
}: {
  session: Session;
  workspaces: Workspace[];
  currentWorkspace: string | null;
  setOptimisticId: React.Dispatch<React.SetStateAction<string | null>>;
  setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[]>>;
}) => {
  return (
    <CustomPopover
      className="w-[300px] bg-[#202020] border-[#383838] border-[1px] p-0 rounded-lg"
      trigger={<ChevronDown size={16} className="text-zinc-400" />}
    >
      <div className="p-3 w-full flex gap-2 items-center">
        <Image
          src={
            session.user.image ||
            "https://img.icons8.com/?size=100&id=82751&format=png&color=fff"
          }
          alt={session.user.name || "User profile pictures"}
          width={36}
          height={36}
          className="w-9 h-9 rounded-md"
        />
        <div className="flex flex-col justify-start">
          <h4 className="whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis text-title text-[13px] font-bold">
            Navid Reza Abbaszadeh&apos;s Workspace
          </h4>
          <span className="text-[12px] text-white/50 flex items-center gap-1">
            Free Plan <p className="leading-0.5">.</p> 2 Members
          </span>
        </div>
      </div>
      <div className="w-full border mt-3 border-[#383838] h-[1px]"></div>
      <div className="p-3 w-full flex flex-col gap-y-2">
        <h5 className="text-[12px] text-white/50">{session.user.email}</h5>
        {workspaces.map((item: Workspace) => (
          <div
            key={item.id}
            className="flex justify-between items-center cursor-pointer group"
          >
            <div
              onClick={() => {
                setOptimisticId(item.id);
                handleSelect(item.id);
              }}
              className="flex gap-x-2 items-center"
            >
              <span className="w-5 h-5 flex items-center justify-center rounded text-[13px] bg-[#383838] text-white/50">
                {item.name.slice(0, 1).toUpperCase()}
              </span>
              <p className="text-title text-sm w-[120px] whitespace-nowrap overflow-hidden text-ellipsis">
                {item.name}
              </p>
            </div>
            <div className=" items-center gap-1 flex">
              {item.id == currentWorkspace && <Correct />}

              <EditWorkspace
                id={item.id}
                setWorkspaces={setWorkspaces}
                name={item.name}
              />

              <DeleteWorkspace id={item.id} setWorkspaces={setWorkspaces} />
            </div>
          </div>
        ))}
        <Link href={"create-workspace"} className="flex gap-x-2 items-center">
          <Plus className="text-blue-600" size={20} />
          <p className="text-blue-600 text-sm">New Workspace</p>
        </Link>
      </div>
    </CustomPopover>
  );
};
export default WorkspacePopover;
