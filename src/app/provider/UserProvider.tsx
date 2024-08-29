"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/firebase/firestore";
import { User } from "@/types/user";
// UserContext의 타입을 User | null로 변경
const UserContext = createContext<User | null>(null);

function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser()
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error getting current user:", error);
      });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
