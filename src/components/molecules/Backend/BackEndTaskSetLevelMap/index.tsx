/* eslint-disable react/no-unescaped-entities */
"use client";

import { Button, Container, Text } from "@/components";
import { functions } from "@/lib/firebase/client";
import { httpsCallable } from "firebase/functions";
import { useCallback, useEffect, useState } from "react";
import { SpinnerLoader } from "@/components";
import { useModal } from "@/context/modalContext";
import { useToast } from "@/context/toastContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Icon } from "@iconify/react";

export interface LevelMap {
  data: {
    bronze: {
      price: number;
      qrCodes: number;
    };
    silver: {
      price: number;
      qrCodes: number;
    };
    gold: {
      price: number;
      qrCodes: number;
    };
    platinum: {
      price: number;
      qrCodes: number;
    };
  };
}

export interface StringArray {
  data: string[];
}

export interface BackEndTaskSetLevelMapProps {
  name: string;
  map: LevelMap | StringArray;
  onClick: () => void;
}

export const BackEndTaskSetLevelMap = ({
  map,
  name,
  onClick,
}: BackEndTaskSetLevelMapProps) => {
  const { updateModal } = useModal();
  const { updateToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [mapValue, setMapValue] = useState<LevelMap | StringArray | null>(map);

  const toRunfunction = httpsCallable(functions, name);

  const handleRun = useCallback(() => {
    if (mapValue) {
      updateModal({
        show: true,
        title: "Run Database Task",
        description:
          "Are you sure you want to run this task? This action cannot be undone.",
        action: {
          label: "Run Task",
          onAction: () => {
            setLoading(true);
            toRunfunction(mapValue)
              .then((result) => {
                // Read result of the Cloud Function.
                /** @type {any} */
                const data = result.data;
                const sanitizedMessage: any = data;
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
                setLoading(false);
                updateToast({
                  show: true,
                  status: "error",
                  message: errorMessage,
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
  }, [mapValue, toRunfunction, updateModal, updateToast]);

  return (
    <Container intent="flexRowBetween" className="">
      <Container intent="flexRowLeft" gap="medium" className="w-full">
        <Disclosure
          as="div"
          className="p-6 w-full bg-surface-light rounded-lg"
          defaultOpen={false}
        >
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
              Expand to show full code
            </span>
            <Icon
              icon="mdi:chevron-down"
              className="size-6 text-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"
            />
          </DisclosureButton>
          <DisclosurePanel className="mt-2 text-sm/5 text-white/50 w-full">
            <SyntaxHighlighter
              language="javascript"
              style={darcula}
              className="w-full"
            >
              {JSON.stringify(map, null, 2)}
            </SyntaxHighlighter>
          </DisclosurePanel>
        </Disclosure>
      </Container>

      <Button
        intent="text"
        size="medium"
        disabled={!mapValue}
        className="min-w-fit"
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
