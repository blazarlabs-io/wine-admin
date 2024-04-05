"use client";

import { Button, Container, DropDown, Text } from "@/components";
import { SetNewPassword } from "../SetNewPasword";
import { useState } from "react";
import { UserToEditOrDeleteInterface } from "@/typings/auth";

export interface CreateNewUserProps {
  user: UserToEditOrDeleteInterface;
  onUpdate: () => void;
  onCancel: () => void;
}

export const EditUserForm = ({
  user,
  onUpdate,
  onCancel,
}: CreateNewUserProps) => {
  const [userToUpdate, setUserToUpdate] =
    useState<UserToEditOrDeleteInterface>(user);
  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-surface/80 backdrop-blur-sm">
      <Container
        intent="flexColCenter"
        className="bg-surface-light rounded-lg p-8 min-w-[640px] max-w-[640px] "
        gap="medium"
      >
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
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            Password
          </Text>
          <SetNewPassword
            onSavePassword={(password: string) => {
              userToUpdate.password = password;
            }}
          />
        </Container>
        <Container intent="flexRowBetween" gap="xsmall">
          <Container intent="flexColLeft" gap="xsmall" className="w-full">
            <Text intent="p1" variant="dim">
              Tier
            </Text>
            <DropDown
              items={["1", "2"]}
              fullWidth
              onSelect={(item: string) => {}}
            />
          </Container>
          <Container intent="flexColLeft" gap="xsmall" className="w-full">
            <Text intent="p1" variant="dim">
              Level
            </Text>
            <DropDown
              items={["Wood", "Bronze", "Silver", "Gold", "Platinum"]}
              fullWidth
              onSelect={(item: string) => {}}
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
            onClick={() => onUpdate()}
          >
            Update
          </Button>
        </Container>
      </Container>
    </div>
  );
};
