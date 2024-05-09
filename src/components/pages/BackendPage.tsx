"use client";

import {
  BackendTaskRun,
  Button,
  Container,
  DropDown,
  Text,
} from "@/components";
import { functions } from "@/lib/firebase/client";
import { Icon } from "@iconify/react";
import { httpsCallable } from "firebase/functions";

export const BackendPage = () => {
  const functionName = "createNewFieldWineriesDb";

  const createNewFieldWineriesDb = httpsCallable(functions, functionName);

  return (
    <Container intent="flexColLeft" px="large" gap="medium">
      <Container intent="flexRowLeft" gap="xsmall">
        <Icon
          icon="solar:server-outline"
          color="#dddddd"
          width="40"
          height="40"
        />
        <Text intent="h3">Backend</Text>
      </Container>
      <Container intent="flexColLeft" gap="xsmall">
        <Text className="font-semibold">Task to run:</Text>
        <BackendTaskRun
          name="createNewFieldWineriesDb"
          data={{
            field: "disabled",
            value: false,
          }}
          onClick={() => {}}
        />
      </Container>
    </Container>
  );
};
