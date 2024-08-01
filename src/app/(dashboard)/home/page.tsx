"use client";

import { DashboardPage } from "@/components";
import { useAppState } from "@/context/appStateContext";
import { useEffect } from "react";

export default function DashboardHomePage() {
  const { updateAppLoading } = useAppState();

  useEffect(() => {
    updateAppLoading(false);
  }, []);

  return <DashboardPage />;
}
