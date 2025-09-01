"use state";

import { updatePageById } from "@/lib/actions/page.action";
import { Bookmark, FileText } from "lucide-react";
import { SetStateAction } from "react";
import { toast } from "sonner";

const RenamePage = ({
  id,
  optimisticPageName,
  setOptimisticPageName,
}: {
  id: string;
  optimisticPageName: string;
  setOptimisticPageName: React.Dispatch<SetStateAction<string>>;
}) => {
  const handleSave = async () => {
    toast.promise(updatePageById(id, { title: optimisticPageName }), {
      success: "Page updated successfully!",
      error: "Error updating page.",
      loading: "Updating page tile...",
    });
  };
  return (
    <div className="p-2 bg-card text-[13px] text-white/50 rounded-lg flex w-full items-center gap-1.5">
      <span className="bg-surface/30 p-1 rounded">
        <FileText size={16} />
      </span>

      <input
        type="text"
        className="w-full outline-0 p-1 bg-surface/20 rounded"
        value={optimisticPageName}
        onChange={(e) => setOptimisticPageName(e.target.value)}
      />
      <span
        onClick={handleSave}
        className="p-1.5 rounded-full border-border border hover:bg-background/80 cursor-pointer"
      >
        <Bookmark size={16} />
      </span>
    </div>
  );
};
export default RenamePage;
