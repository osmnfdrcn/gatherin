import prisma from "@/lib/prismadb";

export const getUserById = async (id: string) => {
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        id,
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
};
