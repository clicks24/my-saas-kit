"use server";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { prisma } from "@/lib/database";
import {
  CreateProductForm,
  DeleteForm,
  EditProductForm,
} from "./_components/create-product-form";

import { AlertTriangle } from "lucide-react";

export async function PlansPage({}) {
  const plans = await prisma.plan.findMany();

  return (
    <main>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mb-4">
            Create
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create plan</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4">
            <CreateProductForm />
          </div>
        </DialogContent>
      </Dialog>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className="font-medium">{plan.name}</TableCell>
                <TableCell className="truncate">{plan.description}</TableCell>
                <TableCell>
                  <div className="flex flex-row items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Edit</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit plan</DialogTitle>
                        </DialogHeader>
                        <div className="px-4 pb-4">
                          <EditProductForm plan={plan} />
                        </div>
                      </DialogContent>
                    </Dialog>
                    <DeleteForm id={plan.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {plans.length == 0 && (
          <div className="grid place-items-center px-4 py-10">
            <div className="flex items-center gap-4">
              <AlertTriangle />
              <p className="text-sm">
                There are no available subscription plans yet!
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
