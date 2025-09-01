"use client";

import { Page } from "@/generated/prisma";
import { use, useState } from "react";
import { PageItem } from "./PageItem";

const Pages = ({
  data,
  expandedPageId,
}: {
  data: Promise<Page[]>;
  expandedPageId: string;
}) => {
  const fetchedPages = use(data);
  const [pages, setPages] = useState(fetchedPages);
  return (
    <div className="px-1">
      {pages?.map((item: Page) => (
        <PageItem
          setPages={setPages}
          expandedPageId={expandedPageId}
          key={item.id}
          label={item.title}
          id={item.id}
        />
      ))}
    </div>
  );
};
export default Pages;
