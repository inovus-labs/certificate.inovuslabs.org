"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeIcon as Certificate, LayoutTemplate, Link2, Users } from "lucide-react"

// In a real app, this would come from your API
const statsData = {
  totalCertificates: 1248,
  activeCertificates: 1156,
  revokedCertificates: 92,
  pendingVerifications: 24,
  totalTemplates: 15,
  totalChains: 4,
  totalAdmins: 8,
}

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
          <Certificate className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statsData.totalCertificates}</div>
          <p className="text-xs text-muted-foreground">Certificates issued on blockchain</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Templates</CardTitle>
          <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statsData.totalTemplates}</div>
          <p className="text-xs text-muted-foreground">Certificate templates</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Chains</CardTitle>
          <Link2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statsData.totalChains}</div>
          <p className="text-xs text-muted-foreground">Active blockchain networks</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Admins</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{statsData.totalAdmins}</div>
          <p className="text-xs text-muted-foreground">System administrators</p>
        </CardContent>
      </Card>
    </div>
  )
}
