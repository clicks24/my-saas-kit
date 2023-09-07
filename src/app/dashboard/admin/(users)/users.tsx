"use server";

import { prisma } from "@/lib/database";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

export async function UsersPage() {
  const users = await prisma.user.findMany();
  return (
    <main>
      <h1 className="font-display text-2xl pb-6">Users</h1>
      <DataTable columns={columns} data={users} />
    </main>
  );
}
