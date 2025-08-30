import { Page } from "@/generated/prisma";
import { PageItem } from "./PageItem";
import { use } from "react";

const Pages = ({
  data,
  expandedPageId,
}: {
  data: Promise<Page[]>;
  expandedPageId: string;
}) => {
  const pages = use(data);
  return (
    <div className="px-1">
      {pages.map((item: Page) => (
        <PageItem
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
