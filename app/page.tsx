import { Search } from "@/components/search"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Award, CheckCircle, SearchIcon, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <Image src="/inovus-logo.svg" alt="Inovus Labs" width={180} height={48} priority />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50">
              About
            </Button>
            <Button variant="ghost" className="text-purple-300 hover:text-purple-100 hover:bg-purple-900/50">
              Contact
            </Button>
            <Button className="bg-purple-600 text-white hover:bg-purple-700">Admin Login</Button>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center space-y-12 py-16 text-center">
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300"
            >
              Certificate Verification Platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Verify Your <span className="text-purple-400">Credentials</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-slate-300">
              Instantly verify the authenticity of your Inovus Labs certificates with our secure blockchain-powered
              verification system
            </p>
            <div className="flex justify-center">
              <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-300">
                <CheckCircle className="mr-1 h-3.5 w-3.5" />
                Trusted by thousands of students and employers
              </Badge>
            </div>
          </div>

          <div className="w-full max-w-2xl rounded-xl bg-slate-800/50 p-8 shadow-xl backdrop-blur-sm">
            <div className="mb-6 text-left">
              <h2 className="text-xl font-semibold text-white">Verify Your Certificate</h2>
              <p className="mt-1 text-sm text-slate-300">Enter your certificate ID or full name below</p>
            </div>
            <Search />
          </div>

          <div className="grid gap-8 pt-8 md:grid-cols-3">
            <Card className="border-none bg-slate-800/50 shadow-xl backdrop-blur-sm">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-purple-500/20 p-3 text-purple-400">
                  <SearchIcon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-white">Search</h3>
                <p className="text-sm text-slate-300">
                  Enter your certificate ID or name to begin the verification process
                </p>
              </CardContent>
            </Card>

            <Card className="border-none bg-slate-800/50 shadow-xl backdrop-blur-sm">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-purple-500/20 p-3 text-purple-400">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-white">Verify</h3>
                <p className="text-sm text-slate-300">
                  Our blockchain system verifies the authenticity of your certificate instantly
                </p>
              </CardContent>
            </Card>

            <Card className="border-none bg-slate-800/50 shadow-xl backdrop-blur-sm">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-purple-500/20 p-3 text-purple-400">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-white">Download</h3>
                <p className="text-sm text-slate-300">View and download your verified certificate for your records</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-800 bg-slate-900/50 py-8 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Image src="/inovus-logo.svg" alt="Inovus Labs" width={120} height={32} />
              <span className="text-sm text-slate-400">© {new Date().getFullYear()} Inovus Labs</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-slate-400 hover:text-purple-400">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-slate-400 hover:text-purple-400">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-slate-400 hover:text-purple-400">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
