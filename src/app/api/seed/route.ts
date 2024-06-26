import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
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
  });
  return NextResponse.json({ message: "Seed Executed" });
}
