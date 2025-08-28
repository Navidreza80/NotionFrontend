import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="p-4 rounded-lg border-border border flex items-center"
        >
          <Skeleton className="w-14 h-14 rounded-md flex items-center mr-4 border border-border bg-skeleton" />
          <div className="flex-grow">
            <Skeleton className="w-[150px] h-[20px] bg-skeleton" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Loading;
