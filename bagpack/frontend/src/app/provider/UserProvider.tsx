"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { User } from "@/types/user";

// UserContext의 타입을 User | null로 변경
const UserContext = createContext<User | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // 동적 import 사용
        const { getCurrentUser } = await import("@/lib/firebase/firestore");
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error getting current user:", error);
      }
    };

    loadUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
