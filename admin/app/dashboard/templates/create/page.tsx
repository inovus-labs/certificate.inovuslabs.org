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
import { Loader2, Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function CreateTemplatePage() {
  const { toast } = useToast()
  const router = useRouter()
  const { isConnected } = useWeb3()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [templateData, setTemplateData] = useState({
    name: "",
    description: "",
  })
  const [fields, setFields] = useState<string[]>([])
  const [newField, setNewField] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTemplateData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddField = () => {
    if (!newField.trim()) {
      toast({
        title: "Error",
        description: "Field name cannot be empty",
        variant: "destructive",
      })
      return
    }

    if (fields.includes(newField.trim())) {
      toast({
        title: "Error",
        description: "Field name already exists",
        variant: "destructive",
      })
      return
    }

    setFields([...fields, newField.trim()])
    setNewField("")
  }

  const handleRemoveField = (fieldToRemove: string) => {
    setFields(fields.filter((field) => field !== fieldToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!templateData.name || !templateData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (fields.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one field to the template",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSubmitting(true)

      // In a real app, you would:
      // 1. Call your API to create the template
      // 2. Navigate to the templates list on success

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success",
        description: "Template has been created successfully",
      })

      router.push("/dashboard/templates")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create template. Please try again.",
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
          You need to connect your MetaMask wallet to create certificate templates.
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
        <h1 className="text-2xl font-bold tracking-tight">Create Template</h1>
        <p className="text-muted-foreground">Define a new certificate template with custom fields</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Template Information</CardTitle>
            <CardDescription>Basic information about the certificate template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                name="name"
                value={templateData.name}
                onChange={handleInputChange}
                placeholder="e.g., Course Completion Certificate"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={templateData.description}
                onChange={handleInputChange}
                placeholder="Describe the purpose and usage of this template"
                rows={3}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Template Fields</CardTitle>
            <CardDescription>
              Define the fields that will be included in certificates using this template
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="Enter field name (e.g., recipient_name, course_title)"
                  value={newField}
                  onChange={(e) => setNewField(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      handleAddField()
                    }
                  }}
                />
              </div>
              <Button type="button" onClick={handleAddField}>
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Defined Fields</Label>
              {fields.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">No fields added yet. Add at least one field.</p>
              ) : (
                <div className="flex flex-wrap gap-2 mt-2">
                  {fields.map((field) => (
                    <Badge key={field} variant="secondary" className="flex items-center gap-1 py-1.5">
                      {field}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1 text-muted-foreground hover:text-foreground"
                        onClick={() => handleRemoveField(field)}
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Remove {field}</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => router.push("/dashboard/templates")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Template"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
