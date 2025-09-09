'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { UserModal } from '@/components/ui/modals'
import { LoadingError } from '@/components/ui/loading-error'
import { useDataCache } from '@/hooks/useDataCache'
import { 
  Users, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  createdAt: string
  updatedAt: string
  _count: {
    reports: number
    achievements: number
    examResults: number
  }
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export default function AdminUsersPage() {
  const { data: session } = useSession()
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [modalLoading, setModalLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchUsers = async (page = 1, searchTerm = '', role = '') => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: '10',
      ...(searchTerm && { search: searchTerm }),
      ...(role && { role })
    })

    const response = await fetch(`/api/admin/users?${params}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  }

  const { data: usersData, loading, error, refetch } = useDataCache({
    cacheKey: `users_${currentPage}_${search}_${roleFilter}`,
    fetchFn: () => fetchUsers(currentPage, search, roleFilter),
    ttl: 2 * 60 * 1000, // 2 minutes cache
  })

  const users = usersData?.users || []
  const pagination = usersData?.pagination || { page: 1, limit: 10, total: 0, pages: 0 }

  useEffect(() => {
    // Проверяем URL параметры для редактирования
    const urlParams = new URLSearchParams(window.location.search)
    const editUserId = urlParams.get('edit')
    if (editUserId && users.length > 0) {
      // Находим пользователя для редактирования
      const userToEdit = users.find(u => u.id === editUserId)
      if (userToEdit) {
        setEditingUser(userToEdit)
        setShowEditModal(true)
      }
    }
  }, [users])

  const handleSearch = () => {
    setCurrentPage(1)
    refetch()
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        refetch()
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при удалении пользователя')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Ошибка при удалении пользователя')
    }
  }

  const handleCreateUser = async (userData: any) => {
    setModalLoading(true)
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        setShowCreateModal(false)
        refetch()
        alert('Пользователь успешно создан!')
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при создании пользователя')
      }
    } catch (error) {
      console.error('Error creating user:', error)
      alert('Ошибка при создании пользователя')
    } finally {
      setModalLoading(false)
    }
  }

  const handleEditUser = async (userData: any) => {
    if (!editingUser) return
    
    setModalLoading(true)
    try {
      const response = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        setShowEditModal(false)
        setEditingUser(null)
        refetch()
        alert('Пользователь успешно обновлён!')
      } else {
        const error = await response.json()
        alert(error.error || 'Ошибка при обновлении пользователя')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Ошибка при обновлении пользователя')
    } finally {
      setModalLoading(false)
    }
  }

  const handleEditClick = (user: User) => {
    setEditingUser(user)
    setShowEditModal(true)
  }

  const handleExportUsers = async () => {
    try {
      const response = await fetch('/api/admin/users?limit=1000')
      if (response.ok) {
        const data = await response.json()
        const csvContent = [
          ['Имя', 'Email', 'Роль', 'Дата создания'].join(','),
          ...data.users.map((user: User) => [
            user.name,
            user.email,
            getRoleLabel(user.role),
            new Date(user.createdAt).toLocaleDateString('ru-RU')
          ].join(','))
        ].join('\n')

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const link = document.createElement('a')
        const url = URL.createObjectURL(blob)
        link.setAttribute('href', url)
        link.setAttribute('download', `users_${new Date().toISOString().split('T')[0]}.csv`)
        link.style.visibility = 'hidden'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error('Error exporting users:', error)
      alert('Ошибка при экспорте данных')
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Управление пользователями
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Просматривайте и управляйте пользователями системы
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить пользователя
          </Button>
          <Button 
            onClick={handleExportUsers}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Всего пользователей</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{pagination.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Студенты</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {users.filter(u => u.role === 'STUDENT').length}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Родители</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {users.filter(u => u.role === 'PARENT').length}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Администраторы</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {users.filter(u => u.role === 'ADMIN').length}
                </p>
              </div>
              <Users className="w-8 h-8 text-red-500" />
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
                placeholder="Поиск по имени или email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div className="sm:w-48">
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">Все роли</option>
                <option value="STUDENT">Студент</option>
                <option value="PARENT">Родитель</option>
                <option value="ADMIN">Администратор</option>
              </select>
            </div>
            <Button onClick={handleSearch} variant="outline">
              <Search className="w-4 h-4 mr-2" />
              Поиск
            </Button>
            <Button onClick={refetch} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Обновить
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Список пользователей</CardTitle>
          <CardDescription>
            Показано {users.length} из {pagination.total} пользователей
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoadingError
            loading={loading}
            error={error}
            onRetry={refetch}
            loadingText="Загрузка пользователей..."
            emptyText="Пользователи не найдены"
            showEmptyState={users.length === 0}
          >
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{user.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {getRoleLabel(user.role)}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {user._count.reports} отчётов • {user._count.achievements} достижений
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link href={`/admin/users/${user.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditClick(user)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    {user.id !== session?.user?.id && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </LoadingError>

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
      <UserModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateUser}
        loading={modalLoading}
      />

      <UserModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setEditingUser(null)
        }}
        onSave={handleEditUser}
        user={editingUser ? {
          name: editingUser.name,
          email: editingUser.email,
          password: '', // Пустой пароль при редактировании
          role: editingUser.role
        } : undefined}
        loading={modalLoading}
      />
    </div>
  )
}
