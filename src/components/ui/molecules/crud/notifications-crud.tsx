"use client";

import { CreateAdminNotification } from "@/typings/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/core/card";
import { Avatar, AvatarFallback } from "@/components/ui/core/avatar";
import { Text } from "../../core/text";
import { useEffect } from "react";
import { Button } from "../../core/button";
import { Icon } from "@iconify/react";

export interface NotificationCrudProps {
  notifications: CreateAdminNotification[];
  onDelete: (notification: CreateAdminNotification) => void;
}

export const NotificationsCrud = ({
  notifications,
  onDelete,
}: NotificationCrudProps) => {
  useEffect(() => {
    console.log(notifications);
  }, [notifications]);
  return (
    <>
      <Card x-chunk="dashboard-01-chunk-5" className="border-none">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        {notifications &&
          notifications.map((notification: any) => (
            <div key={notification.requestDate + notification.wineryName}>
              <CardContent className="grid gap-8">
                <div className="flex items-center gap-4">
                  <Avatar className="hidden h-10 w-10 sm:flex">
                    {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
                    <AvatarFallback>
                      {notification.wineryEmail.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex flex-col items-start justify-start">
                      <Text intent="p1" className="font-medium leading-none">
                        {notification.wineryName}
                      </Text>
                      <Text intent="p2" variant="dim">
                        {notification.wineryEmail}
                      </Text>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <Text intent="p2" className="">
                      Upgrade request
                    </Text>
                  </div>
                  <div className="ml-auto font-medium">
                    <Text intent="p2" className="">
                      {new Date(
                        notification.requestDate.seconds * 1000
                      ).toLocaleDateString()}
                    </Text>
                  </div>
                  <div className="flex items-center justify-end">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        onDelete(notification);
                      }}
                    >
                      <Icon icon="fluent:delete-16-regular" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          ))}
      </Card>
    </>
  );
};
