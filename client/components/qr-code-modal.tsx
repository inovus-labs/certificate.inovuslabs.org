"use client"

import { useState } from "react"
import { QrCode, Share2, Download, Link, Copy, CheckCircle, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface QrCodeModalProps {
  certificateId: string
  recipientName: string
}

export function QrCodeModal({ certificateId, recipientName }: QrCodeModalProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()
  const certificateUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/certificate/${certificateId}`
      : `/certificate/${certificateId}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(certificateUrl)
    setCopied(true)
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this certificate link",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${recipientName}'s Certificate - Inovus Labs`,
          text: `Check out ${recipientName}'s verified certificate from Inovus Labs`,
          url: certificateUrl,
        })
        toast({
          title: "Certificate shared successfully",
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200 z-10"
        >
          {/* <QrCode className="h-8 w-8 text-emerald-300" /> */}
          <span className="sr-only">View QR Code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-md bg-slate-900 border-slate-800 p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-white">Certificate QR Code</DialogTitle>
          <DialogDescription className="text-slate-400 text-center text-sm flex flex-col items-center">
            <span>Scan this QR code to verify this certificate</span>
            <span>or share it with others</span>
          </DialogDescription>

        </DialogHeader>
        <Tabs defaultValue="qrcode" className="mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger
              value="qrcode"
              className="data-[state=active]:bg-teal-900/50 data-[state=active]:text-teal-300"
            >
              QR Code
            </TabsTrigger>
            <TabsTrigger value="share" className="data-[state=active]:bg-teal-900/50 data-[state=active]:text-teal-300">
              Share
            </TabsTrigger>
          </TabsList>


          <TabsContent value="qrcode" className="mt-4">
            <div className="flex flex-col items-center justify-center p-2 sm:p-4">
              <div className="bg-white p-3 sm:p-4 rounded-lg mb-4 w-full max-w-[240px] mx-auto">
                <div className="aspect-square relative">
                  <QrCode className="h-full w-full text-slate-900" strokeWidth={1} />
                </div>
              </div>
              <Badge
                variant="outline"
                className="border-teal-500/30 bg-teal-500/10 px-3 py-1 text-teal-300 text-xs sm:text-sm"
              >
                Certificate ID: {certificateId}
              </Badge>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-400 text-center">
                <Smartphone className="h-4 w-4 text-teal-400" />
                <p>Scan with your phone camera to verify</p>
              </div>
            </div>
          </TabsContent>


          <TabsContent value="share" className="mt-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2 rounded-md border w-full border-slate-800 bg-slate-950 p-3 justify-between">
                <Link className="h-4 w-4 flex-shrink-0 text-teal-400" />
                <p className="flex-1 truncate text-sm text-slate-300 overflow-hidden text-ellipsis max-w-[65vw] lg:max-w-full">
                  {certificateUrl}
                </p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-shrink-0 text-teal-400 hover:text-teal-300 hover:bg-teal-900/20"
                  onClick={handleCopyLink}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span className="sr-only">Copy link</span>
                </Button>
              </div>
              <Separator className="bg-slate-800" />
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-teal-500/30 bg-slate-800 text-teal-300 hover:bg-teal-900/50 hover:text-teal-200"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  className="border-teal-500/30 bg-slate-800 text-teal-300 hover:bg-teal-900/50 hover:text-teal-200"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download QR
                </Button>
              </div>
              <div className="mt-2 rounded-md bg-teal-500/10 p-3 text-xs text-teal-300 border border-teal-500/20">
                <p>Tip: Share this certificate directly on LinkedIn to showcase your achievement!</p>
              </div>
            </div>
          </TabsContent>

          
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
