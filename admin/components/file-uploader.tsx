"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { FileText, Upload, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void
  selectedFile: File | null
  accept?: string
  maxSize?: number
}

export function FileUploader({
  onFileSelect,
  selectedFile,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = 5242880, // 5MB
}: FileUploaderProps) {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null)
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0])
      }
    },
    [onFileSelect],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
      "application/pdf": [".pdf"],
    },
    maxSize,
    maxFiles: 1,
    onDropRejected: (fileRejections) => {
      const rejection = fileRejections[0]
      if (rejection.errors[0].code === "file-too-large") {
        setError(`File is too large. Max size is ${maxSize / 1024 / 1024}MB.`)
      } else if (rejection.errors[0].code === "file-invalid-type") {
        setError("Invalid file type. Please upload a PDF or image file.")
      } else {
        setError("Error uploading file. Please try again.")
      }
    },
  })

  const removeFile = () => {
    onFileSelect(null)
    setError(null)
  }

  return (
    <div className="space-y-4">
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm font-medium">Drag & drop a file here, or click to select</p>
            <p className="text-xs text-muted-foreground">
              Supports PDF, JPG, JPEG, PNG (max {maxSize / 1024 / 1024}MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-md">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="text-sm">
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={removeFile} className="h-8 w-8">
            <X className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}
