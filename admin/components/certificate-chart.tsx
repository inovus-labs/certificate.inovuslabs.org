"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for certificate issuance
const data = [
  { month: "Jan", issued: 42, revoked: 2 },
  { month: "Feb", issued: 58, revoked: 3 },
  { month: "Mar", issued: 75, revoked: 5 },
  { month: "Apr", issued: 92, revoked: 4 },
  { month: "May", issued: 108, revoked: 6 },
  { month: "Jun", issued: 120, revoked: 8 },
  { month: "Jul", issued: 135, revoked: 7 },
  { month: "Aug", issued: 148, revoked: 9 },
  { month: "Sep", issued: 162, revoked: 10 },
  { month: "Oct", issued: 175, revoked: 8 },
  { month: "Nov", issued: 190, revoked: 12 },
  { month: "Dec", issued: 210, revoked: 15 },
]

export function CertificateChart() {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} fontSize={12} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      content={
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span>Issued: {payload[0].value}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-destructive" />
                            <span>Revoked: {payload[1].value}</span>
                          </div>
                        </div>
                      }
                    />
                  </ChartTooltip>
                )
              }
              return null
            }}
          />
          <Bar dataKey="issued" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
          <Bar dataKey="revoked" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
