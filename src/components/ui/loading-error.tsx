import { RefreshCw, AlertCircle, Wifi, WifiOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface LoadingErrorProps {
  loading: boolean
  error: string | null
  onRetry?: () => void
  children: React.ReactNode
  loadingText?: string
  emptyText?: string
  showEmptyState?: boolean
}

export function LoadingError({
  loading,
  error,
  onRetry,
  children,
  loadingText = 'Загрузка...',
  emptyText = 'Нет данных для отображения',
  showEmptyState = false
}: LoadingErrorProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600 dark:text-gray-400">{loadingText}</p>
        </div>
      </div>
    )
  }

  if (error) {
    const isNetworkError = error.includes('fetch') || error.includes('network') || error.includes('Failed to fetch')
    
    return (
      <Card className="border-red-200 dark:border-red-800">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            {isNetworkError ? (
              <WifiOff className="w-12 h-12 text-red-500" />
            ) : (
              <AlertCircle className="w-12 h-12 text-red-500" />
            )}
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {isNetworkError ? 'Ошибка сети' : 'Ошибка загрузки'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {isNetworkError 
                  ? 'Проверьте подключение к интернету и попробуйте снова'
                  : error
                }
              </p>
              
              {onRetry && (
                <Button 
                  onClick={onRetry}
                  variant="outline"
                  className="mt-2"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Попробовать снова
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (showEmptyState && (!children || (Array.isArray(children) && children.length === 0))) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Wifi className="w-12 h-12 text-gray-400" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Нет данных
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {emptyText}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}
