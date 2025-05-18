"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { FileUploader } from "@/components/file-uploader"
import { Loader2 } from "lucide-react"

export default function UploadPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [certificateData, setCertificateData] = useState({
    recipientName: "",
    recipientEmail: "",
    certificateTitle: "",
    issueDate: "",
    expiryDate: "",
    description: "",
  })
  const [certificateFile, setCertificateFile] = useState<File | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCertificateData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (file: File | null) => {
    setCertificateFile(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!certificateFile) {
      toast({
        title: "Error",
        description: "Please upload a certificate file",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // In a real app, you would:
      // 1. Get a presigned URL from your backend
      // 2. Upload the file to Cloudflare R2
      // 3. Generate a hash of the certificate data
      // 4. Send the hash to the blockchain via MetaMask
      // 5. Store the transaction hash and metadata in your database

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Success",
        description: "Certificate has been uploaded and registered on the blockchain",
      })

      // Reset form
      setCertificateData({
        recipientName: "",
        recipientEmail: "",
        certificateTitle: "",
        issueDate: "",
        expiryDate: "",
        description: "",
      })
      setCertificateFile(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload certificate. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Upload Certificate</h1>
        <p className="text-muted-foreground">Issue a new certificate and register it on the blockchain</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Certificate Details</CardTitle>
            <CardDescription>Enter the information for the new certificate</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input
                  id="recipientName"
                  name="recipientName"
                  value={certificateData.recipientName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipientEmail">Recipient Email</Label>
                <Input
                  id="recipientEmail"
                  name="recipientEmail"
                  type="email"
                  value={certificateData.recipientEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="certificateTitle">Certificate Title</Label>
              <Input
                id="certificateTitle"
                name="certificateTitle"
                value={certificateData.certificateTitle}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="issueDate">Issue Date</Label>
                <Input
                  id="issueDate"
                  name="issueDate"
                  type="date"
                  value={certificateData.issueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="date"
                  value={certificateData.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={certificateData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Certificate File</Label>
              <FileUploader
                onFileSelect={handleFileChange}
                selectedFile={certificateFile}
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload Certificate"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
