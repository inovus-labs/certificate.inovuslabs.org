import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  ChevronLeft,
  Download,
  Calendar,
  Clock,
  Award,
  User,
  CheckCircle,
  Share2,
  Shield,
  Fingerprint,
  QrCode,
} from "lucide-react"
import { getCertificateById } from "@/lib/certificates"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CertificateVerification } from "@/components/certificate-verification"
import { QrCodeModal } from "@/components/qr-code-modal"
import { CourseDetails } from "@/components/course-details"
import { SiteFooter } from "@/components/site-footer"

export default async function CertificatePage({
  params,
}: {
  params: { id: string }
}) {
  const certificate = await getCertificateById(params.id)

  if (!certificate) {
    notFound()
  }

  const issueDate = new Date(certificate.issueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <Image src="/inovus-logo.png" alt="Inovus Labs" width={180} height={48} className="h-10 w-auto" />
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-teal-300 hover:text-teal-100 hover:bg-teal-900/50">
                  Verify Another Certificate
                </Button>
              </Link>
            </div>

            <div className="md:hidden">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-teal-300 hover:text-teal-100 hover:bg-teal-900/50">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/">
            <Button
              variant="ghost"
              className="hidden md:flex items-center gap-2 text-teal-300 hover:text-teal-100 hover:bg-teal-900/50"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Search
            </Button>
          </Link>

          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
            <CheckCircle className="mr-1 h-3.5 w-3.5" />
            Verified Certificate
          </Badge>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border-none bg-slate-800/50 p-6 shadow-lg backdrop-blur-sm lg:p-8">
              <div className="relative mb-6">
                <div className="absolute -right-3 -top-3 rounded-full bg-emerald-500/10 p-2">
                  <QrCode className="h-6 w-6 text-emerald-300" />
                </div>
                <QrCodeModal certificateId={certificate.id} recipientName={certificate.recipientName} />
                <Image
                  src="/certificate-template.png"
                  alt="Certificate"
                  width={1000}
                  height={700}
                  className="rounded-lg border-4 border-slate-700 shadow-lg"
                />
              </div>

              <CertificateVerification certificateId={certificate.id} />
            </Card>
          </div>

          <div>
            <div className="sticky top-8 space-y-6">
              <div className="rounded-lg bg-slate-800/50 p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white">Certificate Details</h2>

                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/20 text-teal-400">
                      <Fingerprint className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Certificate ID</div>
                      <div className="font-mono text-sm text-slate-200">{certificate.id}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/20 text-teal-400">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Recipient</div>
                      <div className="text-sm text-slate-200">{certificate.recipientName}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/20 text-teal-400">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Course</div>
                      <div className="text-sm text-slate-200">{certificate.courseTitle}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/20 text-teal-400">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Issue Date</div>
                      <div className="text-sm text-slate-200">{issueDate}</div>
                    </div>
                  </div>

                  {certificate.duration && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/20 text-teal-400">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Duration</div>
                        <div className="text-sm text-slate-200">{certificate.duration}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg bg-slate-800/50 p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white">Verification Status</h2>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-emerald-300">Certificate Authentic</div>
                      <div className="text-xs text-slate-400">Verified on blockchain</div>
                    </div>
                  </div>

                  <div className="rounded-md bg-slate-900/80 p-3">
                    <div className="text-xs text-slate-400">Blockchain Hash</div>
                    <div className="font-mono text-xs text-slate-300 break-all">
                      0x7f9e4b5c3d2a1e8f7c6b5a4d3c2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 gap-2 bg-teal-600 hover:bg-teal-700">
                  <Download className="h-4 w-4" />
                  Download Certificate
                </Button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-teal-500/30 bg-slate-800 text-teal-400 hover:bg-slate-700 hover:text-teal-300"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-800 text-slate-200 border-slate-700">
                      <p>Share Certificate</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <CourseDetails certificate={certificate} />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
