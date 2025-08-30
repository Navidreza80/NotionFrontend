/* eslint-disable */

"use client";

import OpenSidebar from "@/components/common/sidebar/OpenSidebar";
import { timeAgo } from "@/helper/date-convertor";
import { Star } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const Block = dynamic(() => import("./Block"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const EditorWrapper = ({
  content,
  id,
  title,
  updatedAt,
}: {
  id: string;
  content?: any;
  title: string;
  updatedAt: Date;
}) => {
  const [pageTitle, setPageTitle] = useState(title);
  return (
    <div>
      <div className="flex-1 flex justify-between">
        <div className="flex gap-4 items-center">
          <OpenSidebar />
          <div className="font-medium text-title text-[15px]">{pageTitle}</div>
        </div>

        <div className="flex gap-4 items-center">
          <span className="text-surface">Edited {timeAgo(updatedAt)}</span>
          <Star />
        </div>
      </div>
      <Block
        pageId={id}
        content={content}
        title={pageTitle}
        setPageTitle={setPageTitle}
      />
    </div>
  );
};
export default EditorWrapper;
