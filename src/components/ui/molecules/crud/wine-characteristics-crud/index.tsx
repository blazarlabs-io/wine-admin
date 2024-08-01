"use client";

import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AddWineCharacteristic } from "./add-wine-characteristic";
import { useAppState } from "@/context/appStateContext";
import { EditWineCharacteristic } from "./edit-wine-characteristic";
import { Button } from "../../../core/button";
import { ScrollArea } from "@/components/ui/core/scroll-area";
import { Separator } from "@/components/ui/core/separator";
import { Text } from "../../../core/text";
import { useToast } from "../../../core/toast/use-toast";
import { useWineClient } from "@/context/wineClientSdkContext";

export interface WineCharacteristicsCrudProps {
  icon: any;
  titleKey: string;
  wineCharacteristicLabel: string;
  wineCharacteristics: string[];
}

export const WineCharacteristicsCrud = ({
  icon,
  titleKey,
  wineCharacteristicLabel,
  wineCharacteristics,
}: WineCharacteristicsCrudProps) => {
  const { updateAppLoading } = useAppState();
  const { toast } = useToast();
  const { wineClient } = useWineClient();

  const [editWineCharacteristic, setEditWineCharacteristic] = useState<
    string | null
  >(null);
  const [addWineCharacteristic, setAddWineCharacteristic] =
    useState<boolean>(false);

  const updateChracteristicsHandler = async (
    newWineCharacteristics: string[]
  ) => {
    updateAppLoading(true);
    wineClient.utils
      .updateSystemVariable({
        name: wineCharacteristicLabel,
        value: newWineCharacteristics,
      })
      .then((res: any) => {
        toast({
          title: `Wine ${titleKey} Updated`,
          description: `Wine ${titleKey} has been updated successfully.`,
        });
        updateAppLoading(false);
      })
      .catch((err: any) => {
        updateAppLoading(true);
        console.log(err);
        toast({
          title: `Error updating Wine ${titleKey}`,
          description: `There was an error updating Wine ${titleKey}.`,
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
      <div className="flex flex-col items-start justify-start p-[24px] gap-[24px] h-[560px]">
        <div className="flex items-center justify-start gap-[8px]">
          <Icon icon={icon} width={24} className="text-muted-foreground" />
          <Text intent="h5">{`Wine ${titleKey} List`}</Text>
        </div>

        <div className="w-full border rounded-lg p-[16px]">
          <ScrollArea className="w-full h-[320px]">
            {wineCharacteristics.map((wineCharacteristic, index) => (
              <div key={wineCharacteristic} className="w-full">
                <div className="flex items-center justify-between py-[12px] px-[16px] w-full">
                  <span>{wineCharacteristic}</span>
                  <div className="flex items-center justify-center gap-[16px]">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setEditWineCharacteristic(wineCharacteristic);
                      }}
                    >
                      <Icon icon="fluent:edit-16-regular" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        updateChracteristicsHandler(
                          wineCharacteristics.filter(
                            (characteristic) =>
                              characteristic !== wineCharacteristic
                          )
                        );
                      }}
                    >
                      <Icon icon="fluent:delete-16-regular" />
                    </Button>
                  </div>
                </div>
                {index < wineCharacteristics.length - 1 && <Separator />}
              </div>
            ))}
          </ScrollArea>
          <Separator />
          <Button
            disabled={false}
            variant="ghost"
            onClick={() => {
              setAddWineCharacteristic(true);
            }}
            className="flex items-center gap-1 px-[8px] text-primary-light hover:text-primary mt-[16px]"
          >
            Add New
            <Icon icon={"material-symbols:add"} width="20" className="" />
          </Button>
        </div>
      </div>
    </>
  );
};
