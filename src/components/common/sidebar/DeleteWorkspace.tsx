import CustomDialog from "@/components/custom/CustomDialog";
import { Button } from "@/components/ui/button";
import { Workspace } from "@/generated/prisma";
import { deleteWorkspace } from "@/lib/actions/workspaces.action";
import { CircleAlert, Trash } from "lucide-react";
import { SetStateAction, useState } from "react";
import { toast } from "sonner";

const DeleteWorkspace = ({
  id,
  setWorkspaces,
}: {
  id: string;
  setWorkspaces: React.Dispatch<SetStateAction<Workspace[]>>;
}) => {
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    setWorkspaces((prev) => prev.filter((workspace) => workspace.id !== id));
    toast.promise(deleteWorkspace(id), {
      success: "Workspace deleted successfully!",
      error: "Failed to delete workspace.",
      loading: "Deleting workspace...",
    });
    setOpen(false);
  };
  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Trash size={16} className="text-white/50 group-hover:block hidden" />
      }
    >
      <div className="flex flex-1 justify-center items-start flex-wrap">
        <CircleAlert size={86} color="red" />
        <h1 className="mt-3 text-title text-2xl w-full text-center">
          This action is irreversible.{" "}
        </h1>
        <h2 className="text-surface text-base">
          Are you sure you want to continue?
        </h2>
        <div className="mt-5 flex w-full items-center justify-center gap-2">
          <Button variant="outline" className="cursor-pointer">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="text-black bg-white cursor-pointer"
          >
            Continue
          </Button>
        </div>
      </div>
    </CustomDialog>
  );
};
export default DeleteWorkspace;
