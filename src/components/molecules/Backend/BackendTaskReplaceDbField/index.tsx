"use client";

import { Button, Container, Text } from "@/components";
import { functions } from "@/lib/firebase/client";
import { httpsCallable } from "firebase/functions";
import { useCallback, useEffect, useState } from "react";
import { SpinnerLoader } from "@/components";
import { useModal } from "@/context/modalContext";
import { useToast } from "@/context/toastContext";

export interface BackendTaskRunProps {
  name: string;
  collection?: { label: string; value: string };
  oldField?: { label: string; value: string };
  newField?: { label: string; value: string };
  onClick: () => void;
}

export const BackendTaskReplaceDbField = ({
  name,
  collection,
  oldField,
  newField,
  onClick,
}: BackendTaskRunProps) => {
  const { updateModal } = useModal();
  const { updateToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [collectionValue, setCollectionValue] = useState<string | null>(
    collection?.value || null
  );
  const [oldFieldValue, setOldFieldValue] = useState<string | null>(
    oldField?.value || null
  );
  const [newFieldValue, setNewFieldValue] = useState<string | null>(
    newField?.value || null
  );
  const [runTask, setRunTask] = useState<boolean>(false);

  const toRunfunction = httpsCallable(functions, name);

  const handleRun = useCallback(() => {
    if (collectionValue && oldFieldValue && newFieldValue) {
      console.log(
        "Running task",
        collectionValue,
        oldFieldValue,
        newFieldValue
      );
      updateModal({
        show: true,
        title: "Run Database Task",
        description:
          "Are you sure you want to run this task? This action cannot be undone.",
        action: {
          label: "Run Task",
          onAction: () => {
            setLoading(true);
            toRunfunction({
              collectionName: collectionValue,
              oldFieldName: oldFieldValue,
              newFieldName: newFieldValue,
            })
              .then((result) => {
                // Read result of the Cloud Function.
                /** @type {any} */
                const data = result.data;
                const sanitizedMessage: any = data;
                console.log(sanitizedMessage.message);
                setLoading(false);
                updateToast({
                  show: true,
                  status: "success",
                  message: "Task completed successfully.",
                  timeout: 5000,
                });
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                setLoading(false);
                updateToast({
                  show: true,
                  status: "error",
                  message: "Task failed.",
                  timeout: 5000,
                });
              });

            updateModal({
              show: false,
              title: "",
              description: "",
              action: {
                label: "",
                onAction: () => {},
              },
            });
          },
        },
      });
    }
  }, [
    collectionValue,
    oldFieldValue,
    newFieldValue,
    toRunfunction,
    updateModal,
  ]);

  return (
    <Container intent="flexRowBetween" className="">
      <Container intent="flexRowLeft" gap="medium" className="max-w-fit">
        <div className="flex flex-col items-start justify-start  gap-[8px]">
          <Text variant="dim">{collection?.label}</Text>
          <input
            type="text"
            placeholder={collection?.value}
            value={collectionValue as string}
            onChange={(event: any) => {
              setCollectionValue(event.target.value);
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </div>
        <div className="flex flex-col items-start justify-start  gap-[8px]">
          <Text variant="dim">{oldField?.label}</Text>
          <input
            type="text"
            placeholder={oldField?.value}
            value={oldFieldValue as string}
            onChange={(event: any) => {
              setOldFieldValue(event.target.value);
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </div>
        <div className="flex flex-col items-start justify-start  gap-[8px]">
          <Text variant="dim">{newField?.label}</Text>
          <input
            type="text"
            placeholder={newField?.value}
            value={newFieldValue as string}
            onChange={(event: any) => {
              setNewFieldValue(event.target.value);
            }}
            className="w-full text-on-surface p-[8px] bg-surface-dark rounded-md min-h-[48px] max-h-[48px]"
          />
        </div>
      </Container>

      <Button
        intent="text"
        size="medium"
        disabled={!collectionValue || !oldFieldValue || !newFieldValue}
        className="min-w-fit mt-[24px]"
        onClick={() => {
          onClick();
          handleRun();
        }}
      >
        {loading ? <SpinnerLoader color="#D68287" /> : "Run task"}
      </Button>
    </Container>
  );
};
