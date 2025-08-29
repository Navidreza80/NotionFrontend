import {
  BookOpenText,
  Database,
  Globe2,
  Home,
  Inbox,
  MessageCircle,
  Plus,
  Search,
  Settings,
  Share2,
  Star,
  Store,
  Trash2,
  ChevronRight,
  File,
} from "lucide-react";

const ICONS = {
  ChevronRight,
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
  File
};

export const NavItem = ({
  icon,
  label,
  active = false,
}: {
  icon: string;
  label: string;
  active?: boolean;
}) => {
  const IconComp =
    typeof icon === "string" ? ICONS[icon as keyof typeof ICONS] : null;

  return (
    <div
      className={`flex items-center gap-2 mb-0.5 px-2 py-[5px] rounded-md text-sm cursor-pointer select-none ${
        active
          ? "bg-zinc-700/40 text-white/60"
          : "text-white/50 hover:bg-zinc-800/70 hover:text-white/60"
      }`}
    >
      {typeof icon === "string" && IconComp ? (
        <IconComp
          size={20}
          className={active ? "text-white/50" : "text-white/30"}
        />
      ) : (
        <span className={active ? "text-white/50" : "text-white/30"}>
          {icon}
        </span>
      )}

      <span className="truncate">{label}</span>
    </div>
  );
};
