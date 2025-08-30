import { Skeleton } from "@/components/ui/skeleton";

const PageLoading = () => {
  return (
    <div className="space-y-1">
      {[1, 2, 3, 4].map((index) => (
        <div className="w-full" key={index}>
          <div className="flex items-center gap-1.5 mb-0.5 px-2 w-full ml-3 py-[5px] rounded-md">
            <Skeleton className="w-[18px] h-[18px] rounded-md bg-skeleton" />
            <Skeleton className="w-[100px] h-[18px] bg-skeleton rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default PageLoading;
