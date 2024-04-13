"use client";

import { auth } from "@/lib/firebase/client";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAppState } from "./appStateContext";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";
import { NewUserInterface } from "@/typings/auth";

export interface AuthContextInterface {
  user: User | null;
  authLoading: boolean;
  updateAuthLoading: (loading: boolean) => void;
}

const contextInitialData: AuthContextInterface = {
  user: null,
  authLoading: true,
  updateAuthLoading: () => {},
};

const AuthContext = createContext(contextInitialData);

export const useAuth = (): AuthContextInterface => {
  const context = useContext<AuthContextInterface>(AuthContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

export const AuthProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const { updateAppLoading } = useAppState();

  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const updateAuthLoading = (loading: boolean) => {
    setAuthLoading(loading);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthLoading(false);
      updateAppLoading(true);
      if (user) {
        setUser(user);
        updateAppLoading(false);
        router.push("/home");
      } else {
        setUser(null);
        updateAppLoading(false);
        router.push("/sign-in");
      }

      setTimeout(() => {
        console.log("User", user);
      }, 3000);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const value = {
    user,
    authLoading,
    updateAuthLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
