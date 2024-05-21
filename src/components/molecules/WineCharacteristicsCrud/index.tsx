"use client";

import { Button, Container, Text } from "@/components";
import { useState } from "react";
import { useRealTimeDb } from "@/context/realTimeDbContext";
import { classNames } from "@/utils/classNames";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AddWineCharacteristic } from "./AddWineCharacteristic";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";
import { useModal } from "@/context/modalContext";
import { useToast } from "@/context/toastContext";
import { useAppState } from "@/context/appStateContext";
import { EditWineCharacteristic } from "./EditWineCharacteristic";

export interface WineCharacteristicsCrudProps {
  titleKey: string;
  wineCharacteristicLabel: string;
  wineCharacteristics: string[];
  backEndTask: string;
}

export const WineCharacteristicsCrud = ({
  titleKey,
  wineCharacteristicLabel,
  wineCharacteristics,
  backEndTask,
}: WineCharacteristicsCrudProps) => {
  const { updateAppLoading } = useAppState();
  const { updateToast } = useToast();
  const { updateModal } = useModal();

  const [editWineCharacteristic, setEditWineCharacteristic] = useState<
    string | null
  >(null);
  const [addWineCharacteristic, setAddWineCharacteristic] =
    useState<boolean>(false);

  const updateFunction = httpsCallable(functions, backEndTask);

  const updateChracteristicsHandler = async (
    newWineCharacteristics: string[]
  ) => {
    updateAppLoading(true);
    updateFunction({
      data: newWineCharacteristics,
    })
      .then((res) => {
        console.log(res.data);
        updateAppLoading(false);
        updateToast({
          message: `Wine ${titleKey} Updated`,
          status: "success",
          show: true,
          timeout: 3000,
        });
      })
      .catch(() => {
        console.log("Error");
        updateAppLoading(false);
        updateToast({
          message: `Error updating Wine ${titleKey}`,
          status: "error",
          show: true,
          timeout: 3000,
        });
      });
  };

  return (
    <>
      {addWineCharacteristic && (
        <AddWineCharacteristic
          titleKey={titleKey}
          wineCharacteristicLabel={wineCharacteristicLabel}
          wineCharacteristics={wineCharacteristics}
          onSave={(newWineCharacteristics: string[]) => {
            setAddWineCharacteristic(false);
            console.log("newWineCharacteristics", newWineCharacteristics);
            updateChracteristicsHandler(newWineCharacteristics);
          }}
          onCancel={() => {
            setAddWineCharacteristic(false);
          }}
        />
      )}
      {editWineCharacteristic && (
        <EditWineCharacteristic
          titleKey={titleKey}
          wineCharacteristic={editWineCharacteristic}
          wineCharacteristicLabel={wineCharacteristicLabel}
          wineCharacteristics={wineCharacteristics}
          onSave={(newWineCharacteristics: string[]) => {
            setEditWineCharacteristic(null);
            updateChracteristicsHandler(newWineCharacteristics);
          }}
          onCancel={() => {
            setEditWineCharacteristic(null);
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
          <Text intent="h5">{`Wine ${titleKey} List`}</Text>
        </Container>

        <Container intent="flexRowWrap" gap="small">
          {wineCharacteristics.map((wineCharacteristic) => (
            <div
              key={wineCharacteristic}
              className={classNames(
                "border py-[6px] px-[10px] rounded-full border-on-surface-dark"
              )}
            >
              <Container intent="flexRowLeft" gap="small">
                <Text intent="p2" variant="dim">
                  {wineCharacteristic}
                </Text>
                <Button
                  disabled={false}
                  intent="text"
                  onClick={() => {
                    setEditWineCharacteristic(wineCharacteristic);
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
                    updateModal({
                      show: true,
                      title: `Delete ${wineCharacteristic}`,
                      description: `Are you sure you want to delete ${wineCharacteristic}?`,
                      action: {
                        label: "Delete",
                        onAction: () => {
                          const newWineCharacteristics =
                            wineCharacteristics.filter(
                              (wc) => wc !== wineCharacteristic
                            );
                          updateChracteristicsHandler(newWineCharacteristics);
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
              setAddWineCharacteristic(true);
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
