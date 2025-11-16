'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { ProductFilters } from '@/components/ProductFilters'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { Product, FilterOptions } from '@/types/product'
import { getProducts } from '@/lib/api'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
    inStock: undefined,
  })

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
      setError('We were unable to load products. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (filters.category && product.category !== filters.category) {
        return false
      }

      if (typeof filters.minPrice === 'number' && product.price < filters.minPrice) {
        return false
      }

      if (typeof filters.maxPrice === 'number' && product.price > filters.maxPrice) {
        return false
      }

      if (filters.inStock === true && product.stock <= 0) {
        return false
      }

      if (filters.inStock === false && product.stock > 0) {
        return false
      }

      return true
    })
  }, [filters, products])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="space-y-6">
      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-lg border border-error-200 bg-error-50 p-4 text-sm text-error-800 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>{error}</p>
          <button
            type="button"
            onClick={fetchProducts}
            className="self-start rounded-md border border-error-300 px-3 py-1 text-error-700 transition hover:bg-error-100"
          >
            Retry
          </button>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Product Inventory</h2>
        <div className="text-sm text-gray-500">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      <ProductFilters filters={filters} onFiltersChange={setFilters} />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}