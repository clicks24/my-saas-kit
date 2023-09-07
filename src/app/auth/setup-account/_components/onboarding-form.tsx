"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { completeOnboarding } from "../_actions/complete-onboarding-action";

import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GradientBorder } from "@/components/ui/gradient-border";
import { Hand } from "lucide-react";
import { useRouter } from "next/navigation";

const onboardingSchema = z.object({
  name: z.string().min(2).max(64),
  last_name: z.string().min(2).max(64),
});

export function OnboardingForm({ user }: { user: User }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof onboardingSchema>>({
    //@ts-ignore
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: "" + user.name,
      last_name: "" + user.last_name,
    },
  });

  async function onSubmit(values: z.infer<typeof onboardingSchema>) {
    await completeOnboarding(values.name, values.last_name);
    toast({
      title: "Updated",
      description: "You have successfully changed your personal information",
      variant: "default",
    });
    router.push("/dashboard");
  }

  return (
    <div className="flex flex-col gap-8 max-w-lg m-auto w-full ">
      <GradientBorder className="rounded-full w-fit dark:bg-black bg-white">
        <div className="w-10 h-10 shrink-0 grid place-items-center">
          <Hand size={18} />
        </div>
      </GradientBorder>
  
      <h1 className="font-medium text-lg">
        Finish setting up your account
      </h1>
      <div className="flex items-center gap-8">
        <img src={"" + user.image} className="w-20 h-20 rounded-md" />
        <div className="rounded-md dark:border-zinc-800 border-zinc-200 border border-dashed px-6 py-4 text-sm">
          <UploadButton
            endpoint="profilePictureUploader"
            onClientUploadComplete={(res) => {
              toast({
                title: "Profile picture changed",
                description: "You now have a new profile picture",
                variant: "default",
              });
            }}
            onUploadError={(error: Error) => {
              toast({
                title: "Error",
                description: "There was an error chaning your profile picture",
                variant: "destructive",
              });
            }}
          />
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" size={"sm"}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
