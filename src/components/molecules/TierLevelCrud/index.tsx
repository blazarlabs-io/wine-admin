"use client";
import { useRealTimeDb } from "@/context/realTimeDbContext";
import { Button, Container, Text } from "@/components";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { SingleLevelInterface } from "@/typings/data";
import { TierLevelForm } from "./TierLevelForm";
import { LevelToEditOrDeleteInterface } from "@/typings/settings";

export const TierLevelCrud = ({}) => {
  const { tiers, levels } = useRealTimeDb();
  const [levelToEdit, setLevelToEdit] =
    useState<LevelToEditOrDeleteInterface | null>(null);
  return (
    <Container
      intent="flexColLeft"
      px="medium"
      py="medium"
      gap="medium"
      className=""
    >
      {levelToEdit && (
        <TierLevelForm
          level={levelToEdit}
          onCancel={() => {
            setLevelToEdit(null);
          }}
          onUpdate={() => {}}
        />
      )}
      <Container intent="flexColLeft" gap="small">
        <Text intent="h5">Available Levels</Text>
      </Container>
      <div className="w-full">
        <Container
          intent="grid-4"
          className="min-w-full text-left text-sm font-light text-surface"
        >
          <Container intent="flexRowLeft" className="px-3 py-4">
            <Text intent="p2" variant="dim">
              Level
            </Text>
          </Container>
          <Container intent="flexRowLeft" className="px-3 py-4">
            <Text intent="p2" variant="dim">
              Price
            </Text>
          </Container>
          <Container intent="flexRowLeft" className="">
            <Text intent="p2" variant="dim">
              Allowed Labels
            </Text>
          </Container>
        </Container>

        <Container intent="flexColLeft" gap="small">
          {Object.keys(levels).map((level) => {
            const key = level as keyof typeof levels;
            return (
              <>
                <Container
                  intent="grid-4"
                  px="medium"
                  py="xsmall"
                  key={level}
                  className="bg-surface-light w-full items-center rounded-md"
                >
                  <Text intent="p1" className="truncate capitalize">
                    {level}
                  </Text>
                  <Container
                    intent="flexRowLeft"
                    key={level}
                    className="bg-surface-light w-full"
                  >
                    <Text intent="p1" className="truncate capitalize">
                      ${levels[key]?.price}
                    </Text>
                  </Container>
                  <Container
                    intent="flexRowLeft"
                    key={level}
                    className="bg-surface-light w-full"
                  >
                    <Text intent="p1" className="truncate capitalize">
                      {levels[key]?.euLabels}
                    </Text>
                  </Container>

                  <Container
                    intent="flexRowRight"
                    className="truncate w-full px-3 py-4 space-x-4"
                  >
                    <Button
                      title="Edit user"
                      disabled={false}
                      intent="text"
                      onClick={() => {
                        const levelToEdit: LevelToEditOrDeleteInterface = {
                          level: key,
                          price: levels[key]?.price as number,
                          allowedLabels: levels[key]?.euLabels as number,
                        };
                        setLevelToEdit(
                          levelToEdit as LevelToEditOrDeleteInterface
                        );
                      }}
                    >
                      <Icon icon="fluent:edit-24-regular" width="20" />
                    </Button>
                    <Button
                      title="Delete user"
                      intent="text"
                      onClick={() => {
                        // onDelete(user);
                      }}
                    >
                      <Icon icon="fluent:delete-24-regular" width="20" />
                    </Button>
                  </Container>
                </Container>
              </>
            );
          })}
        </Container>
      </div>
    </Container>
  );
};
