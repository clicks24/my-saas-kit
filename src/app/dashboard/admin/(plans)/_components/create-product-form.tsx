"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plan } from "@prisma/client";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createPlan, deletePlan, editPlan } from "../_actions/plan-actions";

export const productSchema = z.object({
  name: z.string().min(2).max(64),
  description: z.string().min(2).max(255),
  monthly_price: z.string().min(2).max(64),
  yearly_price: z.string().min(2).max(64),
  features: z.string().min(2),
});

export function CreateProductForm() {
  const form = useForm<z.infer<typeof productSchema>>({
    //@ts-ignore
    resolver: zodResolver(productSchema),
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof productSchema>) {
    await createPlan(values);
    toast({
      title: "Created plan",
      description: "Created plan " + values.name,
    });
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-6">
          <FormField
            control={form.control}
            name="monthly_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Price ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The ID of the monthly price ID created in stripe.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearly_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yearly Price ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The ID of the yearly price ID created in stripe.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Features</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Features list, each feature seperated by a comma.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}

export function EditProductForm({ plan }: { plan: Plan }) {
  const form = useForm<z.infer<typeof productSchema>>({
    //@ts-ignore
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: plan.name,
      description: plan.description,
      monthly_price: plan.stripe_price_monthly_id,
      yearly_price: plan.stripe_price_yearly_id,
      features: plan.features,
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof productSchema>) {
    await editPlan(plan.id, values);
    toast({
      title: "Updated plan",
      description: "Updated plan " + values.name,
    });
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-6">
          <FormField
            control={form.control}
            name="monthly_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Price ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The ID of the monthly price ID created in stripe.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearly_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Yearly Price ID</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  The ID of the yearly price ID created in stripe.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="features"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Features</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Features list, each feature seperated by a comma.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}

export function DeleteForm({ id }: { id: string }) {
  return (
    <Button onClick={() => deletePlan(id)} variant="destructive" size={"xs"}>
      Delete
    </Button>
  );
}
