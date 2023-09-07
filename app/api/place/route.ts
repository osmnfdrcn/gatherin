import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, image, bgImage, userId } = body;
    if (!description || !name || !image || !bgImage || !userId) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    const place = await prisma.place.create({
      data: {
        name,
        description,
        image,
        bgImage,
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json(place, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");

  let query: any = {};
  search ? (query.name = { contains: search, mode: "insensitive" }) : null;
  try {
    const places = await prisma.place.findMany({
      where: query,
      include: {
        owner: true,
      },
    });

    return NextResponse.json(places, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}
