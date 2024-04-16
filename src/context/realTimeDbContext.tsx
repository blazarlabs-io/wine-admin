"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { LevelsInterface, TiersInterface } from "@/typings/data";

export interface RealTimeDbContextInterface {
  tiers: TiersInterface;
  levels: LevelsInterface;
}

const contextInitialData: RealTimeDbContextInterface = {
  tiers: {
    1: "euLabels",
  },
  levels: {
    bronze: null,
    diamond: null,
    gold: null,
    iron: null,
    platinum: null,
    silver: null,
  },
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

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "utils", "systemVariables"), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setTiers(data.tier);
        setLevels(data.level);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  const value = {
    tiers,
    levels,
  };

  return (
    <RealTimeDbContext.Provider value={value}>
      {children}
    </RealTimeDbContext.Provider>
  );
};
