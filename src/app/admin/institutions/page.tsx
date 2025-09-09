'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { InstitutionModal } from '@/components/ui/modals'
import { 
  Building2, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  RefreshCw,
  GraduationCap,
  Users,
  Download
} from 'lucide-react'
import Link from 'next/link'

interface Institution {
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
  _count: {
    programs: number
    savedBy: number
  }
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export default function AdminInstitutionsPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingInstitution, setEditingInstitution] = useState<Institution | null>(null)
  const [modalLoading, setModalLoading] = useState(false)

  const fetchInstitutions = async (page = 1, searchTerm = '', type = '') => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchTerm && { search: searchTerm }),
        ...(type && { type })
      })

      const response = await fetch(`/api/admin/institutions?${params}`)
      if (response.ok) {
        const data = await response.json()
        setInstitutions(data.institutions)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Error fetching institutions:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInstitutions()
  }, [])

  const handleSearch = () => {
    fetchInstitutions(1, search, typeFilter)
  }

  const handlePageChange = (newPage: number) => {
    fetchInstitutions(newPage, search, typeFilter)
  }

  const handleDeleteInstitution = async (institutionId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот вуз? Это также удалит все связанные программы.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/institutions/${institutionId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        fetchInstitutions(pagination.page, search, typeFilter)
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при удалении вуза')
      }
    } catch (error) {
      console.error('Error deleting institution:', error)
      alert('Ошибка при удалении вуза')
    }
  }

  const handleCreateInstitution = async (institutionData: any) => {
    setModalLoading(true)
    try {
      const response = await fetch('/api/admin/institutions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(institutionData),
      })

      if (response.ok) {
        setShowCreateModal(false)
        fetchInstitutions(pagination.page, search, typeFilter)
        alert('Вуз успешно создан!')
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при создании вуза')
      }
    } catch (error) {
      console.error('Error creating institution:', error)
      alert('Ошибка при создании вуза')
    } finally {
      setModalLoading(false)
    }
  }

  const handleEditInstitution = async (institutionData: any) => {
    if (!editingInstitution) return
    
    setModalLoading(true)
    try {
      const response = await fetch(`/api/admin/institutions/${editingInstitution.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(institutionData),
      })

      if (response.ok) {
        setShowEditModal(false)
        setEditingInstitution(null)
        fetchInstitutions(pagination.page, search, typeFilter)
        alert('Вуз успешно обновлён!')
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при обновлении вуза')
      }
    } catch (error) {
      console.error('Error updating institution:', error)
      alert('Ошибка при обновлении вуза')
    } finally {
      setModalLoading(false)
    }
  }

  const handleEditClick = (institution: Institution) => {
    setEditingInstitution(institution)
    setShowEditModal(true)
  }

  const handleExportInstitutions = async () => {
    try {
      const response = await fetch('/api/admin/institutions?limit=1000')
      if (response.ok) {
        const data = await response.json()
        const csvContent = [
          ['Название', 'Тип', 'Направление', 'Мин. балл', 'Веб-сайт', 'Дата создания'].join(','),
          ...data.institutions.map((institution: Institution) => [
            institution.name,
            institution.type,
            institution.direction,
            institution.minScore,
            institution.website || '',
            new Date(institution.createdAt).toLocaleDateString('ru-RU')
          ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `institutions_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error('Error exporting institutions:', error)
      alert('Ошибка при экспорте данных')
    }
  }

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Управление вузами
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Просматривайте и управляйте учебными заведениями
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить вуз
          </Button>
          <Button 
            onClick={handleExportInstitutions}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Всего вузов</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{pagination.total}</p>
              </div>
              <Building2 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Университеты</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {institutions.filter(i => i.type.toLowerCase() === 'университет').length}
                </p>
              </div>
              <Building2 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Институты</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {institutions.filter(i => i.type.toLowerCase() === 'институт').length}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Всего программ</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {institutions.reduce((sum, i) => sum + i._count.programs, 0)}
                </p>
              </div>
              <GraduationCap className="w-8 h-8 text-orange-500" />
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
                placeholder="Поиск по названию, описанию или направлению..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="sm:w-48">
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">Все типы</option>
                <option value="Университет">Университет</option>
                <option value="Институт">Институт</option>
                <option value="Академия">Академия</option>
              </select>
            </div>
            <Button onClick={handleSearch} variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Поиск
            </Button>
            <Button onClick={() => fetchInstitutions()} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Обновить
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Institutions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Список вузов</CardTitle>
          <CardDescription>
            Показано {institutions.length} из {pagination.total} вузов
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
              {institutions.map((institution) => (
                <div key={institution.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{institution.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                        {institution.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={getTypeBadgeVariant(institution.type)}>
                          {institution.type}
                        </Badge>
                        <Badge variant={getScoreBadgeVariant(institution.minScore)}>
                          Мин. балл: {institution.minScore}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {institution._count.programs} программ • {institution._count.savedBy} сохранений
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link href={`/admin/institutions/${institution.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditClick(institution)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteInstitution(institution.id)}
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
      <InstitutionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateInstitution}
        loading={modalLoading}
      />

      <InstitutionModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setEditingInstitution(null)
        }}
        onSave={handleEditInstitution}
        institution={editingInstitution ? {
          name: editingInstitution.name,
          description: editingInstitution.description,
          type: editingInstitution.type,
          direction: editingInstitution.direction,
          minScore: editingInstitution.minScore,
          website: editingInstitution.website || '',
          logo: editingInstitution.logo || ''
        } : undefined}
        loading={modalLoading}
      />
    </div>
  )
}
