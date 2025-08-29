"use client";

import { ChevronsRight, File } from "lucide-react";
import { createContext, useContext, useState, Suspense, useEffect } from "react";
import WorkspaceSelector from "@/components/common/sidebar/WorkspaceSelector";
import { SIDEBARTOPITEMS } from "@/constant";
import Loading from "./Loading";
import { NavItem } from "./SidebarItem";
import { SectionTitle } from "./SidebarTitle";
import { fetchPages } from "@/lib/actions/page.action";

interface SidebarContextProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarClient");
  return ctx;
}

export default function SidebarClient() {
  const [isOpen, setIsOpen] = useState(true);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchPages();
        console.log("📄 Pages data:", data); 
        setPages(data);
      } catch (err) {
        console.error("❌ Error fetching pages:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((prev) => !prev);

    if (loading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 mb-0.5 px-2 py-[5px] rounded-md"
          >
            <div className="w-5 h-5 rounded-md bg-zinc-700/40 animate-pulse" />
            <div className="flex-1 h-4 bg-zinc-700/40 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <SidebarContext.Provider value={{ isOpen, onClose, onToggle }}>
      {/* Toggle Button */}
      {!isOpen && (
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={onToggle}
            className="p-1 rounded-md hover:bg-[#222222] cursor-pointer text-white flex items-center justify-center"
          >
            <ChevronsRight size={20} className="text-white" />
          </button>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 z-50 transition-all duration-300`}
        style={{ width: isOpen ? 290 : 0 }}
      >
        {isOpen && (
          <div className="flex flex-col h-screen border-r border-[#383838] bg-[#202020] px-1 pb-4 overflow-hidden">
            {/* Workspace Header */}
            <Suspense fallback={<Loading />}>
              <WorkspaceSelector />
            </Suspense>

            {/* Top navigation items */}
            <div className="px-1 mt-4 flex flex-col gap-2">
              {SIDEBARTOPITEMS.map((item, index) => (
                <NavItem key={index} label={item.label} icon={item.icon} />
              ))}
            </div>

            {/* Private Pages */}
            <div className=" px-1">
              <SectionTitle>Private</SectionTitle>
              {pages.map((page, index) => (
                <NavItem
                  key={page.id || index}
                  label={page.title}
                  icon="File" 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </SidebarContext.Provider>
  );
}
