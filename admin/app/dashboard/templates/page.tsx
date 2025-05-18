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
import { Edit, Eye, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useWeb3 } from "@/components/web3-provider"
import Link from "next/link"

// Mock template data
const templatesData = [
  {
    template_id: "abc123def4",
    name: "Course Completion",
    description: "Template for course completion certificates",
    fields: ["name", "course", "date", "grade", "instructor"],
    active: true,
    created_at: "2023-04-17",
  },
  {
    template_id: "xyz789uvw0",
    name: "Workshop Participation",
    description: "Template for workshop participation certificates",
    fields: ["name", "workshop", "date", "location", "organizer"],
    active: true,
    created_at: "2023-03-15",
  },
  {
    template_id: "pqr456stu7",
    name: "Achievement Award",
    description: "Template for achievement awards",
    fields: ["name", "achievement", "date", "category", "presenter"],
    active: true,
    created_at: "2023-02-20",
  },
  {
    template_id: "lmn012opq3",
    name: "Professional Certification",
    description: "Template for professional certifications",
    fields: ["name", "certification", "date", "expiry", "authority", "score"],
    active: true,
    created_at: "2023-01-05",
  },
]

export default function TemplatesPage() {
  const { toast } = useToast()
  const { isConnected } = useWeb3()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof templatesData)[0] | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [templates, setTemplates] = useState(templatesData)

  const filteredTemplates = templates.filter((template) => {
    const query = searchQuery.toLowerCase()
    return (
      template.name.toLowerCase().includes(query) ||
      template.description.toLowerCase().includes(query) ||
      template.template_id.toLowerCase().includes(query)
    )
  })

  const handleDelete = () => {
    if (!selectedTemplate) return

    // In a real app, you would:
    // 1. Call your API to delete the template
    // 2. Update the UI after successful deletion

    setTemplates(templates.filter((t) => t.template_id !== selectedTemplate.template_id))

    toast({
      title: "Template Deleted",
      description: `Template "${selectedTemplate.name}" has been deleted.`,
    })

    setShowDeleteDialog(false)
    setSelectedTemplate(null)
  }

  if (!isConnected) {
    return (
      <div className="max-w-3xl mx-auto text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-muted-foreground mb-6">
          You need to connect your MetaMask wallet to access template management.
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
          <h1 className="text-2xl font-bold tracking-tight">Certificate Templates</h1>
          <p className="text-muted-foreground">Manage certificate templates for different types of certificates</p>
        </div>
        <div className="w-full md:w-auto flex gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button asChild>
            <Link href="/dashboard/templates/create">
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Fields</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No templates found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTemplates.map((template) => (
                  <TableRow key={template.template_id}>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>{template.description}</TableCell>
                    <TableCell>{template.fields.length} fields</TableCell>
                    <TableCell>{template.created_at}</TableCell>
                    <TableCell>
                      {template.active ? (
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
                            <Link href={`/dashboard/templates/${template.template_id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/templates/${template.template_id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Template
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              setSelectedTemplate(template)
                              setShowDeleteDialog(true)
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Template
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
            <DialogTitle>Delete Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this template? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedTemplate && (
            <div className="py-4">
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Template ID:</div>
                  <div className="col-span-2 text-sm">{selectedTemplate.template_id}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Name:</div>
                  <div className="col-span-2 text-sm">{selectedTemplate.name}</div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="text-sm font-medium">Description:</div>
                  <div className="col-span-2 text-sm">{selectedTemplate.description}</div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
