"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useWeb3 } from "@/components/web3-provider"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ConnectWallet() {
  const { connectWallet, isConnecting, isConnected, error, account } = useWeb3()
  const router = useRouter()

  useEffect(() => {
    if (isConnected && account) {
      // In a real app, you'd verify if the user has admin privileges here
      // For now, we'll just redirect to the dashboard
      router.push("/dashboard")
    }
  }, [isConnected, account, router])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Connect Wallet</CardTitle>
        <CardDescription>Connect your MetaMask wallet to access the admin dashboard</CardDescription>
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
  )
}
