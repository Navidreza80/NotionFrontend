"use client";

import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { SetStateAction } from "react";

const ExpandPage = ({
  isCurrentPage,
  isCurrentPageOptimistic,
  setIsCurrentPageOptimistic,
  id,
}: {
  isCurrentPage: boolean;
  id: string;
  isCurrentPageOptimistic: boolean;
  setIsCurrentPageOptimistic: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    router.push(`?${params.toString()}`);
  };
  return (
    <ChevronRight
    size={16}
      onClick={() => {
        setIsCurrentPageOptimistic((prev) => !prev);
        setParams("expandedPageId", !isCurrentPage ? id : "");
      }}
      className={` hidden group-hover:block transition-all duration-300 ${
        isCurrentPageOptimistic && "rotate-90"
      }`}
    />
  );
};
export default ExpandPage;
