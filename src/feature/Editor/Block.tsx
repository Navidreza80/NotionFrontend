/* eslint-disable */


"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { io } from "socket.io-client";
import { useDebouncedCallback } from "use-debounce";

const socket = io("https://notionbackend-production-8193.up.railway.app");

interface EditorProps {
  pageId: string;
  content?: any;
}

export default function Editor({ pageId, content }: EditorProps) {
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

  return <BlockNoteView className="min-h-screen p-4" editor={editor} />;
}
