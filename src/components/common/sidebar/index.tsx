"use client";

import { ChevronsRight } from "lucide-react";
import { createContext, useContext, useState, Suspense } from "react";
import WorkspaceSelector from "@/components/common/sidebar/WorkspaceSelector";
import { SIDEBARTOPITEMS } from "@/constant";
import Loading from "./Loading";
import { NavItem } from "./SidebarItem";
import { SectionTitle } from "./SidebarTitle";

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

  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((prev) => !prev);

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
          <div className="flex flex-col justify-between h-screen border-r border-[#383838] bg-[#202020] px-1 pb-4 overflow-hidden">
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
            <div className="mt-auto px-1">
              <SectionTitle>Private</SectionTitle>
            </div>
          </div>
        )}
      </div>
    </SidebarContext.Provider>
  );
}
