import { Wine } from "@/typings/wineries";

export const wineSample: Wine = {
  referenceNumber: "",
  generalInformation: {
    wineryName: "",
    wineCollectionName: "",
    country: "",
    collectionSize: null,
    bottlingYear: null,
    awardsAndRecognitions: [],
    wineImageUrl: "",
    qrCodeUrl: "",
  },
  characteristics: {
    wineColour: "",
    wineType: "",
    alcoholLevel: "",
    residualSugar: "",
    acidityLevel: "",
    tanningLevel: "",
    aromaProfile: {
      has: null,
      list: [],
    },
    flavourProfile: {
      has: null,
      list: [],
    },
    sulphiteLevel: "",
  },
  wineMakingTechnique: {
    wineMakingTechnique: "",
    isWineVegan: null,
    isWineOrganic: null,
    isWineBioDynamic: null,
    isWineNatural: null,
    sustainablePractices: {
      has: null,
      list: [],
    },
  },
  storageConditions: {
    placeForInitialStorage: "",
    storageTemperature: {
      units: ["celcius", "fahrenheit"],
      selected: {
        unit: null,
        value: null,
      },
    },
    lightingConditions: "",
    humidityLevel: "",
    vibrationLevel: "",
  },
  packagingAndBranding: {
    bottleSize: "",
    bottleType: "",
    closureType: [],
    extraPackaging: "",
    upc: "",
  },
  blendComponents: [],
  marketingInfo: "",
};
