"use client";
import { Button, Container, Text } from "@/components";
import { Icon } from "@iconify/react";
import { TabGroupProps } from "@/typings/components";
import { classNames } from "@/utils/classNames";
import { useRealTimeDb } from "@/context/realTimeDbContext";

export const TabGroup = ({ items, onSelect }: TabGroupProps) => {
  const { notifications } = useRealTimeDb();

  return (
    <Container intent="flexColLeft" gap="small" className="w-full">
      {items.map((item, index) => (
        <div key={item.label}>
          <Button
            intent="unstyled"
            className={classNames(
              "flex gap-[8px] items-center justify-start text-on-surface hover:text-on-surface-dark transition-all duration-200 ease-in-out",
              item.selected ? "text-primary-light" : "text-on-surface"
            )}
            onClick={() => {
              onSelect(item);
            }}
          >
            <Icon icon={item.icon} className="w-[20px] h-[20px]" />
            {item.label}
            {item.label === "Notifications" && notifications.length > 0 && (
              <>
                <div className="relative">
                  <div className="w-[20px] h-[20px] bg-primary absolute top-[-10px] rounded-full flex items-center justify-center">
                    <Text intent="p2" className="text-[12px]">
                      {notifications.length}
                    </Text>
                  </div>
                </div>
              </>
            )}
          </Button>
        </div>
      ))}
    </Container>
  );
};
