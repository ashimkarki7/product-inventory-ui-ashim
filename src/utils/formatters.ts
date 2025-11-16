// Utility functions for formatting data (intentionally has some bugs for candidates to find)


// BUG: Doesn't handle edge cases like NaN, undefined, or very large numbers fixed
export function formatPrice(price: number | undefined | null): string {
   if (typeof price !== 'number' || isNaN(price)) {
     return '$0.00' // Return a sensible default
   }
    return `$${price.toFixed(2)}`
}

export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) {
        return 'Invalid Date'
          }
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
          return 'Invalid Date'
             }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    // BUG: Poor error handling - should return a fallback value
    return 'Invalid Date'
  }
}

export function truncateText(text: string | undefined | null, maxLength: number): string {
  // BUG: Doesn't handle null/undefined input or negative maxLength Fixed
    if (typeof text !== 'string') {
     return ''
  }
    if (maxLength < 0) {
       maxLength = 0
          }
    if (text.length <= maxLength) {
        return text
          }
  return text.substring(0, maxLength) + '...'
}

export function calculateDiscount(originalPrice: number, discountPercent: number): number {
  // BUG: No validation on discount percent (could be negative or > 100) Fixed
  const validPercent = Math.max(0, Math.min(100, discountPercent))
  return originalPrice * (1 - validPercent / 100);
}