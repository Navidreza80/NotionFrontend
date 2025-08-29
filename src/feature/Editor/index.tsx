/* eslint-disable */

"use client";

import dynamic from "next/dynamic";

const Block = dynamic(() => import("./Block"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const EditorWrapper = ({ content }: { content?: any }) => {
  return (
    <div>
      <Block pageId="1" content={content} />
    </div>
  );
};
export default EditorWrapper;
