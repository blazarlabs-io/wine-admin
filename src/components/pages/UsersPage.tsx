"use client";

import {
  Button,
  Container,
  Text,
  UserProfile,
  CreateNewUserForm,
  CreateNewUserCard,
} from "@/components";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export const UsersPage = () => {
  const [showCreateNewUser, setShowCreateNewUser] = useState<boolean>(false);

  // useEffect(() => {
  //   fetch("/api/create-user").then((res) => console.log(res));
  // }, []);

  return (
    <>
      {showCreateNewUser && (
        <CreateNewUserForm
          onCreate={() => {}}
          onCancel={() => setShowCreateNewUser(false)}
        />
      )}
      <Container intent="flexColLeft" px="large" gap="medium">
        <Container intent="flexRowLeft" gap="xsmall">
          <Icon
            icon="fluent:people-24-regular"
            color="#dddddd"
            width="40"
            height="40"
          />
          <Text intent="h3">Users</Text>
        </Container>
        <CreateNewUserCard onClick={() => setShowCreateNewUser(true)} />
        <UserProfile />
      </Container>
    </>
  );
};
