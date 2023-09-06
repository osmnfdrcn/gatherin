import prisma from "@/lib/prismadb";

export const getPlaceById = async (id: string) => {
  try {
    const place = await prisma.place.findUnique({
      where: {
        id,
      },
      include: {
        events: true,
        owner: true,
      },
    });
    if (!place) return null;
    return place;
  } catch (error) {
    return null;
  }
};
