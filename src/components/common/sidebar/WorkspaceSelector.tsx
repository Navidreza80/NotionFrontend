"use server";

import { auth } from "@/auth";
import CustomPopover from "@/components/custom/CustomPopover";
import { Workspace } from "@/generated/prisma";
import { getServerCookie } from "@/helper/server-cookie";
import { ChevronDown, PenSquare } from "lucide-react";
import { Session } from "next-auth";
import { cookies } from "next/headers";
import Image from "next/image";

const button = (session: Session, workspaces: Workspace[]) => [
  {
    icon: (
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
        <div className="p-3 w-full flex flex-col">
          <h5 className="text-[12px] text-white/50">{session.user.email}</h5>
          {workspaces.map((item) => (
            <div key={item.id}>
              <span className="w-4 h-4 flex items-center rounded">
                {item.name.slice(0, 1).toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </CustomPopover>
    ),
  },
  { icon: <PenSquare size={16} className="text-zinc-400" /> },
];

const WorkspaceSelector = async () => {
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
      console.log(workspaces);
      return workspaces;
    } catch (error) {
      throw error;
    }
  };
  const workspaces = await fetchWorkspaces();
  const fetchCurrentWorkspace = async () => {
    "use server";
    try {
      const workspaceId = await getServerCookie("workspaceId");
      const res = await fetch(
        `https://notionbackend-production-8193.up.railway.app/api/workspaces/${workspaceId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${raw}`,
            "Content-Type": "application/json",
          },
        }
      );
      const workspace = await res.json();
      return workspace;
    } catch (error) {
      throw error;
    }
  };
  const currentWorkspace: Workspace = await fetchCurrentWorkspace();
  return (
    <div className="flex items-center justify-between gap-2 px-3 pt-3 pb-2">
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded bg-white/10 grid place-items-center text-white/50 font-semibold text-xs">
          {currentWorkspace.name.slice(0, 1).toUpperCase()}
        </div>
        <div className="text-sm font-bold w-[120px] whitespace-nowrap overflow-hidden text-ellipsis">
          {currentWorkspace.name}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        {button(session, workspaces).map((item, index) => (
          <span
            key={index}
            className="rounded p-1 hover:bg-zinc-800 cursor-pointer w-6 h-6 flex items-center justify-center"
          >
            {item.icon}
          </span>
        ))}
      </div>
    </div>
  );
};
export default WorkspaceSelector;
