import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import { SessionStrategy } from "next-auth/core/types";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "../../../services/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
};

export default NextAuth(authOptions);
