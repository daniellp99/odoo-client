"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { toast } from "@/components/ui/use-toast";
import { LoginRequest, LoginValidator } from "@/lib/validators/userAuth";
import { Icons } from "./Icons";

export default function UseLoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginRequest) {
    setIsLoading(true);
    await signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((response) => {
        if (response?.error) {
          toast({
            variant: "destructive",
            title: "Something went wrong",
            description: `${
              response.error !== "CredentialsSignin"
                ? response.error
                : "Invalid Password"
            }`,
          });
        } else {
          form.reset();
          router.push(
            `${
              searchParams.has("callbackUrl")
                ? `${searchParams.get("callbackUrl")}`
                : "/"
            }`
          );
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container mx-auto flex flex-col justify-center space-y-6 sm:w-[400px]"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="admin@com"
                  type="email"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="*****"
                  type="password"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant={"secondary"}
          className="text-background w-full"
          type="submit"
          disabled={isLoading}
        >
          {" "}
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Login
        </Button>
      </form>
    </Form>
  );
}
