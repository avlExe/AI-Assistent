'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Database, 
  Shield, 
  Mail, 
  Globe, 
  Bell,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react'

interface SystemSettings {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    maintenanceMode: boolean
  }
  email: {
    smtpHost: string
    smtpPort: number
    smtpUser: string
    smtpPassword: string
    fromEmail: string
    fromName: string
  }
  security: {
    sessionTimeout: number
    maxLoginAttempts: number
    passwordMinLength: number
    requireEmailVerification: boolean
  }
  notifications: {
    emailNotifications: boolean
    pushNotifications: boolean
    adminNotifications: boolean
  }
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>({
    general: {
      siteName: 'AI Ассистент',
      siteDescription: 'Платформа для помощи в выборе вуза',
      siteUrl: 'http://localhost:3000',
      maintenanceMode: false
    },
    email: {
      smtpHost: '',
      smtpPort: 587,
      smtpUser: '',
      smtpPassword: '',
      fromEmail: '',
      fromName: ''
    },
    security: {
      sessionTimeout: 24,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      requireEmailVerification: true
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      adminNotifications: true
    }
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  const handleSave = async () => {
    setSaving(true)
    try {
      // Здесь будет API вызов для сохранения настроек
      await new Promise(resolve => setTimeout(resolve, 1000)) // Имитация API
      alert('Настройки сохранены успешно!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Ошибка при сохранении настроек')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (confirm('Вы уверены, что хотите сбросить настройки к значениям по умолчанию?')) {
      // Сброс к значениям по умолчанию
      setSettings({
        general: {
          siteName: 'AI Ассистент',
          siteDescription: 'Платформа для помощи в выборе вуза',
          siteUrl: 'http://localhost:3000',
          maintenanceMode: false
        },
        email: {
          smtpHost: '',
          smtpPort: 587,
          smtpUser: '',
          smtpPassword: '',
          fromEmail: '',
          fromName: ''
        },
        security: {
          sessionTimeout: 24,
          maxLoginAttempts: 5,
          passwordMinLength: 8,
          requireEmailVerification: true
        },
        notifications: {
          emailNotifications: true,
          pushNotifications: false,
          adminNotifications: true
        }
      })
    }
  }

  const tabs = [
    { id: 'general', label: 'Общие', icon: Settings },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Безопасность', icon: Shield },
    { id: 'notifications', label: 'Уведомления', icon: Bell },
    { id: 'database', label: 'База данных', icon: Database }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Настройки системы
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Управление конфигурацией платформы
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Сбросить
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Сохранить
          </Button>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Статус системы</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">Работает</span>
                </div>
              </div>
              <Database className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">База данных</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">Подключена</span>
                </div>
              </div>
              <Database className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Email сервис</p>
                <div className="flex items-center mt-1">
                  <XCircle className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">Не настроен</span>
                </div>
              </div>
              <Mail className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Режим обслуживания</p>
                <div className="flex items-center mt-1">
                  {settings.general.maintenanceMode ? (
                    <>
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-yellow-600">Включён</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">Выключен</span>
                    </>
                  )}
                </div>
              </div>
              <Settings className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Settings Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            {tabs.find(tab => tab.id === activeTab)?.label}
          </CardTitle>
          <CardDescription>
            {activeTab === 'general' && 'Основные настройки сайта'}
            {activeTab === 'email' && 'Настройки электронной почты'}
            {activeTab === 'security' && 'Параметры безопасности'}
            {activeTab === 'notifications' && 'Настройки уведомлений'}
            {activeTab === 'database' && 'Управление базой данных'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Название сайта
                  </label>
                  <Input
                    value={settings.general.siteName}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, siteName: e.target.value }
                    })}
                    placeholder="Название сайта"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL сайта
                  </label>
                  <Input
                    value={settings.general.siteUrl}
                    onChange={(e) => setSettings({
                      ...settings,
                      general: { ...settings.general, siteUrl: e.target.value }
                    })}
                    placeholder="https://example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Описание сайта
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  rows={3}
                  value={settings.general.siteDescription}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, siteDescription: e.target.value }
                  })}
                  placeholder="Описание сайта"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={settings.general.maintenanceMode}
                  onChange={(e) => setSettings({
                    ...settings,
                    general: { ...settings.general, maintenanceMode: e.target.checked }
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="maintenanceMode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Режим обслуживания
                </label>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    SMTP хост
                  </label>
                  <Input
                    value={settings.email.smtpHost}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpHost: e.target.value }
                    })}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    SMTP порт
                  </label>
                  <Input
                    type="number"
                    value={settings.email.smtpPort}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpPort: parseInt(e.target.value) }
                    })}
                    placeholder="587"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    SMTP пользователь
                  </label>
                  <Input
                    value={settings.email.smtpUser}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpUser: e.target.value }
                    })}
                    placeholder="user@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    SMTP пароль
                  </label>
                  <Input
                    type="password"
                    value={settings.email.smtpPassword}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, smtpPassword: e.target.value }
                    })}
                    placeholder="Пароль"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    От кого (email)
                  </label>
                  <Input
                    value={settings.email.fromEmail}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, fromEmail: e.target.value }
                    })}
                    placeholder="noreply@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    От кого (имя)
                  </label>
                  <Input
                    value={settings.email.fromName}
                    onChange={(e) => setSettings({
                      ...settings,
                      email: { ...settings.email, fromName: e.target.value }
                    })}
                    placeholder="AI Ассистент"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Таймаут сессии (часы)
                  </label>
                  <Input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, sessionTimeout: parseInt(e.target.value) }
                    })}
                    placeholder="24"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Максимум попыток входа
                  </label>
                  <Input
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => setSettings({
                      ...settings,
                      security: { ...settings.security, maxLoginAttempts: parseInt(e.target.value) }
                    })}
                    placeholder="5"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Минимальная длина пароля
                </label>
                <Input
                  type="number"
                  value={settings.security.passwordMinLength}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, passwordMinLength: parseInt(e.target.value) }
                  })}
                  placeholder="8"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="requireEmailVerification"
                  checked={settings.security.requireEmailVerification}
                  onChange={(e) => setSettings({
                    ...settings,
                    security: { ...settings.security, requireEmailVerification: e.target.checked }
                  })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="requireEmailVerification" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Требовать подтверждение email
                </label>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={settings.notifications.emailNotifications}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, emailNotifications: e.target.checked }
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email уведомления
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="pushNotifications"
                    checked={settings.notifications.pushNotifications}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, pushNotifications: e.target.checked }
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="pushNotifications" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Push уведомления
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="adminNotifications"
                    checked={settings.notifications.adminNotifications}
                    onChange={(e) => setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, adminNotifications: e.target.checked }
                    })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="adminNotifications" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Уведомления администратора
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Резервное копирование</CardTitle>
                    <CardDescription>Создать резервную копию базы данных</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      <Database className="w-4 h-4 mr-2" />
                      Создать бэкап
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Очистка данных</CardTitle>
                    <CardDescription>Очистить старые данные</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Очистить
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
