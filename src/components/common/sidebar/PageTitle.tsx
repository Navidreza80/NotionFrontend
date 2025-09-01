import CustomPopover from "@/components/custom/CustomPopover";
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react";
import Link from "next/link";
import PageIcon from "../svg/PageIcon";
import RenamePage from "./RenamePage";
import { SetStateAction, useState } from "react";
import { createPage, deletePageById } from "@/lib/actions/page.action";
import { Page } from "@/generated/prisma";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CustomDialog from "@/components/custom/CustomDialog";
import ExpandPage from "./ExpandPage";

const PageTitle = ({
  id,
  isCurrentPage,
  setPages,
  label,
  setIsCurrentPageOptimistic,
  isCurrentPageOptimistic,
  expandable = true,
  create = true,
}: {
  id: string;
  setPages: React.Dispatch<SetStateAction<Page[]>>;
  label: string;
  setIsCurrentPageOptimistic?: React.Dispatch<SetStateAction<boolean>>;
  isCurrentPageOptimistic?: boolean;
  isCurrentPage?: boolean;
  expandable?: boolean;
  create?: boolean;
}) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [optimisticPageName, setOptimisticPageName] = useState(label);

  const createSubPage = async () => {
    const createdPage: Page = await createPage({ title, parentPageId: id });
    router.push(`/pages/${createdPage.id}`);
  };

  const handleDeletePage = () => {
    setPages((prev: Page[]) => prev.filter((item) => item.id !== id));
    toast.promise(deletePageById(id), {
      success: "Page deleted successfully!",
      error: "Error deleting page.",
      loading: "Deleting page...",
    });
  };
  return (
    <div className="flex items-center justify-between gap-1.5 mb-0.5 px-2 py-[5px] rounded-md text-sm cursor-pointer select-none group relative z-0 text-white/50 hover:bg-zinc-800/70 hover:text-white/60">
      <div className="flex items-center gap-1.5">
        <span className="text-white/30 w-5 h-5 flex items-center justify-center rounded hover:bg-zinc-700/80 transition-all duration-300 relative z-10">
          <PageIcon className={`block ${expandable && "group-hover:hidden"}`} />
          {expandable && (
            <ExpandPage
              isCurrentPageOptimistic={isCurrentPageOptimistic}
              setIsCurrentPageOptimistic={setIsCurrentPageOptimistic}
              id={id}
              isCurrentPage={isCurrentPage}
            />
          )}
        </span>
        <Link
          href={"/pages/" + id}
          className="truncate text-[15px] font-semibold"
        >
          {optimisticPageName}
        </Link>
      </div>

      <div className="flex gap-x-1 items-center">
        <CustomPopover
          className="p-0 border-border rounded-lg"
          trigger={
            <span className=" w-5 h-5 flex items-center justify-center rounded hover:bg-zinc-700/80 transition-all duration-300">
              <MoreHorizontal
                size={16}
                className="hidden group-hover:block transition-all duration-300"
              />
            </span>
          }
        >
          <div className="p-2 bg-card text-[13px] text-white/50 rounded-lg">
            <CustomPopover
              className="p-0 border-border rounded-lg w-full"
              trigger={
                <div className="flex w-full gap-1.5 items-center rounded-md p-1 hover:bg-surface/30 transition-all duration-200 cursor-pointer">
                  <Edit size={16} />
                  <span className=" font-semibold">Rename</span>
                </div>
              }
            >
              <RenamePage
                id={id}
                optimisticPageName={optimisticPageName}
                setOptimisticPageName={setOptimisticPageName}
              />
            </CustomPopover>

            <div
              onClick={handleDeletePage}
              className="flex w-full gap-1.5 items-center rounded-md p-1 hover:bg-surface/30 transition-all duration-200 cursor-pointer"
            >
              <Trash size={16} />
              <span className=" font-semibold">Delete</span>
            </div>
          </div>
        </CustomPopover>

        {create && (
          <CustomDialog
            trigger={
              <span className=" w-5 h-5 flex items-center justify-center rounded hover:bg-zinc-700/80 transition-all duration-300">
                <Plus
                  size={16}
                  className="hidden group-hover:block transition-all duration-300"
                />
              </span>
            }
          >
            <div className="flex flex-col space-y-1 items-center">
              <h4 className="text-title text-left w-full">Title</h4>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="w-full bg-background rounded-md border border-border p-1.5 outline-0"
              />
              <button
                onClick={createSubPage}
                className="w-full mt-2 p-1.5 flex items-center justify-center bg-title hover:bg-title/80 cursor-pointer active:bg-title transition-all duration-200 text-background font-semibold rounded-md"
              >
                Create
              </button>
            </div>
          </CustomDialog>
        )}
      </div>
    </div>
  );
};
export default PageTitle;
