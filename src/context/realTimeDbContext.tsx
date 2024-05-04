"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { LevelsInterface, TiersInterface } from "@/typings/data";

export interface RealTimeDbContextInterface {
  tiers: TiersInterface;
  levels: LevelsInterface;
  wineTypes: string[];
  notifications: any;
  totalWineries: number;
  totalEuLabels: number;
}

const contextInitialData: RealTimeDbContextInterface = {
  tiers: {
    1: "euLabels",
  },
  levels: {
    bronze: null,
    silver: null,
    gold: null,
    diamond: null,
  },
  wineTypes: [],
  notifications: [],
  totalWineries: 0,
  totalEuLabels: 0,
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
  const [wineTypes, setWineTypes] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<any>([]);
  const [totalWineries, setTotalWineries] = useState<number>(
    contextInitialData.totalWineries
  );
  const [totalEuLabels, setTotalEuLabels] = useState<number>(
    contextInitialData.totalEuLabels
  );

  const sortLevels = (levels: LevelsInterface) => {
    const sortedLevels: LevelsInterface = {
      bronze: null,
      silver: null,
      gold: null,
      diamond: null,
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
        setTotalWineries(querySnapshot.size);
        querySnapshot.forEach((doc) => {
          const euLabels = doc.data().euLabels;
          if (euLabels) {
            setTotalEuLabels((prev) => prev + euLabels.length);
          }
        });
      }
    );

    return () => {
      unsubSysVars();
      unsubNotifications();
      unsubWineries();
    };
  }, []);

  const value = {
    tiers,
    levels,
    wineTypes,
    notifications,
    totalWineries,
    totalEuLabels,
  };

  return (
    <RealTimeDbContext.Provider value={value}>
      {children}
    </RealTimeDbContext.Provider>
  );
};
