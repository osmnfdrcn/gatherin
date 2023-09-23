import prisma from "@/lib/prismadb";
import { IPlace } from "@/types";

export const getPlaces = async () => {
  try {
    const placesData = await prisma.place.findMany({
      include: {
        owner: true,
        gatherings: {
          orderBy: {
            start: "asc",
          },
        },
      },
    });

    if (!placesData) return null;
    const places = placesData.map((place) => ({
      ...place,
      owner: place.owner,
      gatherings: place.gatherings,
    }));
    return places;
  } catch (error) {
    return null;
  }
};
