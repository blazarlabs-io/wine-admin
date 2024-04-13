"use client";

import { Container, Button, Text } from "@/components";
import { generateRandomPassword } from "@/utils/generateRandomPassword";
import { useState } from "react";

export interface PasswordGeneratorProps {
  onClick: (password: string) => void;
}

export const PasswordGenerator = ({ onClick }: PasswordGeneratorProps) => {
  const [generated, setGenerated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  return (
    <Container intent="flexColLeft" gap="xsmall">
      <Button
        intent="text"
        disabled={generated}
        onClick={() => {
          const pws = generateRandomPassword();
          setPassword(pws);
          setGenerated(true);
          onClick(pws);
        }}
      >
        Generate new password
      </Button>
      {generated && (
        <Container intent="flexColLeft" gap="xsmall">
          <input
            type="password"
            disabled
            id=""
            value={password}
            className="bg-transparent text-on-surface-dark"
          />
          <Text intent="p2" variant="dim">
            The new pasword will be emailed to the user.
          </Text>
        </Container>
      )}
    </Container>
  );
};
