import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Certificate | Inovus Labs",
    template: "%s | Inovus Labs",
  },
  description:
    "Verify the authenticity of your Inovus Labs certificates on the blockchain. Secure, transparent, and tamper-proof certificate verification system.",
  keywords: [
    "certificate verification",
    "blockchain",
    "Inovus Labs",
    "digital certificates",
    "authentication",
    "verification",
  ],
  authors: [{ name: "Inovus Labs" }],
  creator: "Arjun Krishna",
  publisher: "Inovus Labs",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://certificate.inovuslabs.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Certificate | Inovus Labs",
    description: "Verify the authenticity of your Inovus Labs certificates on the blockchain.",
    siteName: "Inovus Labs Certificate Verification",
    images: [
      {
        url: "https://certificate.inovuslabs.org/og-image.png",
        width: 1200,
        height: 630,
        alt: "Inovus Labs Certificate Verification",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Certificate | Inovus Labs",
    description: "Verify the authenticity of your Inovus Labs certificates on the blockchain.",
    images: ["https://certificate.inovuslabs.org/og-image.png"],
    creator: "@inovuslabs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* <link rel="icon" href="/icon.svg" type="image/svg+xml" /> */}
        {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
        {/* <link rel="manifest" href="/manifest.json" /> */}
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="light"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}