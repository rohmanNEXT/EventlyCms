"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { Select, SelectItem } from "@heroui/react";

type Visitor = {
  date: string;
  visitors: number;
};

const chartConfig: ChartConfig = {
  visitors: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
};

const ChartUnique: React.FC = () => {
  const [data, setData] = useState<Visitor[]>([]);
  const [range, setRange] = useState("24h");

useEffect(() => {
  const getData = async () => {
    const { data } = await axios.get(`/api/analytics`, {
      params: { range }
    });
    setData(data);
  };

  getData();
}, [range]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="text-4xl sm:text-5xl font-semibold text-center tracking-tight mb-14 text-neutral-800">
        Analytics Visitors
      </div>

      <Card className="w-full max-w-3xl border-[#440806]/20 bg-[#fff4ed]/60 backdrop-blur-sm shadow-lg rounded-4xl">
        <CardHeader className="flex flex-row items-center justify-between border-b border-[#440806]/20 pb-5">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold text-neutral-800">
              Visitors
            </CardTitle>
            <CardDescription className="text-neutral-500">
              By time range
            </CardDescription>
          </div>
          <Select
            selectedKeys={[range]}
            onSelectionChange={(keys) => setRange(String([...keys][0]))}
            size="sm"
            radius="full"
            variant="bordered"
            className="w-20 flex justify-center items-center border border-orange-900/20 rounded-full "
            classNames={{
              trigger:
                "h-9 min-h-0 border-orange-900/20 rounded-full bg-white/70 backdrop-blur-sm",
              value: "flex justify-center w-full mx-6 text-sm font-medium",
            }}
          >
            <SelectItem
              key="24h"
              className="flex justify-center items-center text-center rounded-full bg-orange-900/90 text-white font-medium my-1"
            >
              24h
            </SelectItem>

            <SelectItem
              key="7d"
              className="flex justify-center items-center text-center rounded-full bg-orange-900/90 text-white font-medium my-1"
            >
              7d
            </SelectItem>

            <SelectItem
              key="30d"
              className="flex justify-center items-center text-center rounded-full bg-orange-900/90 text-white font-medium my-1"
            >
              30d
            </SelectItem>
          </Select>
        </CardHeader>

        <CardContent className="pt-8 pb-6">
          <ChartContainer config={chartConfig} className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid
                  vertical={false}
                  stroke="#431407"
                  strokeDasharray="3 3"
                  opacity={0.3}
                />

                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  className="text-xs"
                  tickFormatter={(v) =>
                    new Date(v).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />

                <Area
                  dataKey="visitors"
                  type="monotone"
                  stroke="var(--color-visitors)"
                  fill="var(--color-visitors)"
                  fillOpacity={0.18}
                  strokeWidth={2}
                />

                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartUnique;
