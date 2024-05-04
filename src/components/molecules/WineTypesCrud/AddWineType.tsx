"use client";

import { Button, Container, Text } from "@/components";
import { useEffect, useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";
import { useToast } from "@/context/toastContext";
import { useRealTimeDb } from "@/context/realTimeDbContext";
import { useAppState } from "@/context/appStateContext";

export interface AddWineProps {
  onCancel: () => void;
  onSave: (wineType: string) => void;
}

export const AddWineType = ({ onSave, onCancel }: AddWineProps) => {
  const { updateToast } = useToast();
  const { updateAppLoading } = useAppState();
  const { wineTypes } = useRealTimeDb();
  const [value, setValue] = useState<string>("");

  const updateWineTypes = httpsCallable(functions, "updateWineTypes");

  const handleUpdateWineTypes = async () => {
    updateAppLoading(true);
    const newWineTypes = [...wineTypes, value];
    console.log(newWineTypes);
    updateWineTypes({
      data: {
        wineTypes: newWineTypes,
      },
    })
      .then((res) => {
        onSave(value);
        console.log(res.data);
        updateAppLoading(false);
        updateToast({
          message: "Wine Type Added",
          status: "success",
          show: true,
          timeout: 5000,
        });
      })
      .catch(() => {
        console.log("Error");
        updateAppLoading(false);
        updateToast({
          message: "Error adding Wine Type",
          status: "error",
          show: true,
          timeout: 5000,
        });
      });
  };

  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-surface/80 backdrop-blur-sm">
      <Container
        intent="flexColCenter"
        className="bg-surface-light rounded-lg p-8 min-w-[400px] max-w-[400px]"
        gap="large"
      >
        <Container intent="flexColLeft" gap="medium">
          <Text intent="h3">Add Wine Type</Text>
        </Container>
        <Container intent="flexRowBetween" gap="xsmall">
          <Container intent="flexColLeft" gap="xsmall" className="w-full">
            <Text intent="p1" variant="dim">
              Wine Name
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
              handleUpdateWineTypes();
            }}
          >
            Save
          </Button>
        </Container>
      </Container>
    </div>
  );
};
