import type { Product, CreateProductRequest, UpdateProductRequest, FilterOptions } from '@/types/product'
import type { ApiResponse } from '@/types/api'
import { mockProducts } from '@/data/mockProducts'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const isValidUrl = (value: string) => {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

const generateId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

// BUG: This function has memory leaks and inefficient data handling
export async function getProducts(filters?: FilterOptions): Promise<Product[]> {
  await delay(800) // Simulate slow API

  if (!filters) {
    return [...mockProducts]
  }

  return mockProducts.filter((product) => {
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
}

export async function getProduct(id: string): Promise<Product | null> {
  await delay(300)
  
  const product = mockProducts.find(p => p.id === id)
  return product || null
}

// BUG: This function doesn't properly validate input data
export async function createProduct(data: CreateProductRequest): Promise<ApiResponse<Product>> {
  await delay(500)

  const requiredFields: (keyof CreateProductRequest)[] = ['name', 'description', 'category', 'price', 'stock', 'sku']
  const missingField = requiredFields.find((field) => {
    const value = data[field]
    return value === undefined || value === null || value === ''
  })

  if (missingField) {
    throw new Error(`Field "${missingField}" is required`)
  }

  if (!Number.isFinite(data.price)) {
    throw new Error('Price must be a valid number')
  }

  if (data.price <= 0 || data.price > 999999) {
    throw new Error('Price must be between $0.01 and $999,999')
  }

  if (!Number.isFinite(data.stock)) {
    throw new Error('Stock must be a valid number')
  }

  if (data.stock < 0 || !Number.isInteger(data.stock)) {
    throw new Error('Stock must be a whole number greater than or equal to 0')
  }

  if (data.imageUrl && !isValidUrl(data.imageUrl)) {
    throw new Error('Image URL must be a valid URL')
  }

  const newProduct: Product = {
    id: generateId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  // In a real app, this would persist to a database
  mockProducts.push(newProduct)

  return {
    success: true,
    data: newProduct,
    message: 'Product created successfully'
  }
}

export async function updateProduct(data: UpdateProductRequest): Promise<ApiResponse<Product>> {
  await delay(400)
  
  const index = mockProducts.findIndex(p => p.id === data.id)
  
  if (index === -1) {
    throw new Error('Product not found')
  }
  
  // BUG: This doesn't properly merge the updated data
  const updatedProduct = {
    ...mockProducts[index],
    ...data,
    updatedAt: new Date().toISOString(),
  }
  
  mockProducts[index] = updatedProduct
  
  return {
    success: true,
    data: updatedProduct,
    message: 'Product updated successfully'
  }
}

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