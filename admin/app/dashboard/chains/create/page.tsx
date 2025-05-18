"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useWeb3 } from "@/components/web3-provider"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function CreateChainPage() {
  const { toast } = useToast()
  const router = useRouter()
  const { isConnected } = useWeb3()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [chainData, setChainData] = useState({
    chain: "Ethereum",
    network_name: "Sepolia",
    native_currency: "ETH",
    block_explorer: "Etherscan",
    block_explorer_url: "https://sepolia.etherscan.io",
    rpc_url: "",
    contract_address: "",
    active: true,
  })
  const [contractAbi, setContractAbi] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setChainData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setChainData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Update related fields based on chain selection
    if (name === "chain") {
      switch (value) {
        case "Ethereum":
          setChainData((prev) => ({
            ...prev,
            network_name: "Sepolia",
            native_currency: "ETH",
            block_explorer: "Etherscan",
            block_explorer_url: "https://sepolia.etherscan.io",
          }))
          break
        case "Polygon":
          setChainData((prev) => ({
            ...prev,
            network_name: "Mumbai",
            native_currency: "MATIC",
            block_explorer: "Polygonscan",
            block_explorer_url: "https://mumbai.polygonscan.com",
          }))
          break
        case "Celo":
          setChainData((prev) => ({
            ...prev,
            network_name: "Alfajores",
            native_currency: "CELO",
            block_explorer: "Celo Explorer",
            block_explorer_url: "https://explorer.celo.org",
          }))
          break
        case "Avalanche":
          setChainData((prev) => ({
            ...prev,
            network_name: "Fuji",
            native_currency: "AVAX",
            block_explorer: "Snowtrace",
            block_explorer_url: "https://snowtrace.io",
          }))
          break
      }
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    setChainData((prev) => ({
      ...prev,
      active: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!chainData.rpc_url || !chainData.contract_address || !contractAbi) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // In a real app, you would:
      // 1. Call your API to create the chain
      // 2. Navigate to the chains list on success

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Blockchain network has been added successfully",
      })

      router.push("/dashboard/chains")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add blockchain network. Please try again.",
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
        <p className="text-muted-foreground mb-6">
          You need to connect your MetaMask wallet to add blockchain networks.
        </p>
        <Button asChild>
          <a href="/dashboard/connect-wallet">Connect Wallet</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Add Blockchain Network</h1>
        <p className="text-muted-foreground">Configure a new blockchain network for certificate issuance</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Network Information</CardTitle>
            <CardDescription>Basic information about the blockchain network</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chain">Blockchain</Label>
                <Select value={chainData.chain} onValueChange={(value) => handleSelectChange("chain", value)}>
                  <SelectTrigger id="chain">
                    <SelectValue placeholder="Select blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ethereum">Ethereum</SelectItem>
                    <SelectItem value="Polygon">Polygon</SelectItem>
                    <SelectItem value="Celo">Celo</SelectItem>
                    <SelectItem value="Avalanche">Avalanche</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="network_name">Network</Label>
                <Select
                  value={chainData.network_name}
                  onValueChange={(value) => handleSelectChange("network_name", value)}
                >
                  <SelectTrigger id="network_name">
                    <SelectValue placeholder="Select network" />
                  </SelectTrigger>
                  <SelectContent>
                    {chainData.chain === "Ethereum" && <SelectItem value="Sepolia">Sepolia</SelectItem>}
                    {chainData.chain === "Polygon" && <SelectItem value="Mumbai">Mumbai</SelectItem>}
                    {chainData.chain === "Celo" && <SelectItem value="Alfajores">Alfajores</SelectItem>}
                    {chainData.chain === "Avalanche" && <SelectItem value="Fuji">Fuji</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="native_currency">Native Currency</Label>
                <Input
                  id="native_currency"
                  name="native_currency"
                  value={chainData.native_currency}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="block_explorer">Block Explorer</Label>
                <Input
                  id="block_explorer"
                  name="block_explorer"
                  value={chainData.block_explorer}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="block_explorer_url">Block Explorer URL</Label>
              <Input
                id="block_explorer_url"
                name="block_explorer_url"
                value={chainData.block_explorer_url}
                onChange={handleInputChange}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rpc_url">RPC URL</Label>
              <Input
                id="rpc_url"
                name="rpc_url"
                value={chainData.rpc_url}
                onChange={handleInputChange}
                placeholder="e.g., https://sepolia.infura.io/v3/your-api-key"
                required
              />
              <p className="text-xs text-muted-foreground">The RPC endpoint for connecting to the blockchain network</p>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Smart Contract</CardTitle>
            <CardDescription>Configure the smart contract for certificate issuance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contract_address">Contract Address</Label>
              <Input
                id="contract_address"
                name="contract_address"
                value={chainData.contract_address}
                onChange={handleInputChange}
                placeholder="0x..."
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contract_abi">Contract ABI</Label>
              <Textarea
                id="contract_abi"
                value={contractAbi}
                onChange={(e) => setContractAbi(e.target.value)}
                placeholder="[{...}]"
                rows={6}
                required
              />
              <p className="text-xs text-muted-foreground">
                The ABI (Application Binary Interface) for the smart contract in JSON format
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="active" checked={chainData.active} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="active">Active</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/dashboard/chains")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Network"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
