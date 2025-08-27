import Sidebar from "@/components/common/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="max-h-screen flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </main>
  );
};
export default Layout;
