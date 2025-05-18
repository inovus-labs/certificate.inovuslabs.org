"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for verification activity
const data = [
  { date: "Apr 10", verifications: 120 },
  { date: "Apr 11", verifications: 132 },
  { date: "Apr 12", verifications: 145 },
  { date: "Apr 13", verifications: 160 },
  { date: "Apr 14", verifications: 178 },
  { date: "Apr 15", verifications: 194 },
  { date: "Apr 16", verifications: 208 },
  { date: "Apr 17", verifications: 220 },
  { date: "Apr 18", verifications: 235 },
  { date: "Apr 19", verifications: 247 },
  { date: "Apr 20", verifications: 262 },
  { date: "Apr 21", verifications: 280 },
  { date: "Apr 22", verifications: 295 },
  { date: "Apr 23", verifications: 310 },
  { date: "Apr 24", verifications: 325 },
]

export function VerificationChart() {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVerifications" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      title={payload[0].payload.date}
                      content={
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span>Verifications: {payload[0].value}</span>
                        </div>
                      }
                    />
                  </ChartTooltip>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="verifications"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorVerifications)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
