export const dynamic = "force-dynamic";
export const revalidate = 0;

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserServerSession } from "@/auth/components/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "SEO Title",
  description: "SEO Title",
};

export default async function ServerTodosPage() {
  const user = await getUserServerSession();

  if (!user) {
    redirect("/api/auth/signin");
  }

  const todos = await prisma.todo.findMany({
    where: { userId: user?.id },
    orderBy: { description: "asc" },
  });

  return (
    <>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-3 mb-5 mx-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
