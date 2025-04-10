import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 px-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-teal-500/20">
        <FileQuestion className="h-12 w-12 text-teal-400" />
      </div>

      <h1 className="text-6xl font-bold text-white">404</h1>
      <h2 className="mt-4 text-3xl font-semibold text-teal-200">Certificate Not Found</h2>
      <p className="mt-4 max-w-2xl text-slate-300">
        The certificate you are looking for doesn't exist or has been removed.<br />Please check the certificate ID and try
        again.
      </p>

      <Link href="/" className="mt-8">
        <Button className="bg-teal-600 hover:bg-teal-700">Return to Certificate Search</Button>
      </Link>
    </div>
  )
}
