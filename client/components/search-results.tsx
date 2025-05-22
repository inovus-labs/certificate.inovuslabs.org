"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Calendar, User, CheckCircle2 } from "lucide-react"
import { searchCertificates } from "@/lib/api"
import type { Certificate } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchResults() {
      if (!query) {
        setResults([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const data = await searchCertificates(query)
        setResults(data)
      } catch (error) {
        console.error("Error fetching results:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="border-none bg-slate-800/50 overflow-hidden backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-5 w-5 rounded-full bg-slate-700" />
                    <Skeleton className="h-4 w-48 bg-slate-700" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full bg-slate-700" />
                    <Skeleton className="h-4 w-32 bg-slate-700" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full bg-slate-700" />
                    <Skeleton className="h-3 w-24 bg-slate-700" />
                  </div>
                  <Skeleton className="h-3 w-36 bg-slate-700" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-700 py-12 text-center">
        <div className="rounded-full bg-slate-800 p-3">
          <Award className="h-6 w-6 text-slate-400" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-white">No certificates found</h3>
        <p className="mt-2 max-w-md text-sm text-slate-300">
          We couldn't find any certificates for "{query}". Please check the spelling or try searching with a certificate ID.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="border-teal-500/30 bg-teal-500/10 px-3 py-1 text-teal-300">
          Found {results.length} certificate(s)
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((item) => (
          <Link
            href={`/certificate/${item?.certificate_id}`}
            key={item?.certificate_id}
            className="transition-transform hover:scale-[1.02]"
          >
            <Card className="h-full overflow-hidden border-none bg-slate-800/50 transition-all hover:bg-slate-800/80 hover:shadow-lg hover:shadow-teal-900/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-2 text-teal-400">
                    <Award className="h-5 w-5" />
                    <span className="font-medium line-clamp-1">{item?.event_name}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-200">
                    <User className="h-4 w-4" />
                    <span className="line-clamp-1">{item?.recipient_name}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-slate-400 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>Issued: {item?.issue_date}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> Verified
                    </Badge>
                    <div className="text-xs text-slate-500">ID: {item?.certificate_id}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
