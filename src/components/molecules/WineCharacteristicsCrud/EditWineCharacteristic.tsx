"use client";

import { Button, Container, Text } from "@/components";
import { useState } from "react";
import { useAppState } from "@/context/appStateContext";

export interface EditWineProps {
  titleKey: string;
  wineCharacteristicLabel: string;
  wineCharacteristic: string;
  wineCharacteristics: string[];
  onCancel: () => void;
  onSave: (newWineColours: string[]) => void;
}

export const EditWineCharacteristic = ({
  titleKey,
  wineCharacteristicLabel,
  wineCharacteristic,
  wineCharacteristics,
  onSave,
  onCancel,
}: EditWineProps) => {
  const { updateAppLoading } = useAppState();
  const [value, setValue] = useState<string>(wineCharacteristic);

  const handleUpdateWineCharacteristics = async () => {
    updateAppLoading(true);

    const newWineColours = wineCharacteristics.map((wine) => {
      if (wine === wineCharacteristic) {
        return value;
      }
      return wine;
    });

    onSave(newWineColours);
  };

  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-surface/80 backdrop-blur-sm">
      <Container
        intent="flexColCenter"
        className="bg-surface-light rounded-lg p-8 min-w-[400px] max-w-[400px]"
        gap="large"
      >
        <Container intent="flexColLeft" gap="medium">
          <Text intent="h3">{`Edit Wine ${titleKey}`}</Text>
        </Container>
        <Container intent="flexRowBetween" gap="xsmall">
          <Container intent="flexColLeft" gap="xsmall" className="w-full">
            <Text intent="p1" variant="dim">
              {`Wine ${titleKey}`}
            </Text>
            <input
              type="text"
              value={value}
              onChange={(event: any) => {
                setValue(event.target.value);
              }}
              className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
            />
          </Container>
        </Container>
        <Container intent="flexRowBetween" gap="medium" className="">
          <Button
            intent="secondary"
            fullWidth
            size="medium"
            onClick={() => {
              onCancel();
            }}
          >
            Cancel
          </Button>
          <Button
            intent="primary"
            fullWidth
            size="medium"
            onClick={() => {
              handleUpdateWineCharacteristics();
            }}
          >
            Save
          </Button>
        </Container>
      </Container>
    </div>
  );
};
