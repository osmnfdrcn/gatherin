import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, bio, image, email } = body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

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
        email,
      },
      data: updatedData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.error();
  }
}
