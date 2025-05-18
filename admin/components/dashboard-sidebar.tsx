"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  BadgeIcon as Certificate,
  ChevronDown,
  FileSpreadsheet,
  Home,
  LogOut,
  Settings,
  Upload,
  Users,
  Wallet,
  FileText,
  Link2,
  History,
  LayoutTemplate,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/components/web3-provider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { isConnected, isOwner, disconnectWallet } = useWeb3()
  const [certificatesOpen, setCertificatesOpen] = useState(true)
  const [templatesOpen, setTemplatesOpen] = useState(false)
  const [chainsOpen, setChainsOpen] = useState(false)
  const [adminsOpen, setAdminsOpen] = useState(false)

  const certificateLinks = [
    {
      name: "Overview",
      href: "/dashboard/certificates",
      icon: Certificate,
    },
    {
      name: "Single Upload",
      href: "/dashboard/certificates/upload",
      icon: Upload,
    },
    {
      name: "Batch Upload",
      href: "/dashboard/certificates/batch-upload",
      icon: FileSpreadsheet,
    },
    {
      name: "Revoked",
      href: "/dashboard/certificates/revoked",
      icon: XCircle,
    },
    {
      name: "Analytics",
      href: "/dashboard/certificates/analytics",
      icon: BarChart3,
    },
  ]

  const templateLinks = [
    {
      name: "All Templates",
      href: "/dashboard/templates",
      icon: FileText,
    },
    {
      name: "Create Template",
      href: "/dashboard/templates/create",
      icon: Upload,
    },
  ]

  const chainLinks = [
    {
      name: "All Chains",
      href: "/dashboard/chains",
      icon: Link2,
    },
    {
      name: "Add Chain",
      href: "/dashboard/chains/create",
      icon: Upload,
    },
  ]

  const adminLinks = [
    {
      name: "All Admins",
      href: "/dashboard/admins",
      icon: Users,
    },
    {
      name: "Add Admin",
      href: "/dashboard/admins/create",
      icon: Upload,
    },
  ]

  const mainLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Connect Wallet",
      href: "/dashboard/connect-wallet",
      icon: Wallet,
      show: !isConnected,
    },
    {
      name: "Audit Logs",
      href: "/dashboard/audit-logs",
      icon: History,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-80 bg-card border-r">
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
          <h1 className="text-lg font-semibold">Inovus Labs</h1>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {mainLinks.map((link) => {
            if (link.show === false) return null

            const isActive = pathname === link.href

            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                )}
              >
                <link.icon className={cn("mr-3 h-5 w-5 flex-shrink-0")} />
                {link.name}
              </Link>
            )
          })}

          <Collapsible open={certificatesOpen} onOpenChange={setCertificatesOpen} className="w-full">
            <CollapsibleTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md",
                  pathname.includes("/dashboard/certificates")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                <div className="flex items-center">
                  <Certificate className="mr-3 h-5 w-5 flex-shrink-0" />
                  Certificates
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    certificatesOpen ? "transform rotate-180" : "",
                  )}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-10 space-y-1 mt-1">
              {certificateLinks.map((link) => {
                const isActive = pathname === link.href

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    <link.icon className={cn("mr-3 h-4 w-4 flex-shrink-0")} />
                    {link.name}
                  </Link>
                )
              })}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={templatesOpen} onOpenChange={setTemplatesOpen} className="w-full">
            <CollapsibleTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md",
                  pathname.includes("/dashboard/templates")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                <div className="flex items-center">
                  <LayoutTemplate className="mr-3 h-5 w-5 flex-shrink-0" />
                  Templates
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    templatesOpen ? "transform rotate-180" : "",
                  )}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-10 space-y-1 mt-1">
              {templateLinks.map((link) => {
                const isActive = pathname === link.href

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    <link.icon className={cn("mr-3 h-4 w-4 flex-shrink-0")} />
                    {link.name}
                  </Link>
                )
              })}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={chainsOpen} onOpenChange={setChainsOpen} className="w-full">
            <CollapsibleTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md",
                  pathname.includes("/dashboard/chains")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                <div className="flex items-center">
                  <Link2 className="mr-3 h-5 w-5 flex-shrink-0" />
                  Chains
                </div>
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", chainsOpen ? "transform rotate-180" : "")}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-10 space-y-1 mt-1">
              {chainLinks.map((link) => {
                const isActive = pathname === link.href

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    <link.icon className={cn("mr-3 h-4 w-4 flex-shrink-0")} />
                    {link.name}
                  </Link>
                )
              })}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={adminsOpen} onOpenChange={setAdminsOpen} className="w-full">
            <CollapsibleTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center justify-between px-2 py-2 text-sm font-medium rounded-md",
                  pathname.includes("/dashboard/admins")
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                <div className="flex items-center">
                  <Users className="mr-3 h-5 w-5 flex-shrink-0" />
                  Admins
                </div>
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-200", adminsOpen ? "transform rotate-180" : "")}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-10 space-y-1 mt-1">
              {adminLinks.map((link) => {
                const isActive = pathname === link.href

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    <link.icon className={cn("mr-3 h-4 w-4 flex-shrink-0")} />
                    {link.name}
                  </Link>
                )
              })}
            </CollapsibleContent>
          </Collapsible>
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start" onClick={disconnectWallet}>
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </div>
      </div>
    </aside>
  )
}
