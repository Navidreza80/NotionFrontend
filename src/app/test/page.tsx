"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

export default function Editor() {
  const editor = useCreateBlockNote();

  return (
    <BlockNoteView
    className="min-h-screen"
      editor={editor}
      onChange={async () => {
        // JSON document
        console.log("JSON:", editor.document);

        // HTML export
        console.log("HTML:", await editor.blocksToFullHTML(editor.document));
      }}
    />
  );
}
