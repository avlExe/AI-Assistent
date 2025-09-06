'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ProgramModal } from '@/components/ui/modals'
import { 
  GraduationCap, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  RefreshCw,
  Building2,
  BookOpen,
  Download
} from 'lucide-react'
import Link from 'next/link'

interface Program {
  id: string
  name: string
  description: string
  faculty: string
  requirements: string
  exams: string
  institutionId: string
  createdAt: string
  updatedAt: string
  institution: {
    id: string
    name: string
    type: string
  }
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [facultyFilter, setFacultyFilter] = useState('')
  const [institutionFilter, setInstitutionFilter] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [institutions, setInstitutions] = useState<Array<{ id: string; name: string }>>([])

  const fetchPrograms = async (page = 1, searchTerm = '', faculty = '', institutionId = '') => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(faculty && { faculty }),
        ...(institutionId && { institutionId })
      })

      const response = await fetch(`/api/admin/programs?${params}`)
      if (response.ok) {
        const data = await response.json()
        setPrograms(data.programs)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Error fetching programs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPrograms()
    fetchInstitutions()
  }, [])

  const fetchInstitutions = async () => {
    try {
      const response = await fetch('/api/admin/institutions?limit=1000')
      if (response.ok) {
        const data = await response.json()
        setInstitutions(data.institutions.map((inst: any) => ({ id: inst.id, name: inst.name })))
      }
    } catch (error) {
      console.error('Error fetching institutions:', error)
    }
  }

  const handleSearch = () => {
    fetchPrograms(1, search, facultyFilter, institutionFilter)
  }

  const handlePageChange = (newPage: number) => {
    fetchPrograms(newPage, search, facultyFilter, institutionFilter)
  }

  const handleDeleteProgram = async (programId: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту программу?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/programs/${programId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchPrograms(pagination.page, search, facultyFilter, institutionFilter)
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при удалении программы')
      }
    } catch (error) {
      console.error('Error deleting program:', error)
      alert('Ошибка при удалении программы')
    }
  }

  const handleCreateProgram = async (programData: any) => {
    setModalLoading(true)
    try {
      const response = await fetch('/api/admin/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(programData),
      })

      if (response.ok) {
        setShowCreateModal(false)
        fetchPrograms(pagination.page, search, facultyFilter, institutionFilter)
        alert('Программа успешно создана!')
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при создании программы')
      }
    } catch (error) {
      console.error('Error creating program:', error)
      alert('Ошибка при создании программы')
    } finally {
      setModalLoading(false)
    }
  }

  const handleEditProgram = async (programData: any) => {
    if (!editingProgram) return
    
    setModalLoading(true)
    try {
      const response = await fetch(`/api/admin/programs/${editingProgram.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(programData),
      })

      if (response.ok) {
        setShowEditModal(false)
        setEditingProgram(null)
        fetchPrograms(pagination.page, search, facultyFilter, institutionFilter)
        alert('Программа успешно обновлена!')
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при обновлении программы')
      }
    } catch (error) {
      console.error('Error updating program:', error)
      alert('Ошибка при обновлении программы')
    } finally {
      setModalLoading(false)
    }
  }

  const handleEditClick = (program: Program) => {
    setEditingProgram(program)
    setShowEditModal(true)
  }

  const handleExportPrograms = async () => {
    try {
      const response = await fetch('/api/admin/programs?limit=1000')
      if (response.ok) {
        const data = await response.json()
        const csvContent = [
          ['Название', 'Факультет', 'Вуз', 'Описание', 'Дата создания'].join(','),
          ...data.programs.map((program: Program) => [
            program.name,
            program.faculty,
            program.institution.name,
            program.description.replace(/,/g, ';'),
            new Date(program.createdAt).toLocaleDateString('ru-RU')
          ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `programs_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error('Error exporting programs:', error)
      alert('Ошибка при экспорте данных')
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

  const getFacultyBadgeVariant = (faculty: string) => {
    const colors = ['default', 'secondary', 'outline', 'destructive']
    const index = faculty.length % colors.length
    return colors[index] as any
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Управление программами
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Просматривайте и управляйте программами обучения
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить программу
          </Button>
          <Button 
            onClick={handleExportPrograms}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Всего программ</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{pagination.total}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Уникальных факультетов</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {new Set(programs.map(p => p.faculty)).size}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Университетов</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {new Set(programs.filter(p => p.institution.type.toLowerCase() === 'университет').map(p => p.institution.id)).size}
                </p>
              </div>
              <Building2 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Институтов</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {new Set(programs.filter(p => p.institution.type.toLowerCase() === 'институт').map(p => p.institution.id)).size}
                </p>
              </div>
              <Building2 className="w-8 h-8 text-orange-500" />
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
                placeholder="Поиск по названию, описанию или факультету..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="sm:w-48">
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={facultyFilter}
                onChange={(e) => setFacultyFilter(e.target.value)}
              >
                <option value="">Все факультеты</option>
                {Array.from(new Set(programs.map(p => p.faculty))).map(faculty => (
                  <option key={faculty} value={faculty}>{faculty}</option>
                ))}
              </select>
            </div>
            <div className="sm:w-48">
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={institutionFilter}
                onChange={(e) => setInstitutionFilter(e.target.value)}
              >
                <option value="">Все вузы</option>
                {Array.from(new Set(programs.map(p => p.institution.id))).map(institutionId => {
                  const institution = programs.find(p => p.institution.id === institutionId)?.institution
                  return (
                    <option key={institutionId} value={institutionId}>
                      {institution?.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <Button onClick={handleSearch} variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Поиск
            </Button>
            <Button onClick={() => fetchPrograms()} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Обновить
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Programs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Список программ</CardTitle>
          <CardDescription>
            Показано {programs.length} из {pagination.total} программ
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
              {programs.map((program) => (
                <div key={program.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{program.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {program.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={getFacultyBadgeVariant(program.faculty)}>
                          {program.faculty}
                        </Badge>
                        <Badge variant={getInstitutionTypeBadgeVariant(program.institution.type)}>
                          {program.institution.name}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(program.createdAt).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link href={`/admin/programs/${program.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditClick(program)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteProgram(program.id)}
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

      {/* Modals */}
      <ProgramModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateProgram}
        institutions={institutions}
        loading={modalLoading}
      />

      <ProgramModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setEditingProgram(null)
        }}
        onSave={handleEditProgram}
        program={editingProgram ? {
          name: editingProgram.name,
          description: editingProgram.description,
          faculty: editingProgram.faculty,
          requirements: editingProgram.requirements,
          exams: JSON.parse(editingProgram.exams || '[]'),
          institutionId: editingProgram.institutionId
        } : undefined}
        institutions={institutions}
        loading={modalLoading}
      />
    </div>
  )
}
