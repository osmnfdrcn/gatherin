import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/helpers/getCurrentUser";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  try {
    const body = await request.json();
    const { start, end, description, placeId } = body;
    if (!start || !end || !placeId) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    const gathering = await prisma.gathering.create({
      data: {
        start,
        end,
        description,
        place: {
          connect: {
            id: placeId,
          },
        },
      },
    });

    return NextResponse.json(gathering, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}
