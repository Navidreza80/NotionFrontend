export const SIDEBARTOPITEMS = [
  { icon: "Home", label: "Home", href: "/" },
  { icon: "Edit", label: "Whiteboard", href: "/whiteboard" },
];

export const INITIALCONTENT = [
  {
    id: "1",
    type: "heading",
    content: [{ type: "text", text: "👋 Welcome to your new note!" }],
  },
  {
    id: "2",
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "This is the beginning of your page. You can start writing here, or add new blocks like headings, lists, and more.",
      },
    ],
  },
  {
    id: "3",
    type: "bulletListItem",
    content: [{ type: "text", text: "Press Enter to add a new block" }],
  },
  {
    id: "4",
    type: "bulletListItem",
    content: [{ type: "text", text: "Use / to see all available blocks" }],
  },
  {
    id: "5",
    type: "bulletListItem",
    content: [{ type: "text", text: "Drag and reorder blocks as you like" }],
  },
  {
    id: "6",
    type: "paragraph",
    content: [{ type: "text", text: "✨ Have fun and stay productive!" }],
  },
];
