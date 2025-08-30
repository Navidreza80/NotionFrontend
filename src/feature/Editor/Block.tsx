/* eslint-disable */

"use client";

import { updatePageById } from "@/lib/actions/page.action";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { SetStateAction } from "react";
import { io } from "socket.io-client";
import { useDebouncedCallback } from "use-debounce";

const socket = io("https://notionbackend-production-8193.up.railway.app");

interface EditorProps {
  pageId: string;
  content?: any;
  setPageTitle: React.Dispatch<SetStateAction<string>>;
  title: string;
}

export default function Editor({
  pageId,
  content,
  title,
  setPageTitle,
}: EditorProps) {
  const editor = useCreateBlockNote({ initialContent: content });
  const sendPatch = useDebouncedCallback(() => {
    socket.emit("page:patch", {
      id: pageId,
      content: editor.document,
    });
  }, 300);
  useEditorChange(() => {
    sendPatch();
  }, editor);
  const updateTitle = useDebouncedCallback(async (value: string) => {
    await updatePageById(pageId, { title: value });
  }, 400);

  return (
    <div className="!max-w-[710px] mx-auto">
      <input
        type="text"
        onChange={async (e) => {
          setPageTitle(e.target.value);
          updateTitle(e.target.value);
        }}
        defaultValue={title}
        className="text-5xl font-bold py-6 outline-0 pl-[54px] h-[100px] mt-[130px] text-title"
      />
      <BlockNoteView className="!max-w-[710px] mx-auto" editor={editor} />
    </div>
  );
}
