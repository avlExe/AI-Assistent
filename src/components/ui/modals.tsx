'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, Save, RefreshCw } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  onSave?: () => void
  saveText?: string
  loading?: boolean
}

export function Modal({ isOpen, onClose, title, children, onSave, saveText = 'Сохранить', loading = false }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-6">
          {children}
        </div>
        {(onSave) && (
          <div className="flex items-center justify-end space-x-2 p-6 border-t border-gray-200 dark:border-gray-700">
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button onClick={onSave} disabled={loading}>
              {loading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saveText}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

interface UserFormData {
  name: string
  email: string
  password: string
  role: string
}

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: UserFormData) => Promise<void>
  user?: UserFormData
  loading?: boolean
}

export function UserModal({ isOpen, onClose, onSave, user, loading = false }: UserModalProps) {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT'
  })

  useEffect(() => {
    if (user) {
      setFormData(user)
    } else {
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'STUDENT'
      })
    }
  }, [user, isOpen])

  const handleSave = async () => {
    await onSave(formData)
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={user ? 'Редактировать пользователя' : 'Добавить пользователя'}
      onSave={handleSave}
      loading={loading}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Имя
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Введите имя пользователя"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Введите email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Пароль
          </label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder={user ? "Оставьте пустым, чтобы не изменять" : "Введите пароль"}
            required={!user}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Роль
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="STUDENT">Студент</option>
            <option value="PARENT">Родитель</option>
            <option value="ADMIN">Администратор</option>
          </select>
        </div>
      </div>
    </Modal>
  )
}

interface InstitutionFormData {
  name: string
  description: string
  type: string
  direction: string
  minScore: number
  website: string
  logo: string
}

interface InstitutionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: InstitutionFormData) => Promise<void>
  institution?: InstitutionFormData
  loading?: boolean
}

export function InstitutionModal({ isOpen, onClose, onSave, institution, loading = false }: InstitutionModalProps) {
  const [formData, setFormData] = useState<InstitutionFormData>({
    name: '',
    description: '',
    type: 'Университет',
    direction: '',
    minScore: 0,
    website: '',
    logo: ''
  })

  useEffect(() => {
    if (institution) {
      setFormData(institution)
    } else {
      setFormData({
        name: '',
        description: '',
        type: 'Университет',
        direction: '',
        minScore: 0,
        website: '',
        logo: ''
      })
    }
  }, [institution, isOpen])

  const handleSave = async () => {
    await onSave(formData)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={institution ? 'Редактировать вуз' : 'Добавить вуз'}
      onSave={handleSave}
      loading={loading}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Название вуза
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Введите название вуза"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Описание
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Введите описание вуза"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Тип вуза
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="Университет">Университет</option>
              <option value="Институт">Институт</option>
              <option value="Академия">Академия</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Направление
            </label>
            <Input
              value={formData.direction}
              onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
              placeholder="Направление подготовки"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Минимальный балл
            </label>
            <Input
              type="number"
              value={formData.minScore}
              onChange={(e) => setFormData({ ...formData, minScore: parseInt(e.target.value) || 0 })}
              placeholder="Минимальный балл"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Веб-сайт
            </label>
            <Input
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            URL логотипа
          </label>
          <Input
            value={formData.logo}
            onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
            placeholder="https://example.com/logo.png"
          />
        </div>
      </div>
    </Modal>
  )
}

interface ProgramFormData {
  name: string
  description: string
  faculty: string
  requirements: string
  exams: any[]
  institutionId: string
}

interface ProgramModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: ProgramFormData) => Promise<void>
  program?: ProgramFormData
  institutions: Array<{ id: string; name: string }>
  loading?: boolean
}

export function ProgramModal({ isOpen, onClose, onSave, program, institutions, loading = false }: ProgramModalProps) {
  const [formData, setFormData] = useState<ProgramFormData>({
    name: '',
    description: '',
    faculty: '',
    requirements: '',
    exams: [],
    institutionId: ''
  })

  useEffect(() => {
    if (program) {
      setFormData(program)
    } else {
      setFormData({
        name: '',
        description: '',
        faculty: '',
        requirements: '',
        exams: [],
        institutionId: ''
      })
    }
  }, [program, isOpen])

  const handleSave = async () => {
    await onSave(formData)
  }

  const addExam = () => {
    setFormData({
      ...formData,
      exams: [...formData.exams, { subject: '', type: '', score: 0, description: '' }]
    })
  }

  const removeExam = (index: number) => {
    setFormData({
      ...formData,
      exams: formData.exams.filter((_, i) => i !== index)
    })
  }

  const updateExam = (index: number, field: string, value: any) => {
    const updatedExams = [...formData.exams]
    updatedExams[index] = { ...updatedExams[index], [field]: value }
    setFormData({ ...formData, exams: updatedExams })
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={program ? 'Редактировать программу' : 'Добавить программу'}
      onSave={handleSave}
      loading={loading}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Название программы
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Введите название программы"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Описание
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Введите описание программы"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Факультет
            </label>
            <Input
              value={formData.faculty}
              onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
              placeholder="Название факультета"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Вуз
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              value={formData.institutionId}
              onChange={(e) => setFormData({ ...formData, institutionId: e.target.value })}
              required
            >
              <option value="">Выберите вуз</option>
              {institutions.map((institution) => (
                <option key={institution.id} value={institution.id}>
                  {institution.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Требования к поступающим
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            rows={3}
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
            placeholder="Введите требования к поступающим"
            required
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Экзамены
            </label>
            <Button type="button" variant="outline" size="sm" onClick={addExam}>
              Добавить экзамен
            </Button>
          </div>
          <div className="space-y-2">
            {formData.exams.map((exam, index) => (
              <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Экзамен {index + 1}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExam(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Input
                    placeholder="Предмет"
                    value={exam.subject}
                    onChange={(e) => updateExam(index, 'subject', e.target.value)}
                  />
                  <Input
                    placeholder="Тип экзамена"
                    value={exam.type}
                    onChange={(e) => updateExam(index, 'type', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Минимальный балл"
                    value={exam.score}
                    onChange={(e) => updateExam(index, 'score', parseInt(e.target.value) || 0)}
                  />
                  <Input
                    placeholder="Описание"
                    value={exam.description}
                    onChange={(e) => updateExam(index, 'description', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
