"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

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
import { useRouter } from "next/navigation";
import { updateContactInfo } from "../_actions/update-contact-action";
import { Session } from "next-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const contactInfoSchema = z.object({
  email: z.string().min(2).max(64),
  phone: z.string().min(2).max(64),
});

export function ContactInfo({ session }: { session: Session }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof contactInfoSchema>>({
    //@ts-ignore
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      email: "" + session.user.email,
      phone: "" + session.user.phone_number,
    },
  });

  async function onSubmit(values: z.infer<typeof contactInfoSchema>) {
    await updateContactInfo(values.email, values.phone);
    toast({
      title: "Updated",
      description: "You have successfully changed your personal information",
      variant: "default",
    });
    router.refresh();
  }

  return (
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size={"sm"}>
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
  );
}
