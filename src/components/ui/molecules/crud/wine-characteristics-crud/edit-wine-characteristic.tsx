"use client";

import { useState } from "react";
import { useAppState } from "@/context/appStateContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/core/card";
import { Label } from "@/components/ui/core/label";
import { Input } from "@/components/ui/core/input";
import { Button } from "@/components/ui/core/button";

export interface EditWineProps {
  titleKey: string;
  wineCharacteristicLabel: string;
  wineCharacteristic: string;
  wineCharacteristics: string[];
  onCancel: () => void;
  onSave: (newWineColours: string[]) => void;
}

export const EditWineCharacteristic = ({
  titleKey,
  wineCharacteristicLabel,
  wineCharacteristic,
  wineCharacteristics,
  onSave,
  onCancel,
}: EditWineProps) => {
  const { updateAppLoading } = useAppState();
  const [value, setValue] = useState<string>(wineCharacteristic);

  const handleUpdateWineCharacteristics = async () => {
    updateAppLoading(true);

    const newWineColours = wineCharacteristics.map((wine) => {
      if (wine === wineCharacteristic) {
        return value;
      }
      return wine;
    });

    onSave(newWineColours);
  };

  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-background/80 backdrop-blur-sm z-[100]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{`Edit Wine ${titleKey}`}</CardTitle>
          <CardDescription>
            Edit the details below and click add.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="item">{`Wine ${titleKey}`}</Label>
                <Input
                  id="item"
                  placeholder={`Wine ${titleKey} here...`}
                  type="text"
                  value={value}
                  onChange={(event: any) => {
                    setValue(event.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => onCancel && onCancel()}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleUpdateWineCharacteristics();
            }}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
