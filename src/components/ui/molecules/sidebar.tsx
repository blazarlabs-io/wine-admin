"use client";

import { useSideBar } from "@/context/sideBarContext";
import { classNames } from "@/utils/classNames";
import { Icon } from "@iconify/react";

import Link from "next/link";

export const SideBar = () => {
  const { items, handleItems } = useSideBar();

  return (
    <div className="py-[24px] px-[8px] flex items-start justify-start min-w-[240px] max-w-[240px] max-h-fit bg-surface-light h-full border-r border-l">
      <div className="flex items-start justify-start w-full">
        <nav className="grid items-start px-2 text-sm font-medium w-full">
          {items.map((item, index) => (
            <div key={item.label} className="w-full">
              {item.disabled ? (
                <div
                  className={classNames(
                    "flex items-center gap-3 px-3 py-2 rounded-md cursor-not-allowed text-muted-foreground/70"
                  )}
                >
                  <Icon icon={item.icon} />
                  <span>{item.label}</span>
                </div>
              ) : (
                <Link
                  href={item.url}
                  onClick={() => {
                    handleItems(item);
                  }}
                  className={classNames(
                    "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-all hover:text-primary",
                    item.selected && "text-primary bg-muted"
                  )}
                >
                  <Icon icon={item.icon} />
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};
