import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("123456"),
      roles: ["user", "admin", "super-user"],
      todos: {
        create: [
          {
            description: "Piedra del Alma",
            complete: true,
          },
          {
            description: "Piedra del Poder",
          },
          {
            description: "Piedra del Espacio",
          },
          {
            description: "Piedra de la Mente",
          },
          {
            description: "Piedra de la realidad",
          },
        ],
      },
    },
  });
  return NextResponse.json({ message: "Seed Executed", data: { user } });
}
