export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUserServerSession } from "@/auth/components/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";
import { redirect } from "next/navigation";

export const metadata = {
  title: "SEO Title",
  description: "SEO Title",
};

export default async function RestTodosPage() {
  const user = await getUserServerSession();

  if (!user) {
    redirect("/api/auth/signin");
  }
  const todos = await prisma.todo.findMany({
    orderBy: { description: "asc" },
    where: { userId: user?.id },
  });
  return (
    <div>
      <div className="w-full px-3 mb-5 mx-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
