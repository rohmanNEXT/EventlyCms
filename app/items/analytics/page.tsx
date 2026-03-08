"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"

import { LineChart, Line, XAxis, YAxis } from "recharts"

type Visitor = {
  date: string
  visitors: number
}

const VisitorsChart: React.FC = () => {
  const [data, setData] = useState<Visitor[]>([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get("/api/analytics")
      setData(data)
    }

    getData()
  }, [])

  return (
    <ChartContainer config={{ visitors: { label: "Visitors" } }}>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line dataKey="visitors" />
      </LineChart>
    </ChartContainer>
  )
}

export default VisitorsChart