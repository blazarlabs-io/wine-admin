"use client";

import { DashboardPage, UsersPage, SettingsPage } from "@/components";
import { useSideBar } from "@/context/sideBarContext";
import { useAppState } from "@/context/appStateContext";
import { useEffect } from "react";

export default function DashboardHomePage() {
  const { items } = useSideBar();
  const { updateAppLoading } = useAppState();

  useEffect(() => {
    updateAppLoading(false);
  }, []);

  return (
    <>
      {items.map((item) => (
        <div key={item.label}>
          {item.selected && item.label === "Dashboard" && <DashboardPage />}
          {item.selected && item.label === "Users" && <UsersPage />}
          {item.selected && item.label === "Settings" && <SettingsPage />}
        </div>
      ))}
    </>
  );
}
