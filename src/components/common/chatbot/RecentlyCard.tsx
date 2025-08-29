export const RecentlyCard = ({ title, icon: Icon }) => (
  <div className="w-full sm:w-[124px] h-[118px] overflow-hidden flex items-center justify-center rounded-xl relative border hover:border-[#383838] border-transparent bg-[#2a2a2a] transition shadow-sm cursor-pointer">
    <div className="absolute top-[28%] ml-5 w-full">
      <div className="h-5 w-5 rounded-md bg-zinc-800 grid place-items-center">
        <Icon size={24} className="text-zinc-400" />
      </div>
    </div>
    <div className="h-[63%] w-full bg-[#202020]/60 absolute flex items-center px-4 bottom-0 ">
      <div className="text-[14px] font-semibold text-zinc-200">{title}</div>
    </div>
  </div>
);