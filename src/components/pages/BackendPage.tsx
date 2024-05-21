"use client";

import {
  BackEndReplaceWineryData,
  BackEndTaskSetLevelMap,
  BackendTaskReplaceDbField,
  Container,
  Text,
} from "@/components";
import { Icon } from "@iconify/react";

export const BackendPage = () => {
  return (
    <Container
      intent="flexColLeft"
      px="large"
      gap="medium"
      className="pb-[48px]"
    >
      <Container intent="flexRowLeft" gap="xsmall">
        <Icon
          icon="solar:server-outline"
          color="#dddddd"
          width="40"
          height="40"
        />
        <Text intent="h3">Backend</Text>
      </Container>
      <Container intent="flexColLeft" gap="large">
        <Container
          intent="flexRowLeft"
          gap="xsmall"
          px="medium"
          py="small"
          className="bg-status-warning/5 rounded-lg border border-status-warning"
        >
          <Icon
            icon="ph:warning"
            className="text-status-warning"
            width="20px"
            height="20px"
          />
          <Text className="font-semibold" variant="warning">
            Warning:
          </Text>
          <Text className="" variant="warning">
            Please do not run these tasks unless you are sure of what you are
            doing.
          </Text>
        </Container>
        <Container intent="flexColLeft" gap="small">
          <Text className="font-semibold"> Task: replaceDbFieldName</Text>
          <BackendTaskReplaceDbField
            name="replaceDbFieldName"
            collection={{ label: "Collection", value: "wineries" }}
            oldField={{ label: "Old Field", value: "euLabels" }}
            newField={{ label: "New Field", value: "wines" }}
            onClick={() => {}}
          />
        </Container>
        <Container intent="flexColLeft" gap="small">
          <Text className="font-semibold">Task: createLevelMapInDb</Text>
          <BackEndTaskSetLevelMap
            name="createLevelMapInDb"
            map={{
              data: {
                bronze: { price: 0, qrCodes: 2 },
                silver: { price: 75, qrCodes: 15 },
                gold: { price: 120, qrCodes: 50 },
                platinum: { price: 230, qrCodes: 999999999 },
              },
            }}
            onClick={() => {}}
          />
        </Container>
        <Container intent="flexColLeft" gap="small">
          <Text className="font-semibold">Task: createWineColourDb</Text>
          <BackEndTaskSetLevelMap
            name="createWineColourDb"
            map={{
              data: ["Red wine", "White wine", "Rosé wine", "Orange wine"],
            }}
            onClick={() => {}}
          />
        </Container>
        <Container intent="flexColLeft" gap="small">
          <Text className="font-semibold">Task: createWineBottleSizesDb</Text>
          <BackEndTaskSetLevelMap
            name="createWineBottleSizesDb"
            map={{
              data: [
                "750ml",
                "187.5ml",
                "375ml",
                "1000ml",
                "1500ml",
                "2000ml",
                "3000ml",
                "4000ml",
                "4500ml",
                "5000ml",
                "6000ml",
                "9000ml",
                "10000ml",
                "12000ml",
                "15000ml",
              ],
            }}
            onClick={() => {}}
          />
        </Container>
        <Container intent="flexColLeft" gap="small">
          <Text className="font-semibold">Task: createAromaProfileDb</Text>
          <BackEndTaskSetLevelMap
            name="createAromaProfileDb"
            map={{
              data: [
                "Fruity",
                "Floral",
                "Earthy",
                "Spicy",
                "Herbal",
                "Nutty",
                "Woody",
              ],
            }}
            onClick={() => {}}
          />
        </Container>
        <Container intent="flexColLeft" gap="small">
          <Text className="font-semibold">Task: createFlavourProfileDb</Text>
          <BackEndTaskSetLevelMap
            name="createFlavourProfileDb"
            map={{
              data: [
                "Fruity",
                "Floral",
                "Earthy",
                "Spicy",
                "Herbal",
                "Nutty",
                "Woody",
              ],
            }}
            onClick={() => {}}
          />
        </Container>
        <Container intent="flexColLeft" gap="small">
          <Text className="font-semibold">
            Task: createSustainabilityPracticesDb
          </Text>
          <BackEndTaskSetLevelMap
            name="createSustainabilityPracticesDb"
            map={{
              data: [
                "Water management and conservation techniques",
                "Organic and biodynamic farming practices",
                "Use of renewable energy sources (solar, wind)",
                "Recycling and waste reduction programs",
                "Sustainable packaging solutions (recycled materials, lighter bottles)",
                "Integrated pest management",
                "Cover cropping and soil management",
                "Carbon footprint reduction initiatives",
                "Preservation of local biodiversity",
                "Employee and community engagement in sustainability practices",
              ],
            }}
            onClick={() => {}}
          />
        </Container>
        <Container intent="flexColLeft" gap="small">
          <Text className="font-semibold">Task: createClosureTypesDb</Text>
          <BackEndTaskSetLevelMap
            name="createClosureTypesDb"
            map={{
              data: [
                "Synthetic Cork",
                "Natural Cork",
                "Screw Cap",
                "Glass Stopper",
                "Crown Cap",
                "Zork",
                "Vinolok",
                "Wax Sea",
              ],
            }}
            onClick={() => {}}
          />
        </Container>
        <Container intent="flexColLeft" gap="small">
          <Text className="font-semibold">
            Task: createIrrigationPracticesDb
          </Text>
          <BackEndTaskSetLevelMap
            name="createIrrigationPracticesDb"
            map={{
              data: [
                "No irrigation",
                "Sprinkler Irrigation",
                "Furrow Irrigation",
                "Subsurface Drip Irrigation",
                "Micro-Sprinkler Irrigation",
                "Deficit Irrigation",
                "Partial Rootzone Drying (PRD)",
              ],
            }}
            onClick={() => {}}
          />
        </Container>
        <Container intent="flexColLeft" gap="small">
          <Text className="font-semibold">Task: replaceWineryDataDb</Text>
          <BackEndReplaceWineryData />
        </Container>
      </Container>
    </Container>
  );
};
