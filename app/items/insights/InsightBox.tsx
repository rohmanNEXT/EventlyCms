"use client";

import React from "react";
import { TrendingUp, Eye, Wifi } from "lucide-react";

type InsightType = "visitors" | "visits" | "pageviews";

const iconMap: Record<InsightType, React.ReactNode> = {
  visitors: <TrendingUp size={18} className="text-orange-600" />,
  visits: <Wifi size={18} className="text-emerald-500" />,
  pageviews: <Eye size={18} className="text-orange-400" />,
};
import { SkeletonInsightBox } from "@/components/byMe/SkeletonCard";

interface InsightBoxProps {
  label: string;
  value: number;
  type: InsightType;
  loading: boolean;
}

const InsightBox: React.FC<InsightBoxProps> = ({
  label,
  value,
  type,
  loading,
}) => {
  if (loading) return <SkeletonInsightBox />;

  return (
    <div className="bg-white/65 backdrop-blur-2xl border border-[rgba(255,107,44,0.12)] rounded-[1.25rem] shadow-[0_4px_24px_rgba(255,107,44,0.07),0_1px_4px_rgba(0,0,0,0.05)] flex items-center gap-4 p-5 h-full">
      {/* Icon */}
      <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center">
        {iconMap[type]}
      </div>

      {/* Text */}
      <div>
        <p className="text-xs text-neutral-400 uppercase">
          {label}
        </p>

        <p className="text-xl font-semibold text-neutral-800" suppressHydrationWarning>
          {value.toLocaleString('en-US')}
        </p>
      </div>
    </div>
  );
};

export default InsightBox;