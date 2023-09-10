import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";
import getCurrentUser from "@/helpers/getCurrentUser";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  try {
    const body = await request.json();
    const { name, bio, image, id } = body;
    const existingUser = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    console.log(body);

    if (!existingUser) {
      return NextResponse.error();
    }

    let updatedData: {
      name?: string;
      bio?: string;
      image?: string;
    } = {};
    !!name ? (updatedData.name = name) : null;
    !!bio ? (updatedData.bio = bio) : null;
    !!image ? (updatedData.image = image) : null;

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: updatedData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.error();
  }
}
