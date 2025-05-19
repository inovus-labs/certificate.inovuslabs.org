"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useParams } from "next/navigation"
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
  Loader2,
} from "lucide-react"
import { getCertificateById } from "@/lib/api"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CertificateVerification } from "@/components/certificate-verification"
import { QrCodeModal } from "@/components/qr-code-modal"
import { CourseDetails } from "@/components/course-details"
import { SiteFooter } from "@/components/site-footer"
import type { Certificate } from "@/lib/types"

export default function CertificatePage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [metadata, setMetadata] = useState<Certificate | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [hash, setHash] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const certificateDetails = [
    {
      key: "certificate_id",
      label: "Certificate ID",
      icon: <Fingerprint className="h-5 w-5" />,
      value: metadata?.certificate_id,
      mono: true,
    },
    {
      key: "recipient_name",
      label: "Recipient",
      icon: <User className="h-5 w-5" />,
      value: metadata?.recipient_name,
    },
    {
      key: "event_name",
      label: "Course",
      icon: <Award className="h-5 w-5" />,
      value: metadata?.event_name,
    },
    {
      key: "issue_date",
      label: "Issue Date",
      icon: <Calendar className="h-5 w-5" />,
      value: metadata?.issue_date,
    },
    {
      key: "duration",
      label: "Duration",
      icon: <Clock className="h-5 w-5" />,
      value: metadata?.duration,
    },
  ]

  useEffect(() => {
    async function loadCertificate() {
      try {
        setLoading(true)
        await getCertificateById(id).then((data) => {
          if (!data) {
            setError(true)
            return
          }
          setImage(data.image)
          setMetadata(data.metadata)
          setTxHash(data.txHash)
          setHash(data.hash)
        })
      } catch (err) {
        console.error("Error loading certificate:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadCertificate()
  }, [id])


  const shareCertificate = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificate of ${metadata?.recipient_name}`,
        text: `Check out this certificate of completion for ${metadata?.event_name}`,
        url: window.location.href,
      })
      .then(() => console.log("Certificate shared successfully"))
      .catch((error) => console.error("Error sharing certificate:", error))
    }
  }
  

  const downloadCertificate = async () => {
    if (!image) return
    try {
      const response = await fetch(image, { mode: "cors" })
      if (!response.ok) throw new Error("Network response was not ok")
  
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement("a")

      a.href = blobUrl
      a.download = `${metadata?.recipient_name}.png`

      document.body.appendChild(a)
      a.click()

      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch (err) {
      setError(true)
      console.error("Error downloading certificate:", err)
    }
  }



  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <Image src="/inovus-logo.png" priority={true} alt="Inovus Labs" width={180} height={48} className="h-10 w-auto" />
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

                {loading ? (
                  <div className="flex h-[500px] items-center justify-center bg-slate-900 rounded-lg border-4 border-slate-700 shadow-lg animate-pulse">
                    <Loader2 className="h-12 w-12 animate-spin text-teal-500" />
                  </div>
                ) : (
                  <>
                    <div className="absolute -right-3 -top-3 rounded-full bg-emerald-500/10 p-2">
                      <QrCode className="h-6 w-6 text-emerald-300" />
                    </div>
                    <QrCodeModal certificateId={metadata?.certificate_id} recipientName={metadata?.recipient_name} />
                    <Image
                      src={image}
                      priority={true}
                      alt="Certificate"
                      width={1000}
                      height={700}
                      className="rounded-lg border-4 border-slate-700 shadow-lg"
                      onError={() => setError(true)}
                    />
                  </>
                )}
                
              </div>

              <CertificateVerification metadata={metadata} txHash={txHash} hash={hash} />
            </Card>
          </div>

          <div>
            <div className="sticky top-8 space-y-6">
              <div className="rounded-lg bg-slate-800/50 p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white">Certificate Details</h2>

                <div className="mt-4 space-y-4">
                  {certificateDetails.map((detail) =>
                    detail.value && (

                      <div key={detail.key} className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/20 text-teal-400">
                          {detail.icon}
                        </div>
                        <div>
                          <div className="text-xs text-slate-400">{detail.label}</div>
                          <div className={`${detail.mono ? "font-mono" : ""} text-sm text-slate-200`}>
                            {detail.value}
                          </div>
                        </div>
                      </div>
                      
                    )
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

                  <div className="flex flex-col gap-1 rounded-md bg-slate-900/80 p-3">
                    <div className="text-xs text-slate-400">Blockchain Transaction Hash</div>
                    <div className="font-mono text-xs text-slate-300 break-all">
                      {txHash}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 gap-2 bg-teal-600 hover:bg-teal-700" onClick={downloadCertificate}>
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
                        onClick={shareCertificate}
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

        {/* <div className="mt-12">
          <CourseDetails certificate={certificate} />
        </div> */}
      </main>

      <SiteFooter />
    </div>
  )
}
