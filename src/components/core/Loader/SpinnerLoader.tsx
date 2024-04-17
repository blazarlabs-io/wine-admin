"use client";

import { Container } from "@/components";
import { Icon } from "@iconify/react";

export interface AuthSpinnerLoaderProps {
  width?: string;
  height?: string;
  color?: string;
}

export const SpinnerLoader = ({
  width = "16px",
  height = "16px",
  color = "#000",
}: AuthSpinnerLoaderProps) => {
  return (
    <Container intent="flexRowCenter">
      <Icon
        icon="eos-icons:loading"
        className=""
        style={{ width: width, height: height, color: color }}
      />
    </Container>
  );
};
