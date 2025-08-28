import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex items-center justify-between gap-2 px-3 pt-3 pb-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-5 rounded bg-skeleton" />
        <Skeleton className="w-[120px] bg-skeleton h-[15px]" />
      </div>
      <div className="flex gap-2 items-center">
        {[1, 2].map((index) => (
          <Skeleton key={index} className="rounded p-1 w-6 h-6 bg-skeleton" />
        ))}
      </div>
    </div>
  );
};
export default Loading;
