import { User } from "firebase/auth";
import { useEffect, useRef, useState } from "react";
import { UserForList } from "@/typings/components";
import { useWineClient } from "@/context/wineClientSdkContext";

export const useGetUsersList = () => {
  const { wineClient } = useWineClient();

  const [usersList, setUsersList] = useState<UserForList[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

  const didMount = useRef(false);

  const generateList = async () => {
    setUsersList([]);
    const users = await wineClient.auth.listAllUsers();
    console.log(users);
    if (users.data) {
      await users.data.map(async (user: User) => {
        const wineryData = await wineClient.winery.getWineryData(user.uid);
        console.log(wineryData);
        setUsersList((prev: any) => [
          ...prev,
          {
            ...user,
            wineryName: wineryData.data.generalInfo.name,
            level: wineryData.data.level,
            avatar: user.photoURL,
            email: user.email,
            wines: wineryData.data.wines.length,
            createdAt: user.metadata.creationTime,
            lastSignIn: user.metadata.lastSignInTime,
          },
        ]);
      });
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    if (wineClient) {
      setLoadingUsers(true);
      console.log("fetching");
      if (!didMount.current) {
        generateList();
        didMount.current = true;
      }
    }
  }, [wineClient]);

  return { usersList, loadingUsers };
};
