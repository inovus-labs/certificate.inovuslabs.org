"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Search, History } from "lucide-react"
import { useWeb3 } from "@/components/web3-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock audit log data
const auditLogsData = [
  {
    id: "log123456",
    action: "create",
    entity: "certificate",
    details: {
      certificate_id: "cert123456",
      template_id: "temp123456",
      chain_id: "eth123456",
    },
    user_id: "admin123456",
    user_name: "John Doe",
    created_at: "2023-04-17T10:30:00Z",
  },
  {
    id: "log234567",
    action: "update",
    entity: "template",
    details: {
      template_id: "temp234567",
      name: "Course Completion",
      fields_added: ["instructor"],
      fields_removed: [],
    },
    user_id: "admin234567",
    user_name: "Jane Smith",
    created_at: "2023-04-16T14:45:00Z",
  },
  {
    id: "log345678",
    action: "delete",
    entity: "chain",
    details: {
      chain_id: "chain345678",
      chain: "Polygon",
      network_name: "Mumbai",
    },
    user_id: "admin123456",
    user_name: "John Doe",
    created_at: "2023-04-15T09:15:00Z",
  },
  {
    id: "log456789",
    action: "create",
    entity: "admin",
    details: {
      admin_id: "admin456789",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "issuer",
    },
    user_id: "admin234567",
    user_name: "Jane Smith",
    created_at: "2023-04-14T16:20:00Z",
  },
  {
    id: "log567890",
    action: "update",
    entity: "certificate",
    details: {
      certificate_id: "cert567890",
      status: "revoked",
      reason: "Information error",
    },
    user_id: "admin123456",
    user_name: "John Doe",
    created_at: "2023-04-13T11:10:00Z",
  },
]

export default function AuditLogsPage() {
  const { isConnected } = useWeb3()
  const [searchQuery, setSearchQuery] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [entityFilter, setEntityFilter] = useState<string>("all")
  const [selectedLog, setSelectedLog] = useState<(typeof auditLogsData)[0] | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const filteredLogs = auditLogsData.filter((log) => {
    const matchesSearch =
      searchQuery === "" ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      JSON.stringify(log.details).toLowerCase().includes(searchQuery.toLowerCase())

    const matchesAction = actionFilter === "all" || log.action === actionFilter
    const matchesEntity = entityFilter === "all" || log.entity === entityFilter

    return matchesSearch && matchesAction && matchesEntity
  })

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "create":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "update":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "delete":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return ""
    }
  }

  const getEntityBadgeColor = (entity: string) => {
    switch (entity) {
      case "certificate":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      case "template":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "chain":
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
      case "admin":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      default:
        return ""
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMM dd, yyyy HH:mm")
  }

  const viewLogDetails = (log: (typeof auditLogsData)[0]) => {
    setSelectedLog(log)
    setShowDetailsDialog(true)
  }

  if (!isConnected) {
    return (
      <div className="max-w-3xl mx-auto text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-muted-foreground mb-6">You need to connect your MetaMask wallet to view audit logs.</p>
        <Button asChild>
          <a href="/dashboard/connect-wallet">Connect Wallet</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground">Track all system activities and changes</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
            </SelectContent>
          </Select>
          <Select value={entityFilter} onValueChange={setEntityFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Entity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Entities</SelectItem>
              <SelectItem value="certificate">Certificate</SelectItem>
              <SelectItem value="template">Template</SelectItem>
              <SelectItem value="chain">Chain</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Log ID</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead className="w-[80px]">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No audit logs found
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-xs">{log.id}</TableCell>
                    <TableCell>
                      <Badge className={getActionBadgeColor(log.action)}>
                        {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getEntityBadgeColor(log.entity)}>
                        {log.entity.charAt(0).toUpperCase() + log.entity.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.user_name}</TableCell>
                    <TableCell>{formatDate(log.created_at)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => viewLogDetails(log)}>
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View Details</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <History className="mr-2 h-5 w-5" />
              Audit Log Details
            </DialogTitle>
            <DialogDescription>Detailed information about this audit log entry</DialogDescription>
          </DialogHeader>

          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Log ID</h3>
                  <p className="font-mono text-sm">{selectedLog.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Timestamp</h3>
                  <p className="text-sm">{formatDate(selectedLog.created_at)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Action</h3>
                  <Badge className={getActionBadgeColor(selectedLog.action)}>
                    {selectedLog.action.charAt(0).toUpperCase() + selectedLog.action.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Entity</h3>
                  <Badge className={getEntityBadgeColor(selectedLog.entity)}>
                    {selectedLog.entity.charAt(0).toUpperCase() + selectedLog.entity.slice(1)}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">User ID</h3>
                  <p className="font-mono text-sm">{selectedLog.user_id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">User Name</h3>
                  <p className="text-sm">{selectedLog.user_name}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Details</h3>
                <div className="bg-muted p-3 rounded-md overflow-auto max-h-60">
                  <pre className="text-xs">{JSON.stringify(selectedLog.details, null, 2)}</pre>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
