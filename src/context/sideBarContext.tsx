"use client";

import { TabItemInterface } from "@/typings/components";
import { createContext, useContext, useState } from "react";

export interface SideBarContextInterface {
  items: TabItemInterface[];
  handleItems: (item: TabItemInterface) => void;
}

const contextInitialData: SideBarContextInterface = {
  items: [
    {
      label: "Dashboard",
      icon: "fluent:home-24-regular",
      selected: true,
    },
    {
      label: "Notifications",
      icon: "fluent:alert-12-regular",
      selected: false,
    },
    {
      label: "Users",
      icon: "fluent:people-24-regular",
      selected: false,
    },
    {
      label: "Settings",
      icon: "fluent:settings-24-regular",
      selected: false,
    },
  ],
  handleItems: () => {},
};

const SideBarContext = createContext(contextInitialData);

export const useSideBar = (): SideBarContextInterface => {
  const context = useContext<SideBarContextInterface>(SideBarContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

export const SideBarProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [items, setItems] = useState<TabItemInterface[]>(
    contextInitialData.items
  );

  const handleItems = (item: TabItemInterface) => {
    items.map((i) => {
      if (i.label === item.label) {
        i.selected = true;
      } else {
        i.selected = false;
      }
    });
    setItems([...items]);
  };

  const value = {
    items,
    handleItems,
  };

  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  );
};
