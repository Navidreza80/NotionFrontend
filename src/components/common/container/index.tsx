import Sidebar from "../sidebar";

const Container = ({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: string;
}) => {
  return (
    <div className="h-screen w-full bg-[#191919] text-[#ffffffcf] flex">
      {/* Sidebar */}
      {isOpen === "true" && <Sidebar />}

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
};
export default Container;
