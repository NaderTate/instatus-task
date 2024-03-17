import { LogBody } from "@/types";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, action, location }: LogBody = await request.json();

  try {
    const Action = await prisma.action.create({
      data: {
        type: action.type,
        status: action.status,
        actorId: action.actorId,
        targetId: action.targetId,
      },
    });
    const log = await prisma.log.create({
      data: {
        userId,
        actionId: Action.id,
        location,
      },
      include: { action: true, user: true },
    });

    return NextResponse.json(log);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const actorId = searchParams.get("actorId");
  const actionId = searchParams.get("actionId");
  const targetId = searchParams.get("targetId");
  if (actorId) {
    const log = await prisma.log.findFirst({
      where: { action: { actorId } },
      include: {
        action: { include: { actor: true, target: true } },
      },
    });
    if (log) return NextResponse.json({ logs: [log], count: 1 });
    return NextResponse.json({ logs: null });
  }
  if (actionId) {
    const log = await prisma.log.findFirst({
      where: { actionId },
      include: {
        action: { include: { actor: true, target: true } },
      },
    });
    if (log) return NextResponse.json({ logs: [log], count: 1 });
    return NextResponse.json({ logs: null });
  }
  if (targetId) {
    const log = await prisma.log.findFirst({
      where: { action: { targetId } },
      include: {
        action: { include: { actor: true, target: true } },
      },
    });
    if (log) return NextResponse.json({ logs: [log], count: 1 });
    return NextResponse.json({ logs: null });
  }
  const logs = await prisma.log.findMany({
    where: {
      OR: [
        {
          action: {
            actor: {
              name: {
                contains: search ?? undefined,
                mode: "insensitive",
              },
            },
          },
        },
        {
          action: {
            actor: {
              email: { contains: search ?? undefined, mode: "insensitive" },
            },
          },
        },
      ],
    },
    take: 3,
    skip: page ? (parseInt(page) - 1) * 3 : 0,
    include: {
      action: { include: { actor: true, target: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const count = await prisma.log.count({
    where: {
      OR: [
        {
          action: {
            actor: {
              name: {
                contains: search ?? undefined,
                mode: "insensitive",
              },
            },
          },
        },
        {
          action: {
            actor: {
              email: { contains: search ?? undefined, mode: "insensitive" },
            },
          },
        },
      ],
    },
  });
  return NextResponse.json({ logs, count });
}
