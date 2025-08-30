import WorkspaceSelector from "@/components/common/sidebar/WorkspaceSelector";
import { NavItem } from "./SidebarItem";
import { SectionTitle } from "./SidebarTitle";
import { SIDEBARTOPITEMS } from "@/constant";
import { Suspense } from "react";
import Loading from "./Loading";
import SidebarClient from "./SidebarClient"; 

export default async function Sidebar() {
  return (
    <SidebarClient>
      <div className="min-h-screen bg-[#191919] text-[#ffffffcf]">
        <aside className="sticky top-0 flex flex-col flex-wrap justify-between h-screen w-[240px] shrink-0 border-r border-[#383838] bg-[#202020] px-1 pb-4">
          <div>
            {/* Workspace header */}
            <Suspense fallback={<Loading />}>
              <WorkspaceSelector />
            </Suspense>

            {/* Top navigation items */}
            <div className="px-1">
              {SIDEBARTOPITEMS.map((item, index) => (
                <NavItem key={index} label={item.label} icon={item.icon} />
              ))}
            </div>

            {/* Private pages */}
            <SectionTitle>Private</SectionTitle>
          </div>
        </aside>
      </div>
    </SidebarClient>
  );
}
