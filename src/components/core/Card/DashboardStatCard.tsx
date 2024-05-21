"use client";

import { Container, Text } from "@/components";
import { Icon } from "@iconify/react";

export interface DashboardStatCardProps {
  title: string;
  stat: number | string;
  icon: string;
}

export const DashboardStatCard = ({
  title,
  stat,
  icon,
}: DashboardStatCardProps) => {
  return (
    <Container
      intent="flexRowLeft"
      px="medium"
      py="small"
      gap="large"
      className="bg-surface-light min-w-[320px] max-w-[320px] rounded-lg"
    >
      <Container intent="flexColLeft">
        <Icon icon={icon} width="80px" className="text-primary-light" />
      </Container>
      <Container intent="flexColRight" gap="xsmall" className="w-full">
        <Text intent="h3" className="min-w-fit">
          {stat}
        </Text>
        <Text intent="p1" variant="dim" className="min-w-fit">
          {title}
        </Text>
      </Container>
    </Container>
  );
};
