'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  User,
  Mail,
  Calendar,
  FileText,
  Award,
  BookOpen,
  Building2,
  Edit,
  Trash2,
  X
} from 'lucide-react'

interface UserDetails {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  createdAt: string
  updatedAt: string
  reports: Array<{
    id: string
    title: string
    createdAt: string
  }>
  achievements: Array<{
    id: string
    title: string
    type: string
    createdAt: string
  }>
  examResults: Array<{
    id: string
    subject: string
    score: number
    examType: string
    date: string
  }>
  _count: {
    reports: number
    achievements: number
    examResults: number
    savedInstitutions: number
  }
}

export default function UserDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState<UserDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [showReportModal, setShowReportModal] = useState(false)
  const [userReports, setUserReports] = useState<any[]>([])
  const [reportsLoading, setReportsLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/admin/users/${params.id}`)
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          router.push('/admin/users')
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        router.push('/admin/users')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchUser()
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

  const handleViewReports = async () => {
    if (!user) return
    
    setReportsLoading(true)
    setShowReportModal(true)
    
    try {
      // Получаем отчёты пользователя
      const response = await fetch(`/api/admin/reports?userId=${user.id}&limit=10`)
      if (response.ok) {
        const data = await response.json()
        setUserReports(data.reports || [])
      } else {
        alert('Ошибка при загрузке отчётов пользователя')
        setShowReportModal(false)
      }
    } catch (error) {
      console.error('Error fetching user reports:', error)
      alert('Ошибка при загрузке отчётов пользователя')
      setShowReportModal(false)
    } finally {
      setReportsLoading(false)
    }
  }

  const handleSelectReport = (reportId: string) => {
    setShowReportModal(false)
    router.push(`/admin/reports/${reportId}`)
  }

  const handleViewAchievements = () => {
    // Пока просто показываем алерт, так как страницы достижений нет
    alert('Функция просмотра достижений будет добавлена в следующих версиях')
  }

  const handleViewExams = () => {
    // Пока просто показываем алерт, так как страницы экзаменов нет
    alert('Функция просмотра экзаменов будет добавлена в следующих версиях')
  }

  const handleViewInstitutions = () => {
    // Пока просто показываем алерт, так как страницы сохранённых вузов нет
    alert('Функция просмотра сохранённых вузов будет добавлена в следующих версиях')
  }

  const handleEditUser = () => {
    // Переходим к редактированию пользователя
    router.push(`/admin/users?edit=${user?.id}`)
  }

  const handleDeleteUser = async () => {
    if (!user) return
    
    if (!confirm(`Вы уверены, что хотите удалить пользователя "${user.name}"? Это действие нельзя отменить.`)) {
      return
    }

    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Пользователь успешно удалён!')
        router.push('/admin/users')
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при удалении пользователя')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Ошибка при удалении пользователя')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Загрузка...</span>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Пользователь не найден</p>
        <Button onClick={() => router.push('/admin/users')} className="mt-4">
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
            onClick={() => router.push('/admin/users')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              {user.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Детальная информация о пользователе
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleEditUser}>
            <Edit className="w-4 h-4 mr-2" />
            Редактировать
          </Button>
          <Button variant="outline" className="text-red-600 hover:text-red-700" onClick={handleDeleteUser}>
            <Trash2 className="w-4 h-4 mr-2" />
            Удалить
          </Button>
        </div>
      </div>

      {/* User Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Основная информация</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <Badge variant={getRoleBadgeVariant(user.role)}>
                  {getRoleLabel(user.role)}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Регистрация: {formatDate(user.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Обновление: {formatDate(user.updatedAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Статистика</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Отчёты</span>
                <span className="font-semibold">{user._count.reports}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Достижения</span>
                <span className="font-semibold">{user._count.achievements}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Результаты экзаменов</span>
                <span className="font-semibold">{user._count.examResults}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Сохранённые вузы</span>
                <span className="font-semibold">{user._count.savedInstitutions}</span>
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
            <Button variant="outline" className="w-full justify-start" onClick={handleViewReports}>
              <FileText className="w-4 h-4 mr-2" />
              Просмотреть отчёты
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleViewAchievements}>
              <Award className="w-4 h-4 mr-2" />
              Просмотреть достижения
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleViewExams}>
              <BookOpen className="w-4 h-4 mr-2" />
              Просмотреть экзамены
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={handleViewInstitutions}>
              <Building2 className="w-4 h-4 mr-2" />
              Просмотреть вузы
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Последние отчёты</span>
            </CardTitle>
            <CardDescription>
              {user._count.reports} отчётов всего
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.reports.length > 0 ? (
              <div className="space-y-3">
                {user.reports.map((report) => (
                  <div key={report.id} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{report.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(report.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Отчётов пока нет</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5" />
              <span>Последние достижения</span>
            </CardTitle>
            <CardDescription>
              {user._count.achievements} достижений всего
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user.achievements.length > 0 ? (
              <div className="space-y-3">
                {user.achievements.map((achievement) => (
                  <div key={achievement.id} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{achievement.title}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline">{achievement.type}</Badge>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(achievement.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Достижений пока нет</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Exam Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Результаты экзаменов</span>
          </CardTitle>
          <CardDescription>
            {user._count.examResults} результатов всего
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user.examResults.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2">Предмет</th>
                    <th className="text-left py-2">Тип экзамена</th>
                    <th className="text-left py-2">Балл</th>
                    <th className="text-left py-2">Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {user.examResults.map((exam) => (
                    <tr key={exam.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-2">{exam.subject}</td>
                      <td className="py-2">{exam.examType}</td>
                      <td className="py-2">
                        <Badge variant={exam.score >= 80 ? 'default' : exam.score >= 60 ? 'secondary' : 'destructive'}>
                          {exam.score}
                        </Badge>
                      </td>
                      <td className="py-2 text-sm text-gray-500">{formatDate(exam.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Результатов экзаменов пока нет</p>
          )}
        </CardContent>
      </Card>

      {/* Report Selection Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowReportModal(false)} />
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Отчёты пользователя {user?.name}
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setShowReportModal(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>
            <div className="p-6">
              {reportsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-2">Загрузка отчётов...</span>
                </div>
              ) : userReports.length > 0 ? (
                <div className="space-y-3">
                  {userReports.map((report) => (
                    <div 
                      key={report.id} 
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
                      onClick={() => handleSelectReport(report.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">{report.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {formatDate(report.createdAt)}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Открыть
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">У пользователя пока нет отчётов</p>
                  <Button onClick={() => router.push('/admin/reports')}>
                    Перейти к списку отчётов
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
