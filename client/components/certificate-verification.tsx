"use client"

import { useState } from "react"
import { Shield, CheckCircle, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { shortAddress } from "@/lib/utils"
import axios from "@/lib/api";

export function CertificateVerification({ metadata, txHash, hash }: { metadata: any; txHash: string, hash: string }) {
  
  const [verificationState, setVerificationState] = useState<"idle" | "verifying" | "verified">("idle")
  const [progress, setProgress] = useState(0)

  const [txData, setTxData] = useState<any>(null)

  const verificationSteps = [
    { progress: 0, label: "Starting verification..." },
    { progress: 30, label: "Certificate ID validated" },
    { progress: 60, label: "Blockchain record found" },
    { progress: 80, label: "Certificate hash verified" },
  ]

  const verifiedDetails = [
    {
      label: "Certificate ID",
      value: metadata?.certificate_id,
      mono: true,
    },
    {
      label: "Blockchain",
      value: txData?.network,
    },
    {
      label: "Block Number",
      value: txData?.blockNumber,
    },
    {
      label: "Block Hash",
      value: shortAddress(txData?.blockHash || "", 8),
      mono: true,
    },
    {
      label: "Verification Time",
      value: new Date().toLocaleString(),
    },
  ]




  const handleVerify = async () => {
    setVerificationState("verifying")
    setProgress(0)

    try {
      // 1. Get data from database (Simulated with a timeout)
      await new Promise((resolve) => setTimeout(resolve, 600))
      setProgress(30)


      // 2. Verify the hash on the blockchain
      const verificationData = await axios.get(`/certificate/verify/${hash}`)
      if (!verificationData) {
        setVerificationState("idle")
        setProgress(0)
        return
      }
      setTxData(verificationData)
      setProgress(60)
      
      
      // 3. Get the transaction data from the blockchain
      const transactionData = await axios.get(`/transaction/${txHash}`)
      const transaction = transactionData.data
      if (!transaction) {
        setVerificationState("idle")
        setProgress(0)
        return
      }
      setTxData(transaction.data)
      setProgress(80)


      // 4. Done
      setTimeout(() => {
        setProgress(100)
        setVerificationState("verified")
      }, 600)
      
    } catch (err) {
      setVerificationState("idle")
      setProgress(0)
      console.error("Error verifying certificate: ", err)
    }
  }


  const openInExplorer = () => {
    if (txData) {
      const etherscanUrl = txData?.explorerUrl || '/'
      window.open(etherscanUrl, "_blank")
    }
  }

  return (
    <div className="mt-6 rounded-lg bg-slate-900/80 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Certificate Verification</h3>

        {verificationState === "verified" && (
          <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
            <CheckCircle className="mr-1 h-3.5 w-3.5" />
            Verified
          </Badge>
        )}
      </div>

      <div className="mt-4">
        {verificationState === "idle" && (
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-dashed border-slate-700 p-6 text-center">
            <Shield className="h-12 w-12 text-slate-500" />
            <div>
              <h4 className="text-lg font-medium text-white">Verify Certificate Authenticity</h4>
              <p className="mt-1 text-sm text-slate-400">
                Click the button below to verify this certificate on the blockchain
              </p>
            </div>
            <Button onClick={handleVerify} className="mt-2 bg-teal-600 hover:bg-teal-700">
              <Fingerprint className="mr-2 h-4 w-4" />
              Verify Certificate
            </Button>
          </div>
        )}


        {verificationState === "verifying" && (
          <div className="space-y-4 rounded-lg border border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-teal-400" />
                <span className="text-sm font-medium text-white">Verifying certificate authenticity...</span>
              </div>
              <span className="text-sm text-slate-400">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-slate-700" indicatorClassName="bg-teal-500" />
            <div className="space-y-2 text-xs text-slate-400">

              {verificationSteps.map(
                (step, idx) =>
                  progress >= step.progress && (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{step.label}</span>
                    </div>
                  )
              )}
              
            </div>
          </div>
        )}



        {verificationState === "verified" && (
          <div className="space-y-4 rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 lg:p-6">
            <div className="flex items-center gap-3">
              <div className="flex min-h-10 min-w-10 items-center justify-center rounded-full bg-emerald-500/20">
                <Shield className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-lg font-medium text-white">Certificate Verified</h4>
                <p className="text-xs lg:text-sm text-slate-300">
                  This certificate has been verified as authentic on the blockchain
                </p>
              </div>
            </div>
            <div className="space-y-2 rounded-md bg-slate-800 p-3">

              {verifiedDetails.map((detail, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{detail.label}</span>
                  <span className={`${detail.mono ? "font-mono" : ""} text-xs text-slate-300`}>
                    {detail.value}
                  </span>
                </div>
              ))}

            </div>
            <div className="flex items-center justify-between rounded-md bg-slate-800 p-3">
              <span className="text-xs text-slate-400">Verification Hash</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-xs text-teal-400 hover:text-teal-300"
                onClick={openInExplorer}
              >
                View on Explorer
              </Button>
            </div>
          </div>
        )}



      </div>
    </div>
  )
}
