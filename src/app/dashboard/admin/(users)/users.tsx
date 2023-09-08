"use server";

import { prisma } from "@/lib/database";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export async function UsersPage() {
  const users = await prisma.user.findMany();
  return <DataTable columns={columns} data={users} />;
}
