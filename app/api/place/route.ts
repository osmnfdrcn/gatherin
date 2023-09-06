import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, image, bgImage, userId } = body;
    if (!description || !name || !image || !bgImage || !userId) {
      return new NextResponse("Missing Fields", { status: 400 });
    }
    console.table(body);

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
