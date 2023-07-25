"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/Button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface GitHubSignInButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default function GitHubSignInButton({
  className,
  ...props
}: GitHubSignInButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGitHub = async () => {
    setIsLoading(true);

    try {
      await signIn("github");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with GitHub",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button
        variant="secondary"
        type="button"
        size="sm"
        className="w-full"
        onClick={loginWithGitHub}
        disabled={isLoading}
      >
        {isLoading ? null : <Icons.gitHub className="h-4 w-4 mr-2" />}
        GitHub
      </Button>
    </div>
  );
}
