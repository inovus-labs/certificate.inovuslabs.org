"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CertificateChart } from "@/components/certificate-chart"
import { CertificateTypeChart } from "@/components/certificate-type-chart"
import { VerificationChart } from "@/components/verification-chart"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Certificate issuance and verification statistics</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="issuance">Issuance</TabsTrigger>
          <TabsTrigger value="verification">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Certificates</CardTitle>
                <CardDescription>All time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">+24% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Active Certificates</CardTitle>
                <CardDescription>Currently valid</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,156</div>
                <p className="text-xs text-muted-foreground">92.6% of total certificates</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Verifications</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3,427</div>
                <p className="text-xs text-muted-foreground">+12% from previous period</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Certificate Issuance</CardTitle>
                <CardDescription>Monthly certificate issuance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <CertificateChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certificate Types</CardTitle>
                <CardDescription>Distribution by certificate type</CardDescription>
              </CardHeader>
              <CardContent>
                <CertificateTypeChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="issuance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Certificate Issuance Trends</CardTitle>
              <CardDescription>Monthly certificate issuance over the past year</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <CertificateChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Activity</CardTitle>
              <CardDescription>Certificate verification trends</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <VerificationChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
