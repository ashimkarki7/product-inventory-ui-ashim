'use client'

import { ChangeEvent,MouseEvent , useCallback,useMemo } from 'react'
import type { FilterOptions, ProductCategory } from '@/types/product'

interface ProductFiltersProps {
  filters: FilterOptions
  onFiltersChange: (filters: FilterOptions) => void
}

const categories: ProductCategory[] = [
  'Electronics',
  'Clothing', 
  'Books',
  'Home & Garden',
  'Sports',
  'Toys',
  'Beauty',
  'Automotive'
]

// BUG: This component has performance and UX issues
export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {

  const parsePriceValue = (value: string) => {
    if (value.trim() === '') {
      return undefined
    }

    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
  };
  
  // BUG: These handlers recreate functions on every render Fixed
  const handleCategoryChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
        onFiltersChange({
          ...filters,
          category: e.target.value,
        });
      },
      [onFiltersChange]
  );



  
  const handleMinPriceChange= useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const parsedValue = parsePriceValue(e.target.value)
        onFiltersChange({
          ...filters,
          minPrice: parsedValue
        })
      },
      [onFiltersChange]
  );

  const handleMaxPriceChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const parsedValue = parsePriceValue(e.target.value)
        onFiltersChange({
          ...filters,
          maxPrice: parsedValue
        })
      },
      [onFiltersChange]
  );

  const handleStockChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        let inStock: boolean | undefined
        if (value === 'true') inStock = true
        if (value === 'false') inStock = false
        onFiltersChange({
          ...filters,
          inStock
        })
      },
      [onFiltersChange]
  );


  // BUG: Reset function doesn't properly clear all filters
    const handleReset  = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()
            onFiltersChange({
            category: '',
            minPrice: undefined,
            maxPrice: undefined,
            inStock: undefined, // BUG: Should be undefined Fixed
        })
    },[]);


    const filterSummary = useMemo(() => {
        const segments: string[] = []

        if (filters.category) {
            segments.push(`Category: ${filters.category}`)
        }

        if (typeof filters.minPrice === 'number') {
            segments.push(`Min: $${filters.minPrice}`)
        }

        if (typeof filters.maxPrice === 'number') {
            segments.push(`Max: $${filters.maxPrice}`)
        }

        if (filters.inStock !== undefined) {
            segments.push(filters.inStock ? 'In Stock Only' : 'Out of Stock Only')
        }

        if (segments.length === 0) {
            return 'No filters applied'
        }

        return segments.join(' • ')
    }, [filters])

  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-4 space-y-4 lg:space-y-0">
        <div className="flex-1">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={handleCategoryChange}
            className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="" className="text-gray-700">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}   className="text-gray-700">
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label htmlFor="min-price" className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            id="min-price"
            placeholder="0.00"
            min="0"
            step="0.01"
            value={filters.minPrice ?? ''}
            onChange={handleMinPriceChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700 focus:border-transparent"
          />
        </div>
        
        <div className="flex-1">
          <label htmlFor="max-price" className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            id="max-price"
            placeholder="999.99"
            min="0"
            step="0.01"
            value={filters.maxPrice ?? ''}
            onChange={handleMaxPriceChange}
            className="text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex-1">
          <label htmlFor="stock-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <select
            id="stock-filter"
            value={filters.inStock === undefined ? '' : filters.inStock.toString()}
            onChange={handleStockChange}
            className=" text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="" className="text-gray-700">All Products</option>
            <option value="true" className="text-gray-700">In Stock Only</option>
            <option value="false" className="text-gray-700">Out of Stock Only</option>
          </select>
        </div>
        
        <div className="flex-shrink-0">
          {/* BUG: Button lacks proper accessibility attributes */}
          <button
            onClick={handleReset}
            aria-label="Reset all filters"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            type="button"
          >
            Reset Filters
          </button>
        </div>
      </div>
      
      {/* BUG: This summary text updates too frequently and causes unnecessary re-renders */}
      <div className="mt-3 text-xs text-gray-500">
          {filterSummary}
      </div>
    </div>
  )
}