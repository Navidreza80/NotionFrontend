import { ChevronsLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const CloseSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    router.push(`?${params.toString()}`);
  };
  return (
    <ChevronsLeft
      onClick={() => setParams("isOpen", "false")}
      size={32}
      className="text-zinc-400"
    />
  );
};
export default CloseSidebar;
