'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

// BUG: This component has several accessibility and performance issues
export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0

  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }),
    []
  )

  const formatPrice = (price: number) => {
    const safePrice = Number.isFinite(price) ? price : 0
    return priceFormatter.format(safePrice)
  }

  const stockStatus = useMemo(() => {
    if (product.stock <= 0) return 'Out of Stock'
    if (product.stock <= 5) return 'Low Stock'
    return 'In Stock'
  }, [product.stock])

  const stockColor = useMemo(() => {
    if (product.stock <= 0) return 'text-error-600'
    if (product.stock <= 5) return 'text-warning-600'
    return 'text-success-600'
  }, [product.stock])

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={`${product.name} product photo`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
          <span
            className={`text-xs px-2 py-1 rounded ${stockColor}`}
            role="status"
            aria-label={`Stock status: ${stockStatus}`}
          >
            {stockStatus}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Category</span>
            <span className="text-sm font-medium">{product.category}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-sm text-gray-500">Stock</span>
            <span className="text-sm font-medium">{product.stock}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            SKU: {product.sku}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="primary" 
            className="flex-1"
            disabled={isOutOfStock}
            onClick={() => {
              // BUG: No error handling for this action
              console.log('Add to cart:', product.id)
            }}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              // TODO: Implement product details view
              console.log('View details:', product.id)
            }}
            aria-label={`View details for ${product.name}`}
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  )
}