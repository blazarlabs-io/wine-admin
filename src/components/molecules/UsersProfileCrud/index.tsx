"use client";

import { Container, UserAvatar, Text, Button } from "@/components";
import { UsersProfileCrudProps } from "@/typings/components";
import { Icon } from "@iconify/react";

export const UsersProfileCrud = ({
  users,
  onEdit,
  onDelete,
}: UsersProfileCrudProps) => {
  return (
    <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
      <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
        <tr>
          <th scope="col" className="px-6 py-4">
            <Text intent="p2" variant="dim">
              Avatar
            </Text>
          </th>
          <th scope="col" className="px-6 py-4">
            <Text intent="p2" variant="dim">
              Email
            </Text>
          </th>
          <th scope="col" className="px-6 py-4">
            <Text intent="p2" variant="dim">
              User ID
            </Text>
          </th>
          <th scope="col" className="px-6 py-4">
            <Text intent="p2" variant="dim">
              Created At
            </Text>
          </th>
          <th scope="col" className="px-6 py-4">
            <Text intent="p2" variant="dim">
              Last Sign In
            </Text>
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user.uid}
            className="border-b border-neutral-200 dark:border-white/10"
          >
            <td className=" truncate max-w-[220px] px-6 py-4">
              <UserAvatar
                imageUrl={user.photoURL as string}
                initials={(user.email?.charAt(0) as string) || "U"}
              />
            </td>
            <td className=" truncate max-w-[220px] px-6 py-4">
              <Text intent="p1" className="truncate">
                {user.email}
              </Text>
            </td>
            <td className="px-6 py-4 truncate max-w-[220px]">
              <Text intent="p1" className="truncate">
                {user.uid}
              </Text>
            </td>
            <td className=" truncate max-w-[220px] px-6 py-4">
              <Text intent="p1" className="truncate">
                {user.metadata.creationTime}
              </Text>
            </td>
            <td className=" truncate max-w-[220px] px-6 py-4">
              <Text intent="p1" className="truncate">
                {user.metadata.lastSignInTime}
              </Text>
            </td>
            <td className="truncate max-w-[220px] px-6 py-4 space-x-4">
              <Button
                disabled={false}
                intent="text"
                onClick={() => {
                  onEdit(user);
                }}
              >
                <Icon icon="fluent:edit-24-regular" width="20" />
              </Button>
              <Button
                intent="text"
                onClick={() => {
                  onDelete(user);
                }}
              >
                <Icon icon="fluent:delete-24-regular" width="20" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
