"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { LevelsInterface, TiersInterface } from "@/typings/data";
import { getTotalIncome } from "@/utils/firestoreUtils";

export interface RealTimeDbContextInterface {
  tiers: TiersInterface;
  levels: LevelsInterface;
  wineries: any;
  wineTypes: string[];
  wineColours: string[];
  wineBottleSizes: string[];
  notifications: any;
  totalWineries: number;
  totalWines: number;
  totalIncome: number;
}

const contextInitialData: RealTimeDbContextInterface = {
  tiers: {
    1: "euLabels",
  },
  levels: {
    bronze: null,
    silver: null,
    gold: null,
    platinum: null,
  },
  wineries: [],
  wineTypes: [],
  wineColours: [],
  wineBottleSizes: [],
  notifications: [],
  totalWineries: 0,
  totalWines: 0,
  totalIncome: 0,
};

const RealTimeDbContext = createContext(contextInitialData);

export const useRealTimeDb = (): RealTimeDbContextInterface => {
  const context = useContext<RealTimeDbContextInterface>(RealTimeDbContext);

  if (context === undefined) {
    throw new Error("use Provider Auth must be used as within a Provider");
  }

  return context;
};

export const RealTimeDbProvider = ({
  children,
}: React.PropsWithChildren): JSX.Element => {
  const [tiers, setTiers] = useState<TiersInterface>(contextInitialData.tiers);
  const [levels, setLevels] = useState<LevelsInterface>(
    contextInitialData.levels
  );
  const [wineries, setWineries] = useState<any>([]);
  const [wineTypes, setWineTypes] = useState<string[]>([]);
  const [wineColours, setWineColours] = useState<string[]>([]);
  const [wineBottleSizes, setWineBottleSizes] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<any>([]);
  const [totalWineries, setTotalWineries] = useState<number>(
    contextInitialData.totalWineries
  );
  const [totalWines, setTotalWines] = useState<number>(
    contextInitialData.totalWines
  );
  const [totalIncome, setTotalIncome] = useState<number>(
    contextInitialData.totalIncome
  );

  const sortLevels = (levels: LevelsInterface) => {
    const sortedLevels: LevelsInterface = {
      bronze: null,
      silver: null,
      gold: null,
      platinum: null,
    };

    Object.keys(levels)
      .sort()
      .forEach((key) => {
        sortedLevels[key as keyof LevelsInterface] =
          levels[key as keyof LevelsInterface];
      });

    return sortedLevels;
  };

  useEffect(() => {
    const unsubSysVars = onSnapshot(
      doc(db, "utils", "systemVariables"),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setTiers(data.tier);
          setLevels(sortLevels(data.level));
          setWineTypes(data.wineTypes);
          setWineColours(data.wineColours);
          setWineBottleSizes(data.wineBottleSizes);
        }
      }
    );

    const q = query(collection(db, "notifications"));
    const unsubNotifications = onSnapshot(q, (querySnapshot) => {
      const notifications: any = [];
      querySnapshot.forEach((doc) => {
        notifications.push(doc.data());
      });
      setNotifications(notifications);
    });

    const unsubWineries = onSnapshot(
      collection(db, "wineries"),
      (querySnapshot) => {
        setWineries(
          querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
        setTotalWineries(querySnapshot.size);
        querySnapshot.forEach((doc) => {
          const wines = doc.data().wines;
          if (wines) {
            setTotalWines((prev) => prev + wines.length);
          }
        });
      }
    );

    getTotalIncome()
      .then((result) => {
        console.log(result);
        // setTotalIncome(result.data.totalIncome);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      unsubSysVars();
      unsubNotifications();
      unsubWineries();
    };
  }, []);

  const value = {
    tiers,
    levels,
    wineries,
    wineTypes,
    wineColours,
    notifications,
    totalWineries,
    totalWines,
    totalIncome,
    wineBottleSizes,
  };

  return (
    <RealTimeDbContext.Provider value={value}>
      {children}
    </RealTimeDbContext.Provider>
  );
};
