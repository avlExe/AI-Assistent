'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  GraduationCap,
  Building2,
  Calendar,
  BookOpen,
  FileText,
  Edit,
  Trash2,
  ExternalLink,
  Users
} from 'lucide-react'

interface ProgramDetails {
  id: string
  name: string
  description: string
  faculty: string
  requirements: string
  exams: any[]
  institutionId: string
  createdAt: string
  updatedAt: string
  institution: {
    id: string
    name: string
    type: string
    website?: string
  }
}

export default function ProgramDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [program, setProgram] = useState<ProgramDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await fetch(`/api/admin/programs/${params.id}`)
        if (response.ok) {
          const programData = await response.json()
          setProgram(programData)
        } else {
          router.push('/admin/programs')
        }
      } catch (error) {
        console.error('Error fetching program:', error)
        router.push('/admin/programs')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProgram()
    }
  }, [params.id, router])

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

  const getFacultyBadgeVariant = (faculty: string) => {
    const colors = ['default', 'secondary', 'outline', 'destructive']
    const index = faculty.length % colors.length
    return colors[index] as any
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

  if (!program) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Программа не найдена</p>
        <Button onClick={() => router.push('/admin/programs')} className="mt-4">
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
            onClick={() => router.push('/admin/programs')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              {program.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Детальная информация о программе
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
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

      {/* Program Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <span>Основная информация</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-accent rounded-lg flex items-center justify-center text-white text-xl font-bold">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{program.name}</h3>
                <Badge variant={getFacultyBadgeVariant(program.faculty)}>
                  {program.faculty}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{program.institution.name}</span>
                <Badge variant={getInstitutionTypeBadgeVariant(program.institution.type)}>
                  {program.institution.type}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Создана: {formatDate(program.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm">Обновлена: {formatDate(program.updatedAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Institution Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Учебное заведение</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">{program.institution.name}</h3>
                <Badge variant={getInstitutionTypeBadgeVariant(program.institution.type)}>
                  {program.institution.type}
                </Badge>
              </div>
            </div>
            
            {program.institution.website && (
              <div className="flex items-center space-x-2">
                <ExternalLink className="w-4 h-4 text-gray-500" />
                <a 
                  href={program.institution.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  {program.institution.website}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Edit className="w-4 h-4 mr-2" />
              Редактировать программу
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Building2 className="w-4 h-4 mr-2" />
              Перейти к вузу
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Экспортировать данные
            </Button>
            {program.institution.website && (
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href={program.institution.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Открыть сайт вуза
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>Описание программы</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {program.description}
          </p>
        </CardContent>
      </Card>

      {/* Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Требования к поступающим</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {program.requirements}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Exams */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Экзамены и испытания</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Array.isArray(program.exams) && program.exams.length > 0 ? (
            <div className="space-y-4">
              {program.exams.map((exam, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {exam.subject || exam.name || `Экзамен ${index + 1}`}
                      </h4>
                      {exam.type && (
                        <Badge variant="outline" className="mt-1">
                          {exam.type}
                        </Badge>
                      )}
                    </div>
                    {exam.score && (
                      <Badge variant={exam.score >= 80 ? 'default' : exam.score >= 60 ? 'secondary' : 'destructive'}>
                        {exam.score} баллов
                      </Badge>
                    )}
                  </div>
                  {exam.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {exam.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Информация об экзаменах не указана</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
