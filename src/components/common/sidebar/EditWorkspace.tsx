"use client";

import CustomDialog from "@/components/custom/CustomDialog";
import { Workspace } from "@/generated/prisma";
import { editWorkspace } from "@/lib/actions/workspaces.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Loader } from "lucide-react";
import { SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(15, { message: "Name is too long" }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function EditWorkspace({
  id,
  name,
  setWorkspaces,
}: {
  id: string;
  name: string;
  setWorkspaces: React.Dispatch<SetStateAction<Workspace[]>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: name },
    mode: "onSubmit",
  });

  const [open, setOpen] = useState(false);

  const onSubmit = async (values: FormValues): Promise<void> => {
    setWorkspaces((prev) =>
      prev.map((item) =>
        item.id == id ? { ...item, name: values.name } : item
      )
    );
    toast.promise(editWorkspace(values, id), {
      success: "Workspace edited successfully",
      error: "Failed to edit workspace",
      loading: "Editing workspace...",
    });
    setOpen(false);
  };

  return (
    <CustomDialog
      open={open}
      onOpenChange={setOpen}
      title="Edit workspace"
      trigger={
        <Edit size={16} className="text-white/50 group-hover:block hidden" />
      }
    >
      <main className="flex items-center justify-center px-0">
        <div className="w-full max-w-md">
          <div className="rounded">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full rounded-sm border px-3 py-2 outline-none border-[#383838]"
                  placeholder="My Workspace"
                  {...register("name")}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full justify-center gap-2 text-zinc-500 cursor-pointer border border-[#383838] px-2 py-1 rounded-md"
              >
                {isSubmitting ? <Loader className="animate-spin" /> : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </CustomDialog>
  );
}
