"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import UserLoginForm from "@/components/UserLoginForm";
import UserRegisterForm from "@/components/UserRegisterForm";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function SignInPage() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link href="/" className={cn(buttonVariants({ variant: "ghost" }), "self-start -mt-10")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {isLoginForm ? "Login to your account" : "Create an account"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLoginForm
                  ? "Provide credentials to continue"
                  : "Enter your email below to create your account"}
              </p>
            </div>
            {isLoginForm ? <UserLoginForm /> : <UserRegisterForm />}
            <p className="px-8 text-center text-sm text-muted-foreground">
              {isLoginForm
                ? "First time to Odoo Client, please "
                : "Already have an account, please "}
              <a
                className="underline underline-offset-4 hover:text-secondary"
                onClick={() => setIsLoginForm(!isLoginForm)}
              >
                {isLoginForm ? "Register" : "Login"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
