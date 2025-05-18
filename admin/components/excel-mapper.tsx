"use client"

import { useEffect, useState } from "react"
import * as XLSX from "xlsx"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface ExcelMapperProps {
  file: File
  onColumnMap: (mapping: Record<string, string>) => void
}

// Required certificate fields
const requiredFields = [
  { id: "recipientName", label: "Recipient Name" },
  { id: "recipientEmail", label: "Recipient Email" },
  { id: "certificateTitle", label: "Certificate Title" },
  { id: "issueDate", label: "Issue Date" },
  { id: "certificateId", label: "Certificate ID" },
]

// Optional certificate fields
const optionalFields = [
  { id: "expiryDate", label: "Expiry Date" },
  { id: "description", label: "Description" },
  { id: "issuerName", label: "Issuer Name" },
  { id: "assetFilename", label: "Asset Filename" },
]

export function ExcelMapper({ file, onColumnMap }: ExcelMapperProps) {
  const [columns, setColumns] = useState<string[]>([])
  const [mapping, setMapping] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [previewData, setPreviewData] = useState<any[]>([])

  useEffect(() => {
    const readExcel = async () => {
      try {
        setLoading(true)

        const reader = new FileReader()
        reader.onload = (e) => {
          const data = new Uint8Array(e.target?.result as ArrayBuffer)
          const workbook = XLSX.read(data, { type: "array" })

          // Get the first worksheet
          const worksheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[worksheetName]

          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet)

          if (jsonData.length > 0) {
            // Get column headers
            const headers = Object.keys(jsonData[0])
            setColumns(headers)

            // Set preview data (first 5 rows)
            setPreviewData(jsonData.slice(0, 5))
          }

          setLoading(false)
        }

        reader.readAsArrayBuffer(file)
      } catch (error) {
        console.error("Error reading Excel file:", error)
        setLoading(false)
      }
    }

    readExcel()
  }, [file])

  const handleMappingChange = (fieldId: string, columnName: string) => {
    const newMapping = { ...mapping, [fieldId]: columnName }
    setMapping(newMapping)
    onColumnMap(newMapping)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Reading Excel file...</span>
      </div>
    )
  }

  if (columns.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-muted-foreground">No columns found in the Excel file. Please check the file format.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Required Fields</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requiredFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Select value={mapping[field.id] || ""} onValueChange={(value) => handleMappingChange(field.id, value)}>
                <SelectTrigger id={field.id}>
                  <SelectValue placeholder="Select a column" />
                </SelectTrigger>
                <SelectContent>
                  {columns.map((column) => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Optional Fields</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {optionalFields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              <Select value={mapping[field.id] || ""} onValueChange={(value) => handleMappingChange(field.id, value)}>
                <SelectTrigger id={field.id}>
                  <SelectValue placeholder="Select a column" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {columns.map((column) => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      {previewData.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Data Preview</h3>
          <div className="border rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted">
                  {columns.map((column) => (
                    <th key={column} className="px-4 py-2 text-left font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, index) => (
                  <tr key={index} className="border-t">
                    {columns.map((column) => (
                      <td key={column} className="px-4 py-2">
                        {row[column]?.toString() || ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground">Showing first 5 rows of data</p>
        </div>
      )}
    </div>
  )
}
