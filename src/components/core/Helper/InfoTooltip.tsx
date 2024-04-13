"use client";

import { Icon } from "@iconify/react";

export interface InfoTooltipProps {
  text: string;
  className?: string;
  children: React.ReactNode;
}

export const InfoTooltip = ({
  text,
  className,
  children,
}: InfoTooltipProps) => {
  return (
    <div className="relative">
      <div className="group cursor-pointer relative inline-block text-center">
        {children}
        <div className="opacity-0 w-32 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -left-1/2 ml-14 px-3 pointer-events-none">
          {text}
        </div>
      </div>
    </div>
  );
};
