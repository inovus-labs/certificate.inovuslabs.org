"use client"

import { useState } from "react"
import { useWeb3 } from "@/components/web3-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Mock managers data
const managersData = [
  {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    name: "John Doe",
    addedOn: "2023-04-17",
    status: "active",
  },
  {
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    name: "Jane Smith",
    addedOn: "2023-03-15",
    status: "active",
  },
]

export default function ManagersPage() {
  const { isOwner, isConnected } = useWeb3()
  const { toast } = useToast()
  const [isAddingManager, setIsAddingManager] = useState(false)
  const [newManagerAddress, setNewManagerAddress] = useState("")
  const [newManagerName, setNewManagerName] = useState("")
  const [managers, setManagers] = useState(managersData)

  const handleAddManager = async () => {
    if (!newManagerAddress || !newManagerName) {
      toast({
        title: "Error",
        description: "Please provide both wallet address and name",
        variant: "destructive",
      })
      return
    }

    try {
      setIsAddingManager(true)

      // In a real app, you would:
      // 1. Call your smart contract to add the manager
      // 2. Update your database with the manager details

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Add to local state
      setManagers([
        ...managers,
        {
          address: newManagerAddress,
          name: newManagerName,
          addedOn: new Date().toISOString().split("T")[0],
          status: "active",
        },
      ])

      toast({
        title: "Success",
        description: "Manager has been added successfully",
      })

      // Reset form
      setNewManagerAddress("")
      setNewManagerName("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add manager. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddingManager(false)
    }
  }

  const handleRemoveManager = async (address: string) => {
    try {
      // In a real app, you would:
      // 1. Call your smart contract to remove the manager
      // 2. Update your database

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update local state
      setManagers(managers.filter((manager) => manager.address !== address))

      toast({
        title: "Success",
        description: "Manager has been removed successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove manager. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!isConnected) {
    return (
      <div className="max-w-3xl mx-auto text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-muted-foreground mb-6">You need to connect your MetaMask wallet to access this page.</p>
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
        <p className="text-muted-foreground">Only the contract owner can manage certificate managers.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Certificate Managers</h1>
        <p className="text-muted-foreground">Add or remove users who can manage certificates</p>
      </div>

      <div className="flex justify-end mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Manager
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Certificate Manager</DialogTitle>
              <DialogDescription>
                Add a new wallet address that can manage certificates on the blockchain.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="walletAddress">Wallet Address</Label>
                <Input
                  id="walletAddress"
                  placeholder="0x..."
                  value={newManagerAddress}
                  onChange={(e) => setNewManagerAddress(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="managerName">Manager Name</Label>
                <Input
                  id="managerName"
                  placeholder="Enter name"
                  value={newManagerName}
                  onChange={(e) => setNewManagerName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddManager} disabled={isAddingManager}>
                {isAddingManager ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Manager"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Certificate Managers</CardTitle>
          <CardDescription>Users who can issue and manage certificates</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Added On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {managers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No managers found
                  </TableCell>
                </TableRow>
              ) : (
                managers.map((manager) => (
                  <TableRow key={manager.address}>
                    <TableCell>{manager.name}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {manager.address.substring(0, 6)}...{manager.address.substring(manager.address.length - 4)}
                    </TableCell>
                    <TableCell>{manager.addedOn}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        {manager.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveManager(manager.address)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Remove manager</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
