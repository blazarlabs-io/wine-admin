"use client";

import { Icon } from "@iconify/react";
import { useRealTimeDb } from "@/context/realTimeDbContext";
import { PageLayout } from "@/components/layouts/Page";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/core/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/core/chart";
import { Separator } from "../ui/core/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/core/avatar";
import { Text } from "../ui/core/text";

export const DashboardPage = () => {
  const { totalWineries, totalWines, totalIncome } = useRealTimeDb();
  return (
    <PageLayout>
      <div className="flex items-center justify-start gap-[8px]">
        <Text intent="h4">Dashboard</Text>
      </div>
      <div className="grid grid-cols-3 w-full h-full gap-[24px]">
        <div className="flex flex-col items-start justify-between gap-[24px]">
          <div className="p-[16px] flex items-center justify-center gap-[16px] border w-full rounded-lg">
            <div className="flex items-center min-w-[196px] gap-[16px]">
              <div className="flex items-start justify-start max-w-fit">
                <Icon
                  icon={"ph:farm-fill"}
                  width="80px"
                  className="text-foreground/60"
                />
              </div>
              <div className="flex flex-col items-start justify-start">
                <Text intent="h3" className="max-w-fit">
                  {totalWineries}
                </Text>
                <span className="max-w-fit opacity-75">Wineries</span>
              </div>
            </div>
            <Separator orientation="vertical" />
            {/*  */}
            <div className="w-full h-full">
              <ChartContainer
                config={{
                  time: {
                    label: "Time",
                    color: "hsl(var(--primary))",
                  },
                }}
              >
                <AreaChart
                  accessibilityLayer
                  data={[
                    {
                      date: "2024-01-01",
                      time: 8.5,
                    },
                    {
                      date: "2024-01-02",
                      time: 7.2,
                    },
                    {
                      date: "2024-01-03",
                      time: 8.1,
                    },
                    {
                      date: "2024-01-04",
                      time: 6.2,
                    },
                    {
                      date: "2024-01-05",
                      time: 5.2,
                    },
                    {
                      date: "2024-01-06",
                      time: 8.1,
                    },
                    {
                      date: "2024-01-07",
                      time: 7.0,
                    },
                  ]}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="date" hide />
                  <YAxis domain={["dataMin - 1", "dataMax + 2"]} hide />
                  <defs>
                    <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="time"
                    type="natural"
                    fill="url(#fillTime)"
                    fillOpacity={0.4}
                    stroke="hsl(var(--primary))"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    formatter={(value) => (
                      <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                        Time in bed
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {value}
                          <span className="font-normal text-muted-foreground">
                            hr
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
          <div className="p-[16px] flex items-center justify-center gap-[16px] border w-full rounded-lg">
            <div className="flex items-center min-w-[196px] gap-[16px]">
              <div className="flex items-start justify-start max-w-fit">
                <Icon
                  icon={"ic:baseline-qr-code"}
                  width="80px"
                  className="text-foreground/60"
                />
              </div>
              <div className="flex flex-col items-start justify-start min-w-fit">
                <Text intent="h3" className="min-w-fit">
                  {totalWines}
                </Text>
                <span className="min-w-fit opacity-75">QR Codes</span>
              </div>
            </div>
            {/*  */}
            <Separator orientation="vertical" />
            <div className="w-full h-full">
              <ChartContainer
                config={{
                  time: {
                    label: "Time",
                    color: "hsl(var(--primary))",
                  },
                }}
              >
                <AreaChart
                  accessibilityLayer
                  data={[
                    {
                      date: "2024-01-01",
                      time: 8.5,
                    },
                    {
                      date: "2024-01-02",
                      time: 7.2,
                    },
                    {
                      date: "2024-01-03",
                      time: 8.1,
                    },
                    {
                      date: "2024-01-04",
                      time: 6.2,
                    },
                    {
                      date: "2024-01-05",
                      time: 5.2,
                    },
                    {
                      date: "2024-01-06",
                      time: 8.1,
                    },
                    {
                      date: "2024-01-07",
                      time: 7.0,
                    },
                  ]}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="date" hide />
                  <YAxis domain={["dataMin - 1", "dataMax + 2"]} hide />
                  <defs>
                    <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="time"
                    type="natural"
                    fill="url(#fillTime)"
                    fillOpacity={0.4}
                    stroke="hsl(var(--primary))"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    formatter={(value) => (
                      <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                        Time in bed
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {value}
                          <span className="font-normal text-muted-foreground">
                            hr
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
          <div className="p-[16px] flex items-center justify-center gap-[16px] border w-full rounded-lg">
            <div className="flex items-center min-w-[196px] gap-[16px]">
              <div className="flex items-start justify-start min-w-fit">
                <Icon
                  icon={"solar:money-bag-linear"}
                  width="72px"
                  className="text-foreground/60"
                />
              </div>
              <div className="flex flex-col items-start justify-start min-w-fit">
                <Text intent="h3" className="max-w-fit">
                  {"$" + totalIncome}
                </Text>
                <span className="max-w-fit opacity-75">Yearly Income</span>
              </div>
            </div>
            <Separator orientation="vertical" />
            <div className="w-full h-full">
              <ChartContainer
                config={{
                  time: {
                    label: "Time",
                    color: "hsl(var(--primary))",
                  },
                }}
              >
                <AreaChart
                  accessibilityLayer
                  data={[
                    {
                      date: "2024-01-01",
                      time: 8.5,
                    },
                    {
                      date: "2024-01-02",
                      time: 7.2,
                    },
                    {
                      date: "2024-01-03",
                      time: 8.1,
                    },
                    {
                      date: "2024-01-04",
                      time: 6.2,
                    },
                    {
                      date: "2024-01-05",
                      time: 5.2,
                    },
                    {
                      date: "2024-01-06",
                      time: 8.1,
                    },
                    {
                      date: "2024-01-07",
                      time: 7.0,
                    },
                  ]}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="date" hide />
                  <YAxis domain={["dataMin - 1", "dataMax + 2"]} hide />
                  <defs>
                    <linearGradient id="fillTime" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    dataKey="time"
                    type="natural"
                    fill="url(#fillTime)"
                    fillOpacity={0.4}
                    stroke="hsl(var(--primary))"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                    formatter={(value) => (
                      <div className="flex min-w-[120px] items-center text-xs text-muted-foreground">
                        Time in bed
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          {value}
                          <span className="font-normal text-muted-foreground">
                            hr
                          </span>
                        </div>
                      </div>
                    )}
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </div>
        </div>
        {/*  */}
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Olivia Martin
                </p>
                <p className="text-sm text-muted-foreground">
                  olivia.martin@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$1,999.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/02.png" alt="Avatar" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Jackson Lee</p>
                <p className="text-sm text-muted-foreground">
                  jackson.lee@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$39.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/03.png" alt="Avatar" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Isabella Nguyen
                </p>
                <p className="text-sm text-muted-foreground">
                  isabella.nguyen@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$299.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/04.png" alt="Avatar" />
                <AvatarFallback>WK</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">William Kim</p>
                <p className="text-sm text-muted-foreground">will@email.com</p>
              </div>
              <div className="ml-auto font-medium">+$99.00</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/05.png" alt="Avatar" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">
                  sofia.davis@email.com
                </p>
              </div>
              <div className="ml-auto font-medium">+$39.00</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};
