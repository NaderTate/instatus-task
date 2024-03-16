import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = await request.json();

  try {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
      return NextResponse.json({ error: "User already exists" });
    }
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
      },
    });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const search = searchParams.get("search");

  try {
    const users = await prisma.user.findMany({
      take: 30,
      skip: page ? parseInt(page) : 0,
      where: { name: { contains: search ?? undefined } },
      include: {
        created_actions: true,
        received_actions: true,
        logs: true,
      },
    });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
