"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { useAppState } from "@/context/appStateContext";

export const ProtectedPage = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuth();
  const { updateAppLoading } = useAppState();

  if (!user) {
    updateAppLoading(false);
    redirect("/sign-in");
  } else {
    return children;
  }
};
