'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  FileText,
  User,
  Calendar,
  Download,
  Trash2,
  Edit,
  Share2,
  Clock
} from 'lucide-react'

interface ReportDetails {
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
    avatar?: string
  }
}

export default function ReportDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [report, setReport] = useState<ReportDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`/api/admin/reports/${params.id}`)
        if (response.ok) {
          const reportData = await response.json()
          setReport(reportData)
        } else {
          router.push('/admin/reports')
        }
      } catch (error) {
        console.error('Error fetching report:', error)
        router.push('/admin/reports')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchReport()
    }
  }, [params.id, router])

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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatRelativeTime = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'только что'
    if (diffInHours < 24) return `${diffInHours} ч. назад`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} дн. назад`
    
    const diffInWeeks = Math.floor(diffInDays / 7)
    if (diffInWeeks < 4) return `${diffInWeeks} нед. назад`
    
    const diffInMonths = Math.floor(diffInDays / 30)
    return `${diffInMonths} мес. назад`
  }

  const handleDeleteReport = async () => {
    if (!confirm('Вы уверены, что хотите удалить этот отчёт?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/reports/${params.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        router.push('/admin/reports')
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при удалении отчёта')
      }
    } catch (error) {
      console.error('Error deleting report:', error)
      alert('Ошибка при удалении отчёта')
    }
  }

  const handleDownloadReport = () => {
    if (!report) return

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
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Загрузка...</span>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Отчёт не найден</p>
        <Button onClick={() => router.push('/admin/reports')} className="mt-4">
          Вернуться к списку
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => router.push('/admin/reports')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              {report.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Детальная информация об отчёте
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleDownloadReport}>
            <Download className="w-4 h-4 mr-2" />
            Скачать
          </Button>
          <Button variant="outline" className="text-red-600 hover:text-red-700" onClick={handleDeleteReport}>
            <Trash2 className="w-4 h-4 mr-2" />
            Удалить
          </Button>
        </div>
      </div>

      {/* Report Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Информация об отчёте</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center text-white text-xl font-bold">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{report.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {formatRelativeTime(report.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Создан: {formatDate(report.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Обновлён: {formatDate(report.updatedAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Author Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Автор отчёта</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center text-white font-semibold">
                {report.user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold">{report.user.name}</h3>
                <Badge variant={getRoleBadgeVariant(report.user.role)}>
                  {getRoleLabel(report.user.role)}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{report.user.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" onClick={handleDownloadReport}>
              <Download className="w-4 h-4 mr-2" />
              Скачать TXT
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600 hover:text-red-700"
              onClick={handleDeleteReport}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Удалить отчёт
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Содержание отчёта</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
              {report.content}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Рекомендации</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
              {report.recommendations}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Метаданные</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Статистика</h4>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p>Длина содержания: {report.content.length} символов</p>
                <p>Длина рекомендаций: {report.recommendations.length} символов</p>
                <p>Количество слов: {report.content.split(' ').length + report.recommendations.split(' ').length}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Временные метки</h4>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p>Создан: {formatDate(report.createdAt)}</p>
                <p>Обновлён: {formatDate(report.updatedAt)}</p>
                <p>Возраст: {formatRelativeTime(report.createdAt)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
