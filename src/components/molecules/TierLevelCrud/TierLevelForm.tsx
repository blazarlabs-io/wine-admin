"use client";

import { Button, Container, DropDown, SpinnerLoader, Text } from "@/components";
import { useEffect, useState } from "react";
import { UserToEditOrDeleteInterface } from "@/typings/auth";
import { useRealTimeDb } from "@/context/realTimeDbContext";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { LevelToEditOrDeleteInterface } from "@/typings/settings";

export interface EditTierLevelFormProps {
  level: LevelToEditOrDeleteInterface;
  onUpdate: (userToUpdate: LevelToEditOrDeleteInterface) => void;
  onCancel: () => void;
}

export interface TierAndLevelInterface {
  tier: string;
  level: string;
}

export const TierLevelForm = ({
  level,
  onUpdate,
  onCancel,
}: EditTierLevelFormProps) => {
  const { tiers, levels } = useRealTimeDb();
  const [userToUpdate, setUserToUpdate] =
    useState<UserToEditOrDeleteInterface | null>(null);
  const [currentTierAndLevel, setCurrentTierAndLevel] =
    useState<TierAndLevelInterface | null>(null);

  const getUserTierAndLevel = httpsCallable(functions, "getUserTierAndLevel");

  useEffect(() => {}, []);

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
              value={level.level}
              onChange={(event: any) => {}}
              className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
            />
          </Container>
          <Container intent="flexColLeft" gap="xsmall" className="w-full">
            <Text intent="p1" variant="dim">
              Level
            </Text>
            <input
              type="number"
              value={level.price}
              onChange={(event: any) => {}}
              className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
            />
          </Container>
          <Container intent="flexColLeft" gap="xsmall" className="w-full">
            <Text intent="p1" variant="dim">
              Allowed Labels
            </Text>
            <input
              type="number"
              value={level.allowedLabels}
              onChange={(event: any) => {}}
              className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
            />
          </Container>
        </Container>
        <Container intent="flexRowRight" gap="medium" className="">
          <Button intent="secondary" size="medium" onClick={() => onCancel()}>
            Cancel
          </Button>
          <Button
            intent="primary"
            size="medium"
            onClick={() => {
              //   onUpdate(userToUpdate);
            }}
          >
            Update
          </Button>
        </Container>
      </Container>
    </div>
  );
};
