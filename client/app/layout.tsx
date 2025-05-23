"use client"

import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Lit } from "litlyx-js"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Certificate | Inovus Labs",
  description: "Verify the authenticity of your Inovus Labs certificates on the blockchain.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  Lit.init("6830b52b7f61ebd3d8c21281");
  return (
    <html lang="en" suppressHydrationWarning>
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


import './globals.css'