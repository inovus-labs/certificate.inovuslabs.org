"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for certificate types
const data = [
  { name: "Course Completion", value: 540, color: "hsl(var(--primary))" },
  { name: "Professional Certification", value: 320, color: "hsl(var(--primary) / 0.8)" },
  { name: "Workshop Attendance", value: 210, color: "hsl(var(--primary) / 0.6)" },
  { name: "Achievement Award", value: 120, color: "hsl(var(--primary) / 0.4)" },
  { name: "Other", value: 58, color: "hsl(var(--primary) / 0.2)" },
]

export function CertificateTypeChart() {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload
                return (
                  <ChartTooltip>
                    <ChartTooltipContent
                      title={data.name}
                      content={
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: data.color }} />
                            <span>Count: {data.value}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span>{((data.value / 1248) * 100).toFixed(1)}% of total</span>
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
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
