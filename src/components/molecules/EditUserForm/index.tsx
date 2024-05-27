"use client";

import { Button, Container, DropDown, SpinnerLoader, Text } from "@/components";
import { SetNewPassword } from "../SetNewPasword";
import { useEffect, useState } from "react";
import { UserToEditOrDeleteInterface } from "@/typings/auth";
import { useRealTimeDb } from "@/context/realTimeDbContext";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { set } from "firebase/database";
export interface CreateNewUserProps {
  user: UserToEditOrDeleteInterface;
  onUpdate: (userToUpdate: UserToEditOrDeleteInterface) => void;
  onCancel: () => void;
}

export interface TierAndLevelInterface {
  tier: string;
  level: string;
}

export const EditUserForm = ({
  user,
  onUpdate,
  onCancel,
}: CreateNewUserProps) => {
  const { tiers, levels } = useRealTimeDb();
  const [userToUpdate, setUserToUpdate] =
    useState<UserToEditOrDeleteInterface | null>(null);
  const [currentTierAndLevel, setCurrentTierAndLevel] =
    useState<TierAndLevelInterface | null>(null);

  const getUserTierAndLevel = httpsCallable(
    functions,
    "auth-getUserTierAndLevel"
  );

  useEffect(() => {
    getUserTierAndLevel({
      data: {
        uid: user.uid,
      },
    })
      .then((result) => {
        // Read result of the Cloud Function.
        /** @type {any} */
        const data = result.data;
        const sanitizedMessage: any = data;
        setCurrentTierAndLevel(sanitizedMessage);
        setUserToUpdate({
          ...user,
          tier: sanitizedMessage.tier,
          level: sanitizedMessage.level,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(firebaseAuthErrors[errorCode] as string);
      });
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-surface/80 backdrop-blur-sm">
      <Container
        intent="flexColCenter"
        className="bg-surface-light rounded-lg p-8 min-w-[640px] max-w-[640px] min-h-[420px]"
        gap="medium"
      >
        {currentTierAndLevel && userToUpdate ? (
          <>
            <Container intent="flexColLeft" gap="medium">
              <Text intent="h3">Edit User</Text>
              <Text intent="p1" variant="dim">
                Edit existing winery user for a customer / client.
              </Text>
            </Container>
            <Container intent="flexColLeft" gap="xsmall">
              <Text intent="p1" variant="dim">
                Email
              </Text>
              <Text intent="p1">{user.email}</Text>
            </Container>
            <Container intent="flexRowBetween" gap="xsmall">
              <Container intent="flexColLeft" gap="xsmall" className="w-full">
                <Text intent="p1" variant="dim">
                  Tier
                </Text>
                <DropDown
                  items={Object.keys(tiers)}
                  fullWidth
                  selectedValue={currentTierAndLevel?.tier}
                  onSelect={(item: string) => {
                    setUserToUpdate({ ...userToUpdate, tier: item });
                  }}
                />
              </Container>
              <Container intent="flexColLeft" gap="xsmall" className="w-full">
                <Text intent="p1" variant="dim">
                  Level
                </Text>
                <DropDown
                  items={Object.keys(levels)}
                  selectedValue={currentTierAndLevel?.level}
                  fullWidth
                  onSelect={(item: string) => {
                    setUserToUpdate({ ...userToUpdate, level: item });
                  }}
                />
              </Container>
            </Container>
            <Container intent="flexRowBetween" gap="medium">
              <Button
                intent="secondary"
                size="medium"
                fullWidth
                onClick={() => onCancel()}
              >
                Cancel
              </Button>
              <Button
                intent="primary"
                size="medium"
                fullWidth
                onClick={() => {
                  onUpdate(userToUpdate);
                }}
              >
                Update
              </Button>
            </Container>
          </>
        ) : (
          <SpinnerLoader width="40px" height="40px" color="#ddd" />
        )}
      </Container>
    </div>
  );
};
