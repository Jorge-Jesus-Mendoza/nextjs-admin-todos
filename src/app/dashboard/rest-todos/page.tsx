import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos";

export const metadata = {
  title: "SEO Title",
  description: "SEO Title",
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });
  return (
    <div>
      <div className="w-full px-3 mb-5 mx-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
