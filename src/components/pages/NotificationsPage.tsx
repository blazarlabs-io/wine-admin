"use client";

import { Container, NotificationCard, Text } from "@/components";
import { Icon } from "@iconify/react";
import { useRealTimeDb } from "@/context/realTimeDbContext";
import { CreateAdminNotification } from "@/typings/data";
import { useToast } from "@/context/toastContext";
import { useModal } from "@/context/modalContext";
import { useAppState } from "@/context/appStateContext";
import { useEffect } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";

export const NotificationsPage = () => {
  const { notifications } = useRealTimeDb();
  const { updateToast } = useToast();
  const { updateModal } = useModal();
  const { updateAppLoading } = useAppState();

  const deleteNotification = httpsCallable(functions, "db-deleteNotification");

  const handleNotificationDelete = (n: CreateAdminNotification) => {
    updateAppLoading(true);
    deleteNotification({ data: n })
      .then(() => {
        console.log("Notification deleted");
        updateToast({
          show: true,
          status: "success",
          message: "Notification deleted",
          timeout: 5000,
        });
        updateAppLoading(false);
      })
      .catch((error) => {
        console.error(error);
        updateToast({
          show: true,
          status: "error",
          message: "Error deleting notification",
          timeout: 5000,
        });
        updateAppLoading(false);
      });
  };

  useEffect(() => {
    console.log("Notifications", notifications);
  }, [notifications]);
  return (
    <Container intent="flexColLeft" px="large" gap="medium">
      <Container intent="flexRowLeft" gap="xsmall">
        <Icon
          icon="fluent:alert-12-regular"
          color="#dddddd"
          width="40"
          height="40"
        />
        <Text intent="h3">Notifications</Text>
      </Container>
      <Container intent="flexColLeft" gap="small">
        <Container intent="grid-5" py="small" className="w-full">
          <Container
            intent="flexColLeft"
            px="medium"
            className="w-full rounded-lg"
          >
            <Text intent="p2" className="font-semibold">
              Name
            </Text>
          </Container>
          <Container
            intent="flexColLeft"
            px="medium"
            className="w-full rounded-lg"
          >
            <Text intent="p2" className="font-semibold">
              Email
            </Text>
          </Container>
          <Container
            intent="flexColLeft"
            px="medium"
            className="w-full rounded-lg"
          >
            <Text intent="p2" className="font-semibold">
              Representative
            </Text>
          </Container>
          <Container
            intent="flexColLeft"
            px="medium"
            className="w-full rounded-lg"
          >
            <Text intent="p2" className="font-semibold">
              Phone
            </Text>
          </Container>
          <Container
            intent="flexColLeft"
            px="medium"
            className="w-full rounded-lg"
          ></Container>
        </Container>
        {notifications &&
          notifications.map((notification: any) => (
            <div key={notification.wineryName} className="w-full">
              <NotificationCard
                notification={notification}
                onDelete={(n: CreateAdminNotification) => {
                  const modalProps = {
                    show: true,
                    title: "Delete Notification",
                    description:
                      "Are you sure you want to delete this notification?",
                    action: {
                      label: "Confirm",
                      onAction: () => {
                        handleNotificationDelete(n);
                        updateModal({
                          show: false,
                          title: "",
                          description: "",
                          action: {
                            label: "",
                            onAction: () => {},
                          },
                        });
                      },
                    },
                  };
                  updateModal(modalProps);
                }}
              />
            </div>
          ))}
      </Container>
    </Container>
  );
};
