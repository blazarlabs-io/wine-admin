"use client";

import { auth } from "@/lib/firebase/client";
import { User, onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "./appStateContext";

// LIBS
import { createContext, useContext, useEffect, useState } from "react";

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
  const pathname = usePathname();

  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const updateAuthLoading = (loading: boolean) => {
    setAuthLoading(loading);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("PATHNAME", pathname);

      setAuthLoading(false);
      updateAppLoading(true);

      if (pathname.startsWith("/dynamic-qr-codes")) {
        return;
      }

      if (user) {
        setUser(user);
        updateAppLoading(false);
        router.push("/home");
      } else {
        setUser(null);
        updateAppLoading(false);
        router.push("/sign-in");
      }

      // setTimeout(() => {
      //   console.log("User", user);
      // }, 3000);
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
