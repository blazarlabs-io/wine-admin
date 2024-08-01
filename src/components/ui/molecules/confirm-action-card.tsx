"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/core/card";
import { Button } from "../core/button";
import { Text } from "../core/text";
import { Input } from "../core/input";

export interface ConfirmActionCardProps {
  action: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmActionCard = ({
  action,
  onConfirm,
  onCancel,
}: ConfirmActionCardProps) => {
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
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-background/80 backdrop-blur-sm z-[100]">
      <Card className="w-[350px]">
        <CardHeader className="space-y-[16px]">
          <CardTitle>{`Confirm ${action}`}</CardTitle>
          <CardDescription>
            Please type the word{" "}
            <span className="font-semibold text-status-error">{action}</span>{" "}
            and click confirm to proceed. This deletion cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Input
              value={value}
              placeholder={action}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="w-full flex items-center justify-between">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button disabled={isDisabled} onClick={onConfirm}>
            Confirm
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
