import { Post } from "../types/Post";
import { createContext, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { useLoggedInUser } from "../hooks/useLoggedInUser";

interface IUserContext {
  user: User;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    useLoggedInUser().then((user) => setUser(user));
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
