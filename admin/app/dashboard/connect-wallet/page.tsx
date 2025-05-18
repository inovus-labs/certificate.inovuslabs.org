"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeb3 } from "@/components/web3-provider"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ConnectWalletPage() {
  const { connectWallet, isConnecting, isConnected, error, account } = useWeb3()
  const router = useRouter()

  useEffect(() => {
    if (isConnected && account) {
      // Redirect to dashboard after successful connection
      router.push("/dashboard")
    }
  }, [isConnected, account, router])

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Connect Wallet</h1>
        <p className="text-muted-foreground">Connect your MetaMask wallet to access blockchain features</p>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Connect MetaMask</CardTitle>
          <CardDescription>Connect your wallet to manage certificates on the blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-center p-4">
            <img src="/placeholder.svg?height=80&width=80" alt="MetaMask" className="h-20 w-20 mb-4" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={connectWallet} disabled={isConnecting}>
            {isConnecting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect MetaMask"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
