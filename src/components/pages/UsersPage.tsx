"use client";

import { UserToEditOrDeleteInterface } from "@/typings/auth";
import { Icon } from "@iconify/react";
import { User } from "firebase/auth";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/core/tooltip";
import { useAppState } from "@/context/appStateContext";
import { useGetUsersList } from "@/hooks/useGetUsersList";
import { PageLayout } from "../layouts/Page";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/core/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/core/avatar";
import { Button } from "../ui/core/button";
import { LoaderCircle } from "lucide-react";
import { EditUserCard } from "../ui/molecules/edit-user-card";
import { useWineClient } from "@/context/wineClientSdkContext";
import { useToast } from "../ui/core/toast/use-toast";
import { ConfirmActionCard } from "../ui/molecules/confirm-action-card";
import { Text } from "../ui/core/text";

export const UsersPage = () => {
  const { updateAppLoading } = useAppState();
  const { usersList, loadingUsers } = useGetUsersList();
  const { wineClient } = useWineClient();
  const { toast } = useToast();

  const [showEditUser, setShowEditUser] = useState<boolean>(false);
  const [userToEditOrDelete, setUserToEditOrDelete] = useState<User | null>(
    null
  );
  const [showConfirmDeleteUser, setShowConfirmDeleteUser] =
    useState<User | null>(null);

  return (
    <PageLayout>
      {showConfirmDeleteUser && (
        <ConfirmActionCard
          action="DELETE"
          onCancel={() => {
            setShowConfirmDeleteUser(null);
          }}
          onConfirm={() => {
            setShowConfirmDeleteUser(null);
            updateAppLoading(true);
            wineClient.auth
              .deleteUser(showConfirmDeleteUser?.uid as string)
              .then((result: any) => {
                // Read result of the Cloud Function.
                /** @type {any} */
                const data = result.data;
                const sanitizedMessage: any = data;
                updateAppLoading(false);
                toast({
                  title: "Success",
                  description: sanitizedMessage,
                });
              })
              .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                updateAppLoading(false);
                toast({
                  title: "Error",
                  description: errorMessage,
                });
              });
          }}
        />
      )}

      {showEditUser && (
        <EditUserCard
          user={userToEditOrDelete as UserToEditOrDeleteInterface}
          onUpdate={(userToUpdate: UserToEditOrDeleteInterface) => {
            console.log("USER TO UPDATE", userToUpdate);
            updateAppLoading(true);
            wineClient.winery
              .updateWineryTierAndLevel({
                uid: userToUpdate.uid,
                tier: userToUpdate.tier,
                level: userToUpdate.level,
              })
              .then((result: any) => {
                // Read result of the Cloud Function.
                /** @type {any} */
                const data = result.data;
                const sanitizedMessage: any = data;
                updateAppLoading(false);

                toast({
                  title: "Success",
                  description: sanitizedMessage,
                });
                setShowEditUser(false);
              })
              .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                updateAppLoading(false);
                toast({
                  title: "Error",
                  description: errorMessage,
                });
              });
          }}
          onCancel={() => setShowEditUser(false)}
        />
      )}
      <div className="flex items-center justify-start gap-[8px]">
        <Text intent="h4">Users</Text>
      </div>
      {loadingUsers ? (
        <div className="flex items-center justify-center w-full h-[224px]">
          <LoaderCircle className="animate-spin" size={24} />
        </div>
      ) : (
        <div className="w-full">
          <Table>
            <TableCaption>A list of your clients.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Avatar</TableHead>
                <TableHead>Winery</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="">Level</TableHead>
                <TableHead className="">No. Wines</TableHead>
                <TableHead className="">Created At</TableHead>
                <TableHead className="">Last Sign In</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usersList.map((user) => (
                <TableRow key={`${user.uid + user.email}`}>
                  <TableCell className="font-medium">
                    <Avatar>
                      <AvatarImage
                        src={user?.photoURL as string}
                        alt="@shadcn"
                      />
                      <AvatarFallback>
                        {user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.wineryName || "N/A"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.level}</TableCell>
                  <TableCell>{user.wines}</TableCell>
                  <TableCell>{user.metadata.creationTime}</TableCell>
                  <TableCell>{user.metadata.lastSignInTime}</TableCell>
                  <TableCell className="text-right">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setShowEditUser(true);
                              setUserToEditOrDelete(user);
                            }}
                            className="mr-[8px]"
                          >
                            <Icon icon="fluent:edit-16-regular" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit tier and level</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              setShowConfirmDeleteUser(user);
                            }}
                          >
                            <Icon icon="fluent:delete-16-regular" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete user</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </PageLayout>
  );
};
