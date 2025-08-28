import { RecentlyCard } from "@/components/chatbot/RecentlyCard";
import {
  Bell,
  MoreHorizontal,
  PenSquare,
  Plus,
  BookOpenText,
  Paperclip,
  Eye,
  Globe,
  Clock,
  Calendar,
  Zap
} from "lucide-react";
import Image from "next/image";


export default function NotionChatbot() {
  return (
    <div className="w-full px-4 flex flex-col flex-wrap gap-6 lg:px-8 mt-16 pt-5 pb-20 max-w-[800px] mx-auto">
      {/* Top right actions */}
      <div className="fixed w-full right-3 top-0 z-40 md:mt-3 mt-5 flex justify-end items-center">
        <div className="rounded-lg flex gap-2 text-zinc-400 bg-[#222222] px-2 py-1 w-fit">
          <button className="p-1.5 cursor-pointer rounded-md hover:bg-zinc-800">
            <Bell size={18} />
          </button>
          <button className="p-1.5 cursor-pointer rounded-md hover:bg-zinc-800">
            <MoreHorizontal size={18} />
          </button>
        </div>

      </div>

      <div>
        {/* Heading */}
        <div className="flex justify-center gap-1 h-15 place-items-center">
          <div className="h-18 w-18 rounded-full grid place-items-center">
            <Image width={80} height={80} src="/assets/63e1ae62461bde03.gif" className="w-18 h-18 rounded-full" alt="Notion AI animated face" />
          </div>
          <h1 className="text-[24px] font-semibold text-center h-fit">
            How can I help you today?
          </h1>
        </div>

        {/* Query panel */}
        <div className="mt-5 p-3 pb-1 rounded-2xl border border-[#242424] focus-within:border-[#383838] transition-all duration-300 bg-[#202020]">
          {/* Tag row */}
          <div className="flex w-fit items-center rounded-full mt-auto text-sm gap-1.5 py-1 px-2 text-[#686868] font-semibold border border-[#383838]">
            <span>@</span> Add context
          </div>

          {/* Input row */}
          <div className="flex items-center gap-3 rounded-xl py-3 mt-2">
            <input
              placeholder="Ask, search, or make anything..."
              className="w-full bg-transparent placeholder-[#595959] placeholder:text-sm placeholder:font-semibold font-semibold text-sm focus:outline-none"
            />
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between gap-3 pt-2.5 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button className="rounded-full flex gap-1 text-[15px] cursor-pointer p-2 hover:bg-[#282828]">
                <Paperclip size={16} className="my-auto" />
              </button>
              <button className="rounded-full flex gap-1 text-[15px] text-[#9f9b94] font-semibold cursor-pointer py-1 px-3 hover:bg-[#282828]">
                Auto
              </button>
              <button className="rounded-full flex gap-1 text-[15px] text-[#9f9b94] font-semibold cursor-pointer py-1.5 px-2 hover:bg-[#282828]">
                <Eye size={16} className="text-[#a8a49c] my-auto" />
                Research
              </button>
              <button className="rounded-full flex gap-1 text-[15px] text-[#9f9b94] font-semibold cursor-pointer py-1.5 px-2 hover:bg-[#282828]">
                <Globe size={16} className="text-[#8e8b86] my-auto" />
                All sources
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recently visited */}
      <div className="mt-8">
        <div className="flex items-center justify-between pr-2">
          <div className="text-sm font-semibold flex gap-2 items-center text-zinc-500">
            <Clock size={14} />
            Recently visited
          </div>
        </div>
        <div className="mt-3 flex gap-5 justify-start w-full">
          <RecentlyCard title="New page" icon={PenSquare} />
          <RecentlyCard title="Journal" icon={BookOpenText} />
          <RecentlyCard title="New page" icon={Plus} />
        </div>
      </div>

      {/* Upcoming events */}
      <div className="mt-8">
        <div className="text-sm font-semibold flex gap-2 items-center text-zinc-500 mb-3">
          <Calendar size={14} />
          Upcoming events
        </div>
        <div className="overflow-hidden py-6 px-6 rounded-xl bg-[#202020]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left - Connect Calendar */}
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
                <button className="cursor-pointer rounded-lg text-sm text-blue-500 font-medium hover:text-blue-400 transition">
                  Connect Notion Calendar
                </button>
              </div>
            </div>

            {/* Right - Events list */}
            <div className="pl-0 md:pl-6 flex flex-col gap-5">
              {/* Today */}
              <div className="flex items-start">
                <div className="text-sm font-semibold text-white/30 mr-4 min-w-[50px]">
                  <div>Today</div>
                  <div className="mt-1">Aug 25</div>
                </div>
                <span className="w-1 h-12 self-stretch rounded-full bg-white/10 mr-3" />
                <div className="text-left text-sm text-white/30">
                  <div className="font-semibold">Team standup</div>
                  <div>9 AM · Office</div>
                  <button className="mt-2 inline-flex items-center gap-1 rounded-md bg-[#303030] px-2 py-1 text-sm">
                    <span className="text-white/30">Join and take notes</span>
                  </button>
                </div>
              </div>

              {/* Tue */}
              <div className="flex items-start">
                <div className="text-sm font-semibold text-white/30 mr-4 min-w-[50px]">
                  <div>Tue</div>
                  <div className="mt-1">Aug 26</div>
                </div>
                <span className="w-1 h-12 self-stretch rounded-full bg-white/10 mr-3" />
                <div className="text-left text-sm text-white/30">
                  <div className="font-semibold">Project check-in</div>
                  <div>10 AM · Office</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
