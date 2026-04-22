import { NextRequest } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get("range") || "7d";

    const websiteId = process.env.UMAMI_WEBSITE_ID;
    const token = process.env.UMAMI_TOKEN;

    if (!websiteId || !token) {
      return Response.json({ error: "Umami env not configured" }, { status: 500 });
    }

    const now = Date.now();
    const startAt = now - rangeToMs(range);
    const unit = range === "24h" ? "hour" : "day";

    const base = `https://cloud.umami.is/api/websites/${websiteId}`;
    const headers = { Authorization: `Bearer ${token}` };

    // Pageviews (chart)
    let pageviews: any[] = [];
    try {
      const { data } = await axios.get(
        `${base}/pageviews?unit=${unit}&startAt=${startAt}&endAt=${now}`,
        { headers }
      );

      const rawPv = data?.pageviews ?? data ?? [];
      if (Array.isArray(rawPv)) {
        pageviews = rawPv.map((item: any) => ({
          date: item.x,
          visitors: item.y,
        }));
      }
    } catch (err) {
      console.error("Pageviews error:", err);
    }

    // Stats
    let totalVisitors = 0;
    let totalPageviews = 0;
    let visits = 0;
    try {
      const { data } = await axios.get(
        `${base}/stats?startAt=${startAt}&endAt=${now}`,
        { headers }
      );

      totalVisitors =
        typeof data?.visitors === "number"
          ? data.visitors
          : data?.visitors?.value ?? 0;

      totalPageviews =
        typeof data?.pageviews === "number"
          ? data.pageviews
          : data?.pageviews?.value ?? 0;

      visits =
        typeof data?.visits === "number"
          ? data.visits
          : data?.visits?.value ?? 0;
    } catch (err) {
      console.error("Stats error:", err);
    }

    // Realtime visitors
    let activeVisitors = 0;
    try {
      const { data } = await axios.get(`${base}/active`, { headers });

      activeVisitors =
        typeof data === "number"
          ? data
          : data?.visitors ?? data?.x ?? 0;
    } catch (err) {
      console.error("Active visitors error:", err);
    }

    return Response.json({
      pageviews,
      totalVisitors,
      totalPageviews,
      visits,
      activeVisitors,
    });
  } catch (error) {
    console.error("Umami API error:", error);
    return Response.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}

function rangeToMs(range: string): number {
  const map: Record<string, number> = {
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
  };
  return map[range] ?? map["7d"];
}