"use client"

import { Button } from "@/components/ui/button"
import { useWeb3 } from "@/components/web3-provider"
import { Loader2, Wallet } from "lucide-react"
import type { ButtonProps } from "@/components/ui/button"

interface ConnectWalletButtonProps extends ButtonProps {}

export function ConnectWalletButton({ ...props }: ConnectWalletButtonProps) {
  const { connectWallet, disconnectWallet, isConnecting, isConnected, error } = useWeb3()

  const handleClick = () => {
    if (isConnected) {
      disconnectWallet()
    } else {
      connectWallet()
    }
  }

  return (
    <Button onClick={handleClick} disabled={isConnecting} {...props}>
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : isConnected ? (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Disconnect
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  )
}
