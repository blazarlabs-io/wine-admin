"use client";

import {
  Button,
  Container,
  DropDown,
  Text,
  PasswordGenerator,
} from "@/components";
import { UserInterface } from "@/typings/auth";
import { emailValidator } from "@/utils/emailValidator";
import { useEffect, useState } from "react";
import { useRealTimeDb } from "@/context/realTimeDbContext";

export interface CreateNewUserProps {
  onCreate: (newUser: UserInterface) => void;
  onCancel: () => void;
}

export const CreateNewUserForm = ({
  onCreate,
  onCancel,
}: CreateNewUserProps) => {
  const { tiers, levels } = useRealTimeDb();
  const [passwordGenerated, setPasswordGenerated] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const [newUser, setNewUser] = useState<UserInterface>({
    email: "",
    password: "",
    tier: Object.keys(tiers)[0],
    level: Object.keys(levels)[0],
  });

  useEffect(() => {
    if (emailValidator(newUser.email) && passwordGenerated) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [newUser.email, passwordGenerated]);

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
              setPasswordGenerated(true);
            }}
          />
        </Container>
        <Container intent="flexRowBetween" gap="xsmall">
          <Container intent="flexColLeft" gap="xsmall" className="w-full">
            <Text intent="p1" variant="dim">
              Tier
            </Text>
            <DropDown
              items={Object.keys(tiers)}
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
              items={Object.keys(levels)}
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
            disabled={buttonDisabled}
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
