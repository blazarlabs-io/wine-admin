"use client";

import { Container, Text } from "@/components";
import { Icon } from "@iconify/react";

export const SettingsPage = () => {
  return (
    <Container intent="flexColLeft" px="large" gap="medium">
      <Container intent="flexRowLeft" gap="xsmall">
        <Icon
          icon="fluent:settings-24-regular"
          color="#dddddd"
          width="40"
          height="40"
        />
        <Text intent="h3">Settings</Text>
      </Container>
    </Container>
  );
};
