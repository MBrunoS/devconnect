import { Post } from "../types/Post";
import { createContext, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { useLoggedInUser } from "../hooks/useLoggedInUser";

interface IUserContext {
  user: User;
  updateUser: () => void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState<User>();

  function updateUser() {
    useLoggedInUser().then((user) => setUser(user));
  }

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
