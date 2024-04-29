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
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase/client";
import { ToastProps } from "@/typings/components";
import { firebaseAuthErrors } from "@/utils/firebaseAuthErrors";
import { useToast } from "@/context/toastContext";
import { useAppState } from "@/context/appStateContext";
import { generatePasswordHtml } from "@/utils/generatePasswordHtml";
import { useGetUsersList } from "@/hooks/useGetUsersList";

export const UsersPage = () => {
  const { updateModal, updateModalLoading } = useModal();
  const { updateToast } = useToast();
  const { updateAppLoading } = useAppState();
  const { usersList, loadingUsers } = useGetUsersList();

  const [showCreateNewUser, setShowCreateNewUser] = useState<boolean>(false);
  const [showEditUser, setShowEditUser] = useState<boolean>(false);
  const [userToEditOrDelete, setUserToEditOrDelete] = useState<User | null>(
    null
  );

  const createNewUser = httpsCallable(functions, "createNewUser");
  const deleteUser = httpsCallable(functions, "deleteUser");
  const sendEmail = httpsCallable(functions, "sendEmail");
  const updateUserTierAndLevel = httpsCallable(
    functions,
    "updateUserTierAndLevel"
  );

  const modalData = {
    show: false,
    title: "",
    description: "",
    action: {
      label: "",
      onAction: () => {},
    },
  };

  return (
    <>
      {showCreateNewUser && (
        <CreateNewUserForm
          onCreate={(data) => {
            setShowCreateNewUser(false);
            updateModalLoading(true);
            updateAppLoading(true);

            createNewUser({
              data: {
                email: data.email,
                password: data.password,
                tier: data.tier,
                level: data.level,
              },
            })
              .then((result) => {
                // Read result of the Cloud Function.
                /** @type {any} */
                const data = result.data;
                const sanitizedMessage: any = data;
                const toastProps: ToastProps = {
                  show: true,
                  status: "success",
                  message: "User created successfully with Tier and Level",
                  timeout: 5000,
                };

                updateAppLoading(false);
                updateToast(toastProps);
                updateModalLoading(false);

                sendEmail({
                  data: {
                    from: "it@blazarlabs.io",
                    to: sanitizedMessage.email,
                    subject: "Welcome to Blazar Labs",
                    text: `Welcome to Blazar Labs! Your account has been created successfully. Your Tier is ${sanitizedMessage.tier} and Level is ${sanitizedMessage.level}.`,
                    html: generatePasswordHtml(sanitizedMessage.password),
                  },
                })
                  .then((result) => {
                    // Read result of the Cloud Function.
                    /** @type {any} */
                    const data = result.data;
                    const sanitizedMessage: any = data;
                    console.log(sanitizedMessage.message);
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(firebaseAuthErrors[errorCode] as string);
                  });
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(firebaseAuthErrors[errorCode] as string);
                const toastProps: ToastProps = {
                  show: true,
                  status: "error",
                  message:
                    (firebaseAuthErrors[errorCode] as string) ?? errorMessage,
                  timeout: 5000,
                };
                updateToast(toastProps);
                updateModalLoading(false);
                updateAppLoading(false);
              });
          }}
          onCancel={() => setShowCreateNewUser(false)}
        />
      )}
      {showEditUser && (
        <EditUserForm
          user={userToEditOrDelete as UserToEditOrDeleteInterface}
          onUpdate={(userToUpdate: UserToEditOrDeleteInterface) => {
            console.log("USER TO UPDATE", userToUpdate);
            updateAppLoading(true);
            updateUserTierAndLevel({
              data: {
                uid: userToUpdate.uid,
                tier: userToUpdate.tier,
                level: userToUpdate.level,
              },
            })
              .then((result) => {
                // Read result of the Cloud Function.
                /** @type {any} */
                const data = result.data;
                const sanitizedMessage: any = data;
                console.log(sanitizedMessage.message);
                updateAppLoading(false);
                updateToast({
                  show: true,
                  status: "success",
                  message: "User updated successfully",
                  timeout: 3000,
                });
                setShowEditUser(false);
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(firebaseAuthErrors[errorCode] as string);
                updateAppLoading(false);
                updateToast({
                  show: true,
                  status: "error",
                  message:
                    (firebaseAuthErrors[errorCode] as string) ?? errorMessage,
                  timeout: 5000,
                });
              });
          }}
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
        <Container intent="flexColCenter" className="min-h-[134px] w-full">
          <UsersProfileCrud
            loading={loadingUsers}
            users={usersList}
            onEdit={(user: User) => {
              setUserToEditOrDelete(user);
              setShowEditUser(true);
            }}
            onDelete={(user: User) => {
              modalData.show = true;
              modalData.title = "Delete User";
              modalData.description =
                "Are you sure you want to delete this user? This operation cannot be undone.";
              modalData.action.label = "Confirm";
              modalData.action.onAction = () => {
                updateModal({ ...modalData, show: false });
                updateAppLoading(true);
                deleteUser({
                  data: {
                    uid: user.uid,
                  },
                })
                  .then((result) => {
                    // Read result of the Cloud Function.
                    /** @type {any} */
                    const data = result.data;
                    const sanitizedMessage: any = data;
                    const toastProps: ToastProps = {
                      show: true,
                      status: "success",
                      message: sanitizedMessage.message,
                      timeout: 5000,
                    };
                    updateAppLoading(false);
                    updateToast(toastProps);
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const toastProps: ToastProps = {
                      show: true,
                      status: "error",
                      message:
                        (firebaseAuthErrors[errorCode] as string) ??
                        errorMessage,
                      timeout: 5000,
                    };
                    console.log(toastProps);
                    updateAppLoading(false);
                    updateToast(toastProps);
                  });
              };
              updateModal(modalData);
            }}
          />
        </Container>
      </Container>
    </>
  );
};
