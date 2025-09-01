import { Edit, Home } from "lucide-react";
import Link from "next/link";

const ICONS = {
  Home,
  Edit,
};

export const NavItem = ({
  icon,
  label,
  href,
  active = false,
}: {
  icon: string;
  href: string;
  label: string;
  active?: boolean;
}) => {
  const IconComp =
    typeof icon === "string" ? ICONS[icon as keyof typeof ICONS] : null;

  return (
    <Link href={href}>
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

        <span className="truncate text-[15px] font-semibold">{label}</span>
      </div>
    </Link>
  );
};
