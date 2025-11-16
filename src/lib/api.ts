import type { Product, CreateProductRequest, UpdateProductRequest, FilterOptions } from '@/types/product'
import type { ApiResponse } from '@/types/api'
import { mockProducts } from '@/data/mockProducts'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const generateId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  // Fallback – still not perfect, but better than plain Math.random usage
  return Math.random().toString(36).slice(2, 11)
}

// BUG: This function has memory leaks and inefficient data handling
export async function getProducts(filters?: FilterOptions): Promise<Product[]> {
  await delay(800) // Simulate slow API

  if (!filters) {
    return [...mockProducts]
  };

  const { category, minPrice, maxPrice, inStock } = filters;

  // PERFORMANCE ISSUE: Multiple array iterations instead of single pass Fixed

  return mockProducts.filter((product) => {
    // Category filter
    if (category && product.category !== category) {
      return false
    }

    // BUG: Price filtering logic is incorrect Fixed
    if (typeof minPrice === 'number' && product.price < minPrice) {
      return false
    }

    if (typeof maxPrice === 'number' && product.price > maxPrice) {
      return false
    }

    // BUG: Stock filtering logic is backwards Fixed
    if (inStock !== undefined && inStock !== (product.stock > 0)) {
      return false
    }

    return true
  });
}

export async function getProduct(id: string): Promise<Product | null> {
  await delay(300)
  
  const product = mockProducts.find(p => p.id === id)
  return product || null
}

// BUG: This function doesn't properly validate input data
export async function createProduct(
    data: CreateProductRequest
): Promise<ApiResponse<Product>> {
  await delay(500)

  const { name, category, price } = data

  // Basic required field validation
  if (!name?.trim() || !category?.trim()) {
    throw new Error('Name and category are required')
  }

  // Validate price
  if (price === undefined || Number.isNaN(price)) {
    throw new Error('Price is required and must be a valid number')
  }

  if (price < 0 || price > 1_000_000) {
    throw new Error('Price must be between 0 and 1,000,000')
  }

  const now = new Date().toISOString()

  const newProduct: Product = {
    id: generateId(),
    ...data,
    createdAt: now,
    updatedAt: now,
  }
  mockProducts.push(newProduct)

  return {
    success: true,
    data: newProduct,
    message: 'Product created successfully',
  }
};

export async function updateProduct(
    data: UpdateProductRequest
): Promise<ApiResponse<Product>> {
  await delay(400)

  const index = mockProducts.findIndex((p) => p.id === data.id)

  if (index === -1) {
    throw new Error('Product not found')
  }

  const existing = mockProducts[index]

  // Only override fields that are actually provided (avoid blindly writing undefined)
  const partialUpdate: Partial<Product> = {}
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && key !== 'id') {
      // @ts-expect-error – casting by key, but safe in controlled code
      partialUpdate[key] = value
    }
  })

  const updatedProduct: Product = {
    ...existing,
    ...partialUpdate,
    updatedAt: new Date().toISOString(),
  }

  mockProducts[index] = updatedProduct

  return {
    success: true,
    data: updatedProduct,
    message: 'Product updated successfully',
  }
};

export async function deleteProduct(id: string): Promise<ApiResponse<void>> {
  await delay(300)
  
  const index = mockProducts.findIndex(p => p.id === id)
  
  if (index === -1) {
    throw new Error('Product not found')
  }
  
  mockProducts.splice(index, 1)
  
  return {
    success: true,
    data: undefined,
    message: 'Product deleted successfully'
  }
}