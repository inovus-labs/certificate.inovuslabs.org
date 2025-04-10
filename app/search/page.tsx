import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "@/components/search"
import { Button } from "@/components/ui/button"
import { ChevronLeft, SearchIcon } from "lucide-react"
import { SearchResults } from "@/components/search-results"
import { Skeleton } from "@/components/ui/skeleton"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ""

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <Image src="/inovus-logo.svg" alt="Inovus Labs" width={180} height={48} />
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-purple-300 hover:text-purple-100 hover:bg-purple-900/50"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-8 rounded-lg bg-slate-800/50 p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-purple-500/20 p-2">
              <SearchIcon className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Search Results</h1>
              <p className="text-sm text-slate-300">Showing results for "{query}"</p>
            </div>
          </div>
          <div className="mt-4 max-w-2xl">
            <Search />
          </div>
        </div>

        <Suspense
          fallback={
            <div className="space-y-4">
              <Skeleton className="h-8 w-48 bg-slate-800" />
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-40 w-full rounded-lg bg-slate-800" />
                ))}
              </div>
            </div>
          }
        >
          <SearchResults query={query} />
        </Suspense>
      </div>
    </div>
  )
}
