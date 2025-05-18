"use client"

import { useWeb3 } from "@/components/web3-provider"
import { Button } from "@/components/ui/button"
import { Menu, Wallet } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function DashboardHeader() {
  const { account, isConnected } = useWeb3()

  // Format account address for display
  const formattedAccount = account ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}` : ""

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>

      <div className="ml-auto flex items-center gap-4">
        {isConnected ? (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <Wallet className="h-4 w-4" />
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium">{formattedAccount}</div>
              <div className="text-xs text-muted-foreground">Connected</div>
            </div>
          </div>
        ) : (
          <ConnectWalletButton variant="outline" size="sm" />
        )}

        <div className="hidden md:block">
          <Avatar>
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
