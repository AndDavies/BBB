import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "./theme-config"
import { ThemeToggle } from "@/components/theme-toggle"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Holistic Daily App",
  description: "What if you only had to take care of 3 things in a day?",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-background text-foreground min-h-screen`}>
        <ThemeProvider defaultTheme="system" storageKey="holistic-theme">
          <div className="flex flex-col min-h-screen">
            <header className="border-b border-border">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">Holistic Daily</h1>
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border py-6">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                <p>Holistic Daily App &copy; {new Date().getFullYear()}</p>
                <p className="mt-1">What if you only had to take care of 3 things in a day?</p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'