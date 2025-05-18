"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, Clock, XCircle } from "lucide-react"

// In a real app, this would come from your API
const activityData = [
  {
    id: 1,
    action: "Certificate Issued",
    certificateId: "CERT-2023-04-17-001",
    timestamp: "10 minutes ago",
    user: "John D.",
    status: "success",
  },
  {
    id: 2,
    action: "Certificate Revoked",
    certificateId: "CERT-2023-01-05-042",
    timestamp: "2 hours ago",
    user: "Sarah M.",
    status: "revoked",
  },
  {
    id: 3,
    action: "Batch Upload",
    certificateId: "25 certificates",
    timestamp: "Yesterday",
    user: "Mike P.",
    status: "success",
  },
  {
    id: 4,
    action: "Certificate Pending",
    certificateId: "CERT-2023-04-16-078",
    timestamp: "Yesterday",
    user: "Lisa R.",
    status: "pending",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activityData.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary">
              {activity.user
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.action}</p>
            <p className="text-sm text-muted-foreground">
              {activity.certificateId} by {activity.user}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {activity.status === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
            {activity.status === "revoked" && <XCircle className="h-4 w-4 text-red-500" />}
            {activity.status === "pending" && <Clock className="h-4 w-4 text-yellow-500" />}
            <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
