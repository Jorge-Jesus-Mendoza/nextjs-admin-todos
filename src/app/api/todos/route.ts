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
  try {
    const { complete, description } = await postSchema.validate(
      await req.json()
    );

    const todo = await prisma.todo.create({ data: { complete, description } });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
