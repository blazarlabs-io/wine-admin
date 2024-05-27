"use client";

import { Button, Container, Text } from "@/components";
import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { LevelToEditOrDeleteInterface } from "@/typings/settings";
import { LevelsInterface } from "@/typings/data";
import { useAppState } from "@/context/appStateContext";
import { useToast } from "@/context/toastContext";

export interface EditTierLevelFormProps {
  levels: LevelsInterface;
  levelToEdit: LevelToEditOrDeleteInterface;
  onUpdate?: () => void;
  onCancel?: () => void;
}

export interface TierAndLevelInterface {
  tier: string;
  level: string;
}

export const TierLevelForm = ({
  levels,
  levelToEdit,
  onUpdate,
  onCancel,
}: EditTierLevelFormProps) => {
  const { updateToast } = useToast();
  const { updateAppLoading } = useAppState();

  const [levelToEditOrDelete, setLevelToEditOrDelete] =
    useState<LevelToEditOrDeleteInterface>({
      level: levelToEdit.level,
      price: levelToEdit.price,
      qrCodes: levelToEdit.qrCodes,
    });

  const createLevelMapInDb = httpsCallable(functions, "utils-createLevelMap");

  const updateHandler = async () => {
    updateAppLoading(true);
    const updatedLevels = {
      ...levels,
      [levelToEdit.level]: levelToEditOrDelete,
    };
    createLevelMapInDb({
      data: updatedLevels,
    })
      .then((res) => {
        onUpdate && onUpdate();
        console.log(res.data);
        updateAppLoading(false);
        updateToast({
          message: "Level Updated",
          status: "success",
          show: true,
          timeout: 3000,
        });
      })
      .catch((error) => {
        console.log(error);
        console.log(firebaseAuthErrors[error.code]);
        updateAppLoading(false);
        updateToast({
          message: "Error updating level",
          status: "error",
          show: true,
          timeout: 3000,
        });
      });
  };

  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-surface/80 backdrop-blur-sm">
      <Container
        intent="flexColCenter"
        className="bg-surface-light rounded-lg p-8 min-w-[640px] max-w-[640px]"
        gap="large"
      >
        <Container intent="flexColLeft" gap="medium">
          <Text intent="h3">Edit Level</Text>
        </Container>
        <Container intent="flexRowBetween" gap="xsmall">
          <Container intent="flexColLeft" gap="xsmall" className="w-full">
            <Text intent="p1" variant="dim">
              Level Name
            </Text>
            <input
              type="text"
              value={levelToEditOrDelete.level}
              onChange={(event: any) => {
                setLevelToEditOrDelete({
                  ...levelToEditOrDelete,
                  level: event.target.value,
                });
              }}
              className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
            />
          </Container>
          <Container intent="flexColLeft" gap="xsmall" className="w-full">
            <Text intent="p1" variant="dim">
              Price
            </Text>
            <input
              type="number"
              value={levelToEditOrDelete.price}
              onChange={(event: any) => {
                setLevelToEditOrDelete({
                  ...levelToEditOrDelete,
                  price: parseInt(event.target.value),
                });
              }}
              className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
            />
          </Container>
          <Container intent="flexColLeft" gap="xsmall" className="w-full">
            <Text intent="p1" variant="dim">
              Allowed Labels
            </Text>
            <input
              type="number"
              value={levelToEditOrDelete.qrCodes}
              onChange={(event: any) => {
                setLevelToEditOrDelete({
                  ...levelToEditOrDelete,
                  qrCodes: parseInt(event.target.value),
                });
              }}
              className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
            />
          </Container>
        </Container>
        <Container intent="flexRowRight" gap="medium" className="">
          <Button
            intent="secondary"
            size="medium"
            onClick={() => onCancel && onCancel()}
          >
            Cancel
          </Button>
          <Button
            intent="primary"
            size="medium"
            onClick={() => {
              updateHandler();
            }}
          >
            Update
          </Button>
        </Container>
      </Container>
    </div>
  );
};
