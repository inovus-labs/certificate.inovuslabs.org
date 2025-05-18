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
import { CheckCircle, Download, ExternalLink, Eye, MoreHorizontal, Search, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useWeb3 } from "@/components/web3-provider"

// Mock certificate data
const certificatesData = [
  {
    id: "CERT-2023-04-17-001",
    recipientName: "John Doe",
    recipientEmail: "john@example.com",
    title: "Advanced Blockchain Development",
    issueDate: "2023-04-17",
    status: "active",
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  },
  {
    id: "CERT-2023-03-15-042",
    recipientName: "Jane Smith",
    recipientEmail: "jane@example.com",
    title: "Smart Contract Security",
    issueDate: "2023-03-15",
    status: "active",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  },
  {
    id: "CERT-2023-01-05-042",
    recipientName: "Mike Johnson",
    recipientEmail: "mike@example.com",
    title: "Blockchain Fundamentals",
    issueDate: "2023-01-05",
    status: "revoked",
    txHash: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
  },
  {
    id: "CERT-2023-02-20-078",
    recipientName: "Sarah Williams",
    recipientEmail: "sarah@example.com",
    title: "Web3 Development",
    issueDate: "2023-02-20",
    status: "active",
    txHash: "0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc",
  },
  {
    id: "CERT-2023-04-10-103",
    recipientName: "David Brown",
    recipientEmail: "david@example.com",
    title: "Decentralized Applications",
    issueDate: "2023-04-10",
    status: "active",
    txHash: "0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
  },
]

export default function CertificatesPage() {
  const { toast } = useToast()
  const { isConnected } = useWeb3()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificatesData)[0] | null>(null)
  const [showRevokeDialog, setShowRevokeDialog] = useState(false)

  const filteredCertificates = certificatesData.filter((cert) => {
    const query = searchQuery.toLowerCase()
    return (
      cert.id.toLowerCase().includes(query) ||
      cert.recipientName.toLowerCase().includes(query) ||
      cert.recipientEmail.toLowerCase().includes(query) ||
      cert.title.toLowerCase().includes(query)
    )
  })

  const handleRevoke = () => {
    if (!selectedCertificate) return

    // In a real app, you would:
    // 1. Call your smart contract to revoke the certificate
    // 2. Update the database record

    toast({
      title: "Certificate Revoked",
      description: `Certificate ${selectedCertificate.id} has been revoked.`,
    })

    setShowRevokeDialog(false)
    setSelectedCertificate(null)
  }

  if (!isConnected) {
    return (
      <div className="max-w-3xl mx-auto text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-muted-foreground mb-6">
          You need to connect your MetaMask wallet to access certificate management.
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
          <h1 className="text-2xl font-bold tracking-tight">Certificates</h1>
          <p className="text-muted-foreground">View and manage all issued certificates</p>
        </div>
        <div className="w-full md:w-auto flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search certificates..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button asChild>
            <a href="/dashboard/certificates/upload">Issue New</a>
          </Button>
        </div>
      </div>

      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate ID</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No certificates found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCertificates.map((certificate) => (
                  <TableRow key={certificate.id}>
                    <TableCell className="font-medium">{certificate.id}</TableCell>
                    <TableCell>
                      <div>
                        <div>{certificate.recipientName}</div>
                        <div className="text-xs text-muted-foreground">{certificate.recipientEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{certificate.title}</TableCell>
                    <TableCell>{certificate.issueDate}</TableCell>
                    <TableCell>
                      {certificate.status === "active" ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
                          <XCircle className="mr-1 h-3 w-3" />
                          Revoked
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View on Blockchain
                          </DropdownMenuItem>
                          {certificate.status === "active" && (
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => {
                                setSelectedCertificate(certificate)
                                setShowRevokeDialog(true)
                              }}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Revoke Certificate
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

      <Dialog open={showRevokeDialog} onOpenChange={setShowRevokeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke Certificate</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke this certificate? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedCertificate && (
            <div className="py-4">
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Certificate ID:</div>
                  <div className="col-span-2 text-sm">{selectedCertificate.id}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Recipient:</div>
                  <div className="col-span-2 text-sm">{selectedCertificate.recipientName}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Title:</div>
                  <div className="col-span-2 text-sm">{selectedCertificate.title}</div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRevokeDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRevoke}>
              Revoke Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
