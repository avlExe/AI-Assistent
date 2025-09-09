import { useState, useEffect, useCallback } from 'react'

interface CacheItem<T> {
  data: T
  timestamp: number
  expiresAt: number
}

interface UseDataCacheOptions {
  cacheKey: string
  fetchFn: () => Promise<any>
  ttl?: number // Time to live in milliseconds
  enabled?: boolean
}

export function useDataCache<T>({
  cacheKey,
  fetchFn,
  ttl = 5 * 60 * 1000, // 5 minutes default
  enabled = true
}: UseDataCacheOptions) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCachedData = useCallback(() => {
    if (typeof window === 'undefined') return null
    
    try {
      const cached = localStorage.getItem(`cache_${cacheKey}`)
      if (cached) {
        const parsed: CacheItem<T> = JSON.parse(cached)
        if (parsed.expiresAt > Date.now()) {
          return parsed.data
        } else {
          localStorage.removeItem(`cache_${cacheKey}`)
        }
      }
    } catch (err) {
      console.warn('Failed to parse cached data:', err)
    }
    return null
  }, [cacheKey])

  const setCachedData = useCallback((newData: T) => {
    if (typeof window === 'undefined') return
    
    try {
      const cacheItem: CacheItem<T> = {
        data: newData,
        timestamp: Date.now(),
        expiresAt: Date.now() + ttl
      }
      localStorage.setItem(`cache_${cacheKey}`, JSON.stringify(cacheItem))
    } catch (err) {
      console.warn('Failed to cache data:', err)
    }
  }, [cacheKey, ttl])

  const fetchData = useCallback(async (force = false) => {
    if (!enabled) return

    // Check cache first
    if (!force) {
      const cached = getCachedData()
      if (cached) {
        setData(cached)
        return
      }
    }

    setLoading(true)
    setError(null)

    try {
      const result = await fetchFn()
      setData(result)
      setCachedData(result)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      console.error(`Error fetching data for ${cacheKey}:`, err)
    } finally {
      setLoading(false)
    }
  }, [cacheKey, fetchFn, enabled, getCachedData, setCachedData])

  const invalidateCache = useCallback(() => {
    if (typeof window === 'undefined') return
    localStorage.removeItem(`cache_${cacheKey}`)
  }, [cacheKey])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch: () => fetchData(true),
    invalidateCache
  }
}
