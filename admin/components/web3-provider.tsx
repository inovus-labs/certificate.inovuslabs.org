"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { ethers } from "ethers"

type Web3ContextType = {
  provider: ethers.BrowserProvider | null
  signer: ethers.JsonRpcSigner | null
  account: string | null
  chainId: number | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  isConnecting: boolean
  isConnected: boolean
  error: string | null
  isOwner: boolean
}

const Web3Context = createContext<Web3ContextType>({
  provider: null,
  signer: null,
  account: null,
  chainId: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnecting: false,
  isConnected: false,
  error: null,
  isOwner: false,
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isOwner, setIsOwner] = useState(false)

  // Check if wallet was previously connected
  useEffect(() => {
    const checkConnection = async () => {
      const savedAccount = localStorage.getItem("connectedWalletAddress")

      if (savedAccount && window.ethereum) {
        try {
          const browserProvider = new ethers.BrowserProvider(window.ethereum)
          const accounts = await browserProvider.listAccounts()

          // Only auto-connect if the saved account is still available
          if (accounts.length > 0 && accounts.some((acc) => acc.address.toLowerCase() === savedAccount.toLowerCase())) {
            await connectWallet()
          } else {
            localStorage.removeItem("connectedWalletAddress")
          }
        } catch (err) {
          console.error("Failed to auto-connect wallet:", err)
          localStorage.removeItem("connectedWalletAddress")
        }
      }
    }

    checkConnection()
  }, [])

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setError("MetaMask is not installed")
      return
    }

    try {
      setIsConnecting(true)
      setError(null)

      const browserProvider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await browserProvider.send("eth_requestAccounts", [])

      if (accounts.length === 0) {
        throw new Error("No accounts found")
      }

      const connectedSigner = await browserProvider.getSigner()
      const network = await browserProvider.getNetwork()

      setProvider(browserProvider)
      setSigner(connectedSigner)
      setAccount(accounts[0])
      setChainId(Number(network.chainId))
      setIsConnected(true)

      // Save connected account to localStorage
      localStorage.setItem("connectedWalletAddress", accounts[0])

      // Check if the connected account is the owner
      // In a real app, you would call your smart contract here
      // For now, we'll simulate with a hardcoded owner address
      const ownerAddress = "0x8ba1f109551bD432803012645Ac136ddd64DBA72" // Replace with your actual owner address
      setIsOwner(accounts[0].toLowerCase() === ownerAddress.toLowerCase())
    } catch (err) {
      console.error("Connection error:", err)
      setError(err instanceof Error ? err.message : "Failed to connect wallet")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setProvider(null)
    setSigner(null)
    setAccount(null)
    setChainId(null)
    setIsConnected(false)
    setIsOwner(false)
    localStorage.removeItem("connectedWalletAddress")
  }

  useEffect(() => {
    // Handle account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet()
      } else if (accounts[0] !== account) {
        setAccount(accounts[0])
        setIsConnected(true)
        localStorage.setItem("connectedWalletAddress", accounts[0])

        // Check if the new account is the owner
        const ownerAddress = "0x8ba1f109551bD432803012645Ac136ddd64DBA72" // Replace with your actual owner address
        setIsOwner(accounts[0].toLowerCase() === ownerAddress.toLowerCase())
      }
    }

    // Handle chain changes
    const handleChainChanged = (chainIdHex: string) => {
      setChainId(Number.parseInt(chainIdHex, 16))
    }

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [account])

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        account,
        chainId,
        connectWallet,
        disconnectWallet,
        isConnecting,
        isConnected,
        error,
        isOwner,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => useContext(Web3Context)
