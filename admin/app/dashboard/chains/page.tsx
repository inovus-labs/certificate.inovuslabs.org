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
import { Edit, ExternalLink, Link2, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useWeb3 } from "@/components/web3-provider"
import Link from "next/link"

// Mock chain data
const chainsData = [
  {
    chain_id: "eth123456",
    chain: "Ethereum",
    network_name: "Sepolia",
    native_currency: "ETH",
    block_explorer: "Etherscan",
    block_explorer_url: "https://sepolia.etherscan.io",
    rpc_url: "https://sepolia.infura.io/v3/your-api-key",
    contract_address: "0x1234567890abcdef1234567890abcdef12345678",
    active: true,
    created_at: "2023-04-17",
  },
  {
    chain_id: "poly789012",
    chain: "Polygon",
    network_name: "Mumbai",
    native_currency: "MATIC",
    block_explorer: "Polygonscan",
    block_explorer_url: "https://mumbai.polygonscan.com",
    rpc_url: "https://polygon-mumbai.infura.io/v3/your-api-key",
    contract_address: "0xabcdef1234567890abcdef1234567890abcdef12",
    active: true,
    created_at: "2023-03-15",
  },
  {
    chain_id: "celo345678",
    chain: "Celo",
    network_name: "Alfajores",
    native_currency: "CELO",
    block_explorer: "Celo Explorer",
    block_explorer_url: "https://explorer.celo.org",
    rpc_url: "https://alfajores-forno.celo-testnet.org",
    contract_address: "0x7890abcdef1234567890abcdef1234567890abcd",
    active: true,
    created_at: "2023-02-20",
  },
  {
    chain_id: "avax901234",
    chain: "Avalanche",
    network_name: "Fuji",
    native_currency: "AVAX",
    block_explorer: "Snowtrace",
    block_explorer_url: "https://snowtrace.io",
    rpc_url: "https://api.avax-test.network/ext/bc/C/rpc",
    contract_address: "0xdef1234567890abcdef1234567890abcdef123456",
    active: false,
    created_at: "2023-01-05",
  },
]

export default function ChainsPage() {
  const { toast } = useToast()
  const { isConnected } = useWeb3()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChain, setSelectedChain] = useState<(typeof chainsData)[0] | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [chains, setChains] = useState(chainsData)

  const filteredChains = chains.filter((chain) => {
    const query = searchQuery.toLowerCase()
    return (
      chain.chain.toLowerCase().includes(query) ||
      chain.network_name.toLowerCase().includes(query) ||
      chain.chain_id.toLowerCase().includes(query)
    )
  })

  const handleDelete = () => {
    if (!selectedChain) return

    // In a real app, you would:
    // 1. Call your API to delete the chain
    // 2. Update the UI after successful deletion

    setChains(chains.filter((c) => c.chain_id !== selectedChain.chain_id))

    toast({
      title: "Chain Deleted",
      description: `Chain "${selectedChain.chain} ${selectedChain.network_name}" has been deleted.`,
    })

    setShowDeleteDialog(false)
    setSelectedChain(null)
  }

  if (!isConnected) {
    return (
      <div className="max-w-3xl mx-auto text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-muted-foreground mb-6">
          You need to connect your MetaMask wallet to access chain management.
        </p>
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
          <h1 className="text-2xl font-bold tracking-tight">Blockchain Networks</h1>
          <p className="text-muted-foreground">Manage blockchain networks for certificate issuance</p>
        </div>
        <div className="w-full md:w-auto flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chains..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button asChild>
            <Link href="/dashboard/chains/create">
              <Plus className="mr-2 h-4 w-4" />
              Add Chain
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chain</TableHead>
                <TableHead>Network</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Contract Address</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChains.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No chains found
                  </TableCell>
                </TableRow>
              ) : (
                filteredChains.map((chain) => (
                  <TableRow key={chain.chain_id}>
                    <TableCell className="font-medium">{chain.chain}</TableCell>
                    <TableCell>{chain.network_name}</TableCell>
                    <TableCell>{chain.native_currency}</TableCell>
                    <TableCell className="font-mono text-xs">
                      {chain.contract_address.substring(0, 6)}...
                      {chain.contract_address.substring(chain.contract_address.length - 4)}
                    </TableCell>
                    <TableCell>
                      {chain.active ? (
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
                            <Link href={`/dashboard/chains/${chain.chain_id}`}>
                              <Link2 className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/chains/${chain.chain_id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Chain
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <a href={chain.block_explorer_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Explorer
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              setSelectedChain(chain)
                              setShowDeleteDialog(true)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Chain
                          </DropdownMenuItem>
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
            <DialogTitle>Delete Chain</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blockchain network? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedChain && (
            <div className="py-4">
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Chain:</div>
                  <div className="col-span-2 text-sm">{selectedChain.chain}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Network:</div>
                  <div className="col-span-2 text-sm">{selectedChain.network_name}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Contract:</div>
                  <div className="col-span-2 text-sm font-mono">{selectedChain.contract_address}</div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Chain
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
