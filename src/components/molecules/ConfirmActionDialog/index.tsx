"use client";

import { Button, Container, Text } from "@/components";
import { useEffect, useState } from "react";

export interface ConfirmActionDialogProps {
  action: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmActionDialog = ({
  action,
  onConfirm,
  onCancel,
}: ConfirmActionDialogProps) => {
  const [value, setValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (value === action) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [value]);

  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-surface/80 backdrop-blur-sm">
      <Container
        intent="flexColCenter"
        className="bg-surface-light rounded-lg p-8 min-w-[520px] max-w-[520px]"
        gap="large"
      >
        <Container intent="flexColLeft" gap="medium">
          <Text intent="h3">Confirm</Text>
          <Text>
            Please type the word{" "}
            <span className="font-semibold text-status-error">{action}</span>{" "}
            and click confirm to proceed. This deletion cannot be undone.
          </Text>
        </Container>
        <Container intent="flexColLeft" gap="small">
          <input
            type="text"
            placeholder={action}
            value={value}
            onChange={(event: any) => {
              setValue(event.target.value);
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px] placeholder:text-on-surface-dark/40"
          />
        </Container>
        <Container intent="flexRowBetween" gap="xsmall">
          <Button intent="secondary" size="medium" fullWidth onClick={onCancel}>
            Cancel
          </Button>
          <Button
            intent="primary"
            size="medium"
            disabled={isDisabled}
            fullWidth
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </Container>
      </Container>
    </div>
  );
};
