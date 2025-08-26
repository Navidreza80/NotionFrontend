import {
  Bell,
  BookOpenText,
  Database,
  Globe2,
  Home,
  Inbox,
  MessageCircle,
  MoreHorizontal,
  PenSquare,
  Plus,
  Search,
  Settings,
  Share2,
  Star,
  Store,
  StoreIcon,
  Trash2
} from "lucide-react";
import Image from "next/image";


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
  Store,         // ✅ درست شد
  Trash2,
  MessageCircle,
};


const sidebarConfig = {
  workspace: {
    name: "Taha’s",
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
      title: null,
      items: [
        { icon: "Settings", label: "Settings" },
        { icon: "Store", label: "Marketplace" }, // ✅ درست شد
        { icon: "Trash2", label: "Trash" },
      ],
    },
  ],
  footer: {
    invite: { icon: "MessageCircle", label: "Invite members" },
  },
};




/**
 * Notion Chatbot screen – pixel-accurate inspired replica
 * TailwindCSS required in the environment.
 */

const NavItem = ({ icon, label, active = false }) => {
  const IconComp = typeof icon === "string" ? iconMap[icon as keyof typeof iconMap] : null;

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

      <span className="truncate">{label}</span>
    </div>
  );
};





const SectionTitle = ({ children }) => (
  <div className="px-2.5 pt-4 pb-1 text-[11px] text-white/50 font-medium select-none">
    {children}
  </div>
);

const Chip = ({ icon: Icon, children, active = false }) => (
  <button
    className={`inline-flex items-center gap-2 px-2.5 h-7 rounded-md border text-xs transition ${active
      ? "border-zinc-500 bg-zinc-800 text-zinc-200"
      : "border-zinc-700 bg-zinc-900/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
      }`}
  >
    {Icon && <Icon size={14} className="opacity-80" />}
    {children}
  </button>
);

const MiniIcon = ({ Icon }) => (
  <div className="h-5 w-5 rounded-md bg-zinc-800 grid place-items-center">
    <Icon size={24} className="text-zinc-400" />
  </div>
);

const RecentlyCard = ({ title, icon: Icon, image }) => (
  <div className="w-[124px] h-[118px] overflow-hidden flex items-center justify-center rounded-xl relative border hover:border-[#383838] border-[#2a2a2a] bg-[#2a2a2a] transition shadow-sm">

    {image ? (
      <img src={image} alt="thumb" className="h-full w-full object-cover" />
    ) : (
      <div className="absolute top-[28%] ml-5 w-full">
        <MiniIcon Icon={Icon || PenSquare} />
      </div>
    )}
    <div className="h-[63%] w-full bg-[#202020]/60 absolute flex items-center px-4 bottom-0 z-50" ><div className="text-sm text-zinc-200">{title}</div></div>
  </div >
);

const Divider = () => <div className="h-px bg-zinc-800" />;

export default function NotionChatbotReplica() {
  return (
    <div className="min-h-screen w-full bg-[#191919] text-[#ffffffcf]">
      {/* Top right actions */}
      <div className="fixed right-4 top-3 z-40 flex items-center gap-2 text-zinc-400">
        <button className="p-1.5 rounded-md hover:bg-zinc-800">
          <Bell size={18} />
        </button>
        <button className="p-1.5 rounded-md hover:bg-zinc-800">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Shell */}
      <div className="mx-auto w-full gap-0 flex">
        {/* Sidebar */}
        <aside className="sticky top-0 flex flex-col flex-wrap justify-between h-screen w-[240px] shrink-0 border-r border-[#383838] bg-[#202020] px-1 pb-4">
          <div>
            {/* Workspace header */}
            <div className="flex items-center justify-between gap-2 px-3 pt-3 pb-2">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded bg-white/10 grid place-items-center text-white/50 font-semibold text-xs">
                  T
                </div>
                <div className="text-sm font-bold">Taha’s</div>
              </div>
              <button className="rounded p-1 hover:bg-zinc-800">
                <PenSquare size={16} className="text-zinc-400" />
              </button>
            </div>

            <div className="px-1">
              <NavItem icon="Search" label="Search" />
              <NavItem icon="Home" label="Home" active />
              <NavItem icon="Inbox" label="Inbox" />
            </div>

            <SectionTitle>Private</SectionTitle>
            <div className="px-1 space-y-1">
              <NavItem icon={<svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 12 12" className="chevronDownRoundedThick" style={{ width: 12, height: 12, display: "block", fill: "rgba(255, 255, 255, 0.282)", flexShrink: 0, transition: "transform 200ms ease-out", transform: "rotateZ(-90deg)", opacity: 1 }}><path d="M6.02734 8.80274C6.27148 8.80274 6.47168 8.71484 6.66211 8.51465L10.2803 4.82324C10.4268 4.67676 10.5 4.49609 10.5 4.28125C10.5 3.85156 10.1484 3.5 9.72363 3.5C9.50879 3.5 9.30859 3.58789 9.15234 3.74902L6.03223 6.9668L2.90722 3.74902C2.74609 3.58789 2.55078 3.5 2.33105 3.5C1.90137 3.5 1.55469 3.85156 1.55469 4.28125C1.55469 4.49609 1.62793 4.67676 1.77441 4.82324L5.39258 8.51465C5.58789 8.71973 5.78808 8.80274 6.02734 8.80274Z"></path></svg>
              } label="New page" />
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
                <svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" className="calendarDate26" style={{ width: "20px", height: "20px", display: "block", fill: "rgba(255,255,255,0.46)", flexShrink: 0, color: "rgba(255,255,255,0.46)" }}><path d="M5.61218 4.0799C4.73322 4.18671 4.02924 4.93207 3.97064 5.81104L3.96588 5.9032L3.96729 15.342L3.10266 15.3953H3.06824C2.85229 15.3841 2.65259 15.2995 2.49689 15.1501C2.32245 14.9828 2.22455 14.7541 2.21741 14.5035C2.21741 14.4936 2.21606 14.4837 2.21606 14.4731V4.13733C2.21606 3.25684 2.90002 2.52771 3.77881 2.47156L13.9657 1.82074C13.9833 1.81946 14.0008 1.81873 14.0183 1.81873C14.2174 1.81873 14.4028 1.89215 14.5449 2.02765C14.6442 2.12225 14.7142 2.24054 14.7517 2.37207C14.7679 2.42828 14.7777 2.48712 14.7816 2.5473L14.7817 3.49023L5.64923 4.07343L5.61218 4.0799ZM17.784 16.7507C17.784 16.7665 17.7827 16.7824 17.7814 16.7983C17.7587 17.1375 17.4935 17.4362 17.1673 17.4976C17.1608 17.4976 17.1543 17.4996 17.1478 17.4996L6.10248 18.1812H6.06805C5.85211 18.17 5.6524 18.0854 5.49677 17.936C5.32233 17.7687 5.22437 17.54 5.21722 17.2894C5.21722 17.2795 5.21588 17.2696 5.21588 17.259V6.07227C5.21588 6.05646 5.21588 6.0412 5.21722 6.02533C5.24121 5.66638 5.53564 5.35303 5.88715 5.31604C5.89624 5.31604 5.90533 5.31335 5.91443 5.31268L16.9655 4.60663C16.9831 4.60535 17.0006 4.60468 17.0181 4.60468C17.2172 4.60468 17.4026 4.67804 17.5447 4.8136C17.644 4.90814 17.714 5.02643 17.7516 5.15802C17.7678 5.21417 17.7775 5.27301 17.7814 5.33319L17.784 16.7507ZM16.5358 8.02374C16.5358 7.7887 16.3475 7.61896 16.1176 7.63098L6.90546 8.19415C6.67493 8.20618 6.46613 8.37146 6.46613 8.62994V16.1628C6.45618 16.6468 6.77686 16.7722 7.1391 16.7462L16.0001 16.2205L16.002 16.2199C16.468 16.2015 16.5358 15.8461 16.5358 15.57V8.02374ZM8.71001 10.4331C8.26113 10.461 8.12616 10.8178 8.14401 11.3659C7.7629 11.4769 7.47515 11.2335 7.47456 10.7193C7.47397 10.0401 8.06553 9.40182 9.28494 9.32582C10.3177 9.26173 11.0299 9.87088 11.0311 10.7068C11.0323 11.5778 10.5757 12.2161 9.39968 13.3869L8.7653 14.0186C9.94189 13.9717 10.7207 13.8618 11.0846 13.6131C11.2374 13.7514 11.3218 13.9557 11.3224 14.2169C11.3224 14.7483 10.7392 15.0897 10.1547 15.1259C9.58753 15.1609 7.29321 15.2346 7.29321 15.2346L7.1654 14.7459L8.28136 13.3257C9.04236 12.355 9.43119 11.8343 9.4306 11.2246C9.4306 10.7193 9.14998 10.4058 8.71001 10.4331ZM12.9302 11.6728C14.4195 11.0049 15.7322 11.3938 15.734 12.7617C15.7352 14.0162 14.9153 14.9122 13.6793 14.9893C12.0621 15.0903 11.4937 13.9403 11.4919 12.5029C11.4896 10.5602 12.3011 9.13348 13.8083 9.03967C14.8749 8.96426 15.5194 9.36861 15.52 10.0656C15.52 10.4925 15.1823 10.8357 14.6995 10.8137C14.6139 10.1743 14.2667 9.84773 13.8178 9.87563C13.1828 9.91541 12.9629 10.5554 12.9302 11.6728ZM12.9224 12.2743C12.9664 13.4914 13.3392 14.1653 13.8136 14.1356C14.127 14.116 14.4147 13.8542 14.4141 13.3489C14.4129 12.4951 13.8285 12.1045 12.9224 12.2743Z"></path></svg>
                <svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" className="mail" style={{ width: "20px", height: "20px", display: "block", fill: "rgba(255,255,255,0.46)", flexShrink: 0 }}><path fillRule="evenodd" d="M17.4685918,3.4486694c-.276062-.4232178-.7411499-.6759033-1.2441406-.6759033-.1889648,0-.3743896.0357056-.5512085.1061401L3.0777837,7.8930664c-.40271.1603394-.6936035.5178223-.7687378.9447021s.0762329.8622437.4000244,1.1503906l2.4732056,2.2012329v4.2337646c0,.6617432.793457,1.0004272,1.2713013.5426636l1.9723511-1.8895264,2.0613403,1.8346558c.2311401.2056885.52771.3162842.8310547.3162842.088501,0,.1775513-.0094604.2657471-.0286255.390625-.0849609.71698-.3516235.8781738-.7174683l5.1207275-11.6225586c.2032471-.4614868.1604614-.9884644-.1143799-1.4099121ZM16.4390508,4.3546143l-5.1207275,11.6225586-3.963623-3.52771,5.2460327-5.0794067c.064209-.065918.0716553-.168457.0177002-.243042-.0568237-.0785522-.1638184-.1014404-.2478638-.0530396l-6.562439,3.9990234-2.2680054-2.0185547,12.5956421-5.0142822c.0299683-.0119019.0598755-.017395.0886841-.017395.15979,0,.2867432.1680908.2145996.3318481Z" clipRule="evenodd"></path></svg>
              </div>
              <svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" className="questionMarkCircle" style={{ width: "20px", height: "20px", display: "block", fill: "rgba(255,255,255,0.46)", flexShrink: 0 }}><path d="M9.978 7.154c-.804 0-1.333.456-1.438.874a.625.625 0 0 1-1.213-.303c.28-1.121 1.44-1.82 2.65-1.82 1.365 0 2.714.905 2.714 2.298 0 .812-.49 1.477-1.13 1.872l-.755.516a.84.84 0 0 0-.381.677.625.625 0 1 1-1.25 0c0-.688.36-1.318.921-1.706l.003-.002.784-.535.014-.008c.374-.228.544-.537.544-.814 0-.459-.517-1.049-1.463-1.049m.662 6.336a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0"></path><path d="M2.375 10a7.625 7.625 0 1 1 15.25 0 7.625 7.625 0 0 1-15.25 0M10 3.625a6.375 6.375 0 1 0 0 12.75 6.375 6.375 0 0 0 0-12.75"></path></svg>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex justify-center !w-[1500px]">
          <main className="flex-1 w-auto px-[5.2px] mt-16 pb-20 max-w-3xl">
            {/* Heading */}
            <div className="">
              <div className="flex mx-auto items-center justify-center gap-1">
                <div className="h-15 w-15 rounded-full grid place-items-center">
                  <Image width={60} height={60} src="/assets/63e1ae62461bde03.gif" alt="Notion AI animated face" className="w-15 h-15" />
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  How can I help you today?
                </h1>
              </div>


              {/* Query panel */}
              <div className="mt-5 p-3 pb-1 rounded-2xl border border-[#242424] focus:outline-none focus-within:border-[#383838] transition-all duration-300 bg-[#202020]">
                {/* tag row */}
                <div className="flex w-fit rounded-full mt-auto text-[12px] gap-1.5 py-1 pb-0.5 px-1.5 text-[#686868] font-semibold border border-[#383838]">
                  <span><svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 16 16" className="atSmall" style={{ width: "16px", height: "16px", display: "block", fill: "rgba(255,255,255,0.46)", flexShrink: 0 }}><path d="M11.904 3.28a6.125 6.125 0 1 0-1.648 10.415.625.625 0 1 0-.46-1.163 4.875 4.875 0 1 1 2.808-2.93c-.102.294-.43.523-.878.523a.87.87 0 0 1-.872-.872V5.705a.625.625 0 0 0-1.242-.098 3.04 3.04 0 0 0-1.746-.527c-.792 0-1.542.277-2.095.825-.557.55-.871 1.332-.871 2.256s.313 1.714.864 2.276 1.3.858 2.102.858c.8 0 1.55-.294 2.104-.85a2.12 2.12 0 0 0 1.756.93c.835 0 1.738-.441 2.058-1.361a6.125 6.125 0 0 0-1.88-6.734M6.65 6.793c.294-.29.715-.463 1.216-.463.5 0 .929.173 1.228.466.296.289.508.735.508 1.365 0 .631-.213 1.095-.515 1.4-.303.306-.73.484-1.221.484-.49 0-.91-.178-1.209-.482-.296-.303-.507-.767-.507-1.402 0-.633.21-1.08.5-1.368"></path></svg></span> Add context
                </div>

                {/* input row */}
                <div>
                  <div className="flex items-center gap-3 rounded-xl py-3">
                    <input
                      placeholder="Ask, search, or make anything..."
                      className="w-full bg-transparent placeholder-[#595959] placeholder:text-[13px] placeholder:font-semibold font-semibold text-[14px] focus:outline-none"
                    />
                  </div>
                </div>

                {/* footer row */}
                <div className="flex items-center justify-between gap-3 pt-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="rounded-full flex gap-1 text-[14px] cursor-pointer p-2 hover:bg-[#282828]"><svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" className="paperClip" style={{ width: "20px", height: "20px", display: "block", fill: "rgba(255,255,255,0.46)", flexShrink: 0 }}><path d="M10.184 3.64A3.475 3.475 0 0 1 15.1 8.554l-5.374 5.374a2.05 2.05 0 1 1-2.9-2.9l2.688-2.686a.625.625 0 0 1 .884.884L7.71 11.913a.8.8 0 0 0 1.13 1.131l5.375-5.374a2.225 2.225 0 1 0-3.147-3.146L5.694 9.898a3.65 3.65 0 1 0 5.162 5.161l4.702-4.702a.625.625 0 0 1 .884.884l-4.702 4.702a4.9 4.9 0 1 1-6.93-6.93z"></path></svg></div>
                    <div className="rounded-full flex gap-1 text-[14px] text-[#9f9b94] font-semibold cursor-pointer py-1 px-3 hover:bg-[#282828]">Auto</div>
                    <div className="rounded-full flex gap-1 text-[14px] text-[#9f9b94] font-semibold cursor-pointer py-1.5 px-2 hover:bg-[#282828]"><svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" className="eyeglasses" style={{ width: "20px", height: "20px", display: "block", fill: "rgb(168,164,156)", flexShrink: 0 }}><path fillRule="evenodd" d="M14.5 6.081c1.576 0 2.938.968 3.59 2.375H19a.625.625 0 0 1 0 1.25h-.543q.042.307.043.625c0 2.347-1.79 4.25-4 4.25s-4-1.903-4-4.25q.001-.547.124-1.056a1.53 1.53 0 0 0-1.249 0q.123.507.125 1.056c0 2.347-1.79 4.25-4 4.25s-4-1.903-4-4.25q0-.319.043-.625H1a.625.625 0 0 1 0-1.25h.91c.652-1.407 2.014-2.375 3.59-2.375 1.444 0 2.709.814 3.412 2.033a2.78 2.78 0 0 1 2.174 0c.703-1.22 1.97-2.033 3.414-2.033m-9 1.25c-1.448 0-2.75 1.27-2.75 3s1.302 3 2.75 3 2.75-1.27 2.75-3-1.302-3-2.75-3m9 0c-1.448 0-2.75 1.27-2.75 3s1.302 3 2.75 3 2.75-1.27 2.75-3-1.302-3-2.75-3" clipRule="evenodd"></path></svg>Reseach</div>
                    <div className="rounded-full flex gap-1 text-[14px] text-[#9f9b94] font-semibold cursor-pointer py-1.5 px-2 hover:bg-[#282828]"><svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" className="globe" style={{ width: "20px", height: "20px", display: "block", fill: "rgb(142,139,134)", flexShrink: 0 }}><path d="M10 2.375a7.625 7.625 0 1 1 0 15.25 7.625 7.625 0 0 1 0-15.25m-1.863 8.25c.054 1.559.31 2.937.681 3.943.212.572.449.992.68 1.256.232.266.404.318.502.318s.27-.052.502-.318c.231-.264.468-.684.68-1.256.371-1.006.627-2.384.681-3.943zm-4.48 0a6.38 6.38 0 0 0 4.509 5.48 6.5 6.5 0 0 1-.52-1.104c-.431-1.167-.704-2.697-.76-4.376zm9.456 0c-.055 1.679-.327 3.21-.758 4.376-.15.405-.324.779-.522 1.104a6.38 6.38 0 0 0 4.51-5.48zM8.166 3.894a6.38 6.38 0 0 0-4.51 5.481h3.23c.056-1.679.328-3.21.76-4.376.15-.405.322-.78.52-1.105M10 3.858c-.099 0-.27.053-.502.319-.231.264-.468.683-.68 1.255-.371 1.006-.627 2.384-.681 3.943h3.726c-.054-1.559-.31-2.937-.681-3.943-.212-.572-.449-.99-.68-1.255-.232-.266-.404-.319-.502-.319m1.833.036c.198.326.372.7.521 1.105.432 1.167.704 2.697.76 4.376h3.23a6.38 6.38 0 0 0-4.511-5.481"></path></svg>All sources</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recently visited */}
            <div className="mt-8">
              <div className="flex items-center justify-between pr-2">
                <div className="text-[12px] font-semibold flex gap-2 text-zinc-500"><svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 16 16" className="clockSmall" style={{ width: "14px", height: "14px", display: "block", fill: "rgba(255,255,255,0.46)", flexShrink: 0, margin: "auto 0" }}><path d="M8 3.955a.625.625 0 0 0-.625.625v2.795H5.12a.625.625 0 1 0 0 1.25H8c.345 0 .625-.28.625-.625V4.58A.625.625 0 0 0 8 3.955"></path><path d="M8 1.875a6.125 6.125 0 1 0 0 12.25 6.125 6.125 0 0 0 0-12.25M3.125 8a4.875 4.875 0 1 1 9.75 0 4.875 4.875 0 0 1-9.75 0"></path></svg>Recently visited</div>
              </div>
              <div className="mt-3 flex gap-4 justify-start w-full">
                <RecentlyCard title="New page" icon={PenSquare} />
                <RecentlyCard title="Journal" icon={BookOpenText} />
                <RecentlyCard title="New page" icon={Plus} />
              </div>
            </div>

            {/* Upcoming events */}
            <div className="mt-8">
              <div className="text-[12px] font-semibold flex gap-2 text-zinc-500 mb-3"><svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 16 16" className="viewCalendarSmall" style={{ width: "14px", height: "14px", display: "block", fill: "rgba(255,255,255,0.46)", flexShrink: 0, margin: "auto 0" }}><path d="M7.053 6.407a.643.643 0 1 0 0 1.286.643.643 0 0 0 0-1.286m1.894 0a.643.643 0 1 0 0 1.286.643.643 0 0 0 0-1.286m1.893 0a.643.643 0 1 0 0 1.286.643.643 0 0 0 0-1.286M5.159 8.3a.643.643 0 1 0 0 1.287.643.643 0 0 0 0-1.286M7.053 8.3a.643.643 0 1 0 0 1.287.643.643 0 0 0 0-1.286M8.947 8.3a.643.643 0 1 0 0 1.287.643.643 0 0 0 0-1.286M10.84 8.3a.643.643 0 1 0 0 1.287.643.643 0 0 0 0-1.286m-5.681 1.894a.643.643 0 1 0 0 1.286.643.643 0 0 0 0-1.286m1.894 0a.643.643 0 1 0 0 1.286.643.643 0 0 0 0-1.286m1.894 0a.643.643 0 1 0 0 1.286.643.643 0 0 0 0-1.286"></path><path d="M4.25 2.375c-1.036 0-1.875.84-1.875 1.875v7.5c0 1.036.84 1.875 1.875 1.875h7.5c1.036 0 1.875-.84 1.875-1.875v-7.5c0-1.036-.84-1.875-1.875-1.875zm-.625 9.375V5.632h8.75v6.118c0 .345-.28.625-.625.625h-7.5a.625.625 0 0 1-.625-.625"></path></svg>Upcoming events</div>
              <div className="overflow-hidden py-[34px] px-[24px] rounded-xl bg-[#202020]">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Left */}
                  <div className="border-b md:border-b-0 md:border-r border-[#383838]">
                    <div className="flex flex-wrap flex-col items-start gap-5">
                      <div className="h-[34px] w-full rounded-lg">
                        <svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 20 20" className="calendarDate25" style={{ width: "34px", height: "34px", display: "block", fill: "rgba(255,255,255,0.282)", flexShrink: 0, color: "rgba(255,255,255,0.13)" }}><path d="M5.61218 4.0799C4.73322 4.18671 4.02924 4.93207 3.97064 5.81104L3.96588 5.9032L3.96729 15.342L3.10266 15.3953H3.06824C2.85229 15.3841 2.65259 15.2995 2.49689 15.1501C2.32245 14.9828 2.22455 14.7541 2.21741 14.5035C2.21741 14.4936 2.21606 14.4837 2.21606 14.4731V4.13733C2.21606 3.25684 2.90002 2.52771 3.77881 2.47156L13.9657 1.82074C13.9833 1.81946 14.0008 1.81873 14.0183 1.81873C14.2174 1.81873 14.4028 1.89215 14.5449 2.02765C14.6442 2.12225 14.7142 2.24054 14.7517 2.37207C14.7679 2.42828 14.7777 2.48712 14.7816 2.5473L14.7817 3.49023L5.64923 4.07343L5.61218 4.0799ZM17.784 16.7507C17.784 16.7665 17.7827 16.7824 17.7814 16.7983C17.7587 17.1375 17.4935 17.4362 17.1673 17.4976C17.1608 17.4976 17.1543 17.4996 17.1478 17.4996L6.10248 18.1812H6.06805C5.85211 18.17 5.6524 18.0854 5.49677 17.936C5.32233 17.7687 5.22437 17.54 5.21722 17.2894C5.21722 17.2795 5.21588 17.2696 5.21588 17.259V6.07227C5.21588 6.05646 5.21588 6.0412 5.21722 6.02533C5.24121 5.66638 5.53564 5.35303 5.88715 5.31604C5.89624 5.31604 5.90533 5.31335 5.91443 5.31268L16.9655 4.60663C16.9831 4.60535 17.0006 4.60468 17.0181 4.60468C17.2172 4.60468 17.4026 4.67804 17.5447 4.8136C17.644 4.90814 17.714 5.02643 17.7516 5.15802C17.7678 5.21417 17.7775 5.27301 17.7814 5.33319L17.784 16.7507ZM16.5358 8.02374C16.5358 7.7887 16.3475 7.61896 16.1176 7.63098L6.90546 8.19415C6.67493 8.20618 6.46613 8.37146 6.46613 8.62994V16.1628C6.45618 16.6468 6.77686 16.7722 7.1391 16.7462L16.0001 16.2205L16.002 16.2199C16.468 16.2015 16.5358 15.8461 16.5358 15.57V8.02374ZM8.81613 10.4243C8.36725 10.4522 8.23229 10.809 8.25014 11.357C7.86902 11.468 7.58128 11.2246 7.58068 10.7105C7.58009 10.0312 8.17165 9.393 9.39106 9.317C10.4238 9.25288 11.136 9.86203 11.1372 10.698C11.1384 11.569 10.6818 12.2072 9.50581 13.378L8.87142 14.0097C10.048 13.9628 10.8275 13.853 11.1913 13.6042C11.3441 13.7426 11.4286 13.9468 11.4291 14.2081C11.4291 14.7394 10.8459 15.0808 10.2615 15.117C9.69428 15.1521 7.39992 15.2257 7.39992 15.2257L7.27212 14.737L8.38807 13.3175C9.14907 12.3467 9.53791 11.826 9.53731 11.2163C9.53731 10.7111 9.2561 10.397 8.81613 10.4243ZM13.453 15.006C12.3864 15.0808 11.6408 14.6831 11.6396 13.9866C11.6396 13.5597 11.9773 13.2166 12.4601 13.2385C12.5457 13.9391 13.0029 14.198 13.4774 14.1683C13.9262 14.1404 14.2728 13.8311 14.2722 13.3958C14.2717 12.6115 13.5261 12.2838 12.0701 12.5397L12.0665 9.27306L13.9375 9.15669C14.3864 9.12878 14.8014 9.07653 15.2075 8.97322C15.2836 9.09909 15.3347 9.27009 15.3347 9.45297C15.3347 9.96712 14.9464 10.4617 14.1587 10.5104C13.6337 10.543 13.1765 10.5104 12.7954 10.4736L12.7966 11.3707C14.6843 10.9569 15.7348 11.5274 15.7366 12.8603C15.7467 14.1754 14.8923 14.917 13.453 15.006Z"></path></svg>
                      </div>
                      <div>
                        <div className="w-50 text-[16px] mb-2 font-semibold text-sm text-white/30">
                          Connect AI Meeting Notes with your Calendar events
                        </div>
                        <p className=" text-[13px] font-meduim leading-relaxed text-white/30 max-w-[275px]">
                          Join calls, transcribe audio, and summarize meetings all in Notion.
                        </p>
                      </div>
                      <button className=" cursor-pointer rounded-lg text-sm text-[#3985D3]">
                        Connect Notion Calendar
                      </button>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="pl-[24px] flex flex-col flex-wrap gap-5 h-fit my-auto">
                    {/* Today */}
                    <div className="flex items-start justify-start ">
                      <div className="text-xs font-semibold text-white/30 mr-9">
                        <div>Today</div>
                        <div className="mt-1">Aug 25</div>
                      </div>
                      <span className="w-1 self-stretch rounded-full bg-white/10 mr-3" />
                      <div className="text-left text-sm text-white/30">
                        <div className="font-semibold">Team standup</div>
                        <div>9 AM · Office</div>
                        <button className="mt-2 inline-flex text-white/30 items-center gap-1 rounded-md bg-[#303030] px-2 py-0.5 text-sm">
                          <svg aria-hidden="true" role="graphics-symbol" viewBox="0 0 13 9" className="zoomLogo" style={{ width: "16px", height: "16px", display: "block", fill: "#ffffff48", flexShrink: 0, marginInlineEnd: "4px" }}><path d="M1.94727 8.49316C1.42318 8.49316 1.01628 8.35645 0.726562 8.08301C0.440104 7.81283 0.296875 7.41895 0.296875 6.90137V2.07227C0.296875 1.55794 0.444987 1.16081 0.741211 0.880859C1.04069 0.597656 1.44271 0.456055 1.94727 0.456055H7.13281C7.6569 0.456055 8.05566 0.597656 8.3291 0.880859C8.60579 1.16081 8.74414 1.55794 8.74414 2.07227V6.87695C8.74414 7.39128 8.59928 7.78841 8.30957 8.06836C8.02311 8.35156 7.61784 8.49316 7.09375 8.49316H1.94727ZM9.45703 6.03223V2.93164L11.1367 1.49121C11.2376 1.40332 11.3385 1.33496 11.4395 1.28613C11.5436 1.23405 11.6462 1.20801 11.7471 1.20801C11.9456 1.20801 12.1068 1.27311 12.2305 1.40332C12.3542 1.53027 12.416 1.70117 12.416 1.91602V7.05273C12.416 7.26758 12.3542 7.4401 12.2305 7.57031C12.1068 7.70052 11.9456 7.76562 11.7471 7.76562C11.6462 7.76562 11.5436 7.73958 11.4395 7.6875C11.3353 7.63542 11.2344 7.56706 11.1367 7.48242L9.45703 6.03223Z"></path></svg> Join and take notes
                        </button>
                      </div>
                    </div>

                    {/* Tue */}
                    <div className="flex items-start justify-start ">
                      <div className="text-xs font-semibold text-white/30 mr-9">
                        <div>Tue</div>
                        <div className="mt-1">Aug 26</div>
                      </div>
                      <span className="w-1 text-sm self-stretch rounded-full bg-white/10 mr-3" />
                      <div className="text-left text-white/30">
                        <div className="font-semibold">Project check-in</div>
                        <div>10 AM · Office</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

