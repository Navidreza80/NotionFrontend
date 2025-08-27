import WorkspaceSelector from "@/components/common/sidebar/WorkspaceSelector";
import ChatBot from "@/feature/chatbot/page";
import {
  Bell,
  BookOpenText,
  Database,
  Globe2,
  Home,
  Inbox,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share2,
  Star,
  Store,
  Trash2,
} from "lucide-react";

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
};

const NavItem = ({ icon, label, active = false }) => {
  const IconComp =
    typeof icon === "string" ? iconMap[icon as keyof typeof iconMap] : null;

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

const SectionTitle = ({ children }) => (
  <div className="px-2.5 pt-4 pb-1 text-[11px] text-white/50 font-medium select-none">
    {children}
  </div>
);

const Divider = () => <div className="h-px bg-zinc-800" />;

export default function Sidebar() {
  return (
    <div className="min-h-screen bg-[#191919] text-[#ffffffcf]">
      {/* Sidebar */}
      <aside className="sticky top-0 flex flex-col flex-wrap justify-between h-screen w-[240px] shrink-0 border-r border-[#383838] bg-[#202020] px-1 pb-4">
        <div>
          {/* Workspace header */}
          <WorkspaceSelector />

          <div className="px-1">
            <NavItem icon="Search" label="Search" />
            <NavItem icon="Home" label="Home" active />
            <NavItem icon="Inbox" label="Inbox" />
          </div>

          <SectionTitle>Private</SectionTitle>
          <div className="px-1 space-y-1">
            <NavItem
              icon={
                <svg
                  aria-hidden="true"
                  role="graphics-symbol"
                  viewBox="0 0 12 12"
                  className="chevronDownRoundedThick"
                  style={{
                    width: 12,
                    height: 12,
                    display: "block",
                    fill: "rgba(255, 255, 255, 0.282)",
                    flexShrink: 0,
                    transition: "transform 200ms ease-out",
                    transform: "rotateZ(-90deg)",
                    opacity: 1,
                  }}
                >
                  <path d="M6.02734 8.80274C6.27148 8.80274 6.47168 8.71484 6.66211 8.51465L10.2803 4.82324C10.4268 4.67676 10.5 4.49609 10.5 4.28125C10.5 3.85156 10.1484 3.5 9.72363 3.5C9.50879 3.5 9.30859 3.58789 9.15234 3.74902L6.03223 6.9668L2.90722 3.74902C2.74609 3.58789 2.55078 3.5 2.33105 3.5C1.90137 3.5 1.55469 3.85156 1.55469 4.28125C1.55469 4.49609 1.62793 4.67676 1.77441 4.82324L5.39258 8.51465C5.58789 8.71973 5.78808 8.80274 6.02734 8.80274Z"></path>
                </svg>
              }
              label="New page"
            />
            <NavItem icon="BookOpenText" label="Journal" />
            <NavItem icon="Star" label="Welcome to Notion!" />
            <NavItem icon="Database" label="Monthly Budget" />
            <NavItem icon="Globe2" label="Personal Website" />
          </div>

          <SectionTitle>Shared</SectionTitle>
          <div className="px-1 space-y-1">
            <NavItem icon="Plus" label="Start collaborating" />
          </div>

          <SectionTitle> </SectionTitle>
          <div className="px-1 space-y-1">
            <NavItem icon="Settings" label="Settings" />
            <NavItem icon="Store" label="Marketplace" />
            <NavItem icon="Trash2" label="Trash" />
          </div>
        </div>

        <div className="pt-6 ">
          <Divider />
          <div className="px-2.5 pt-3 text-xs text-zinc-500 flex justify-between items-center gap-2">
            <div className="flex gap-2">
              <svg
                aria-hidden="true"
                role="graphics-symbol"
                viewBox="0 0 20 20"
                className="calendarDate26"
                style={{
                  width: "20px",
                  height: "20px",
                  display: "block",
                  fill: "rgba(255,255,255,0.46)",
                  flexShrink: 0,
                  color: "rgba(255,255,255,0.46)",
                }}
              >
                <path d="M5.61218 4.0799C4.73322 4.18671 4.02924 4.93207 3.97064 5.81104L3.96588 5.9032L3.96729 15.342L3.10266 15.3953H3.06824C2.85229 15.3841 2.65259 15.2995 2.49689 15.1501C2.32245 14.9828 2.22455 14.7541 2.21741 14.5035C2.21741 14.4936 2.21606 14.4837 2.21606 14.4731V4.13733C2.21606 3.25684 2.90002 2.52771 3.77881 2.47156L13.9657 1.82074C13.9833 1.81946 14.0008 1.81873 14.0183 1.81873C14.2174 1.81873 14.4028 1.89215 14.5449 2.02765C14.6442 2.12225 14.7142 2.24054 14.7517 2.37207C14.7679 2.42828 14.7777 2.48712 14.7816 2.5473L14.7817 3.49023L5.64923 4.07343L5.61218 4.0799ZM17.784 16.7507C17.784 16.7665 17.7827 16.7824 17.7814 16.7983C17.7587 17.1375 17.4935 17.4362 17.1673 17.4976C17.1608 17.4976 17.1543 17.4996 17.1478 17.4996L6.10248 18.1812H6.06805C5.85211 18.17 5.6524 18.0854 5.49677 17.936C5.32233 17.7687 5.22437 17.54 5.21722 17.2894C5.21722 17.2795 5.21588 17.2696 5.21588 17.259V6.07227C5.21588 6.05646 5.21588 6.0412 5.21722 6.02533C5.24121 5.66638 5.53564 5.35303 5.88715 5.31604C5.89624 5.31604 5.90533 5.31335 5.91443 5.31268L16.9655 4.60663C16.9831 4.60535 17.0006 4.60468 17.0181 4.60468C17.2172 4.60468 17.4026 4.67804 17.5447 4.8136C17.644 4.90814 17.714 5.02643 17.7516 5.15802C17.7678 5.21417 17.7775 5.27301 17.7814 5.33319L17.784 16.7507ZM16.5358 8.02374C16.5358 7.7887 16.3475 7.61896 16.1176 7.63098L6.90546 8.19415C6.67493 8.20618 6.46613 8.37146 6.46613 8.62994V16.1628C6.45618 16.6468 6.77686 16.7722 7.1391 16.7462L16.0001 16.2205L16.002 16.2199C16.468 16.2015 16.5358 15.8461 16.5358 15.57V8.02374ZM8.71001 10.4331C8.26113 10.461 8.12616 10.8178 8.14401 11.3659C7.7629 11.4769 7.47515 11.2335 7.47456 10.7193C7.47397 10.0401 8.06553 9.40182 9.28494 9.32582C10.3177 9.26173 11.0299 9.87088 11.0311 10.7068C11.0323 11.5778 10.5757 12.2161 9.39968 13.3869L8.7653 14.0186C9.94189 13.9717 10.7207 13.8618 11.0846 13.6131C11.2374 13.7514 11.3218 13.9557 11.3224 14.2169C11.3224 14.7483 10.7392 15.0897 10.1547 15.1259C9.58753 15.1609 7.29321 15.2346 7.29321 15.2346L7.1654 14.7459L8.28136 13.3257C9.04236 12.355 9.43119 11.8343 9.4306 11.2246C9.4306 10.7193 9.14998 10.4058 8.71001 10.4331ZM12.9302 11.6728C14.4195 11.0049 15.7322 11.3938 15.734 12.7617C15.7352 14.0162 14.9153 14.9122 13.6793 14.9893C12.0621 15.0903 11.4937 13.9403 11.4919 12.5029C11.4896 10.5602 12.3011 9.13348 13.8083 9.03967C14.8749 8.96426 15.5194 9.36861 15.52 10.0656C15.52 10.4925 15.1823 10.8357 14.6995 10.8137C14.6139 10.1743 14.2667 9.84773 13.8178 9.87563C13.1828 9.91541 12.9629 10.5554 12.9302 11.6728ZM12.9224 12.2743C12.9664 13.4914 13.3392 14.1653 13.8136 14.1356C14.127 14.116 14.4147 13.8542 14.4141 13.3489C14.4129 12.4951 13.8285 12.1045 12.9224 12.2743Z"></path>
              </svg>
              <svg
                aria-hidden="true"
                role="graphics-symbol"
                viewBox="0 0 20 20"
                className="mail"
                style={{
                  width: "20px",
                  height: "20px",
                  display: "block",
                  fill: "rgba(255,255,255,0.46)",
                  flexShrink: 0,
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M17.4685918,3.4486694c-.276062-.4232178-.7411499-.6759033-1.2441406-.6759033-.1889648,0-.3743896.0357056-.5512085.1061401L3.0777837,7.8930664c-.40271.1603394-.6936035.5178223-.7687378.9447021s.0762329.8622437.4000244,1.1503906l2.4732056,2.2012329v4.2337646c0,.6617432.793457,1.0004272,1.2713013.5426636l1.9723511-1.8895264,2.0613403,1.8346558c.2311401.2056885.52771.3162842.8310547.3162842.088501,0,.1775513-.0094604.2657471-.0286255.390625-.0849609.71698-.3516235.8781738-.7174683l5.1207275-11.6225586c.2032471-.4614868.1604614-.9884644-.1143799-1.4099121ZM16.4390508,4.3546143l-5.1207275,11.6225586-3.963623-3.52771,5.2460327-5.0794067c.064209-.065918.0716553-.168457.0177002-.243042-.0568237-.0785522-.1638184-.1014404-.2478638-.0530396l-6.562439,3.9990234-2.2680054-2.0185547,12.5956421-5.0142822c.0299683-.0119019.0598755-.017395.0886841-.017395.15979,0,.2867432.1680908.2145996.3318481Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <svg
              aria-hidden="true"
              role="graphics-symbol"
              viewBox="0 0 20 20"
              className="questionMarkCircle"
              style={{
                width: "20px",
                height: "20px",
                display: "block",
                fill: "rgba(255,255,255,0.46)",
                flexShrink: 0,
              }}
            >
              <path d="M9.978 7.154c-.804 0-1.333.456-1.438.874a.625.625 0 0 1-1.213-.303c.28-1.121 1.44-1.82 2.65-1.82 1.365 0 2.714.905 2.714 2.298 0 .812-.49 1.477-1.13 1.872l-.755.516a.84.84 0 0 0-.381.677.625.625 0 1 1-1.25 0c0-.688.36-1.318.921-1.706l.003-.002.784-.535.014-.008c.374-.228.544-.537.544-.814 0-.459-.517-1.049-1.463-1.049m.662 6.336a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0"></path>
              <path d="M2.375 10a7.625 7.625 0 1 1 15.25 0 7.625 7.625 0 0 1-15.25 0M10 3.625a6.375 6.375 0 1 0 0 12.75 6.375 6.375 0 0 0 0-12.75"></path>
            </svg>
          </div>
        </div>
      </aside>
    </div>
  );
}
