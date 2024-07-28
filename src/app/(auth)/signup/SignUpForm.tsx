"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpValues } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/cUi/paswordInput";
import { useState, useTransition } from "react";
import { signUp } from "./actions";
import LoadingButton from "@/components/cUi/loadingButton";

export default function SignUpForm() {
    const [error, setError] = useState<string>();
    const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: SignUpValues) => {
    setError(undefined)
    startTransition(async () => {
        const { error } = await signUp(values);
        if (error) setError(error);
      });
  };
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-left space-y-3 p-4">
      {error && <p className="text-center text-destructive">{error}</p>}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="username" {...field}/>
              </FormControl>
              {/* <FormDescription /> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email" {...field}/>
              </FormControl>
              {/* <FormDescription /> */}
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
                <PasswordInput type="password" placeholder="password" {...field} />
              </FormControl>
              {/* <FormDescription /> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton type="submit" className="w-full" loading={isPending}>Sign in</LoadingButton>
      </form>
    </Form>
  );
}
