"use client";

import {
  UserAvatar,
  Text,
  Button,
  Container,
  SpinnerLoader,
} from "@/components";
import { UserForList, UsersProfileCrudProps } from "@/typings/components";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

export const UsersProfileCrud = ({
  users,
  loading,
  onEdit,
  onDelete,
}: UsersProfileCrudProps) => {
  const [showUserDetails, setShowUserDetails] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserForList | null>(null);
  const [usersLoading, setUsersLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(loading);
    setUsersLoading(loading);
  }, [loading]);
  return (
    <>
      {showUserDetails && userDetails && (
        <div className="fixed flex items-center justify-center top-0 left-0 w-full h-full bg-surface/80 backdrop-blur-sm">
          <Container
            intent="flexColTop"
            px="large"
            py="large"
            gap="medium"
            className="max-w-fit min-w-[480px] bg-surface-light rounded-lg"
          >
            <Container intent="flexRowCenter" gap="small">
              <Icon
                icon="majesticons:user-line"
                width="40"
                height="40"
                className="text-on-surface-dark"
              />
              <Text intent="h3" variant="dim">
                User Details
              </Text>
            </Container>
            <Container intent="flexColTop" gap="medium" className="mt-[32px]">
              <Container
                intent="flexRowCenter"
                gap="small"
                className="max-w-fit"
              >
                <Container
                  intent="flexRowCenter"
                  gap="xsmall"
                  px="small"
                  py="xsmall"
                  className="max-w-fit border border-primary-light rounded-full"
                >
                  <Icon
                    icon="material-symbols:verified-outline"
                    className="w-[20px] h-[20px] text-secondary"
                  />
                  <Text intent="p2" variant="dim">
                    Tier
                  </Text>
                  <Text intent="p1" variant="accent">
                    {userDetails.tier}
                  </Text>
                </Container>
                <Container
                  intent="flexRowCenter"
                  gap="xsmall"
                  px="small"
                  py="xsmall"
                  className="max-w-fit border border-primary-light rounded-full"
                >
                  <Icon
                    icon="mage:gem-stone"
                    className="w-[20px] h-[20px] text-status-warning"
                  />
                  <Text intent="p2" variant="dim">
                    Level
                  </Text>
                  <Text intent="p1" variant="accent">
                    {userDetails.level}
                  </Text>
                </Container>
              </Container>
              <Container
                intent="flexRowBetween"
                gap="xsmall"
                py="small"
                className="border-b border-b-on-surface-dark/50"
              >
                <Text intent="p1" variant="dim" className="font-semibold">
                  Name
                </Text>
                <Text intent="p1">{userDetails.wineryName}</Text>
              </Container>
              <Container
                intent="flexRowBetween"
                gap="xsmall"
                py="small"
                className="border-b border-b-on-surface-dark/50"
              >
                <Text intent="p1" variant="dim" className="font-semibold">
                  Email
                </Text>
                <Text intent="p1">{userDetails.email}</Text>
              </Container>
              <Container
                intent="flexRowBetween"
                gap="xsmall"
                py="small"
                className="border-b border-b-on-surface-dark/50"
              >
                <Text intent="p1" variant="dim" className="font-semibold">
                  User ID
                </Text>
                <Text intent="p1">{userDetails.uid}</Text>
              </Container>
              <Container
                intent="flexRowBetween"
                gap="xsmall"
                py="small"
                className="border-b border-b-on-surface-dark/50"
              >
                <Text intent="p1" variant="dim" className="font-semibold">
                  Created At
                </Text>
                <Text intent="p1">{userDetails.metadata.creationTime}</Text>
              </Container>
              <Container
                intent="flexRowBetween"
                gap="xsmall"
                py="small"
                className="border-b border-b-on-surface-dark/50"
              >
                <Text intent="p1" variant="dim" className="font-semibold">
                  Last Sign In
                </Text>
                <Text intent="p1">{userDetails.metadata.lastSignInTime}</Text>
              </Container>
            </Container>
            <Button
              intent="primary"
              size="medium"
              className="mt-[32px]"
              onClick={() => {
                setShowUserDetails(false);
              }}
            >
              Close
            </Button>
          </Container>
        </div>
      )}

      {!loading ? (
        <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
          <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
            <tr>
              <th scope="col" className="px-3 py-4">
                <Text intent="p2" variant="dim">
                  Avatar
                </Text>
              </th>
              <th scope="col" className="px-3 py-4">
                <Text intent="p2" variant="dim">
                  Name
                </Text>
              </th>
              <th scope="col" className="px-3 py-4">
                <Text intent="p2" variant="dim">
                  Email
                </Text>
              </th>
              <th scope="col" className="px-3 py-4">
                <Text intent="p2" variant="dim">
                  User ID
                </Text>
              </th>
              <th scope="col" className="px-3 py-4">
                <Text intent="p2" variant="dim">
                  Created At
                </Text>
              </th>
              <th scope="col" className="px-3 py-4">
                <Text intent="p2" variant="dim">
                  Last Sign In
                </Text>
              </th>
            </tr>
          </thead>
          <tbody>
            <>
              {users.map((user) => {
                return (
                  <>
                    <tr
                      key={user.uid}
                      className="border-b border-neutral-200 dark:border-white/10"
                    >
                      <td className=" truncate max-w-[220px] px-3 py-4">
                        <UserAvatar
                          imageUrl={user.photoURL as string}
                          initials={(user.email?.charAt(0) as string) || "U"}
                        />
                      </td>
                      <td className=" truncate max-w-[220px] px-3 py-4">
                        <Text intent="p1" className="truncate">
                          {user.wineryName}
                        </Text>
                      </td>
                      <td className=" truncate max-w-[220px] px-3 py-4">
                        <Text intent="p1" className="truncate">
                          {user.email}
                        </Text>
                      </td>
                      <td className="px-3 py-4 truncate max-w-[120px]">
                        <Text intent="p1" className="truncate">
                          {user.uid}
                        </Text>
                      </td>
                      <td className=" truncate max-w-[180px] px-3 py-4">
                        <Text intent="p1" className="truncate">
                          {user.metadata.creationTime}
                        </Text>
                      </td>
                      <td className=" truncate max-w-[180px] px-3 py-4">
                        <Text intent="p1" className="truncate">
                          {user.metadata.lastSignInTime}
                        </Text>
                      </td>
                      <td className="truncate max-w-[220px] px-3 py-4 space-x-4">
                        <Button
                          title="Edit user"
                          disabled={false}
                          intent="text"
                          onClick={() => {
                            onEdit(user);
                          }}
                        >
                          <Icon icon="fluent:edit-24-regular" width="20" />
                        </Button>
                        <Button
                          title="Delete user"
                          intent="text"
                          onClick={() => {
                            onDelete(user);
                          }}
                        >
                          <Icon icon="fluent:delete-24-regular" width="20" />
                        </Button>
                        <Button
                          title="User details"
                          intent="text"
                          onClick={() => {
                            setShowUserDetails(true);
                            setUserDetails(user);
                          }}
                        >
                          <Icon icon="mdi:account-details" width="24" />
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </>
          </tbody>
        </table>
      ) : (
        <Container
          intent="flexColCenter"
          gap="small"
          className="w-full h-[200px]"
        >
          <SpinnerLoader width="32px" height="32px" />
        </Container>
      )}
    </>
  );
};
