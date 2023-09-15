import { getServerSession } from "next-auth";
import prisma from "@/lib/prismadb";
import { options } from "@/app/api/auth/[...nextauth]/options";

export async function getSession() {
  return getServerSession(options);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session) return null;
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      include: {
        places: true,
      },
    });
    if (!currentUser) return null;
    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    return null;
  }
}
