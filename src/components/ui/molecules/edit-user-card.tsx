"use client";

import { useEffect, useState } from "react";
import { UserToEditOrDeleteInterface } from "@/typings/auth";
import { useRealTimeDb } from "@/context/realTimeDbContext";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { useWineClient } from "@/context/wineClientSdkContext";
import { useToast } from "@/components/ui/core/toast/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/core/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/core/select";
import { Button } from "../core/button";
import { Label } from "../core/label";

export interface CreateNewUserProps {
  user: UserToEditOrDeleteInterface;
  onUpdate: (userToUpdate: UserToEditOrDeleteInterface) => void;
  onCancel: () => void;
}

export interface TierAndLevelInterface {
  tier: string;
  level: string;
}

export const EditUserCard = ({
  user,
  onUpdate,
  onCancel,
}: CreateNewUserProps) => {
  const { tiers, levels } = useRealTimeDb();
  const { wineClient } = useWineClient();
  const { toast } = useToast();

  const [userToUpdate, setUserToUpdate] =
    useState<UserToEditOrDeleteInterface | null>(null);
  const [currentTierAndLevel, setCurrentTierAndLevel] =
    useState<TierAndLevelInterface | null>(null);

  useEffect(() => {
    if (user && wineClient) {
      wineClient.winery
        .getWineryTierAndLevel(user.uid)
        .then((result: any) => {
          const sanitizedMessage: any = result.data;
          setCurrentTierAndLevel(sanitizedMessage);
          setUserToUpdate({
            ...user,
            tier: sanitizedMessage.tier,
            level: sanitizedMessage.level,
          });
        })
        .catch((error: any) => {
          const errorCode = error.code;
          console.log(firebaseAuthErrors[errorCode] as string);
          toast({
            title: "Error",
            description: firebaseAuthErrors[errorCode] as string,
          });
        });
    }
  }, [wineClient, user]);

  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-background/80 backdrop-blur-sm z-[100]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Edit User</CardTitle>
          <CardDescription>
            Edit existing winery user for a customer / client.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full space-y-[16px]">
            <div>
              <Select
                onValueChange={(val: string) => {
                  setUserToUpdate({ ...userToUpdate, tier: val } as any);
                }}
              >
                <SelectGroup>
                  <SelectLabel className="px-[0px]">Tier</SelectLabel>
                </SelectGroup>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={currentTierAndLevel?.tier} />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(tiers).map((tier) => (
                    <SelectItem key={tier} value={tier}>
                      {tier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                onValueChange={(val: string) => {
                  setUserToUpdate({ ...userToUpdate, level: val } as any);
                }}
              >
                <SelectGroup>
                  <SelectLabel className="px-[0px]">Level</SelectLabel>
                </SelectGroup>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={currentTierAndLevel?.level} />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(levels).map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => onCancel && onCancel()}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onUpdate(userToUpdate as any);
            }}
          >
            Update
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
