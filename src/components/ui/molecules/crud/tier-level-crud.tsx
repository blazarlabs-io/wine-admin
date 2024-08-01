"use client";
import { useRealTimeDb } from "@/context/realTimeDbContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { TierLevelForm } from "./tier-level-form";
import { LevelToEditOrDeleteInterface } from "@/typings/settings";
import { Text } from "../../core/text";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../core/table";
import { Button } from "../../core/button";
import { Gauge } from "lucide-react";

export const TierLevelCrud = () => {
  const { tiers, levels } = useRealTimeDb();
  const [levelToEdit, setLevelToEdit] =
    useState<LevelToEditOrDeleteInterface | null>(null);

  return (
    <div className="w-full flex flex-col items-start justify-start p-[24px] gap-[24px] h-[560px]">
      {levelToEdit && (
        <TierLevelForm
          levels={levels}
          levelToEdit={levelToEdit}
          onCancel={() => {
            setLevelToEdit(null);
          }}
          onUpdate={() => {
            setLevelToEdit(null);
          }}
        />
      )}
      <div className="flex items-center justify-start gap-[8px]">
        <Gauge className="text-muted-foreground" />
        <Text intent="h5">Available Levels</Text>
      </div>
      <div className="w-full border rounded-lg p-[16px]">
        <Table>
          <TableCaption>A list of tiers and levels.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Level</TableHead>
              <TableHead className="">Price</TableHead>
              <TableHead className="">QR Codes</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(levels).map((level) => {
              const key = level as keyof typeof levels;
              return (
                <TableRow key={`${level}`} className="">
                  <TableCell className="font-medium">{level}</TableCell>
                  <TableCell>{levels[key]?.price}</TableCell>
                  <TableCell>{levels[key]?.qrCodes}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const levelToEdit: LevelToEditOrDeleteInterface = {
                          level: key,
                          price: levels[key]?.price as number,
                          qrCodes: levels[key]?.qrCodes as number,
                        };
                        setLevelToEdit(
                          levelToEdit as LevelToEditOrDeleteInterface
                        );
                      }}
                    >
                      <Icon icon="fluent:edit-16-regular" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
