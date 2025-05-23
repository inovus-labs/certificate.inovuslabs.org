import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin, Instagram, Mail, Heart } from "lucide-react"

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 border-t border-slate-800 lg:py-5 py-10 text-slate-400">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="flex gap-6 flex-wrap items-center justify-center md:justify-start">
          <div className="flex flex-row items-center gap-6">
            <img src="/badges/opensource.svg" alt="Open Source" className="h-8 w-auto" />
            <img src="/badges/carbonneutral.svg" alt="Carbon Neutral" className="h-8 w-auto" />
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="mt-2 text-slate-500 text-sm">
            Built with ❤️ by <a href="https://inovuslabs.org" target="blank" className="text-slate-400 hover:text-teal-400 transition">Inovus Labs</a>
          </p>
        </div>

        <div className="text-center md:text-right text-sm text-slate-500">
          <span className="text-xs text-slate-500">
            <a href="/privacy-policy" className="text-slate-400 hover:text-teal-400 transition">Privacy Policy</a> | <a href="/terms-of-use" className="text-slate-400 hover:text-teal-400 transition">Terms of Service</a>
          </span>
          <br />
          <span className="text-xs text-slate-500">
            © {new Date().getFullYear()} Inovus Labs. All rights reserved.
            <br />
            <span>
              Powered by <a href="https://github.com/decoded-cipher/inovus-certificate-validator" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition">inovus-certificate-validator</a> (<a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-teal-400 transition">MIT License</a>)
            </span>
          </span>
        </div>

      </div>
    </footer>
  )
}
