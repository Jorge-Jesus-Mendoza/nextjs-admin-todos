import { Todo } from "@prisma/client";

export const updateTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  // TODO:
  // await sleep(2);

  const body = { complete };

  const todo = await fetch(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  console.log({ todo });

  return todo;
};

export const createTodo = async (description: string): Promise<Todo> => {
  // TODO:
  // await sleep(2);

  const body = { description };

  const todo = await fetch(`/api/todos`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  console.log({ todo });

  return todo;
};

export const deleteCompletedTodos = async (): Promise<Todo> => {
  // TODO:
  // await sleep(2);

  const todos = await fetch(`/api/todos`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  console.log({ todos });

  return todos;
};
