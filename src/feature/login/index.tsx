import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import Image from "next/image";

export function LoginForm({ className }: React.ComponentProps<"div">) {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("resend", formData);
      }}
      className={cn("flex flex-col gap-6", className)}
    >
      <Card className="overflow-hidden p-0 bg-card border-border">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Good to see you!</h1>
                <p className="text-surface text-balance">
                  Sign in using one of these options.
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  className="border-border"
                />
              </div>
              <Button type="submit" className="w-full bg-button cursor-pointer">
                Sign in
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={async () => {
                    "use server";
                    await signIn("google", { redirectTo: "/" });
                  }}
                  variant="outline"
                  type="button"
                  className="w-full border-border cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
                <Button
                  onClick={async () => {
                    "use server";
                    await signIn("github", { redirectTo: "/" });
                  }}
                  variant="outline"
                  type="button"
                  className="w-full border-border cursor-pointer"
                >
                  <Github />
                  <span className="sr-only">Login with GitHub</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-white relative hidden md:flex items-center justify-center">
            <Image
              width={200}
              height={200}
              src="/notion_logo.png"
              alt="Image"
              className="absolute dark:brightness-[0.2] dark:grayscale h-[300px] w-full"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-surface *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </form>
  );
}
