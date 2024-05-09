"use client";

import { Button, Container, Text } from "@/components";
import { functions } from "@/lib/firebase/client";
import { httpsCallable } from "firebase/functions";
import { useState } from "react";
import { SpinnerLoader } from "@/components";

export interface BackendTaskRunProps {
  name: string;
  data: any;
  onClick: () => void;
}

export const BackendTaskRun = ({
  name,
  data,
  onClick,
}: BackendTaskRunProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const toRunfunction = httpsCallable(functions, name);
  return (
    <Container intent="flexRowLeft" gap="xsmall">
      <Text variant="dim">{name}</Text>
      <Button
        intent="text"
        size="medium"
        className="min-w-fit"
        onClick={() => {
          onClick();
          setLoading(true);
          toRunfunction({
            data: data,
          })
            .then((result) => {
              // Read result of the Cloud Function.
              /** @type {any} */
              const data = result.data;
              const sanitizedMessage: any = data;
              console.log(sanitizedMessage.message);
              setLoading(false);
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage);
              setLoading(false);
            });
        }}
      >
        {loading ? <SpinnerLoader color="#D68287" /> : "Run task"}
      </Button>
    </Container>
  );
};
