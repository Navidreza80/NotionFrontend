/* eslint-disable */

"use client";

import { useEffect, useState } from "react";
import PageIcon from "../svg/PageIcon";
import ExpandPage from "./ExpandPage";
import { fetchPageByParentId } from "@/lib/actions/page.action";
import { Page } from "@/generated/prisma";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

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
      <Link
        href={"/pages/" + id}
        className={`flex items-center gap-1.5 mb-0.5 px-2 py-[5px] rounded-md text-sm cursor-pointer select-none group ${
          active
            ? "bg-zinc-700/40 text-white/60"
            : "text-white/50 hover:bg-zinc-800/70 hover:text-white/60"
        }`}
      >
        <span
          className={`${
            active ? "text-white/50" : "text-white/30 "
          } w-5 h-5 flex items-center justify-center rounded hover:bg-zinc-700/80 transition-all duration-300`}
        >
          <PageIcon className={`block group-hover:hidden`} />
          <ExpandPage
            isCurrentPageOptimistic={isCurrentPageOptimistic}
            setIsCurrentPageOptimistic={setIsCurrentPageOptimistic}
            id={id}
            isCurrentPage={isCurrentPage}
          />
        </span>

        <span className="truncate text-[15px] font-semibold">{label}</span>
      </Link>
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
