"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useWeb3 } from "@/components/web3-provider"
import { ArrowLeft, Calendar, Edit, LayoutTemplate } from "lucide-react"
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
    updated_at: "2023-04-17",
  },
  {
    template_id: "xyz789uvw0",
    name: "Workshop Participation",
    description: "Template for workshop participation certificates",
    fields: ["name", "workshop", "date", "location", "organizer"],
    active: true,
    created_at: "2023-03-15",
    updated_at: "2023-03-15",
  },
  {
    template_id: "pqr456stu7",
    name: "Achievement Award",
    description: "Template for achievement awards",
    fields: ["name", "achievement", "date", "category", "presenter"],
    active: true,
    created_at: "2023-02-20",
    updated_at: "2023-02-20",
  },
  {
    template_id: "lmn012opq3",
    name: "Professional Certification",
    description: "Template for professional certifications",
    fields: ["name", "certification", "date", "expiry", "authority", "score"],
    active: true,
    created_at: "2023-01-05",
    updated_at: "2023-01-05",
  },
]

export default function TemplateDetailsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const params = useParams()
  const { isConnected } = useWeb3()
  const [template, setTemplate] = useState<(typeof templatesData)[0] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch the template from your API
    const fetchTemplate = async () => {
      try {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        const templateId = params.id as string
        const foundTemplate = templatesData.find((t) => t.template_id === templateId)

        if (foundTemplate) {
          setTemplate(foundTemplate)
        } else {
          toast({
            title: "Error",
            description: "Template not found",
            variant: "destructive",
          })
          router.push("/dashboard/templates")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load template details",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (isConnected) {
      fetchTemplate()
    }
  }, [params.id, isConnected, router, toast])

  if (!isConnected) {
    return (
      <div className="max-w-3xl mx-auto text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-muted-foreground mb-6">You need to connect your MetaMask wallet to view template details.</p>
        <Button asChild>
          <a href="/dashboard/connect-wallet">Connect Wallet</a>
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-10 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3 mx-auto"></div>
          <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
          <div className="h-64 bg-muted rounded w-full mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!template) {
    return (
      <div className="max-w-3xl mx-auto text-center py-10">
        <h1 className="text-2xl font-bold mb-4">Template Not Found</h1>
        <p className="text-muted-foreground mb-6">The requested template could not be found.</p>
        <Button asChild>
          <Link href="/dashboard/templates">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Button variant="outline" size="sm" asChild className="mb-2">
            <Link href="/dashboard/templates">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{template.name}</h1>
          <p className="text-muted-foreground">{template.description}</p>
        </div>
        <Button asChild>
          <Link href={`/dashboard/templates/${template.template_id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Template
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LayoutTemplate className="mr-2 h-5 w-5" />
              Template Details
            </CardTitle>
            <CardDescription>Basic information about this certificate template</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-medium text-muted-foreground">Template ID</dt>
                <dd className="mt-1 font-mono">{template.template_id}</dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Status</dt>
                <dd className="mt-1">
                  {template.active ? (
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  ) : (
                    <Badge variant="outline">Inactive</Badge>
                  )}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Created</dt>
                <dd className="mt-1 flex items-center">
                  <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                  {template.created_at}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-muted-foreground">Last Updated</dt>
                <dd className="mt-1 flex items-center">
                  <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                  {template.updated_at}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Template Fields</CardTitle>
            <CardDescription>Fields that will be included in certificates using this template</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {template.fields.map((field) => (
                  <Badge key={field} variant="secondary">
                    {field}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  These fields define the structure of certificates created with this template. When issuing a
                  certificate, you will need to provide values for all these fields.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild>
              <Link href={`/dashboard/templates/${template.template_id}/edit`}>Edit Fields</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
