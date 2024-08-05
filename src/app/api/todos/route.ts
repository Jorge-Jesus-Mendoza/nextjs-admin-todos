import { getUserServerSession } from "@/auth/components/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("take") ?? "0");

  if (isNaN(take)) {
    return NextResponse.json(
      { message: "invalid take value" },
      { status: 400 }
    );
  }

  if (isNaN(skip)) {
    return NextResponse.json(
      { message: "invalid skip value" },
      { status: 400 }
    );
  }

  const response = await prisma.todo.findMany({
    take,
    skip,
  });
  return NextResponse.json(response);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(req: Request) {
  const user = await getUserServerSession();
  if (!user) return NextResponse.json("No Autorizado", { status: 401 });

  try {
    const { complete, description } = await postSchema.validate(
      await req.json()
    );

    const todo = await prisma.todo.create({
      data: { complete, description, userId: user.id },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE() {
  const user = await getUserServerSession();
  if (!user) return NextResponse.json("No Autorizado", { status: 401 });

  const response = await prisma.todo.deleteMany({
    where: {
      complete: true,
      userId: user.id,
    },
  });
  return NextResponse.json(response);
}
