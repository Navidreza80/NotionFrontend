/* eslint-disable */

"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Page } from "@/generated/prisma";
import { fetchPageByParentId } from "@/lib/actions/page.action";
import { SetStateAction, useEffect, useState } from "react";
import PageTitle from "./PageTitle";

export const PageItem = ({
  label,
  expandedPageId,

  id,
  setPages,
}: {
  label: string;
  active?: boolean;
  expandedPageId: string;
  id: string;
  setPages: React.Dispatch<SetStateAction<Page[]>>;
}) => {
  const isCurrentPage = expandedPageId == id;

  const [isLoading, setIsLoading] = useState(false);
  const [subPages, setSubPages] = useState<[] | Page[]>([]);
  const [isCurrentPageOptimistic, setIsCurrentPageOptimistic] =
    useState(isCurrentPage);

  const getSubPages = async () => {
    setSubPages([]);
    setIsLoading(true);
    const response = await fetchPageByParentId(id);
    setSubPages(response);
    setIsLoading(false);
  };

  useEffect(() => {
    getSubPages();
  }, [isCurrentPageOptimistic]);

  return (
    <div>
      <PageTitle
        isCurrentPageOptimistic={isCurrentPageOptimistic}
        setPages={setPages}
        label={label}
        id={id}
        isCurrentPage={isCurrentPage}
        setIsCurrentPageOptimistic={setIsCurrentPageOptimistic}
      />
      <div
        className={isCurrentPageOptimistic ? "flex w-full flex-wrap" : "hidden"}
      >
        {subPages?.length > 0
          ? subPages.map((item) => (
              <div key={item.id} className="ml-3 w-full">
                <PageTitle
                  setPages={setSubPages}
                  id={item.id}
                  label={item.title}
                  expandable={false}
                  create={false}
                />
              </div>
            ))
          : isLoading
          ? [1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 mb-0.5 px-2 w-full ml-3 py-[5px] rounded-md"
              >
                <Skeleton className="bg-skeleton rounded h-[18px] w-[18px]" />
                <Skeleton className="bg-skeleton rounded h-[18px] w-[100px]" />
              </div>
            ))
          : !isLoading && (
              <div className="text-surface ml-3 text-sm mb-0.5">
                No Sub pages yet
              </div>
            )}
      </div>
    </div>
  );
};
