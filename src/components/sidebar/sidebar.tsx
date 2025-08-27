import {
    Calendar,
    HelpCircle,
    Mail,
    PenSquare
} from "lucide-react";
import { NavItem } from "./NavItem";
import { SectionTitle } from "./SectionTitle";


// Sidebar configuration
const sidebarConfig = {
    workspace: {
        name: "Taha's",
        initial: "T",
    },
    sections: [
        {
            title: null,
            items: [
                { icon: "Search", label: "Search" },
                { icon: "Home", label: "Home", active: true },
                { icon: "Inbox", label: "Inbox" },
            ],
        },
        {
            title: "Private",
            items: [
                { icon: "Plus", label: "New page" },
                { icon: "BookOpenText", label: "Journal" },
                { icon: "Star", label: "Welcome to Notion!" },
                { icon: "Database", label: "Monthly Budget" },
                { icon: "Globe2", label: "Personal Website" },
            ],
        },
        {
            title: "Shared",
            items: [{ icon: "Share2", label: "Start collaborating" }],
        },
        {
            title: " ",
            items: [
                { icon: "Settings", label: "Settings" },
                { icon: "Store", label: "Marketplace" },
                { icon: "Trash2", label: "Trash" },
            ],
        },
    ],
};

// Divider component
const Divider = () => <div className="h-px bg-zinc-800" />;

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <>
            <aside className={`fixed lg:sticky top-0 flex flex-col justify-between h-screen w-[240px] shrink-0 border-r border-[#383838] bg-[#202020] px-1 pb-4 transform transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                }`}>
                <div>
                    {/* Workspace header */}
                    <div className="flex items-center justify-between gap-2 px-3 pt-3 pb-2">
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-white/10 grid place-items-center text-white/50 font-semibold text-sm">
                                {sidebarConfig.workspace.initial}
                            </div>
                            <div className="text-sm font-bold">{sidebarConfig.workspace.name}</div>
                        </div>
                        <button className="rounded p-1 hover:bg-zinc-800">
                            <PenSquare size={16} className="text-zinc-400" />
                        </button>
                    </div>

                    {/* Navigation items */}
                    {sidebarConfig.sections.map((section, index) => (
                        <div key={index}>
                            {section.title && <SectionTitle>{section.title}</SectionTitle>}
                            <div className="px-1 space-y-1">
                                {section.items.map((item, itemIndex) => (
                                    <NavItem
                                        key={itemIndex}
                                        icon={item.icon}
                                        label={item.label}
                                        active={item.active}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer section */}
                <div className="pt-6">
                    <Divider />
                    <div className="px-2.5 pt-3 text-sm text-zinc-500 flex justify-between items-center gap-2">
                        <div className="flex gap-2">
                            <Calendar size={20} />
                            <Mail size={20} />
                        </div>
                        <HelpCircle size={20} />
                    </div>
                </div>
            </aside>
        </>
    );
}