"use client";
import { Button, Container } from "@/components";
import { Icon } from "@iconify/react";
import { TabGroupProps } from "@/typings/components";
import { classNames } from "@/utils/classNames";

export const TabGroup = ({ items, onSelect }: TabGroupProps) => {
  return (
    <Container intent="flexColLeft" gap="small" className="w-full">
      {items.map((item, index) => (
        <div key={item.label}>
          <Button
            intent="unstyled"
            className={classNames(
              "flex gap-[4px] items-center justify-start text-on-surface hover:text-on-surface-dark transition-all duration-200 ease-in-out",
              item.selected ? "text-primary-light" : "text-on-surface"
            )}
            onClick={() => {
              onSelect(item);
            }}
          >
            <Icon icon={item.icon} className="w-[16px] h-[16px]" />
            {item.label}
          </Button>
        </div>
      ))}
    </Container>
  );
};
