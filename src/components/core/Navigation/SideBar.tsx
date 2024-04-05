"use client";

import { TabGroup, Container } from "@/components";
import { useSideBar } from "@/context/sideBarContext";

export const SideBar = () => {
  const { items, handleItems } = useSideBar();

  return (
    <Container
      intent="flexColLeft"
      className="w-64 max-h-fit bg-surface-light rounded-lg"
    >
      <Container
        intent="flexColLeft"
        px="medium"
        py="medium"
        className="flex flex-col p-4 space-y-4"
      >
        <TabGroup
          items={items}
          onSelect={(item) => {
            handleItems(item);
          }}
        />
      </Container>
    </Container>
  );
};
