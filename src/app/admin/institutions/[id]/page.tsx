'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  Building2,
  Globe,
  Calendar,
  GraduationCap,
  Users,
  Edit,
  Trash2,
  Plus,
  ExternalLink
} from 'lucide-react'

interface InstitutionDetails {
  id: string
  name: string
  description: string
  type: string
  direction: string
  minScore: number
  website?: string
  logo?: string
  createdAt: string
  updatedAt: string
  programs: Array<{
    id: string
    name: string
    faculty: string
    createdAt: string
  }>
  _count: {
    programs: number
    savedBy: number
  }
}

export default function InstitutionDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [institution, setInstitution] = useState<InstitutionDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const response = await fetch(`/api/admin/institutions/${params.id}`)
        if (response.ok) {
          const institutionData = await response.json()
          setInstitution(institutionData)
        } else {
          router.push('/admin/institutions')
        }
      } catch (error) {
        console.error('Error fetching institution:', error)
        router.push('/admin/institutions')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchInstitution()
    }
  }, [params.id, router])

  const getTypeBadgeVariant = (type: string) => {
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

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default'
    if (score >= 60) return 'secondary'
    return 'destructive'
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2">Загрузка...</span>
      </div>
    )
  }

  if (!institution) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Вуз не найден</p>
        <Button onClick={() => router.push('/admin/institutions')} className="mt-4">
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
            onClick={() => router.push('/admin/institutions')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              {institution.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Детальная информация о вузе
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Добавить программу
          </Button>
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Редактировать
          </Button>
          <Button variant="outline" className="text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4 mr-2" />
            Удалить
          </Button>
        </div>
      </div>

      {/* Institution Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Основная информация</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-secondary rounded-lg flex items-center justify-center text-white text-xl font-bold">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{institution.name}</h3>
                <Badge variant={getTypeBadgeVariant(institution.type)}>
                  {institution.type}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{institution.direction}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Мин. балл: </span>
                <Badge variant={getScoreBadgeVariant(institution.minScore)}>
                  {institution.minScore}
                </Badge>
              </div>
              {institution.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <a 
                    href={institution.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    {institution.website}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Создан: {formatDate(institution.createdAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <span>Статистика</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Программ</span>
                <span className="font-semibold">{institution._count.programs}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Сохранений</span>
                <span className="font-semibold">{institution._count.savedBy}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Минимальный балл</span>
                <Badge variant={getScoreBadgeVariant(institution.minScore)}>
                  {institution.minScore}
                </Badge>
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
            <Button variant="outline" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-2" />
              Добавить программу
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Edit className="w-4 h-4 mr-2" />
              Редактировать вуз
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <GraduationCap className="w-4 h-4 mr-2" />
              Управлять программами
            </Button>
            {institution.website && (
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href={institution.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Открыть сайт
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Описание</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {institution.description}
          </p>
        </CardContent>
      </Card>

      {/* Programs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5" />
            <span>Программы обучения</span>
          </CardTitle>
          <CardDescription>
            {institution._count.programs} программ всего
          </CardDescription>
        </CardHeader>
        <CardContent>
          {institution.programs.length > 0 ? (
            <div className="space-y-3">
              {institution.programs.map((program) => (
                <div key={program.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{program.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{program.faculty}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {formatDate(program.createdAt)}
                      </span>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Программ пока нет</p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить первую программу
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
