"use client";

import {
  Container,
  Text,
  TierLevelCrud,
  WineCharacteristicsCrud,
} from "@/components";
import { useRealTimeDb } from "@/context/realTimeDbContext";
import { Icon } from "@iconify/react";

export const SettingsPage = () => {
  const { wineTypes, wineColours, wineBottleSizes } = useRealTimeDb();
  return (
    <Container
      intent="flexColLeft"
      px="large"
      gap="medium"
      className="pb-[80px]"
    >
      <Container intent="flexRowLeft" gap="xsmall">
        <Icon
          icon="fluent:settings-24-regular"
          color="#dddddd"
          width="40"
          height="40"
        />
        <Text intent="h3">Settings</Text>
      </Container>
      <TierLevelCrud />
      <WineCharacteristicsCrud
        titleKey="Type"
        wineCharacteristicLabel="wineTypes"
        wineCharacteristics={wineTypes}
        backEndTask="updateWineTypesDb"
      />
      <WineCharacteristicsCrud
        titleKey="Colour"
        wineCharacteristicLabel="wineColours"
        wineCharacteristics={wineColours}
        backEndTask="updateWineColoursDb"
      />
      <WineCharacteristicsCrud
        titleKey="Bottle Size"
        wineCharacteristicLabel="wineBottleSizes"
        wineCharacteristics={wineBottleSizes}
        backEndTask="updateWineBottleSizesDb"
      />
    </Container>
  );
};
