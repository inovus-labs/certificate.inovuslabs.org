import { ConnectWallet } from "@/components/connect-wallet"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-muted/40">
      <div className="max-w-md w-full mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Inovus Labs Admin Console</h1>
        <p className="text-muted-foreground mb-8">
          Connect your MetaMask wallet to access the certificate management system.
        </p>
        <ConnectWallet />
      </div>
    </main>
  )
}
