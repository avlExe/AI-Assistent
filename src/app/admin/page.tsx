'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, GradientCard, NeomorphicCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Building2, 
  GraduationCap, 
  BarChart3, 
  TrendingUp,
  ArrowRight,
  Calendar,
  FileText,
  Settings,
  Shield
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const { data: session } = useSession()

  // Моковые данные для демонстрации
  const stats = {
    totalUsers: 1250,
    totalInstitutions: 45,
    totalPrograms: 120,
    totalReports: 890
  }

  const recentActivity = [
    {
      id: 1,
      type: 'user_registration',
      message: 'Новый пользователь зарегистрировался',
      date: '2024-01-15',
      user: 'Анна Петрова'
    },
    {
      id: 2,
      type: 'institution_added',
      message: 'Добавлен новый вуз',
      date: '2024-01-14',
      user: 'МГУ им. Ломоносова'
    },
    {
      id: 3,
      type: 'report_generated',
      message: 'Создан новый отчёт',
      date: '2024-01-13',
      user: 'ИИ-помощник'
    }
  ]

  const topInstitutions = [
    { name: 'МГУ им. М.В. Ломоносова', views: 1250, programs: 15 },
    { name: 'МФТИ', views: 980, programs: 12 },
    { name: 'ВШЭ', views: 850, programs: 18 },
    { name: 'ИТМО', views: 720, programs: 10 }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Админ-панель
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Добро пожаловать, {session?.user?.name}! Управляйте системой
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NeomorphicCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Пользователи</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalUsers}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </NeomorphicCard>

        <NeomorphicCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Вузы</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalInstitutions}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
          </div>
        </NeomorphicCard>

        <NeomorphicCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Программы</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalPrograms}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          </div>
        </NeomorphicCard>

        <NeomorphicCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Отчёты</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalReports}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </NeomorphicCard>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <GradientCard>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-6 h-6" />
              <span>Пользователи</span>
            </CardTitle>
            <CardDescription>
              Просматривайте и управляйте пользователями
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Отслеживайте активность пользователей, просматривайте статистику 
              и управляйте ролями доступа.
            </p>
            <Link href="/admin/users">
              <Button variant="gradient" className="w-full">
                Управлять пользователями
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </GradientCard>

        <GradientCard>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="w-6 h-6" />
              <span>Управление вузами</span>
            </CardTitle>
            <CardDescription>
              Добавляйте и редактируйте учебные заведения
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Управляйте базой данных вузов, добавляйте новые учебные заведения 
              и обновляйте информацию о программах.
            </p>
            <Link href="/admin/institutions">
              <Button variant="gradient" className="w-full">
                Управлять вузами
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </GradientCard>

        <GradientCard>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="w-6 h-6" />
              <span>Программы обучения</span>
            </CardTitle>
            <CardDescription>
              Управляйте программами вузов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Создавайте и редактируйте программы обучения, управляйте 
              требованиями и экзаменами.
            </p>
            <Link href="/admin/programs">
              <Button variant="gradient" className="w-full">
                Управлять программами
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </GradientCard>

        <GradientCard>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-6 h-6" />
              <span>Отчёты</span>
            </CardTitle>
            <CardDescription>
              Просматривайте отчёты пользователей
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Анализируйте отчёты, созданные пользователями, и управляйте 
              их содержимым.
            </p>
            <Link href="/admin/reports">
              <Button variant="gradient" className="w-full">
                Просмотреть отчёты
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </GradientCard>

        <GradientCard>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6" />
              <span>Аналитика</span>
            </CardTitle>
            <CardDescription>
              Статистика и аналитика системы
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Просматривайте детальную аналитику использования системы, 
              статистику пользователей и активности.
            </p>
            <Link href="/admin/analytics">
              <Button variant="gradient" className="w-full">
                Открыть аналитику
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </GradientCard>

        <GradientCard>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-6 h-6" />
              <span>Настройки</span>
            </CardTitle>
            <CardDescription>
              Конфигурация системы
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Управляйте настройками системы, безопасностью, уведомлениями 
              и другими параметрами.
            </p>
            <Link href="/admin/settings">
              <Button variant="gradient" className="w-full">
                Открыть настройки
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </GradientCard>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-6 h-6" />
            <span>Последняя активность</span>
          </CardTitle>
          <CardDescription>
            Недавние действия в системе
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{activity.message}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(activity.date).toLocaleDateString('ru-RU')} • {activity.user}
                  </p>
                </div>
                <Badge variant="outline">
                  {activity.type === 'user_registration' ? 'Регистрация' : 
                   activity.type === 'institution_added' ? 'Вуз' : 'Отчёт'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Institutions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6" />
            <span>Популярные вузы</span>
          </CardTitle>
          <CardDescription>
            Топ учебных заведений по просмотрам
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topInstitutions.map((institution, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{institution.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{institution.programs} программ</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{institution.views}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">просмотров</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <GradientCard className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Статус системы
            </h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">База данных</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">ИИ-помощник</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">API</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-green-600">Все системы работают</span>
          </div>
        </div>
      </GradientCard>
    </div>
  )
}

