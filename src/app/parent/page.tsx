'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, GradientCard, NeomorphicCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Star,
  ArrowRight,
  Calendar,
  Award,
  FileText,
  Heart
} from 'lucide-react'
import Link from 'next/link'

export default function ParentDashboard() {
  const { data: session } = useSession()

  // Моковые данные для демонстрации
  const childStats = {
    totalScore: 263,
    averageScore: 88,
    recommendations: 5,
    savedInstitutions: 3
  }

  const recentReports = [
    {
      id: 1,
      title: 'Анализ поступления - IT направления',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Рекомендации по подготовке к ЕГЭ',
      date: '2024-01-10',
      status: 'completed'
    }
  ]

  const achievements = [
    {
      id: 1,
      title: 'Победитель олимпиады по информатике',
      type: 'olympiad',
      date: '2024-01-12'
    },
    {
      id: 2,
      title: 'Сертификат по программированию',
      type: 'certificate',
      date: '2024-01-08'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Добро пожаловать, {session?.user?.name}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Отслеживайте прогресс вашего ребёнка в выборе вуза
        </p>
      </div>

      {/* Child Info */}
      <GradientCard className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Анна Петрова</h2>
            <p className="text-gray-600 dark:text-gray-300">Ваш ребёнок</p>
            <Badge variant="gradient" className="mt-2">Ученик 11 класса</Badge>
          </div>
        </div>
      </GradientCard>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <NeomorphicCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Общий балл ЕГЭ</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{childStats.totalScore}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </NeomorphicCard>

        <NeomorphicCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Средний балл</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{childStats.averageScore}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </NeomorphicCard>

        <NeomorphicCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Рекомендации</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{childStats.recommendations}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
        </NeomorphicCard>

        <NeomorphicCard>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Сохранённые вузы</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{childStats.savedInstitutions}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
          </div>
        </NeomorphicCard>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-6 h-6" />
            <span>Последние отчёты</span>
          </CardTitle>
          <CardDescription>
            Анализы и рекомендации для вашего ребёнка
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{report.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(report.date).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <Badge variant="success">
                  {report.status === 'completed' ? 'Завершён' : 'В процессе'}
                </Badge>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/parent/reports">
              <Button variant="outline" className="w-full">
                Смотреть все отчёты
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-6 h-6" />
            <span>Достижения ребёнка</span>
          </CardTitle>
          <CardDescription>
            Успехи и награды вашего ребёнка
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{achievement.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(achievement.date).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/parent/achievements">
              <Button variant="outline" className="w-full">
                Смотреть все достижения
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Support Message */}
      <GradientCard className="p-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Heart className="w-6 h-6 text-red-500" />
          <h3 className="text-xl font-semibold">Мы здесь, чтобы помочь!</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Если у вас есть вопросы о поступлении или нужна помощь в выборе вуза, 
          наша команда готова поддержать вас и вашего ребёнка.
        </p>
        <Link href="/contacts">
          <Button variant="gradient">
            Связаться с нами
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </GradientCard>
    </div>
  )
}

