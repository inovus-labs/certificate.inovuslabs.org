"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeIcon as Certificate, Wallet, Link2, LayoutTemplate, History } from "lucide-react"
import Link from "next/link"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { useWeb3 } from "@/components/web3-provider"
import { ConnectWalletButton } from "@/components/connect-wallet-button"

export default function Dashboard() {
  const { isConnected } = useWeb3()

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage and monitor your certificate operations</p>
        </div>
        <div className="flex gap-2">{!isConnected && <ConnectWalletButton />}</div>
      </div>

      {!isConnected && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Connect your MetaMask wallet to access blockchain features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  To manage certificates on the blockchain, you need to connect your MetaMask wallet. This will allow
                  you to issue, verify, and revoke certificates.
                </p>
              </div>
              <ConnectWalletButton />
            </div>
          </CardContent>
        </Card>
      )}

      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Activity</CardTitle>
            <CardDescription>Latest operations</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Quick Actions</CardTitle>
            <CardDescription>Common management tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link
              href="/dashboard/certificates/upload"
              className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors"
            >
              <div className="mr-4 rounded-full p-2 bg-primary/10">
                <Certificate className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Issue Certificate</h3>
                <p className="text-sm text-muted-foreground">Create and issue a new certificate</p>
              </div>
            </Link>

            <Link
              href="/dashboard/templates/create"
              className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors"
            >
              <div className="mr-4 rounded-full p-2 bg-primary/10">
                <LayoutTemplate className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Create Template</h3>
                <p className="text-sm text-muted-foreground">Define a new certificate template</p>
              </div>
            </Link>

            <Link
              href="/dashboard/chains"
              className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors"
            >
              <div className="mr-4 rounded-full p-2 bg-primary/10">
                <Link2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Manage Chains</h3>
                <p className="text-sm text-muted-foreground">Configure blockchain networks</p>
              </div>
            </Link>

            <Link
              href="/dashboard/audit-logs"
              className="flex items-center p-3 rounded-lg border hover:bg-muted transition-colors"
            >
              <div className="mr-4 rounded-full p-2 bg-primary/10">
                <History className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">View Audit Logs</h3>
                <p className="text-sm text-muted-foreground">Track system activities</p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
