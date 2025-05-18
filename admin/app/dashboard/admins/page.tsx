"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useWeb3 } from "@/components/web3-provider"
import Link from "next/link"

// Mock admin data
const adminsData = [
  {
    admin_id: "admin123456",
    name: "John Doe",
    email: "john@example.com",
    role: "owner",
    active: true,
    created_at: "2023-04-17",
  },
  {
    admin_id: "admin234567",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "issuer",
    active: true,
    created_at: "2023-03-15",
  },
  {
    admin_id: "admin345678",
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "issuer",
    active: true,
    created_at: "2023-02-20",
  },
  {
    admin_id: "admin456789",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "issuer",
    active: false,
    created_at: "2023-01-05",
  },
]

export default function AdminsPage() {
  const { toast } = useToast()
  const { isConnected, isOwner } = useWeb3()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAdmin, setSelectedAdmin] = useState<(typeof adminsData)[0] | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [admins, setAdmins] = useState(adminsData)

  const filteredAdmins = admins.filter((admin) => {
    const query = searchQuery.toLowerCase()
    return (
      admin.name.toLowerCase().includes(query) ||
      admin.email.toLowerCase().includes(query) ||
      admin.role.toLowerCase().includes(query) ||
      admin.admin_id.toLowerCase().includes(query)
    )
  })

  const handleDelete = () => {
    if (!selectedAdmin) return

    // In a real app, you would:
    // 1. Call your API to delete the admin
    // 2. Update the UI after successful deletion

    setAdmins(admins.filter((a) => a.admin_id !== selectedAdmin.admin_id))

    toast({
      title: "Admin Deleted",
      description: `Admin "${selectedAdmin.name}" has been deleted.`,
    })

    setShowDeleteDialog(false)
    setSelectedAdmin(null)
  }

  if (!isConnected) {
    return (
      <div className="max-w-3xl mx-auto text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-muted-foreground mb-6">
          You need to connect your MetaMask wallet to access admin management.
        </p>
        <Button asChild>
          <a href="/dashboard/connect-wallet">Connect Wallet</a>
        </Button>
      </div>
    )
  }

  if (!isOwner) {
    return (
      <div className="max-w-3xl mx-auto text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-6">Only the owner can manage administrators.</p>
        <Button asChild>
          <a href="/dashboard">Back to Dashboard</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Administrators</h1>
          <p className="text-muted-foreground">Manage administrators and issuers</p>
        </div>
        <div className="w-full md:w-auto flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search admins..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button asChild>
            <Link href="/dashboard/admins/create">
              <Plus className="mr-2 h-4 w-4" />
              Add Admin
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmins.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No administrators found
                  </TableCell>
                </TableRow>
              ) : (
                filteredAdmins.map((admin) => (
                  <TableRow key={admin.admin_id}>
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          admin.role === "owner"
                            ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                            : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                        }
                      >
                        {admin.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{admin.created_at}</TableCell>
                    <TableCell>
                      {admin.active ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/admins/${admin.admin_id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Admin
                            </Link>
                          </DropdownMenuItem>
                          {admin.role !== "owner" && (
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => {
                                setSelectedAdmin(admin)
                                setShowDeleteDialog(true)
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Admin
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Administrator</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this administrator? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedAdmin && (
            <div className="py-4">
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Name:</div>
                  <div className="col-span-2 text-sm">{selectedAdmin.name}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Email:</div>
                  <div className="col-span-2 text-sm">{selectedAdmin.email}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Role:</div>
                  <div className="col-span-2 text-sm">{selectedAdmin.role}</div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
