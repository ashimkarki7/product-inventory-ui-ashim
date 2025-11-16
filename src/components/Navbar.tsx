"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const routeTitles: Record<string, string> = {
    "/": "Dashboard",
    "/products": "Products",
    "/products/new": "Add Product",
}

export function Navbar() {
    const pathname = usePathname()
    const title = routeTitles[pathname] || "Product Inventory"

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-xl font-semibold text-gray-900">
                            {title}
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-gray-500 hover:text-gray-700">
                            Dashboard
                        </Link>
                        <Link href="/products" className="text-gray-500 hover:text-gray-700">
                            Products
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
