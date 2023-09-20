"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { toast } from "@/components/ui/use-toast";
import { versions } from "@/lib/utils";
import {
  OdooSessionRequest,
  OdooSessionTestRequest,
  OdooSessionValidator,
} from "@/lib/validators/odooSessionsSchema";
import { Icons } from "./Icons";

export default function CreateConnectionForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isTested, setIsTested] = useState<boolean>(false);

  const form = useForm<OdooSessionRequest>({
    resolver: zodResolver(OdooSessionValidator),
    defaultValues: {
      url: "",
      port: "",
      db: "",
      username: "",
      password: "",
      odooVersion: "ODOO_16",
    },
  });

  async function onTest(values: OdooSessionTestRequest) {
    try {
      setIsLoading(true);
      const body = { ...values };
      const testRes = await fetch("api/connection/test", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const res = await testRes.json();
      if (res.test) {
        toast({
          variant: "success",
          title: "Valid Connection",
          description:
            "Your can create this values into a new connection safety",
        });
        setIsTested(true);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid Connection",
          description: `${res.error}`,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(values: OdooSessionRequest) {
    try {
      setIsLoading(true);
      const body = { ...values };
      const createRes = await fetch("api/connection/create", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      const res = await createRes.json();
      if (res.connection) {
        toast({
          variant: "success",
          title: "Connection Created",
          description: "You are available to use your newly odoo session",
        });
        form.reset();
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Create Connection Error",
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
        <div className="grid grid-cols-2 grid-rows-3 gap-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain</FormLabel>
                <FormControl>
                  <Input
                    placeholder="http://localhost"
                    type="url"
                    {...field}
                    disabled={isLoading || isTested}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="port"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Port</FormLabel>
                <FormControl>
                  <Input
                    placeholder="8080"
                    type="number"
                    {...field}
                    disabled={isLoading || isTested}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="db"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Database</FormLabel>
                <FormControl>
                  <Input
                    placeholder="odoo"
                    type="text"
                    {...field}
                    disabled={isLoading || isTested}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="admin"
                    type="text"
                    {...field}
                    disabled={isLoading || isTested}
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
                    placeholder="******"
                    type="password"
                    {...field}
                    disabled={isLoading || isTested}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="odooVersion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Odoo version</FormLabel>
                <Select
                  {...field}
                  onValueChange={(value) => field.onChange(value as any)}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="ODOO_16" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {versions.map((version) => (
                      <SelectItem key={version.value} value={version.value}>
                        {version.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
          <Button
            variant={isTested ? "success" : "warning"}
            className="text-background"
            type="button"
            onClick={() => onTest(form.getValues())}
            disabled={isLoading || isTested}
          >
            {" "}
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Test
          </Button>
          <Button
            variant="secondary"
            className="text-background"
            type="submit"
            disabled={isLoading || !isTested}
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
}
