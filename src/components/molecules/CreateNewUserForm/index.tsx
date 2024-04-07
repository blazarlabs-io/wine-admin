"use client";

import {
  Button,
  Container,
  DropDown,
  Text,
  PasswordInput,
  PasswordGenerator,
} from "@/components";
import { NewUserInterface, UserToEditOrDeleteInterface } from "@/typings/auth";
import { createUser } from "@/utils/firebaseAuthUtils";
import { validatePassword } from "@/utils/validatePassword";
import { useEffect, useState } from "react";

export interface CreateNewUserProps {
  onCreate: (newUser: NewUserInterface) => void;
  onCancel: () => void;
}

export const CreateNewUserForm = ({
  onCreate,
  onCancel,
}: CreateNewUserProps) => {
  const [newUser, setNewUser] = useState<NewUserInterface>({
    email: "",
    password: "",
    tier: "1",
    level: "wood",
  });
  const [passwordValidationError, setPasswordValidationError] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!validatePassword(newUser.password)) {
      setPasswordValidationError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character."
      );
    } else {
      setPasswordValidationError(null);
    }
  }, [newUser.password]);

  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-surface/80 backdrop-blur-sm">
      <Container
        intent="flexColCenter"
        className="bg-surface-light rounded-lg p-8 min-w-[520px] max-w-[520px]"
        gap="medium"
      >
        <Container intent="flexColLeft" gap="medium">
          <Text intent="h3">Create New User</Text>
          <Text intent="p1" variant="dim">
            Create a new winery user for a customer / client.
          </Text>
        </Container>
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            Email
          </Text>
          <input
            type="email"
            required
            value={newUser.email}
            onChange={(event: any) => {
              newUser.email = event.target.value;
              setNewUser({ ...newUser });
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </Container>
        <Container intent="flexColLeft" gap="xsmall">
          <Text intent="p1" variant="dim">
            Password
          </Text>
          <PasswordGenerator
            onClick={(psw: string) => {
              newUser.password = psw;
              setNewUser({ ...newUser });
            }}
          />
          {/* <PasswordInput
            onChange={(value: string) => {
              // handle password change
              newUser.password = value;
              setNewUser({ ...newUser });
            }}
          />
          {passwordValidationError && (
            <Text intent="p2" variant="error">
              {passwordValidationError}
            </Text>
          )} */}
        </Container>
        <Container intent="flexRowBetween" gap="xsmall">
          <Container intent="flexColLeft" gap="xsmall" className="w-full">
            <Text intent="p1" variant="dim">
              Tier
            </Text>
            <DropDown
              items={["1", "2"]}
              fullWidth
              onSelect={(data: string) => {
                // handle tier change
                newUser.tier = data;
                setNewUser({ ...newUser });
              }}
            />
          </Container>
          <Container intent="flexColLeft" gap="xsmall" className="w-full">
            <Text intent="p1" variant="dim">
              Level
            </Text>
            <DropDown
              items={["Wood", "Bronze", "Silver", "Gold", "Platinum"]}
              fullWidth
              onSelect={(data: string) => {
                // handle level change
                newUser.level = data;
                setNewUser({ ...newUser });
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
            disabled={passwordValidationError !== null}
            intent="primary"
            size="medium"
            fullWidth
            onClick={() => {
              onCreate(newUser);
            }}
          >
            Create
          </Button>
        </Container>
      </Container>
    </div>
  );
};
