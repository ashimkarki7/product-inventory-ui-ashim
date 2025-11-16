import type { Metadata } from 'next';
import { Navbar } from "@/components/Navbar"

import './globals.css'

export const metadata: Metadata = {
  title: 'Product Inventory Tracker',
  description: 'Technical Interview Challenge - Product Inventory Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
            <Navbar />
          <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}