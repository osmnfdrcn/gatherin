import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, image, bgImage, email } = body;
    if (!description || !name || !image || !bgImage || !email) {
      return new NextResponse("Missing Fields", { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    const place = await prisma.place.create({
      data: {
        name,
        description,
        image,
        bgImage,
        owner: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    return NextResponse.json(place, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}
