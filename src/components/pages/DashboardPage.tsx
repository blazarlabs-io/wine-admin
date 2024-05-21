"use client";

import { Container, DashboardStatCard, Text } from "@/components";
import { Icon } from "@iconify/react";
import { useRealTimeDb } from "@/context/realTimeDbContext";

export const DashboardPage = () => {
  const { totalWineries, totalWines, totalIncome } = useRealTimeDb();
  return (
    <Container intent="flexRowWrap" px="large" gap="medium">
      <Container intent="flexRowLeft" gap="xsmall">
        <Icon
          icon="fluent:home-24-regular"
          color="#dddddd"
          width="40"
          height="40"
        />
        <Text intent="h3">Dashboard</Text>
      </Container>
      <DashboardStatCard
        title="Wineries"
        stat={totalWineries}
        icon="ph:farm-fill"
      />
      <DashboardStatCard
        title="QR Codes"
        stat={totalWines}
        icon="ic:baseline-qr-code"
      />
      <DashboardStatCard
        title="Yearly Income"
        stat={"$" + totalIncome}
        icon="solar:money-bag-linear"
      />
    </Container>
  );
};
