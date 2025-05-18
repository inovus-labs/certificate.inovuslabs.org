"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useWeb3 } from "@/components/web3-provider"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const { toast } = useToast()
  const { isConnected } = useWeb3()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Inovus Labs Admin Console",
    contactEmail: "admin@inovuslabs.org",
    notificationsEnabled: true,
    emailNotifications: true,
  })

  const [blockchainSettings, setBlockchainSettings] = useState({
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
    networkId: "1",
    gasLimit: "300000",
  })

  const handleGeneralSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setGeneralSettings({
      ...generalSettings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleBlockchainSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBlockchainSettings({
      ...blockchainSettings,
      [name]: value,
    })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setGeneralSettings({
      ...generalSettings,
      [name]: checked,
    })
  }

  const handleSaveSettings = async () => {
    try {
      setIsSubmitting(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings Saved",
        description: "Your settings have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="blockchain" disabled={!isConnected}>
            Blockchain
          </TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage general application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  name="siteName"
                  value={generalSettings.siteName}
                  onChange={handleGeneralSettingsChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={handleGeneralSettingsChange}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notifications</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notificationsEnabled">Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about certificate activities</p>
                  </div>
                  <Switch
                    id="notificationsEnabled"
                    checked={generalSettings.notificationsEnabled}
                    onCheckedChange={(checked) => handleSwitchChange("notificationsEnabled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for important events</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={generalSettings.emailNotifications}
                    onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isSubmitting}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="blockchain">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Settings</CardTitle>
              <CardDescription>Configure blockchain integration settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contractAddress">Smart Contract Address</Label>
                <Input
                  id="contractAddress"
                  name="contractAddress"
                  value={blockchainSettings.contractAddress}
                  onChange={handleBlockchainSettingsChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="networkId">Network ID</Label>
                  <Input
                    id="networkId"
                    name="networkId"
                    value={blockchainSettings.networkId}
                    onChange={handleBlockchainSettingsChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gasLimit">Gas Limit</Label>
                  <Input
                    id="gasLimit"
                    name="gasLimit"
                    value={blockchainSettings.gasLimit}
                    onChange={handleBlockchainSettingsChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={isSubmitting}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Appearance settings coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
