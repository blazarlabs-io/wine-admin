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
  notifications: any;
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
  notifications: [],
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
  const [notifications, setNotifications] = useState<any>([]);

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

    return () => {
      unsubSysVars();
      unsubNotifications();
    };
  }, []);

  const value = {
    tiers,
    levels,
    notifications,
  };

  return (
    <RealTimeDbContext.Provider value={value}>
      {children}
    </RealTimeDbContext.Provider>
  );
};
