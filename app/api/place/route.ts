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
  const id = searchParams.get("id");

  let query: any = {};
  search ? (query.name = { contains: search, mode: "insensitive" }) : null;
  id ? (query.id = id) : null;

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

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  try {
    const body = await request.json();
    const { id, name, description, image, bgImage } = body;

    if (!id) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    const place = await prisma.place.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        image,
        bgImage,
      },
    });

    return NextResponse.json(place, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}
