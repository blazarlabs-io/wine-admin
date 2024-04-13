"use client";

import { Button, Container, InfoTooltip, Text } from "@/components";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { validatePassword } from "@/utils/validatePassword";

export interface SetNewPasswordProps {
  onSavePassword: (password: string) => void;
}

export const SetNewPassword = ({ onSavePassword }: SetNewPasswordProps) => {
  const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordMatchingError, setPasswordMatchingError] = useState<
    string | null
  >(null);
  const [canSave, setCanSave] = useState<boolean>(false);

  const handlePasswordValidation = (result: boolean) => {
    if (result) {
      setPasswordError(null);
    } else {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character."
      );
    }
  };

  useEffect(() => {
    if (
      password === confirmPassword &&
      password.length > 0 &&
      confirmPassword.length > 0
    ) {
      setPasswordMatchingError(null);
      setCanSave(true);
      onSavePassword(password);
    } else if (password.length > 0 && confirmPassword.length > 0) {
      setPasswordMatchingError("Passwords do not match.");
      setCanSave(false);
    }
  }, [password, confirmPassword]);

  return (
    <Container intent="flexColLeft" gap="medium">
      <Container intent="flexRowLeft" gap="small" className="w-full">
        {showPasswordInput && (
          <Container intent="flexRowLeft" gap="xsmall" className="w-full">
            <input
              type="password"
              required
              value={password}
              onChange={(event: any) => {
                const result = validatePassword(event.target.value);
                handlePasswordValidation(result);
                setPassword(event.target.value);
              }}
              className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
            />
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(event: any) => {
                const result = validatePassword(event.target.value);
                handlePasswordValidation(result);
                setConfirmPassword(event.target.value);
              }}
              className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
            />
          </Container>
        )}
        <Container
          intent="flexRowLeft"
          gap="small"
          className="min-h-[48px] max-w-fit"
        >
          <InfoTooltip
            text={
              showPasswordInput
                ? "Cancel setting new password"
                : "Set a new password for user"
            }
          >
            <Button
              intent="text"
              onClick={() => {
                if (showPasswordInput) {
                  setShowPasswordInput(false);
                } else {
                  setShowPasswordInput(true);
                }
              }}
            >
              {showPasswordInput ? (
                <Icon icon="material-symbols:cancel" width="24" height="24" />
              ) : (
                "Set New Password"
              )}
            </Button>
          </InfoTooltip>
        </Container>
      </Container>
      {passwordError && (
        <Text intent="p2" variant="error" className="opacity-[75%]">
          {passwordError}
        </Text>
      )}
      {passwordMatchingError && (
        <Text intent="p2" variant="error" className="opacity-[75%]">
          {passwordMatchingError}
        </Text>
      )}
      {showPasswordInput && canSave && (
        <Container intent="flexRowLeft" gap="xsmall">
          <Icon
            icon="ep:success-filled"
            width="20"
            height="20"
            className="text-status-success"
          />
          <Text intent="p2" variant="success" className="">
            Passwords match
          </Text>
        </Container>
      )}
    </Container>
  );
};
