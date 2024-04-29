"use client";
import { Button, Container, Text, CopyToClipboard } from "@/components";
import { CreateAdminNotification } from "@/typings/data";
import { Icon } from "@iconify/react";

export interface NotificationCardProps {
  notification: CreateAdminNotification;
  onDelete: (notification: CreateAdminNotification) => void;
}

export const NotificationCard = ({
  notification,
  onDelete,
}: NotificationCardProps) => {
  return (
    <Container
      intent="unstyled"
      py="small"
      px="medium"
      gap="small"
      className="w-full bg-surface-dark rounded-lg stretch-x grid grid-cols-9"
    >
      <Container
        intent="flexRowLeft"
        gap="xsmall"
        className="w-full col-span-2"
      >
        <Text intent="p1" variant="dim" className="truncate w-full">
          {notification.wineryName}
        </Text>
        <CopyToClipboard text={notification.wineryName} />
      </Container>
      <Container
        intent="flexRowLeft"
        gap="xsmall"
        className="w-full col-span-2"
      >
        <Text intent="p1" variant="dim" className="w-full truncate">
          {notification.wineryEmail}
        </Text>
        <CopyToClipboard text={notification.wineryEmail} />
      </Container>
      <Container
        intent="flexRowLeft"
        gap="xsmall"
        className="w-full col-span-2"
      >
        <Text intent="p1" variant="dim" className="truncate w-full">
          {notification.wineryRepresentative || "N/A"}
        </Text>
        <CopyToClipboard text={notification.wineryRepresentative} />
      </Container>
      <Container
        intent="flexRowLeft"
        gap="xsmall"
        className="w-full col-span-2"
      >
        <Text intent="p1" variant="dim" className="truncate w-full">
          {notification.wineryPhone || "N/A"}
        </Text>
        <CopyToClipboard text={notification.wineryPhone} />
      </Container>
      <Container intent="flexRowRight" gap="xsmall" className="rounded-lg">
        <Button
          title="Delete user"
          intent="text"
          onClick={() => {
            onDelete(notification);
          }}
        >
          <Icon icon="fluent:delete-24-regular" width="20" />
        </Button>
      </Container>
    </Container>
  );
};
