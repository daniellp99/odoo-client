"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { RegisterRequest, RegisterValidator } from "@/lib/validators/userAuth";

export default function UseRegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<RegisterRequest>({
    resolver: zodResolver(RegisterValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterRequest) {
    try {
      const body = { ...values };
      const res = await fetch("api/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      form.reset();
      router.push(`sign-in${callbackUrl ? `?callbackUrl=${callbackUrl}` : ""}`);
    } catch (error) {
      console.error(error);
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
          Register
        </Button>
      </form>
    </Form>
  );
}
