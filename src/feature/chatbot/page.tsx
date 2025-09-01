"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ArrowUp,
  BookOpenText,
  Calendar,
  Clock,
  Eye,
  Globe,
  Paperclip,
  PenSquare,
  Plus,
  Zap,
  Loader2,
} from "lucide-react";
import { RecentlyCard } from "@/components/common/chatbot/RecentlyCard";
import OpenSidebar from "@/components/common/sidebar/OpenSidebar";
import { fetchWorkspaces } from "@/lib/actions/workspaces.action";
import { fetchPages } from "@/lib/actions/page.action";

// Message type for chat state
export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export default function NotionChatbotPage() {
  const [input, setInput] = useState("");
  const [chatMode, setChatMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Automatically scroll chat to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format a timestamp into "HH:MM" format
  const formatTimestamp = (date: Date) =>
    new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
    }).format(date);

  // Send message to API and update chat state
  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    if (!chatMode) setChatMode(true);
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
      const workspaces = await fetchWorkspaces();
      const pages = await fetchPages();
      const workspaceText = Array.isArray(workspaces)
        ? workspaces.map((w) => `- ${w.name}`).join("\n")
        : "";
      const pagesText = Array.isArray(pages)
        ? pages.map((p) => `- ${p.title}`).join("\n")
        : "";
      const knowledgeBase = `
You are a highly intelligent Notion AI assistant.  

The available workspaces are:
${workspaceText}

The available pages (projects) within these workspaces are:
${pagesText}

Your task:
1. When the user asks about a workspace or project, always find the closest matching page from the list.  
2. Each page has an "id". Use that id to generate a direct link in the format: /page/{id}  
   Example: if the page id is 12, the link must be "/page/12".  
3. Along with the link, provide a short, natural explanation of why this page matches the user's request.  

If the user asks about something unrelated to the given workspaces or pages, respond only with:  
"I can only assist with the workspaces and pages available in this Notion system."
`;



      const conversation = [
        { role: "system", content: knowledgeBase },
        ...messages.map(({ role, content }) => ({
          role: role === "assistant" ? "assistant" : "user",
          content,
        })),
        { role: "user", content: input },
      ];

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1-0528:free",
          messages: conversation,
        }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        role: "assistant",
        content: data.choices?.[0]?.message?.content || "Error",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error fetching response",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#191919] text-white">
      <div className="w-full md:mt-3 mt-5 px-3 flex items-center">
        <OpenSidebar />
      </div>
      {!chatMode ? (
        // Initial Notion-style UI (before first message is sent)
        <div className="w-full px-4 flex flex-col gap-6 pt-5 lg:px-8 h-screen max-w-[800px] mx-auto">
          <div>
            {/* Heading */}
            <div className="flex justify-center gap-1 place-items-center">
              <div className="h-18 w-18 rounded-full md:grid hidden place-items-center">
                <Image
                  width={80}
                  height={80}
                  src="/assets/63e1ae62461bde03.gif"
                  className="w-18 h-18 rounded-full"
                  alt="Notion AI animated face"
                />
              </div>
              <h1 className="text-[24px] font-semibold text-center">
                How can I help you today?
              </h1>
            </div>

            {/* Input panel */}
            <div className="mt-5 p-3 pb-1 rounded-2xl border border-[#242424] focus-within:border-[#383838] bg-[#202020] transition-all duration-300">
              {/* Context tag */}
              <div className="flex w-fit items-center rounded-full text-sm gap-1.5 py-1 px-2 text-[#686868] font-semibold border border-[#383838]">
                <span>@</span> Add context
              </div>

              {/* Input field */}
              <div className="flex items-center gap-3 py-3 mt-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask, search, or make anything..."
                  className="w-full bg-transparent placeholder-[#595959] placeholder:text-sm placeholder:font-semibold font-semibold text-sm focus:outline-none"
                  disabled={loading}
                />
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-2.5 flex-wrap gap-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button className="rounded-full p-2 hover:bg-[#282828]">
                    <Paperclip size={16} />
                  </button>
                  <button className="rounded-full text-[15px] text-[#9f9b94] font-semibold py-1 px-3 hover:bg-[#282828]">
                    Auto
                  </button>
                  <button className="rounded-full text-[15px] text-[#9f9b94] font-semibold py-1.5 px-2 hover:bg-[#282828] flex gap-1">
                    <Eye size={16} className="text-[#a8a49c]" />
                    Research
                  </button>
                  <button className="rounded-full text-[15px] text-[#9f9b94] font-semibold py-1.5 px-2 hover:bg-[#282828] flex gap-1">
                    <Globe size={16} className="text-[#8e8b86]" />
                    All sources
                  </button>
                </div>

                {/* Send button */}
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition ${loading || !input.trim()
                    ? "bg-[#808080] cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500"
                    }`}
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowUp size={15} />}
                </button>
              </div>
            </div>
          </div>

          {/* Recently visited */}
          <div className="mt-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-500">
              <Clock size={14} /> Recently visited
            </div>
            <div className="mt-3 flex gap-5">
              <RecentlyCard title="New page" icon={PenSquare} />
              <RecentlyCard title="Journal" icon={BookOpenText} />
              <RecentlyCard title="New page" icon={Plus} />
            </div>
          </div>

          {/* Upcoming events */}
          <div className="mt-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-zinc-500 mb-3">
              <Calendar size={14} /> Upcoming events
            </div>
            <div className="py-6 px-6 rounded-xl bg-[#202020] grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left side */}
              <div className="border-b md:border-b-0 md:border-r border-[#383838] pb-6 md:pb-0 md:pr-6">
                <div className="flex flex-col items-start gap-5">
                  <div className="text-blue-400">
                    <Zap size={34} />
                  </div>
                  <div>
                    <div className="text-base mb-2 font-semibold text-white/30">
                      Connect AI Meeting Notes with your Calendar events
                    </div>
                    <p className="text-sm font-medium leading-relaxed text-white/30">
                      Join calls, transcribe audio, and summarize meetings all in Notion.
                    </p>
                  </div>
                  <button className="text-sm text-blue-500 font-medium hover:text-blue-400 transition">
                    Connect Notion Calendar
                  </button>
                </div>
              </div>

              {/* Right side */}
              <div className="flex flex-col gap-5 md:pl-6">
                {/* Today */}
                <div className="flex items-start">
                  <div className="text-sm font-semibold text-white/30 mr-4 min-w-[50px]">
                    <div>Today</div>
                    <div className="mt-1">Aug 25</div>
                  </div>
                  <span className="w-1 h-12 bg-white/10 rounded-full mr-3" />
                  <div className="text-sm text-white/30 text-left">
                    <div className="font-semibold">Team standup</div>
                    <div>9 AM · Office</div>
                    <button className="mt-2 inline-flex items-center gap-1 rounded-md bg-[#303030] px-2 py-1 text-sm">
                      <span className="text-white/30">Join and take notes</span>
                    </button>
                  </div>
                </div>

                {/* Tuesday */}
                <div className="flex items-start">
                  <div className="text-sm font-semibold text-white/30 mr-4 min-w-[50px]">
                    <div>Tue</div>
                    <div className="mt-1">Aug 26</div>
                  </div>
                  <span className="w-1 h-12 bg-white/10 rounded-full mr-3" />
                  <div className="text-sm text-white/30 text-left">
                    <div className="font-semibold">Project check-in</div>
                    <div>10 AM · Office</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Chat view (after switching to chat mode)
        <div className="w-full px-4 flex flex-col gap-6 lg:px-8 max-w-[800px] mx-auto"
          style={{ height: "calc(100vh - 72px)" }}>
          <div className="flex flex-col w-full max-w-[800px] h-full">
            {/* Chat header */}
            <div className="p-4 text-center font-semibold text-lg">Chat with Notion AI</div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"
                    }`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[70%] shadow-md ${msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-gray-700 text-gray-100 rounded-tl-none"
                      }`}
                  >
                    {msg.content}
                  </div>
                  {msg.timestamp && (
                    <span className="text-xs mt-1 text-gray-400">
                      {formatTimestamp(msg.timestamp)}
                    </span>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <div className="p-3 border-t border-[#505050]">
              <div className="mt-2 p-3 pb-1 rounded-2xl border border-[#242424] focus-within:border-[#383838] bg-[#202020] transition-all duration-300">
                {/* Context tag */}
                <div className="flex w-fit items-center rounded-full text-sm gap-1.5 py-1 px-2 text-[#686868] font-semibold border border-[#383838]">
                  <span>@</span> Add context
                </div>

                {/* Input field */}
                <div className="flex items-center gap-3 py-3 mt-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Ask, search, or make anything..."
                    className="w-full bg-transparent placeholder-[#595959] placeholder:text-sm placeholder:font-semibold font-semibold text-sm focus:outline-none"
                    disabled={loading}
                  />
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-between pt-2.5 flex-wrap gap-3">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button className="rounded-full p-2 hover:bg-[#282828]">
                      <Paperclip size={16} />
                    </button>
                    <button className="rounded-full text-[15px] text-[#9f9b94] font-semibold py-1 px-3 hover:bg-[#282828]">
                      Auto
                    </button>
                    <button className="rounded-full text-[15px] text-[#9f9b94] font-semibold py-1.5 px-2 hover:bg-[#282828] flex gap-1">
                      <Eye size={16} className="text-[#a8a49c] my-auto" />
                      Research
                    </button>
                    <button className="rounded-full text-[15px] text-[#9f9b94] font-semibold py-1.5 px-2 hover:bg-[#282828] flex gap-1">
                      <Globe size={16} className="text-[#8e8b86] my-auto" />
                      All sources
                    </button>
                  </div>

                  {/* Send button */}
                  <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition ${loading || !input.trim()
                      ? "bg-[#808080] cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-500"
                      }`}
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <ArrowUp size={15} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
