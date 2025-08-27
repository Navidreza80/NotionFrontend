import {
    BookOpenText,
    Calendar,
    Database,
    Globe2,
    HelpCircle,
    Home,
    Inbox,
    Mail,
    MessageCircle,
    PenSquare,
    Plus,
    Search,
    Settings,
    Share2,
    Star,
    Store,
    Trash2,
} from "lucide-react";

export const NavItem = ({ icon, label, active = false }) => {
    const iconMap = {
        Search,
        Home,
        Inbox,
        Plus,
        BookOpenText,
        Star,
        Database,
        Globe2,
        Share2,
        Settings,
        Store,
        Trash2,
        MessageCircle,
        Calendar,
        Mail,
        HelpCircle,
        PenSquare,
    };

    const IconComp = typeof icon === "string" ? iconMap[icon] : icon;

    return (
        <div
            className={`flex items-center gap-2 mb-0.5 px-2 py-[5px] rounded-md text-sm cursor-pointer select-none ${active
                ? "bg-zinc-700/40 text-white/60"
                : "text-white/50 hover:bg-zinc-800/70 hover:text-white/60"
                }`}
        >
            {typeof icon === "string" && IconComp ? (
                <IconComp size={20} className={active ? "text-white/50" : "text-white/30"} />
            ) : (
                <span className={active ? "text-white/50" : "text-white/30"}>{icon}</span>
            )}
            <span className="text-[14px] font-medium truncate">{label}</span>
        </div>
    );
};