'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Search, 
  Eye,
  Filter,
  RefreshCw,
  Trash2,
  Download,
  Calendar,
  User
} from 'lucide-react'
import Link from 'next/link'

interface Report {
  id: string
  title: string
  content: string
  recommendations: string
  userId: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [userFilter, setUserFilter] = useState('')

  const fetchReports = async (page = 1, searchTerm = '', userId = '') => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(userId && { userId })
      })

      const response = await fetch(`/api/admin/reports?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Включаем cookies для аутентификации
        cache: 'no-store'
      })
      
      if (response.ok) {
        const data = await response.json()
        setReports(data.reports || [])
        setPagination(data.pagination || { page: 1, limit: 10, total: 0, pages: 0 })
      } else {
        console.error('Failed to fetch reports:', response.status, response.statusText)
        setReports([])
        setPagination({ page: 1, limit: 10, total: 0, pages: 0 })
      }
    } catch (error) {
      console.error('Error fetching reports:', error)
      setReports([])
      setPagination({ page: 1, limit: 10, total: 0, pages: 0 })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  useEffect(() => {
    // Проверяем URL параметры для фильтрации по пользователю
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')
    if (userId) {
      setUserFilter(userId)
      fetchReports(1, search, userId)
    }
  }, [])

  const handleSearch = () => {
    fetchReports(1, search, userFilter)
  }

  const handlePageChange = (newPage: number) => {
    fetchReports(newPage, search, userFilter)
  }

  const handleDeleteReport = async (reportId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот отчёт?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/reports/${reportId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchReports(pagination.page, search, userFilter)
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при удалении отчёта')
      }
    } catch (error) {
      console.error('Error deleting report:', error)
      alert('Ошибка при удалении отчёта')
    }
  }

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleExportReports = async () => {
    try {
      const response = await fetch('/api/admin/reports?limit=1000')
      if (response.ok) {
        const data = await response.json()
        const csvContent = [
          ['Заголовок', 'Автор', 'Роль автора', 'Email автора', 'Дата создания'].join(','),
          ...data.reports.map((report: Report) => [
            report.title.replace(/,/g, ';'),
            report.user.name,
            getRoleLabel(report.user.role),
            report.user.email,
            new Date(report.createdAt).toLocaleDateString('ru-RU')
          ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `reports_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error('Error exporting reports:', error)
      alert('Ошибка при экспорте данных')
    }
  }

  const handleDownloadReport = async (reportId: string) => {
    try {
      const response = await fetch(`/api/admin/reports/${reportId}`)
      if (response.ok) {
        const report = await response.json()
        
        const content = `Отчёт: ${report.title}

Автор: ${report.user.name} (${getRoleLabel(report.user.role)})
Email: ${report.user.email}
Дата создания: ${formatDate(report.createdAt)}

СОДЕРЖАНИЕ:
${report.content}

РЕКОМЕНДАЦИИ:
${report.recommendations}

---
Создано через AI Ассистент
${new Date().toLocaleString('ru-RU')}`

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `report_${report.title.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        alert('Ошибка при загрузке отчёта')
      }
    } catch (error) {
      console.error('Error downloading report:', error)
      alert('Ошибка при скачивании отчёта')
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Управление отчётами
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Просматривайте и управляйте отчётами пользователей
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={handleExportReports}
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Всего отчётов</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{pagination.total}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">От студентов</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {reports.filter(r => r.user.role === 'STUDENT').length}
                </p>
              </div>
              <User className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">От родителей</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {reports.filter(r => r.user.role === 'PARENT').length}
                </p>
              </div>
              <User className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">За последний месяц</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {reports.filter(r => {
                    const reportDate = new Date(r.createdAt)
                    const monthAgo = new Date()
                    monthAgo.setMonth(monthAgo.getMonth() - 1)
                    return reportDate >= monthAgo
                  }).length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Фильтры и поиск</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск по заголовку, содержанию или рекомендациям..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="sm:w-48">
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
              >
                <option value="">Все пользователи</option>
                {Array.from(new Set(reports.map(r => r.user.id))).map(userId => {
                  const user = reports.find(r => r.user.id === userId)?.user
                  return (
                    <option key={userId} value={userId}>
                      {user?.name} ({getRoleLabel(user?.role || '')})
                    </option>
                  )
                })}
              </select>
            </div>
            <Button onClick={handleSearch} variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Поиск
            </Button>
            <Button onClick={() => fetchReports()} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Обновить
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Список отчётов</CardTitle>
          <CardDescription>
            Показано {reports.length} из {pagination.total} отчётов
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="w-6 h-6 animate-spin" />
              <span className="ml-2">Загрузка...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{report.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {truncateText(report.content, 150)}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={getRoleBadgeVariant(report.user.role)}>
                          {getRoleLabel(report.user.role)}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {report.user.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          • {formatDate(report.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link href={`/admin/reports/${report.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadReport(report.id)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteReport(report.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-500">
                Страница {pagination.page} из {pagination.pages}
              </p>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  Назад
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                >
                  Вперёд
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
