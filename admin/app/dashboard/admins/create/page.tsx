"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useWeb3 } from "@/components/web3-provider"
import { Loader2, UserCog } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function CreateAdminPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { isConnected, isOwner } = useWeb3()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    role: "issuer",
    active: true,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdminData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setAdminData((prev) => ({
      ...prev,
      role: value,
    }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setAdminData((prev) => ({
      ...prev,
      active: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!adminData.name || !adminData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(adminData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // In a real app, you would:
      // 1. Call your API to create the admin
      // 2. Navigate to the admins list on success

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Administrator has been added successfully",
      })

      router.push("/dashboard/admins")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add administrator. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="max-w-3xl mx-auto text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-muted-foreground mb-6">You need to connect your MetaMask wallet to add administrators.</p>
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
        <p className="text-muted-foreground mb-6">Only the owner can add administrators.</p>
        <Button asChild>
          <a href="/dashboard">Back to Dashboard</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Add Administrator</h1>
        <p className="text-muted-foreground">Create a new administrator or issuer account</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserCog className="mr-2 h-5 w-5" />
              Administrator Details
            </CardTitle>
            <CardDescription>Enter the information for the new administrator</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={adminData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={adminData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={adminData.role} onValueChange={handleSelectChange}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="issuer">Issuer</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {adminData.role === "owner"
                  ? "Owners have full access to all system features and can manage other administrators."
                  : "Issuers can create and manage certificates but have limited administrative access."}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="active" checked={adminData.active} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="active">Active</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/dashboard/admins")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Administrator"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
