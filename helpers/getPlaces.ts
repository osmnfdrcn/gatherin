import prisma from "@/lib/prismadb";

export const getPlaces = async () => {
  try {
    const places = await prisma.place.findMany({
      include: {
        owner: true,
      },
    });
    console.log({ places });

    if (!places) return null;
    return places;
  } catch (error) {
    return null;
  }
};
