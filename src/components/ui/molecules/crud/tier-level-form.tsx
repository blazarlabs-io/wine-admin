"use client";

import { useState } from "react";
import { LevelToEditOrDeleteInterface } from "@/typings/settings";
import { LevelsInterface } from "@/typings/data";
import { useAppState } from "@/context/appStateContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/core/card";
import { Input } from "@/components/ui/core/input";
import { Label } from "../../core/label";
import { Button } from "../../core/button";
import { useToast } from "../../core/toast/use-toast";
import { useWineClient } from "@/context/wineClientSdkContext";

export interface EditTierLevelFormProps {
  levels: LevelsInterface;
  levelToEdit: LevelToEditOrDeleteInterface;
  onUpdate?: () => void;
  onCancel?: () => void;
}

export interface TierAndLevelInterface {
  tier: string;
  level: string;
}

export const TierLevelForm = ({
  levels,
  levelToEdit,
  onUpdate,
  onCancel,
}: EditTierLevelFormProps) => {
  const { toast } = useToast();
  const { updateAppLoading } = useAppState();
  const { wineClient } = useWineClient();

  const [levelToEditOrDelete, setLevelToEditOrDelete] =
    useState<LevelToEditOrDeleteInterface>({
      level: levelToEdit.level,
      price: levelToEdit.price,
      qrCodes: levelToEdit.qrCodes,
    });

  const updateHandler = async () => {
    updateAppLoading(true);
    const updatedLevels = {
      ...levels,
      [levelToEdit.level]: levelToEditOrDelete,
    };

    wineClient.utils
      .updateLevel({
        data: updatedLevels,
      })
      .then((res: any) => {
        updateAppLoading(false);
        onUpdate && onUpdate();
        toast({
          title: "Level Updated",
          description: "Level has been updated successfully.",
        });
      })
      .catch((err: any) => {
        updateAppLoading(false);
        onCancel && onCancel();
        toast({
          title: "Error updating level",
          description: err.message,
        });
      });
  };

  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-background/80 backdrop-blur-sm z-[100]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Edit Level</CardTitle>
          <CardDescription>
            Edit the level details below and click update.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Level Name</Label>
                <Input
                  id="name"
                  placeholder="Level name here..."
                  type="text"
                  value={levelToEditOrDelete.level}
                  onChange={(event: any) => {
                    setLevelToEditOrDelete({
                      ...levelToEditOrDelete,
                      level: event.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  placeholder="Level name here..."
                  type="number"
                  value={levelToEditOrDelete.price}
                  onChange={(event: any) => {
                    setLevelToEditOrDelete({
                      ...levelToEditOrDelete,
                      price: parseInt(event.target.value),
                    });
                  }}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="qrcodes">Allowed QR Codes</Label>
                <Input
                  id="qrcodes"
                  type="number"
                  value={levelToEditOrDelete.qrCodes}
                  onChange={(event: any) => {
                    setLevelToEditOrDelete({
                      ...levelToEditOrDelete,
                      qrCodes: parseInt(event.target.value),
                    });
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
              updateHandler();
            }}
          >
            Update
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
