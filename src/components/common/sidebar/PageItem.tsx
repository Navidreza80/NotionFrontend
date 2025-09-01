/* eslint-disable */

"use client";

import CustomPopover from "@/components/custom/CustomPopover";
import { Skeleton } from "@/components/ui/skeleton";
import { Page } from "@/generated/prisma";
import { fetchPageByParentId, updatePageById } from "@/lib/actions/page.action";
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PageIcon from "../svg/PageIcon";
import ExpandPage from "./ExpandPage";
import RenamePage from "./RenamePage";

export const PageItem = ({
  label,
  expandedPageId,
  active = false,
  id,
}: {
  label: string;
  active?: boolean;
  expandedPageId: string;
  id: string;
}) => {
  const isCurrentPage = expandedPageId == id;
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState<null | Page[]>(null);
  const [isCurrentPageOptimistic, setIsCurrentPageOptimistic] =
    useState(isCurrentPage);
  const [optimisticPageName, setOptimisticPageName] = useState(label);

  const getSubPages = async () => {
    setPages(null);
    setIsLoading(true);
    const response = await fetchPageByParentId(id);
    setPages(response);
    setIsLoading(false);
  };

  useEffect(() => {
    getSubPages();
  }, [isCurrentPageOptimistic]);

  return (
    <div>
      <div
        className={`flex items-center justify-between gap-1.5 mb-0.5 px-2 py-[5px] rounded-md text-sm cursor-pointer select-none group relative z-0 ${
          active
            ? "bg-zinc-700/40 text-white/60"
            : "text-white/50 hover:bg-zinc-800/70 hover:text-white/60"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span
            className={`${
              active ? "text-white/50" : "text-white/30 "
            } w-5 h-5 flex items-center justify-center rounded hover:bg-zinc-700/80 transition-all duration-300 relative z-10`}
          >
            <PageIcon className={`block group-hover:hidden`} />
            <ExpandPage
              isCurrentPageOptimistic={isCurrentPageOptimistic}
              setIsCurrentPageOptimistic={setIsCurrentPageOptimistic}
              id={id}
              isCurrentPage={isCurrentPage}
            />
          </span>
          <Link
            href={"/pages/" + id}
            className="truncate text-[15px] font-semibold"
          >
            {optimisticPageName}
          </Link>
        </div>

        <div className="flex gap-x-1 items-center">
          <CustomPopover
            className="p-0 border-border rounded-lg"
            trigger={
              <span className=" w-5 h-5 flex items-center justify-center rounded hover:bg-zinc-700/80 transition-all duration-300">
                <MoreHorizontal
                  size={16}
                  className="hidden group-hover:block transition-all duration-300"
                />
              </span>
            }
          >
            <div className="p-2 bg-card text-[13px] text-white/50 rounded-lg">
              <CustomPopover
                className="p-0 border-border rounded-lg w-full"
                trigger={
                  <div className="flex w-full gap-1.5 items-center rounded-md p-1 hover:bg-surface/30 transition-all duration-200 cursor-pointer">
                    <Edit size={16} />
                    <span className=" font-semibold">Rename</span>
                  </div>
                }
              >
                <RenamePage
                  id={id}
                  optimisticPageName={optimisticPageName}
                  setOptimisticPageName={setOptimisticPageName}
                />
              </CustomPopover>

              <div className="flex w-full gap-1.5 items-center rounded-md p-1 hover:bg-surface/30 transition-all duration-200 cursor-pointer">
                <Trash size={16} />
                <span className=" font-semibold">Delete</span>
              </div>
            </div>
          </CustomPopover>

          <span className=" w-5 h-5 flex items-center justify-center rounded hover:bg-zinc-700/80 transition-all duration-300">
            <Plus
              size={16}
              className="hidden group-hover:block transition-all duration-300"
            />
          </span>
        </div>
      </div>
      <div
        className={isCurrentPageOptimistic ? "flex w-full flex-wrap" : "hidden"}
      >
        {pages &&
          (pages.length ? (
            pages.map((item) => (
              <Link
                href={"/pages/" + item.id}
                key={item.id}
                className={`flex items-center gap-1.5 mb-0.5 px-2 w-full ml-3 py-[5px] rounded-md text-sm cursor-pointer select-none ${
                  active
                    ? "bg-zinc-700/40 text-white/60"
                    : "text-white/50 hover:bg-zinc-800/70 hover:text-white/60"
                }`}
              >
                <span className={active ? "text-white/50" : "text-white/30"}>
                  <PageIcon />
                </span>
                <span className="truncate text-[15px] font-semibold">
                  {item.title}
                </span>
              </Link>
            ))
          ) : (
            <div className="text-surface ml-3 text-sm mb-0.5">
              No Sub pages yet
            </div>
          ))}
        {isLoading &&
          [1, 2, 3].map((index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 mb-0.5 px-2 w-full ml-3 py-[5px] rounded-md"
            >
              <Skeleton className="bg-skeleton rounded h-[18px] w-[18px]" />
              <Skeleton className="bg-skeleton rounded h-[18px] w-[100px]" />
            </div>
          ))}
      </div>
    </div>
  );
};
