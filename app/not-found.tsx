import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 px-4 text-center">
      <div className="mb-8">
        <Image src="/inovus-logo.svg" alt="Inovus Labs" width={180} height={48} />
      </div>

      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-purple-500/20">
        <FileQuestion className="h-12 w-12 text-purple-400" />
      </div>

      <h1 className="text-6xl font-bold text-white">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-purple-200">Certificate Not Found</h2>
      <p className="mt-2 max-w-md text-slate-300">
        The certificate you are looking for doesn't exist or has been removed. Please check the certificate ID and try
        again.
      </p>

      <Link href="/" className="mt-8">
        <Button className="bg-purple-600 hover:bg-purple-700">Return to Certificate Search</Button>
      </Link>
    </div>
  )
}
