'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, GradientCard, NeomorphicCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, NeomorphicInput } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  Star,
  ExternalLink,
  BookOpen,
  Building2,
  GraduationCap,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

interface Institution {
  id: string
  name: string
  description: string
  type: 'UNIVERSITY' | 'COLLEGE' | 'TECHNICAL_SCHOOL'
  direction: string
  minScore: number
  website?: string
  logo?: string
  programs: Program[]
}

interface Program {
  id: string
  name: string
  description: string
  faculty: string
  requirements: string
  exams: string[]
}

export default function InstitutionsPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [filteredInstitutions, setFilteredInstitutions] = useState<Institution[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedDirection, setSelectedDirection] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  // Моковые данные
  const mockInstitutions: Institution[] = [
    {
      id: '1',
      name: 'МГУ им. М.В. Ломоносова',
      description: 'Московский государственный университет - ведущий вуз России с богатой историей и традициями',
      type: 'UNIVERSITY',
      direction: 'Гуманитарные науки',
      minScore: 280,
      website: 'https://www.msu.ru',
      programs: [
        {
          id: '1',
          name: 'Прикладная математика и информатика',
          description: 'Фундаментальная подготовка в области математики и программирования',
          faculty: 'Факультет вычислительной математики и кибернетики',
          requirements: 'Математика, Информатика, Русский язык',
          exams: ['Математика', 'Информатика', 'Русский язык']
        }
      ]
    },
    {
      id: '2',
      name: 'МФТИ',
      description: 'Московский физико-технический институт - один из ведущих технических вузов мира',
      type: 'UNIVERSITY',
      direction: 'Технические науки',
      minScore: 290,
      website: 'https://mipt.ru',
      programs: [
        {
          id: '2',
          name: 'Физика',
          description: 'Теоретическая и экспериментальная физика',
          faculty: 'Факультет общей и прикладной физики',
          requirements: 'Математика, Физика, Русский язык',
          exams: ['Математика', 'Физика', 'Русский язык']
        }
      ]
    },
    {
      id: '3',
      name: 'ВШЭ',
      description: 'Национальный исследовательский университет "Высшая школа экономики"',
      type: 'UNIVERSITY',
      direction: 'Экономика и управление',
      minScore: 270,
      website: 'https://www.hse.ru',
      programs: [
        {
          id: '3',
          name: 'Экономика',
          description: 'Экономическая теория и практика',
          faculty: 'Факультет экономических наук',
          requirements: 'Математика, Обществознание, Русский язык',
          exams: ['Математика', 'Обществознание', 'Русский язык']
        }
      ]
    },
    {
      id: '4',
      name: 'МГИМО',
      description: 'Московский государственный институт международных отношений',
      type: 'UNIVERSITY',
      direction: 'Международные отношения',
      minScore: 285,
      website: 'https://mgimo.ru',
      programs: [
        {
          id: '4',
          name: 'Международные отношения',
          description: 'Подготовка специалистов по международным отношениям',
          faculty: 'Факультет международных отношений',
          requirements: 'История, Иностранный язык, Русский язык',
          exams: ['История', 'Иностранный язык', 'Русский язык']
        }
      ]
    },
    {
      id: '5',
      name: 'ИТМО',
      description: 'Университет ИТМО - ведущий вуз в области информационных технологий',
      type: 'UNIVERSITY',
      direction: 'Информационные технологии',
      minScore: 280,
      website: 'https://itmo.ru',
      programs: [
        {
          id: '5',
          name: 'Программная инженерия',
          description: 'Разработка программного обеспечения',
          faculty: 'Факультет программной инженерии',
          requirements: 'Математика, Информатика, Русский язык',
          exams: ['Математика', 'Информатика', 'Русский язык']
        }
      ]
    },
    {
      id: '6',
      name: 'Колледж информатики и программирования',
      description: 'Среднее профессиональное образование в области IT',
      type: 'COLLEGE',
      direction: 'Информационные технологии',
      minScore: 180,
      website: 'https://kip-college.ru',
      programs: [
        {
          id: '6',
          name: 'Программирование в компьютерных системах',
          description: 'Подготовка программистов',
          faculty: 'Факультет информационных технологий',
          requirements: 'Математика, Информатика',
          exams: ['Математика', 'Информатика']
        }
      ]
    }
  ]

  useEffect(() => {
    // Симуляция загрузки данных
    setTimeout(() => {
      setInstitutions(mockInstitutions)
      setFilteredInstitutions(mockInstitutions)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = institutions

    if (searchTerm) {
      filtered = filtered.filter(inst => 
        inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inst.direction.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(inst => inst.type === selectedType)
    }

    if (selectedDirection !== 'all') {
      filtered = filtered.filter(inst => inst.direction === selectedDirection)
    }

    setFilteredInstitutions(filtered)
  }, [searchTerm, selectedType, selectedDirection, institutions])

  const getInstitutionTypeLabel = (type: string) => {
    const types = {
      UNIVERSITY: 'Университет',
      COLLEGE: 'Колледж',
      TECHNICAL_SCHOOL: 'Техникум'
    }
    return types[type as keyof typeof types] || type
  }

  const getInstitutionTypeColor = (type: string) => {
    const colors = {
      UNIVERSITY: 'gradient',
      COLLEGE: 'success',
      TECHNICAL_SCHOOL: 'info'
    }
    return colors[type as keyof typeof colors] || 'default'
  }

  const directions = Array.from(new Set(institutions.map(inst => inst.direction)))

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          Каталог учебных заведений
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Найдите подходящий вуз или колледж для поступления
        </p>
      </div>

      {/* Filters */}
      <NeomorphicCard className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            <NeomorphicInput
              placeholder="Поиск по названию..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full h-10 rounded-xl bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm text-gray-800 dark:text-gray-200 shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.1),inset_2px_2px_4px_rgba(0,0,0,0.1)] focus:shadow-[inset_-1px_-1px_2px_rgba(255,255,255,0.1),inset_1px_1px_2px_rgba(0,0,0,0.1)] transition-all duration-300 focus:outline-none"
          >
            <option value="all">Все типы</option>
            <option value="UNIVERSITY">Университеты</option>
            <option value="COLLEGE">Колледжи</option>
            <option value="TECHNICAL_SCHOOL">Техникумы</option>
          </select>

          <select
            value={selectedDirection}
            onChange={(e) => setSelectedDirection(e.target.value)}
            className="w-full h-10 rounded-xl bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm text-gray-800 dark:text-gray-200 shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.1),inset_2px_2px_4px_rgba(0,0,0,0.1)] focus:shadow-[inset_-1px_-1px_2px_rgba(255,255,255,0.1),inset_1px_1px_2px_rgba(0,0,0,0.1)] transition-all duration-300 focus:outline-none"
          >
            <option value="all">Все направления</option>
            {directions.map(direction => (
              <option key={direction} value={direction}>{direction}</option>
            ))}
          </select>

          <Button variant="gradient" className="w-full">
            <Filter className="w-4 h-4 mr-2" />
            Фильтры
          </Button>
        </div>
      </NeomorphicCard>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <NeomorphicCard className="p-4 text-center">
          <div className="text-2xl font-bold gradient-text">{institutions.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Всего заведений</div>
        </NeomorphicCard>
        <NeomorphicCard className="p-4 text-center">
          <div className="text-2xl font-bold gradient-text">
            {institutions.filter(inst => inst.type === 'UNIVERSITY').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Университетов</div>
        </NeomorphicCard>
        <NeomorphicCard className="p-4 text-center">
          <div className="text-2xl font-bold gradient-text">
            {institutions.filter(inst => inst.type === 'COLLEGE').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Колледжей</div>
        </NeomorphicCard>
        <NeomorphicCard className="p-4 text-center">
          <div className="text-2xl font-bold gradient-text">
            {institutions.reduce((acc, inst) => acc + inst.programs.length, 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Программ</div>
        </NeomorphicCard>
      </div>

      {/* Institutions List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInstitutions.map((institution) => (
          <GradientCard key={institution.id} className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant={getInstitutionTypeColor(institution.type) as any}>
                      {getInstitutionTypeLabel(institution.type)}
                    </Badge>
                    <Badge variant="outline">{institution.direction}</Badge>
                  </div>
                  <CardTitle className="text-xl mb-2">{institution.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {institution.description}
                  </CardDescription>
                </div>
                {institution.website && (
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={institution.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>Минимальный балл</span>
                  </div>
                  <Badge variant="gradient">{institution.minScore}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    <span>Программ</span>
                  </div>
                  <span className="text-sm font-medium">{institution.programs.length}</span>
                </div>

                <div className="pt-2">
                  <h4 className="font-semibold text-sm mb-2">Доступные программы:</h4>
                  <div className="space-y-1">
                    {institution.programs.slice(0, 2).map((program) => (
                      <div key={program.id} className="text-sm text-gray-600 dark:text-gray-400">
                        • {program.name}
                      </div>
                    ))}
                    {institution.programs.length > 2 && (
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        +{institution.programs.length - 2} ещё...
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button variant="gradient" size="sm" className="flex-1">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    Подробнее
                  </Button>
                  <Button variant="outline" size="sm">
                    <Star className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </GradientCard>
        ))}
      </div>

      {filteredInstitutions.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Ничего не найдено
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            Попробуйте изменить параметры поиска
          </p>
        </div>
      )}
    </div>
  )
}

