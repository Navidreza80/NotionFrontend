"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspace } from "@/lib/actions/workspaces.action";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(15, { message: "Name is too long" }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (values: FormValues): Promise<void> => {
    await createWorkspace(values);
    reset();
    redirect("/");
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <div className="rounded border border-[#383838] p-6">
          <h1 className="text-2xl font-bold mb-1">Create Workspace</h1>
          <p className="text-sm text-[#ffffffcf] mb-6">
            Create your workspace by filling out the form below.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
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
              {isSubmitting ? "Submitting…" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
