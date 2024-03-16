import { LogBody } from "@/types";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, action, location }: LogBody = await request.json();

  try {
    const log = await prisma.log.create({
      data: {
        userId,
        actions: {
          create: {
            type: action.type,
            status: action.status,
            actorId: action.actorId,
            targetId: action.targetId,
          },
        },
        location,
      },
      include: { actions: true, user: true },
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

  const logs = actorId
    ? await prisma.log.findUnique({
        where: { id: actorId },
        include: {
          actions: true,
        },
      })
    : actionId
    ? await prisma.log.findFirst({
        where: { actions: { some: { id: actionId } } },
        include: {
          actions: true,
        },
      })
    : targetId
    ? await prisma.log.findFirst({
        where: { actions: { some: { targetId } } },
        include: {
          actions: true,
        },
      })
    : await prisma.log.findMany({
        where: {
          OR: [
            {
              actions: {
                some: {
                  actor: {
                    name: {
                      contains: search ?? undefined,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
            {},
          ],
        },
        take: 30,
        skip: page ? parseInt(page) : 0,
        include: {
          actions: true,
        },
      });
  return NextResponse.json(logs);
}
