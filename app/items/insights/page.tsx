"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import InsightBox from "./InsightBox";
import { SkeletonChart } from "@/components/byMe/SkeletonCard";

type Visitor = {
  date: string;
  visitors: number;
};

type StatsResponse = {
  pageviews: Visitor[];
  totalVisitors: number;
  totalPageviews: number;
  visits: number;
};

const ranges = [
  { label: "24h",  value: "24h" },
  { label: "7 days", value: "7d" },
  { label: "30 days", value: "30d" },
];

const InsightsPage: React.FC = () => {
  const [data, setData]       = useState<Visitor[]>([]);
  const [stats, setStats]     = useState<Omit<StatsResponse, "pageviews"> | null>(null);
  const [range, setRange]     = useState("30d");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data: res } = await axios.get<StatsResponse>(`/api/analytics`, {
          params: { range },
        });
        setData(Array.isArray(res.pageviews) ? res.pageviews : []);
        setStats({
          totalVisitors:  res.totalVisitors  ?? 0,
          totalPageviews: res.totalPageviews ?? 0,
          visits:              res.visits              ?? 0,  
        });
      } catch {
        setData([]);  
        setStats({ totalVisitors: 0, totalPageviews: 0, visits: 0 });
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    };
    getData();
  }, [range]);

  return (
    <div className="min-h-screen pt-28 pb-20 max-w-4xl mx-auto text-center px-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-10">
          <div className="text-3xl font-semibold text-neutral-800 mb-2">Insights </div>
          <p className="text-sm text-neutral-400 mt-1">Real-time analytics powered by Umami.</p>
        </div>

        {/* Stat boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
  <InsightBox
    label="Visitors"
    value={stats?.totalVisitors ?? 0}
    type="visitors"
    loading={loading}
  />
  <InsightBox
    label="Visits"
    value={stats?.visits ?? 0}
    type="visits"
    loading={loading}
  />
  <InsightBox
    label="Page Views"
    value={stats?.totalPageviews ?? 0}
    type="pageviews"
    loading={loading}
  />
  </div>

        {/* Chart card */}
        {loading ? (
             <SkeletonChart />
        ) : (
            <div className="bg-white/65 backdrop-blur-2xl border border-[rgba(255,107,44,0.12)] rounded-[1.25rem] shadow-[0_4px_24px_rgba(255,107,44,0.07),0_1px_4px_rgba(0,0,0,0.05)] p-6 h-[400px]">
              {/* Card header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-base font-semibold text-neutral-800">Visitor Activity</h2>
                  <p className="text-xs text-neutral-400 mt-0.5">Unique visitors over time</p>
                </div>

                {/* Range selector */}
                <div className="flex gap-1 bg-orange-50 p-1 rounded-full">
                  {ranges.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setRange(r.value)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                        range === r.value
                          ? "bg-orange-500 text-white shadow-sm"
                          : "text-neutral-500 hover:text-orange-600"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart content */}
              {data.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-neutral-400 text-sm">
                  No data available for this range.
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="visitorGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor="#FF6B2C" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#FF6B2C" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#f0e0d6" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "#a0a0a0" }}
                      tickMargin={8}
                      tickFormatter={(v) =>
                        new Date(v).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11, fill: "#a0a0a0" }}
                      tickMargin={4}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255,255,255,0.9)",
                        border: "1px solid rgba(255,107,44,0.12)",
                        borderRadius: "0.75rem",
                        boxShadow: "0 4px 20px rgba(255,107,44,0.08)",
                        fontSize: "12px",
                      }}
                      labelFormatter={(v) =>
                        new Date(v).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })
                      }
                    />
                    <Area
                      dataKey="visitors"
                      type="monotone"
                      stroke="#FF6B2C"
                      strokeWidth={2}
                      fill="url(#visitorGrad)"
                      dot={false}
                      activeDot={{ r: 4, fill: "#FF6B2C", strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
        )}

      </div>
    </div>
  );
};

export default InsightsPage;
