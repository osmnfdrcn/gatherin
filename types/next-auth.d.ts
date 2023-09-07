import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      bio: string;
      createdAt: Date;
      email: string;
      emailVerified: boolean;
      exp: number;
      hashedPassword: string;
      iat: number;
      id: string;
      image: string;
      jti: string;
      name: string;
      picture: string;
      sub: string;
      updatedAt: string;
    };
  }
}
