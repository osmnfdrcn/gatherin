import prisma from "@/lib/prismadb";

export const getPlaceById = async (id: string) => {
  try {
    const place = await prisma.place.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
        gatherings: {
          orderBy: {
            start: "asc",
          },
        },
      },
    });
    if (!place) {
      throw new Error("Place not found");
    }
    return place;
  } catch (error) {
    return null;
  }
};
