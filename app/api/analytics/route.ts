import axios from "axios"

export async function GET() {
  try {
  const endAt = Date.now()
  const startAt = endAt - 24 * 60 * 60 * 1000;

  const { data } = await axios.get(
    `https://cloud.umami.is/api/websites/${process.env.UMAMI_WEBSITE_ID}/pageviews?unit=day&startAt=${startAt}&endAt=${endAt}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.UMAMI_TOKEN}`
      }
    }
  )

    const pageviews = data?.pageviews ?? data ?? []

    const formatted = pageviews.map(({ x, y }: { x: string; y: number }) => ({
      date: x,
      visitors: y
    }))

    return Response.json(formatted)

  } catch {
    return Response.json(
      { status: 500 }
    )
  }
}