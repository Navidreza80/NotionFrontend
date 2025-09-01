import WorkspaceSelector from "@/components/common/sidebar/WorkspaceSelector";
import { SIDEBARTOPITEMS } from "@/constant";
import { fetchPages } from "@/lib/actions/page.action";
import { Suspense } from "react";
import Loading from "./Loading";
import Pages from "./Pages";
import { NavItem } from "./SidebarItem";
import { SectionTitle } from "./SidebarTitle";
import PageLoading from "./PageLoading";

export default async function Sidebar({
  expandedPageId,
}: {
  expandedPageId: string;
}) {
  const pages = fetchPages();
  return (
    <div
      className={`fixed lg:static top-0 left-0 z-50 transform lg:transform-none transition-transform duration-300 translate-x-0`}
    >
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
                <NavItem
                  key={index}
                  label={item.label}
                  icon={item.icon}
                  href={item.href}
                />
              ))}
            </div>
            {/* Private pages */}
            <SectionTitle>Private</SectionTitle>
            <Suspense fallback={<PageLoading />}>
              <Pages expandedPageId={expandedPageId} data={pages} />
            </Suspense>
          </div>
        </aside>
      </div>
    </div>
  );
}
