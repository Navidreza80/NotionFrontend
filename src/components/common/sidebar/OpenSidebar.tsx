"use client";

import { ChevronsRight, Menu } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const OpenSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("isOpen");

  const setParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    router.push(`?${params.toString()}`);
  };
  return (
    isOpen !== "true" && (
      <button
        className="cursor-pointer rounded-md group hover:bg-zinc-800 p-1 transition-all duration-200"
        onClick={() => setParams("isOpen", "true")}
      >
        <Menu
          size={22}
          color="white"
          className="text-title group-hover:hidden block"
        />
        <ChevronsRight
          size={22}
          color="white"
          className="text-title group-hover:block hidden"
        />
      </button>
    )
  );
};
export default OpenSidebar;
