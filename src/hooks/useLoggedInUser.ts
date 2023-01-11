import { User } from "@prisma/client";
import { getSession } from "next-auth/react";
import { api } from "../services/api";

export async function useLoggedInUser() {
  const session = await getSession();

  if (session) {
    const { email } = session.user;
    const { data: user } = await api.get<User>(`users/${email}`);

    return user;
  }
}
