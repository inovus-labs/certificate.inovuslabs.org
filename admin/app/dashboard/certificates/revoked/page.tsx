"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Eye, ExternalLink, Search, XCircle } from "lucide-react"
import { useWeb3 } from "@/components/web3-provider"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"

// Mock revoked certificates data
const revokedCertificatesData = [
  {
    revoked_id: "rev123456",
    certificate_id: "cert123456",
    certificate_metadata: {
      recipientName: "John Doe",
      recipientEmail: "john@example.com",
      certificateTitle: "Advanced Blockchain Development",
      issueDate: "2023-01-15",
    },
    reason: "Information error in certificate data",
    revoked_by: "admin123456",
    revoked_by_name: "Jane Smith",
    revoked_at: "2023-04-17T10:30:00Z",
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    chain: "Ethereum",
  },
  {
    revoked_id: "rev234567",
    certificate_id: "cert234567",
    certificate_metadata: {
      recipientName: "Sarah Williams",
      recipientEmail: "sarah@example.com",
      certificateTitle: "Web3 Development",
      issueDate: "2023-02-20",
    },
    reason: "Certificate issued to wrong recipient",
    revoked_by: "admin234567",
    revoked_by_name: "Mike Johnson",
    revoked_at: "2023-04-15T14:45:00Z",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    chain: "Polygon",
  },
  {
    revoked_id: "rev345678",
    certificate_id: "cert345678",
    certificate_metadata: {
      recipientName: "David Brown",
      recipientEmail: "david@example.com",
      certificateTitle: "Decentralized Applications",
      issueDate: "2023-03-10",
    },
    reason: "Certificate requirements not met",
    revoked_by: "admin123456",
    revoked_by_name: "Jane Smith",
    revoked_at: "2023-04-12T09:15:00Z",
    txHash: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
    chain: "Ethereum",
  },
]

export default function RevokedCertificatesPage() {
  const { isConnected } = useWeb3()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof revokedCertificatesData)[0] | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const filteredCertificates = revokedCertificatesData.filter((cert) => {
    const query = searchQuery.toLowerCase()
    return (
      cert.certificate_id.toLowerCase().includes(query) ||
      cert.certificate_metadata.recipientName.toLowerCase().includes(query) ||
      cert.certificate_metadata.recipientEmail.toLowerCase().includes(query) ||
      cert.certificate_metadata.certificateTitle.toLowerCase().includes(query) ||
      cert.reason.toLowerCase().includes(query)
    )
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, "MMM dd, yyyy HH:mm")
  }

  const viewCertificateDetails = (certificate: (typeof revokedCertificatesData)[0]) => {
    setSelectedCertificate(certificate)
    setShowDetailsDialog(true)
  }

  if (!isConnected) {
    return (
      <div className="max-w-3xl mx-auto text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-muted-foreground mb-6">
          You need to connect your MetaMask wallet to view revoked certificates.
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
          <h1 className="text-2xl font-bold tracking-tight">Revoked Certificates</h1>
          <p className="text-muted-foreground">View all certificates that have been revoked</p>
        </div>
        <div className="w-full md:w-auto flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search revoked certificates..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard/certificates">View All Certificates</Link>
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
                <TableHead>Revoked By</TableHead>
                <TableHead>Revoked On</TableHead>
                <TableHead className="w-[80px]">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCertificates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No revoked certificates found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCertificates.map((certificate) => (
                  <TableRow key={certificate.revoked_id}>
                    <TableCell className="font-mono text-xs">{certificate.certificate_id}</TableCell>
                    <TableCell>
                      <div>
                        <div>{certificate.certificate_metadata.recipientName}</div>
                        <div className="text-xs text-muted-foreground">
                          {certificate.certificate_metadata.recipientEmail}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{certificate.certificate_metadata.certificateTitle}</TableCell>
                    <TableCell>{certificate.revoked_by_name}</TableCell>
                    <TableCell>{formatDate(certificate.revoked_at)}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => viewCertificateDetails(certificate)}>
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
              <XCircle className="mr-2 h-5 w-5 text-destructive" />
              Revoked Certificate Details
            </DialogTitle>
            <DialogDescription>Detailed information about this revoked certificate</DialogDescription>
          </DialogHeader>

          {selectedCertificate && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Certificate ID</h3>
                  <p className="font-mono text-sm">{selectedCertificate.certificate_id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Revocation ID</h3>
                  <p className="font-mono text-sm">{selectedCertificate.revoked_id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Recipient</h3>
                  <p className="text-sm">{selectedCertificate.certificate_metadata.recipientName}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedCertificate.certificate_metadata.recipientEmail}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Certificate Title</h3>
                  <p className="text-sm">{selectedCertificate.certificate_metadata.certificateTitle}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Issue Date</h3>
                  <p className="text-sm flex items-center">
                    <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                    {selectedCertificate.certificate_metadata.issueDate}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Revoked On</h3>
                  <p className="text-sm flex items-center">
                    <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                    {formatDate(selectedCertificate.revoked_at)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Revoked By</h3>
                  <p className="text-sm">{selectedCertificate.revoked_by_name}</p>
                  <p className="text-xs font-mono text-muted-foreground">{selectedCertificate.revoked_by}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Blockchain</h3>
                  <p className="text-sm">{selectedCertificate.chain}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Reason for Revocation</h3>
                <p className="text-sm p-2 bg-muted rounded-md mt-1">{selectedCertificate.reason}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Transaction Hash</h3>
                <div className="flex items-center gap-2 mt-1">
                  <code className="text-xs font-mono bg-muted p-2 rounded-md flex-1 overflow-x-auto">
                    {selectedCertificate.txHash}
                  </code>
                  <Button variant="outline" size="icon" asChild>
                    <a
                      href={`${
                        selectedCertificate.chain === "Ethereum"
                          ? "https://sepolia.etherscan.io/tx/"
                          : "https://mumbai.polygonscan.com/tx/"
                      }${selectedCertificate.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">View on Block Explorer</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
