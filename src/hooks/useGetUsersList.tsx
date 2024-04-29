import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { functions } from "@/lib/firebase/client";
import { httpsCallable } from "firebase/functions";
import { UserForList } from "@/typings/components";

export const useGetUsersList = () => {
  const listAllUsers = httpsCallable(functions, "listAllUsers");
  const getWineryName = httpsCallable(functions, "getWineryName");
  const getUserTierAndLevel = httpsCallable(functions, "getUserTierAndLevel");
  const [rawUsers, setRawUsers] = useState<User[]>([]);
  const [usersList, setUsersList] = useState<UserForList[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

  useEffect(() => {
    setLoadingUsers(true);
    listAllUsers(null).then((result) => {
      // Read result of the Cloud Function.
      /** @type {any} */
      const data = result.data;
      const sanitizedMessage: any = data;
      setRawUsers(sanitizedMessage.users);
    });
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    setUsersList([]);
    rawUsers.map(async (user) => {
      const result = await getWineryName({ data: { uid: user.uid } });
      const data = result.data;
      const winerySanitizedMessage: any = data;

      getUserTierAndLevel({
        data: {
          uid: user.uid,
        },
      })
        .then((result) => {
          // Read result of the Cloud Function.
          /** @type {any} */
          const data = result.data;
          const tierAndLevelSanitizedMessage: any = data;

          setUsersList((prev) => {
            prev = prev.filter((prevUser) => prevUser.uid !== user.uid);
            return [
              ...prev,
              {
                ...user,
                wineryName: winerySanitizedMessage ?? "N/A",
                tier: tierAndLevelSanitizedMessage.tier,
                level: tierAndLevelSanitizedMessage.level,
              },
            ];
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    });
    setLoadingUsers(false);
  }, [rawUsers]);

  return { usersList, loadingUsers };
};
