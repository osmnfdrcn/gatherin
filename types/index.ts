import { Gathering, Place, User } from "@prisma/client";

export type IUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  places: Place[];
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type IPlace = Place & {
  owner: User;
  gatherings: Gathering[];
};
