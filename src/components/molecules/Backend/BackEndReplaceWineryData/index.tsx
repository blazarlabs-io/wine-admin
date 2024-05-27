"use client";
import { Button, Container, Text, ConfirmActionDialog } from "@/components";
import { useEffect, useState } from "react";
import { SpinnerLoader } from "@/components";
import { useModal } from "@/context/modalContext";
import { useRealTimeDb } from "@/context/realTimeDbContext";
import {
  GrapesMapCoordinatesInterface,
  OldWine,
  Wine,
  Winery,
  WineryGeneralInfo,
} from "@/typings/wineries";
import { updateWineriesWithNewData } from "@/utils/firestoreUtils";
import { useToast } from "@/context/toastContext";

export const BackEndReplaceWineryData = () => {
  const { wineries } = useRealTimeDb();
  const { updateModal } = useModal();
  const { updateToast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirmationDialog, setShowConfirmationDialog] =
    useState<boolean>(false);
  const [wineryData, setWineryData] = useState<Winery[]>([]);

  const handleRun = () => {
    updateModal({
      show: true,
      title: "Are you sure?",
      description:
        "This action will replace all winery data-maps with new data-map.",
      action: {
        label: "Proceed",
        onAction: () => {
          setShowConfirmationDialog(true);
          updateModal({
            show: false,
            title: "",
            description: "",
            action: {
              label: "",
              onAction: () => {},
            },
          });
        },
      },
    });
  };

  const newWineries: Winery[] = [];

  const handleReplaceWineryDb = async () => {
    if (wineries && wineries !== undefined) {
      setLoading(true);
      await wineries.map((winery: any, wineryIndex: number) => {
        // console.log(winery);
        const newGeneralInfo: WineryGeneralInfo = {
          name:
            winery.generalInfo.name !== undefined
              ? winery.generalInfo.name
              : null,
          foundedOn:
            winery.generalInfo.foundedOn !== undefined
              ? winery.generalInfo.foundedOn
              : null,
          logo:
            winery.generalInfo.logo !== undefined
              ? winery.generalInfo.logo
              : null,
          collections:
            winery.generalInfo.collections !== undefined
              ? winery.generalInfo.collections
              : null,
          noOfProducedWines:
            winery.generalInfo.noOfProducedWines !== undefined
              ? winery.generalInfo.noOfProducedWines
              : null,
          vineyardsSurface:
            winery.generalInfo.vineyardsSurface !== undefined
              ? winery.generalInfo.vineyardsSurface
              : null,
          noOfBottlesProducedPerYear:
            winery.generalInfo.noOfBottlesProducedPerYear !== undefined
              ? winery.generalInfo.noOfBottlesProducedPerYear
              : null,
          grapeVarieties:
            winery.generalInfo.grapeVarieties !== undefined
              ? winery.generalInfo.grapeVarieties
              : null,
          lastUpdated:
            winery.generalInfo.lastUpdated !== undefined
              ? winery.generalInfo.lastUpdated
              : null,
          certifications:
            winery.generalInfo.certifications !== undefined
              ? winery.generalInfo.certifications
              : [],
          wineryHeadquarters: {
            lat: winery.generalInfo.wineryHeadquarters?.latitude || null,
            lng: winery.generalInfo.wineryHeadquarters?.longitude || null,
          },
          wineryRepresentative: {
            name: winery.generalInfo.wineryRepresentative?.name || null,
            email: winery.generalInfo.wineryRepresentative?.email || null,
            phone: winery.generalInfo.wineryRepresentative?.phone || null,
          },
        };

        newWineries.push({
          id: winery.id,
          disabled: winery.disabled,
          generalInfo: newGeneralInfo,
          isVerified: winery.isVerified || false,
          level: winery.level,
          tier: winery.tier,
          wines: [] as Wine[],
        });

        winery.wines.map((wine: OldWine, wineIndex: number) => {
          newWineries[wineryIndex].wines.push({
            referenceNumber: wine.referenceNumber,
            isMinified: true,
            generalInformation: {
              wineryName: wine.wineryName,
              wineCollectionName: wine.wineCollectionName,
              country: wine.country,
              collectionSize: "",
              bottlingYear: "",
              awardsAndRecognitions: [],
              wineImageUrl: wine.wineImageUrl,
              qrCodeUrl: wine.qrCodeUrl,
            },
            characteristics: {
              wineColour: wine.colourOfWine,
              wineType: wine.typeOfWine,
              alcoholLevel: wine.alcoholLevel,
              residualSugar: "",
              acidityLevel: "",
              tanningLevel: "",
              aromaProfile: {
                has: false,
                list: [],
              },
              flavourProfile: {
                has: false,
                list: [],
              },
              sulphiteLevel: "",
            },
            wineMakingTechnique: {
              wineMakingTechnique: "",
              isWineVegan: false,
              isWineOrganic: false,
              isWineBioDynamic: false,
              isWineNatural: false,
              sustainablePractices: {
                has: false,
                list: [],
              },
            },
            storageConditions: {
              placeForInitialStorage: "",
              storageTemperature: {
                units: ["celcius", "fahrenheit"],
                selected: {
                  unit: "celcius",
                  value: "",
                },
              },
              lightingConditions: "",
              humidityLevel: "",
              vibrationLevel: "",
            },
            packagingAndBranding: {
              bottleSize: wine.bottleSize,
              bottleType: "",
              closureType: [],
              extraPackaging: "",
              upc: wine.upc,
            },
            marketingInfo: "",
            blendComponents: [
              {
                id: "",
                name: "",
                type: "",
                ingredients: {
                  acidityRegulators: {
                    allergens: {
                      has: wine.ingredients.acidityRegulators.allergens.has,
                      list: wine.ingredients.acidityRegulators.allergens.list,
                    },
                    has: wine.ingredients.acidityRegulators.has,
                    list: wine.ingredients.acidityRegulators.list,
                  },
                  antioxidants: {
                    allergens: {
                      has: wine.ingredients.antioxidants.allergens.has,
                      list: wine.ingredients.antioxidants.allergens.list,
                    },
                    has: wine.ingredients.antioxidants.has,
                    list: wine.ingredients.antioxidants.list,
                  },
                  preservatives: {
                    allergens: {
                      has: wine.ingredients.preservatives.allergens.has,
                      list: wine.ingredients.preservatives.allergens.list,
                    },
                    has: wine.ingredients.preservatives.has,
                    list: wine.ingredients.preservatives.list,
                  },
                  stabilizers: {
                    allergens: {
                      has: wine.ingredients.stabilizers.allergens.has,
                      list: wine.ingredients.stabilizers.allergens.list,
                    },
                    has: wine.ingredients.stabilizers.has,
                    list: wine.ingredients.stabilizers.list,
                  },
                  finingAgents: {
                    allergens: {
                      has: wine.ingredients.finingAgents.allergens.has,
                      list: wine.ingredients.finingAgents.allergens.list,
                    },
                    has: wine.ingredients.finingAgents.has,
                    list: wine.ingredients.finingAgents.list,
                  },
                },
                vineyardDetails: {
                  name: "",
                  grape: {
                    name: "",
                    percentage: "",
                    vintageYear: "",
                  },
                  controlledDesignationOfOrigin:
                    wine.controlledDesignationOfOrigin,
                  coordinates: [],
                  elevation: "",
                  orientation: "",
                  soilType: "",
                  vinesAge: "",
                  irrigationPractices: [],
                },
                grapesHarvesting: {
                  vintageYear: wine.harvestYear,
                  harvestMethod: "",
                  yieldPerHectare: "",
                  selectionProcess: "",
                },
                fermentationProcess: {
                  method: "",
                  yeastType: "",
                  time: "",
                  malolactic: false,
                },
                agingProcess: {
                  vesselType: "",
                },
              },
            ],
            minifiedWine: {
              upc: wine.upc,
              wineryName: wine.wineryName,
              wineCollectionName: wine.wineCollectionName,
              country: wine.country,
              wineType: wine.typeOfWine,
              bottleSize: wine.bottleSize,
              wineColour: wine.colourOfWine,
              alcoholLevel: wine.alcoholLevel,
              controlledDesignationOfOrigin: wine.controlledDesignationOfOrigin,
              wineImageUrl: wine.wineImageUrl,
              qrCodeUrl: wine.qrCodeUrl,
              grapes: [],
              blendIngredients: {
                acidityRegulators: {
                  allergens: {
                    has: wine.ingredients.acidityRegulators.allergens.has,
                    list: wine.ingredients.acidityRegulators.allergens.list,
                  },
                  has: wine.ingredients.acidityRegulators.has,
                  list: wine.ingredients.acidityRegulators.list,
                },
                antioxidants: {
                  allergens: {
                    has: wine.ingredients.antioxidants.allergens.has,
                    list: wine.ingredients.antioxidants.allergens.list,
                  },
                  has: wine.ingredients.antioxidants.has,
                  list: wine.ingredients.antioxidants.list,
                },
                preservatives: {
                  allergens: {
                    has: wine.ingredients.preservatives.allergens.has,
                    list: wine.ingredients.preservatives.allergens.list,
                  },
                  has: wine.ingredients.preservatives.has,
                  list: wine.ingredients.preservatives.list,
                },
                stabilizers: {
                  allergens: {
                    has: wine.ingredients.stabilizers.allergens.has,
                    list: wine.ingredients.stabilizers.allergens.list,
                  },
                  has: wine.ingredients.stabilizers.has,
                  list: wine.ingredients.stabilizers.list,
                },
                finingAgents: {
                  allergens: {
                    has: wine.ingredients.finingAgents.allergens.has,
                    list: wine.ingredients.finingAgents.allergens.list,
                  },
                  has: wine.ingredients.finingAgents.has,
                  list: wine.ingredients.finingAgents.list,
                },
              },
              residualSugar: "",
            },
          });
        });
      });
      setWineryData(newWineries);
    }
  };

  const handleDbUpdate = (w: Winery[]) => {
    return new Promise(async (resolve, reject) => {
      const res = await updateWineriesWithNewData(w);
      if (res) {
        resolve(res);
      } else {
        reject("Error updating wineries with new data.");
      }
    });
  };

  useEffect(() => {
    if (wineryData && wineryData.length > 0) {
      console.log(wineryData);
      handleDbUpdate(wineryData)
        .then((res) => {
          setLoading(false);
          console.log("DB UPDATED", res);
          updateToast({
            show: true,
            status: "success",
            message: "Database updated successfully.",
            timeout: 5000,
          });
        })
        .catch((error: any) => {
          setLoading(false);
          console.log(error);
          updateToast({
            show: true,
            status: "error",
            message: "Error updating database.",
            timeout: 5000,
          });
        });
    }
  }, [wineryData]);

  return (
    <Container intent="flexRowBetween" className="">
      {showConfirmationDialog && (
        <ConfirmActionDialog
          action="PROCEED"
          onConfirm={() => {
            setShowConfirmationDialog(false);
            handleReplaceWineryDb();
          }}
          onCancel={() => {
            setShowConfirmationDialog(false);
          }}
        />
      )}
      <Container intent="flexRowLeft" gap="xsmall" className="w-full">
        <Text variant="warning" className="font-semibold">
          Proceed with caution:
        </Text>
        <Text>
          Replace each wine data-map from all wineries with new data-map.
        </Text>
      </Container>

      <Button
        intent="text"
        size="medium"
        className="min-w-fit"
        onClick={() => {
          handleRun();
        }}
      >
        {loading ? <SpinnerLoader color="#D68287" /> : "Run task"}
      </Button>
    </Container>
  );
};