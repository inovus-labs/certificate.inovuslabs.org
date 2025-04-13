"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SearchIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function Search() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)")  
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }
  
    setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleMediaChange)
  
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange)
    }
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!query.trim()) {
      toast({
        title: "Please enter a search term",
        description: "Enter your certificate ID or full name to search",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Check if the query is a certificate ID (alphanumeric with hyphens)
      const isCertificateId = /^[a-zA-Z0-9-]+$/.test(query) && query.includes("-")

      if (isCertificateId) {
        // If it's a certificate ID, go directly to the certificate page
        router.push(`/certificate/${query}`)
      } else {
        // If it's a name, go to the search results page
        router.push(`/search?q=${encodeURIComponent(query)}`)
      }
    } catch (error) {
      console.error("Search error:", error)
      toast({
        title: "Search failed",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative">
        <Input
          type="text"
          placeholder={isMobile ? "Search..." : "Enter certificate ID or full name"}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-14 w-full rounded-full border-2 border-teal-500/30 bg-slate-900/50 pl-6 pr-14 text-lg text-white shadow-inner shadow-teal-900/20 transition-all focus-visible:border-teal-500 focus-visible:ring-teal-500"
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2 top-2 h-10 w-10 rounded-full bg-teal-600 transition-colors hover:bg-teal-700"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SearchIcon className="h-5 w-5" />}
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </form>
  )
}
