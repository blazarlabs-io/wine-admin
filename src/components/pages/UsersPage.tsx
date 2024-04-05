"use client";

import {
  Container,
  Text,
  UsersProfileCrud,
  CreateNewUserForm,
  EditUserForm,
  CreateNewUserCard,
} from "@/components";
import { UserToEditOrDeleteInterface } from "@/typings/auth";
import { Icon } from "@iconify/react";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useModal } from "@/context/modalContext";

export const UsersPage = () => {
  const { updateModal } = useModal();

  const [showCreateNewUser, setShowCreateNewUser] = useState<boolean>(false);
  const [showEditUser, setShowEditUser] = useState<boolean>(false);
  const [userToEditOrDelete, setUserToEditOrDelete] = useState<User | null>(
    null
  );
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

  const newModal = {
    show: true,
    title: "User Created",
    description: "User has been created successfully",
    action: {
      label: "Ok",
      onAction: () => {
        updateModal({
          show: false,
          title: "",
          description: "",
          action: { label: "", onAction: () => {} },
        });
      },
    },
  };

  useEffect(() => {
    fetch("/api/get-all-users").then((res) =>
      res.json().then((data) => {
        setUsers(data.data.users);
        setLoadingUsers(false);
      })
    );
  }, [updateModal]);

  return (
    <>
      {showCreateNewUser && (
        <CreateNewUserForm
          onCreate={(data) => {
            const email: string = data.email;
            const password: string = data.password;
            const tier: string = data.tier;
            const level: string = data.level;

            setShowCreateNewUser(false);
            fetch(`/api/create-user?email=${email}&password=${password}`).then(
              (res) => {
                if (res.status === 200) {
                  updateModal(newModal);
                } else {
                  newModal.title = "Error";
                  newModal.description =
                    "An error occurred while creating user";
                  updateModal(newModal);
                }
                res.json().then((data) => {
                  console.log(data.data.uid);
                  fetch(
                    `/api/init-user-db?uid=${data.data.uid}&tier=${tier}&level=${level}`
                  ).then((res) => {
                    if (res.status === 200) {
                      newModal.title = "User DB Initialized";
                      newModal.description =
                        "User DB has been initialized successfully with Tier and Level";
                      newModal.show = true;
                      newModal.action.label = "Ok";
                      newModal.action.onAction = () => {
                        updateModal({
                          show: false,
                          title: "",
                          description: "",
                          action: { label: "", onAction: () => {} },
                        });
                      };
                      updateModal(newModal);
                    }
                  });
                });
              }
            );
          }}
          onCancel={() => setShowCreateNewUser(false)}
        />
      )}
      {showEditUser && (
        <EditUserForm
          user={userToEditOrDelete as UserToEditOrDeleteInterface}
          onUpdate={() => {}}
          onCancel={() => setShowEditUser(false)}
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
        <Container intent="flexColCenter" className="min-h-[134px]">
          {loadingUsers ? (
            <Icon
              icon="svg-spinners:3-dots-bounce"
              width="48"
              height="48"
              className="text-on-surface-dark"
            />
          ) : (
            <UsersProfileCrud
              users={users}
              onEdit={(user: User) => {
                setUserToEditOrDelete(user);
                setShowEditUser(true);
              }}
              onDelete={(user: User) => {
                updateModal({
                  show: true,
                  title: "Delete User",
                  description: "Are you sure you want to delete this user?",
                  action: {
                    label: "Ok",
                    onAction: () => {
                      fetch(`/api/delete-user?uid=${user.uid}`).then((res) => {
                        if (res.status === 200) {
                          newModal.title = "User Deleted";
                          newModal.description =
                            "User has been deleted successfully";
                          newModal.show = true;
                          newModal.action.label = "Ok";
                          newModal.action.onAction = () => {
                            updateModal({
                              show: false,
                              title: "",
                              description: "",
                              action: { label: "", onAction: () => {} },
                            });
                          };
                          updateModal(newModal);
                        } else {
                          newModal.title = "Error";
                          newModal.description =
                            "An error occurred while deleting user";
                          newModal.show = true;
                          newModal.action.label = "Ok";
                          (newModal.action.onAction = () => {
                            updateModal({
                              show: false,
                              title: "",
                              description: "",
                              action: { label: "", onAction: () => {} },
                            });
                          }),
                            updateModal(newModal);
                        }
                      });
                    },
                  },
                });
              }}
            />
          )}
        </Container>
      </Container>
    </>
  );
};
