"use client";

import { Container, NotificationCard, Text } from "@/components";
import { Icon } from "@iconify/react";

export const DashboardPage = () => {
  return (
    <Container intent="flexColLeft" px="large" gap="medium">
      <Container intent="flexRowLeft" gap="xsmall">
        <Icon
          icon="fluent:home-24-regular"
          color="#dddddd"
          width="40"
          height="40"
        />
        <Text intent="h3">Dashboard</Text>
      </Container>
      {/* <NotificationCard /> */}
    </Container>
  );
};
