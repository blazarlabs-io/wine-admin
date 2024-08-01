"use client";
import { Text } from "@/components/ui/core/text";
import { useRealTimeDb } from "@/context/realTimeDbContext";
import { PageLayout } from "../layouts/Page";
import { TierLevelCrud } from "../ui/molecules/crud/tier-level-crud";
import { WineCharacteristicsCrud } from "../ui/molecules/crud/wine-characteristics-crud";

export const SystemVariablesPage = () => {
  const { wineTypes, wineColours, wineBottleSizes } = useRealTimeDb();

  return (
    <PageLayout>
      <div className="flex items-center justify-start gap-[8px]">
        <Text intent="h4">Settings</Text>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <TierLevelCrud />
        <WineCharacteristicsCrud
          icon="ph:wine"
          titleKey="Type"
          wineCharacteristicLabel="wineTypes"
          wineCharacteristics={wineTypes}
        />
        <WineCharacteristicsCrud
          icon="clarity:color-picker-line"
          titleKey="Colour"
          wineCharacteristicLabel="wineColours"
          wineCharacteristics={wineColours}
        />
        <WineCharacteristicsCrud
          icon="la:wine-bottle"
          titleKey="Bottle Size"
          wineCharacteristicLabel="wineBottleSizes"
          wineCharacteristics={wineBottleSizes}
        />
      </div>
    </PageLayout>
  );
};
