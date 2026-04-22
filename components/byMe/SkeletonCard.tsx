import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Skeleton Loader untuk Box Statistik (InsightBox)
 */
export function SkeletonInsightBox() {
  return (
    <div className="bg-white/65 backdrop-blur-2xl border border-[rgba(255,107,44,0.12)] rounded-[1.25rem] shadow-[0_4px_24px_rgba(255,107,44,0.07),0_1px_4px_rgba(0,0,0,0.05)] flex items-center gap-4 p-5 h-full w-full max-w-full overflow-hidden">
      <Skeleton className="w-8 h-10 rounded-2xl bg-orange-100/50 shrink-0" />
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-3 w-16 rounded-full bg-gray-200/60" />
        <Skeleton className="h-6 w-20 rounded-lg bg-gray-200/80" />
      </div>
    </div>
  );
}

/**
 * Skeleton Loader untuk Chart
 */
export function SkeletonChart() {
  return (
    <div className="bg-white/65 backdrop-blur-2xl border border-[rgba(255,107,44,0.12)] rounded-[1.25rem] shadow-sm p-6 h-[400px] w-full max-w-full flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4 mb-10">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40 rounded-lg bg-gray-200/80" />
          <Skeleton className="h-3 w-32 rounded-full bg-gray-200/60" />
        </div>
        <Skeleton className="h-10 w-24 rounded-full bg-orange-100/50 shrink-0" />
      </div>
      <div className="flex-1 flex items-end gap-2 px-2 pb-2 overflow-hidden">
        {[40, 70, 45, 90, 65, 30, 80, 55, 95, 40, 60, 75].map((height, i) => (
          <Skeleton 
            key={i} 
            className="bg-orange-100/40 rounded-t w-full" 
            style={{ height: `${height}%` }} 
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton Loader untuk Hero (Overview)
 */
export function SkeletonHero() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center text-center px-6">
      <div className="max-w-2xl w-full flex flex-col items-center">
        <Skeleton className="h-7 w-48 rounded-full bg-white border border-orange-400/30 mb-4" />
        <Skeleton className="h-12 w-full max-w-lg rounded-xl bg-gray-200/80 mt-2" />
        <Skeleton className="h-10 w-full max-w-sm rounded-xl bg-gray-200/80 mt-4" />
        <Skeleton className="h-4 w-full max-w-xs rounded-full bg-gray-200/60 mt-8" />
        <Skeleton className="h-12 w-full max-w-md rounded-full bg-white shadow-md border border-neutral-100 mt-8" />
      </div>
    </section>
  );
}

/**
 * Skeleton Loader untuk Event Card
 */
export function SkeletonEventCard() {
  return (
    <div className="bg-white/65 backdrop-blur-2xl border border-[rgba(255,107,44,0.12)] rounded-[1.25rem] shadow-[0_4px_24px_rgba(255,107,44,0.07),0_1px_4px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden h-[400px] w-full">
      <Skeleton className="h-56 w-full bg-orange-50/50 rounded-none" />
      <div className="p-4 flex flex-col flex-1 gap-3">
        <Skeleton className="h-5 w-3/4 rounded-full bg-gray-200/80" />
        <div className="flex gap-2">
          <Skeleton className="h-3 w-3 rounded-full bg-orange-200/60" />
          <Skeleton className="h-3 w-1/2 rounded-full bg-gray-200/60" />
        </div>
        <div className="space-y-2 mt-1">
          <Skeleton className="h-3 w-full rounded-full bg-gray-200/60" />
          <Skeleton className="h-3 w-[90%] rounded-full bg-gray-200/60" />
        </div>
        <div className="mt-auto">
          <Skeleton className="h-1 w-24 rounded-full bg-orange-100/50" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton Loader untuk Partner
 */
export function SkeletonPartner() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mx-5 px-6 py-4 rounded-2xl bg-white/70 border border-orange-400/60 shadow-sm min-w-[96px] h-[82px]">
      <Skeleton className="w-8 h-8 rounded-full bg-neutral-100" />
      <Skeleton className="h-2 w-12 rounded-full bg-neutral-100" />
    </div>
  );
}

/**
 * Skeleton Loader untuk Filter Sidebar
 */
export function SkeletonFilter() {
  return (
    <div className="bg-white p-5 rounded-[1.25rem] border border-[rgba(255,107,44,0.12)] shadow-sm flex flex-col gap-4 w-full">
      <Skeleton className="h-4 w-24 rounded-full bg-neutral-200 mb-2" />
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-10 w-full rounded-xl bg-orange-50/50" />
      ))}
    </div>
  );
}

/**
 * Skeleton Loader untuk Contact Form
 */
export function SkeletonContactForm() {
  return (
    <div className="bg-white/65 backdrop-blur-2xl border border-[rgba(255,107,44,0.12)] rounded-[1.25rem] p-6 md:p-10 flex flex-col gap-6 w-full max-w-xl mx-auto shadow-lg">
      <Skeleton className="h-12 w-full rounded-2xl bg-gray-200/60" />
      <Skeleton className="h-12 w-full rounded-2xl bg-gray-200/60" />
      <Skeleton className="h-[120px] w-full rounded-2xl bg-gray-200/60" />
      <Skeleton className="h-12 w-full rounded-full bg-orange-400/20" />
    </div>
  );
}

/**
 * Skeleton Loader untuk Pagination
 */
export function SkeletonPagination() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5 mt-10 px-4">
      <Skeleton className="w-8 h-8 rounded-xl bg-gray-200/80 shrink-0" />
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="w-8 h-8 rounded-xl bg-orange-100/50 shrink-0" />
      ))}
      <Skeleton className="w-8 h-8 rounded-xl bg-gray-200/80 shrink-0" />
    </div>
  );
}

/**
 * Skeleton Loader untuk Header Section (Badge)
 */
export function SkeletonHeader() {
  return (
    <Skeleton className="h-7 min-w-20 w-auto px-4 rounded-full bg-orange-50/50 border border-orange-200/30" />
  );
}

/**
 * Skeleton Loader untuk Search Bar (Explore)
 */
export function SkeletonSearch({ className }: { className?: string }) {
  return (
    <div className={cn("w-full mx-auto px-4 flex justify-center items-center", className)}>
      <div className="h-11 w-full max-w-[384px] rounded-full bg-white/60 shadow-sm border border-orange-200/40 flex items-center px-4 gap-3">
        <Skeleton className="w-4 h-4 rounded-full bg-gray-300/60 shrink-0" />
        <Skeleton className="h-3 w-28 rounded-full bg-gray-300/30" />
      </div>
    </div>
  )}

/**
 * Skeleton Loader untuk Search Bar (Explore) - Variant 2
 */
export function SkeletonSearch_2({ className }: { className?: string }) {
  return (
    <div className={cn("w-full mx-auto px-4 flex justify-center items-center", className)}>
      <div className="h-11 w-full max-w-sm rounded-full bg-white/60 shadow-sm border border-orange-200/40 flex items-center px-4 gap-3">
        <Skeleton className="w-4 h-4 rounded-full bg-gray-300/60 shrink-0" />
        <Skeleton className="h-3 w-28 rounded-full bg-gray-300/30" />
      </div>
    </div>
  )}

/**
 * Skeleton Loader untuk Teks Baris (Generic)
 */
export function SkeletonText({ className }: { className?: string }) {
  return (
    <Skeleton className={cn("rounded-full h-4 bg-neutral-200", className)} />
  );
}

/**
 * Default export
 */
export default function SkeletonCard() {
  return (
    <div className="flex items-center justify-center min-h-[300px] bg-[#030712] p-10 w-full">
      <div className="w-full max-w-[400px] rounded-2xl bg-[#111827] p-8 shadow-xl">
        <div className="flex gap-4">
          <Skeleton className="h-12 w-12 shrink-0 rounded-full bg-[#1f2937]" />
          <div className="flex flex-col gap-3 w-full pt-2">
            <Skeleton className="h-2.5 w-full rounded-full bg-[#1f2937]" />
            <Skeleton className="h-2.5 w-3/4 rounded-full bg-[#1f2937]" />
          </div>
        </div>
      </div>
    </div>
  );
}
