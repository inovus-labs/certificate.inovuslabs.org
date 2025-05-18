"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { FileUploader } from "@/components/file-uploader"
import { Loader2, Upload } from "lucide-react"
import { ExcelMapper } from "@/components/excel-mapper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function BatchUploadPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [excelFile, setExcelFile] = useState<File | null>(null)
  const [assetFolder, setAssetFolder] = useState<FileList | null>(null)
  const [mappedColumns, setMappedColumns] = useState<Record<string, string>>({})
  const [folderPath, setFolderPath] = useState("")

  const handleExcelFileChange = (file: File | null) => {
    setExcelFile(file)
  }

  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAssetFolder(e.target.files)
      setFolderPath(e.target.value)
    }
  }

  const handleColumnMapping = (mapping: Record<string, string>) => {
    setMappedColumns(mapping)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!excelFile) {
      toast({
        title: "Error",
        description: "Please upload an Excel file",
        variant: "destructive",
      })
      return
    }

    if (!assetFolder) {
      toast({
        title: "Error",
        description: "Please select a folder with certificate assets",
        variant: "destructive",
      })
      return
    }

    if (Object.keys(mappedColumns).length === 0) {
      toast({
        title: "Error",
        description: "Please map at least one column",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // In a real app, you would:
      // 1. Process the Excel file
      // 2. Map columns to certificate fields
      // 3. Match filenames with Excel data
      // 4. Generate hashes for each certificate
      // 5. Batch upload to blockchain
      // 6. Store transaction hashes and metadata

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Success",
        description: `Batch upload complete. ${assetFolder.length} certificates processed.`,
      })

      // Reset form
      setExcelFile(null)
      setAssetFolder(null)
      setMappedColumns({})
      setFolderPath("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process batch upload. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Batch Upload</h1>
        <p className="text-muted-foreground">Upload multiple certificates at once using an Excel spreadsheet</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="map" disabled={!excelFile}>
              Map Columns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Excel Spreadsheet</CardTitle>
                <CardDescription>Upload an Excel file containing certificate data</CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploader onFileSelect={handleExcelFileChange} selectedFile={excelFile} accept=".xlsx,.xls,.csv" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certificate Assets</CardTitle>
                <CardDescription>Select a folder containing certificate files (PDF, images)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="folder">Select Folder</Label>
                  <Input
                    id="folder"
                    type="file"
                    webkitdirectory="true"
                    directory=""
                    multiple
                    onChange={handleFolderSelect}
                  />
                </div>

                {assetFolder && assetFolder.length > 0 && (
                  <div className="text-sm">
                    <p className="font-medium">Selected {assetFolder.length} files</p>
                    <p className="text-muted-foreground">Files will be matched with Excel data based on filename</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Map Excel Columns</CardTitle>
                <CardDescription>Match Excel columns to certificate fields</CardDescription>
              </CardHeader>
              <CardContent>
                {excelFile ? (
                  <ExcelMapper file={excelFile} onColumnMap={handleColumnMapping} />
                ) : (
                  <p className="text-muted-foreground">Please upload an Excel file first</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !excelFile || !assetFolder}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Process Batch
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
