"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { RegisterRequest, RegisterValidator } from "@/lib/validators/userAuth";
import { Icons } from "@/components/Icons";
import { toast } from "./ui/use-toast";
import { signIn } from "next-auth/react";

export default function UseRegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterRequest) {
    try {
      setIsLoading(true);
      const body = { ...values };
      const registerRes = await fetch("api/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const res = await registerRes.json();
      console.log("res", res);
      if (res.user) {
        toast({
          variant: "success",
          title: "Registration Success",
          description: "Your user account is ready to use",
        });
        form.reset();
        router.push(
          `${searchParams.has("callbackUrl") ? `${searchParams.get("callbackUrl")}` : "/"}`
        );
      } else {
        toast({
          variant: "destructive",
          title: "Registration Account Error",
          description: `${res.error}`,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
                <Input placeholder="admin@com" type="email" {...field} disabled={isLoading} />
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
                <Input placeholder="*****" type="password" {...field} disabled={isLoading} />
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
          Register
        </Button>
      </form>
    </Form>
  );
}
