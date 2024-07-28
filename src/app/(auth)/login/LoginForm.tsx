'use client'
import { PasswordInput } from "@/components/cUi/paswordInput";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema, LoginValues } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { login } from "./actions";
import LoadingButton from "@/components/cUi/loadingButton";

export default function LoginForm() {
    const [error,setError] = useState<string>()
    const [isPending, startTransition] = useTransition()
    const form = useForm<LoginValues>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          username: "",
          password: "",
        },
      });
    const onSubmit = (values: LoginValues)=>{
        setError(undefined)
        startTransition(async()=>{
            const {error, ...rest} = await login(values);
            if(error) setError(error);
        })
    }
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
              <Input type="text" placeholder="Username" {...field}/>
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
              {/* <Input type="password" placeholder="password" {...field} /> */}
              <PasswordInput type="password" placeholder="password" {...field}/>
            </FormControl>
            {/* <FormDescription /> */}
            <FormMessage />
          </FormItem>
        )}
      />
      <LoadingButton type="submit" className="w-full" loading={isPending}>Log in</LoadingButton>
    </form>
  </Form>
  )
}
