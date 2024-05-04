"use client";

import { Button, Container, Text } from "@/components";
import { useState } from "react";
import { useRealTimeDb } from "@/context/realTimeDbContext";
import { classNames } from "@/utils/classNames";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AddWineType } from "./AddWineType";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";
import { useModal } from "@/context/modalContext";
import { useToast } from "@/context/toastContext";
import { useAppState } from "@/context/appStateContext";
import { EditWineType } from "./EditWineType";

export const WineTypesCrud = ({}) => {
  const { wineTypes } = useRealTimeDb();
  const { updateModal } = useModal();
  const { updateToast } = useToast();
  const { updateAppLoading } = useAppState();
  const [editWineType, setEditWineType] = useState<string | null>(null);
  const [addWineType, setAddWineType] = useState<boolean>(false);

  const updateWineTypes = httpsCallable(functions, "updateWineTypes");

  const handleDelete = (wineToDelete: string) => {
    const newWineTypes = wineTypes.filter(
      (wineType) => wineType !== wineToDelete
    );

    updateModal({
      show: true,
      title: "Delete Wine Type",
      description: `Are you sure you want to delete ${wineToDelete}?`,
      action: {
        label: "Delete",
        onAction: () => {
          updateAppLoading(true);
          updateWineTypes({
            data: {
              wineTypes: newWineTypes,
            },
          })
            .then(() => {
              console.log("Wine Type Deleted");
              updateAppLoading(false);
              updateToast({
                message: "Wine Type Deleted",
                status: "success",
                show: true,
                timeout: 5000,
              });
            })
            .catch(() => {
              console.log("Error");
              updateAppLoading(false);
              updateToast({
                message: "Error deleting Wine Type",
                status: "error",
                show: true,
                timeout: 5000,
              });
            });

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
    });
  };

  return (
    <>
      {addWineType && (
        <AddWineType
          onSave={(wine: string) => {
            setAddWineType(false);
          }}
          onCancel={() => {
            setAddWineType(false);
          }}
        />
      )}
      {editWineType && (
        <EditWineType
          wineType={editWineType}
          onSave={() => {
            setEditWineType(null);
          }}
          onCancel={() => {
            setEditWineType(null);
          }}
        />
      )}
      <Container
        intent="flexColLeft"
        px="medium"
        py="medium"
        gap="medium"
        className=""
      >
        <Container intent="flexRowLeft" gap="medium">
          <Text intent="h5">Wines List</Text>
        </Container>

        <Container intent="flexRowWrap" gap="small">
          {wineTypes.map((wineType) => (
            <div
              key={wineType}
              className={classNames(
                "border py-[6px] px-[10px] rounded-full border-on-surface-dark"
              )}
            >
              <Container intent="flexRowLeft" gap="small">
                <Text intent="p2" variant="dim">
                  {wineType}
                </Text>
                <Button
                  disabled={false}
                  intent="text"
                  onClick={() => {
                    setEditWineType(wineType);
                  }}
                  className="flex items-center gap-2"
                >
                  <Icon
                    icon={"fluent:edit-24-regular"}
                    width="16"
                    className="text-on-surface-dark hover:text-primary"
                  />
                </Button>
                <Button
                  disabled={false}
                  intent="text"
                  onClick={() => {
                    handleDelete(wineType);
                  }}
                  className="flex items-center gap-2"
                >
                  <Icon
                    icon={"material-symbols:close"}
                    width="16"
                    className="text-on-surface-dark hover:text-primary"
                  />
                </Button>
              </Container>
            </div>
          ))}
          <Button
            disabled={false}
            intent="text"
            onClick={() => {
              setAddWineType(true);
            }}
            className="flex items-center gap-1 px-[8px] text-primary-light hover:text-primary"
          >
            Add New
            <Icon icon={"material-symbols:add"} width="20" className="" />
          </Button>
        </Container>
      </Container>
    </>
  );
};
