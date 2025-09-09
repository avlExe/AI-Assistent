'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart3, 
  Users, 
  Building2, 
  GraduationCap, 
  FileText,
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalUsers: number
    totalInstitutions: number
    totalPrograms: number
    totalReports: number
    recentUsers: number
    recentInstitutions: number
    recentPrograms: number
    recentReports: number
  }
  usersByRole: Array<{
    role: string
    count: number
  }>
  institutionsByType: Array<{
    type: string
    count: number
  }>
  topInstitutions: Array<{
    id: string
    name: string
    type: string
    programsCount: number
    savedCount: number
  }>
  userActivity: Array<{
    id: string
    name: string
    role: string
    createdAt: string
    reportsCount: number
    achievementsCount: number
    examResultsCount: number
    savedInstitutionsCount: number
  }>
  monthlyStats: {
    users: any[]
    reports: any[]
  }
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState('30')

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/analytics?period=${period}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Включаем cookies для аутентификации
        cache: 'no-store'
      })
      
      if (response.ok) {
        const analyticsData = await response.json()
        setData(analyticsData)
      } else {
        console.error('Failed to fetch analytics:', response.status, response.statusText)
        setData(null)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleExportAnalytics = async () => {
    if (!data) return

    const csvContent = [
      ['Метрика', 'Значение'].join(','),
      ['Всего пользователей', data.overview.totalUsers].join(','),
      ['Всего вузов', data.overview.totalInstitutions].join(','),
      ['Всего программ', data.overview.totalPrograms].join(','),
      ['Всего отчётов', data.overview.totalReports].join(','),
      ['Новых пользователей за период', data.overview.recentUsers].join(','),
      ['Новых вузов за период', data.overview.recentInstitutions].join(','),
      ['Новых программ за период', data.overview.recentPrograms].join(','),
      ['Новых отчётов за период', data.overview.recentReports].join(','),
      ['', ''].join(','),
      ['Пользователи по ролям', ''].join(','),
      ...data.usersByRole.map(item => [
        getRoleLabel(item.role),
        item.count
      ].join(',')),
      ['', ''].join(','),
      ['Вузы по типам', ''].join(','),
      ...data.institutionsByType.map(item => [
        item.type,
        item.count
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `analytics_${period}days_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    fetchAnalytics()
  }, [period])

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'destructive'
      case 'PARENT':
        return 'secondary'
      case 'STUDENT':
        return 'default'
      default:
        return 'outline'
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Администратор'
      case 'PARENT':
        return 'Родитель'
      case 'STUDENT':
        return 'Студент'
      default:
        return role
    }
  }

  const getInstitutionTypeBadgeVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case 'университет':
        return 'default'
      case 'институт':
        return 'secondary'
      case 'академия':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatRelativeTime = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffInDays === 0) return 'сегодня'
    if (diffInDays === 1) return 'вчера'
    if (diffInDays < 7) return `${diffInDays} дн. назад`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} нед. назад`
    return `${Math.floor(diffInDays / 30)} мес. назад`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <RefreshCw className="w-6 h-6 animate-spin" />
        <span className="ml-2">Загрузка аналитики...</span>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
          <div className="text-red-600 dark:text-red-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
            Ошибка загрузки данных
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-4">
            Не удалось загрузить аналитику. Проверьте подключение к базе данных.
          </p>
          <Button onClick={fetchAnalytics} className="bg-red-600 hover:bg-red-700 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Попробовать снова
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Аналитика системы
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Обзор активности и статистики платформы
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="7">За 7 дней</option>
            <option value="30">За 30 дней</option>
            <option value="90">За 90 дней</option>
            <option value="365">За год</option>
          </select>
          <Button variant="outline" onClick={fetchAnalytics}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Обновить
          </Button>
          <Button variant="outline" onClick={handleExportAnalytics}>
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Всего пользователей</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.overview.totalUsers}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{data.overview.recentUsers} за период</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Всего вузов</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.overview.totalInstitutions}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{data.overview.recentInstitutions} за период</span>
                </div>
              </div>
              <Building2 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Всего программ</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.overview.totalPrograms}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{data.overview.recentPrograms} за период</span>
                </div>
              </div>
              <GraduationCap className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Всего отчётов</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{data.overview.totalReports}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{data.overview.recentReports} за период</span>
                </div>
              </div>
              <FileText className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users by Role */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Пользователи по ролям</span>
            </CardTitle>
            <CardDescription>
              Распределение пользователей по типам
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.usersByRole.map((item) => (
                <div key={item.role} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant={getRoleBadgeVariant(item.role)}>
                      {getRoleLabel(item.role)}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{item.count}</span>
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(item.count / data.overview.totalUsers) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Institutions by Type */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Вузы по типам</span>
            </CardTitle>
            <CardDescription>
              Распределение учебных заведений
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.institutionsByType.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant={getInstitutionTypeBadgeVariant(item.type)}>
                      {item.type}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{item.count}</span>
                    <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(item.count / data.overview.totalInstitutions) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Institutions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Топ вузов по программам</span>
          </CardTitle>
          <CardDescription>
            Учебные заведения с наибольшим количеством программ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.topInstitutions.map((institution, index) => (
              <div key={institution.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{institution.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={getInstitutionTypeBadgeVariant(institution.type)}>
                        {institution.type}
                      </Badge>
                      <span className="text-sm text-gray-500">{institution.savedCount} сохранений</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{institution.programsCount}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">программ</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent User Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Активность пользователей</span>
          </CardTitle>
          <CardDescription>
            Последние зарегистрированные пользователи и их активность
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.userActivity.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{user.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {getRoleLabel(user.role)}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {formatRelativeTime(user.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="text-center">
                    <p className="font-semibold">{user.reportsCount}</p>
                    <p>отчётов</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{user.achievementsCount}</p>
                    <p>достижений</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{user.examResultsCount}</p>
                    <p>экзаменов</p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{user.savedInstitutionsCount}</p>
                    <p>вузов</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
