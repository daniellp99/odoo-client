"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function UseLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  // 1. Define your form.
  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginRequest) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await signIn("credentials", {
      ...values,
      redirect: false,
    }).then((response) => {
      if (response?.error) {
        // show notification for user
        console.log(response);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: `${
            response.error !== "CredentialsSignin" ? response.error : "Invalid Password"
          }`,
        });
      } else {
        form.reset();
        router.push(`${searchParams.has("callbackUrl") ? `${callbackUrl}` : "/"}`);
      }
    });
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
                <Input placeholder="admin@com" {...field} />
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
                <Input placeholder="*****" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"secondary"} className="text-background w-full" type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
}
