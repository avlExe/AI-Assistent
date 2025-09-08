'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input, NeomorphicInput } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, NeomorphicCard } from '@/components/ui/card'
import { Brain, Eye, EyeOff, User, Mail, Lock, ArrowLeft } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT' as 'STUDENT' | 'PARENT'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Функция для проверки качества пароля
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { level: 0, message: '', color: 'green' }
    if (password.length < 6) return { level: 1, message: 'Слишком короткий', color: 'red' }
    
    let score = 0
    let checks = []
    
    // Проверка длины
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1
    
    // Проверка на наличие цифр
    if (/\d/.test(password)) {
      score += 1
      checks.push('цифры')
    }
    
    // Проверка на наличие строчных букв
    if (/[a-z]/.test(password)) {
      score += 1
      checks.push('строчные буквы')
    }
    
    // Проверка на наличие заглавных букв
    if (/[A-Z]/.test(password)) {
      score += 1
      checks.push('заглавные буквы')
    }
    
    // Проверка на наличие специальных символов
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1
      checks.push('специальные символы')
    }
    
    if (score <= 2) {
      return { level: 2, message: 'Слабый', color: 'red' }
    } else if (score <= 4) {
      return { level: 3, message: 'Средний', color: 'yellow' }
    } else {
      return { level: 4, message: 'Надежный', color: 'green' }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Валидация пароля
    const passwordStrength = getPasswordStrength(formData.password)
    if (passwordStrength.level < 2) {
      setError('Пароль слишком слабый. Используйте минимум 6 символов')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      })

      if (response.ok) {
        // Автоматический вход после регистрации
        const signInResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        })

        if (signInResult?.ok) {
          router.push('/?message=Регистрация успешна! Добро пожаловать!')
        } else {
          // Если автоматический вход не удался, перенаправляем на страницу входа
          router.push('/auth/login?message=Регистрация успешна! Войдите в систему.')
        }
      } else {
        const data = await response.json()
        setError(data.message || 'Ошибка при регистрации')
      }
    } catch (error) {
      setError('Произошла ошибка при регистрации')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }




  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Back Button - Top Left */}
      <div className="absolute top-6 left-6 z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/')}
          className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md relative z-10">

        {/* Logo */}
        <div className="text-center mb-8 animate-slide-up-fast">
          <Link href="/" className="inline-flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">AI Помощник</span>
          </Link>
        </div>

        <NeomorphicCard className="hover:shadow-2xl transition-all duration-300 animate-scale-in-fast">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Регистрация</CardTitle>
            <CardDescription>
              Создайте аккаунт для доступа к ИИ-помощнику
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2 animate-slide-up-fast-delay-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-300 flex items-center">
                  <User className="w-4 h-4 mr-2 text-blue-400" />
                  Имя
                </label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200" />
                  <NeomorphicInput
                    id="name"
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="pl-10 hover:shadow-lg focus:shadow-xl focus:shadow-blue-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2 animate-slide-up-fast-delay-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-300 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-purple-400" />
                  Email
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-200" />
                  <NeomorphicInput
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="pl-10 hover:shadow-lg focus:shadow-xl focus:shadow-purple-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2 animate-slide-up-fast-delay-2">
                <label htmlFor="role" className="text-sm font-medium text-gray-300 flex items-center">
                  <User className="w-4 h-4 mr-2 text-cyan-400" />
                  Роль
                </label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as 'STUDENT' | 'PARENT' }))}
                  className="w-full h-12 rounded-xl bg-gray-800 border border-gray-600 px-4 py-3 text-sm text-gray-200 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
                >
                  <option value="STUDENT" className="bg-gray-800 text-gray-200">Ученик</option>
                  <option value="PARENT" className="bg-gray-800 text-gray-200">Родитель</option>
                </select>
              </div>

              <div className="space-y-2 animate-slide-up-fast-delay-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-blue-400" />
                  Пароль
                </label>
                <div className="relative group">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-${
                    formData.password.length === 0 ? 'blue' : getPasswordStrength(formData.password).color
                  }-400 transition-colors duration-200`} />
                  <NeomorphicInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Введите надежный пароль"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    className={`pl-10 pr-10 hover:shadow-lg focus:shadow-xl transition-all duration-200 ${
                      formData.password.length === 0
                        ? 'border-blue-400 focus:border-blue-400 focus:shadow-blue-500/20'
                        : getPasswordStrength(formData.password).color === 'red'
                        ? 'border-red-400 focus:border-red-400 focus:shadow-red-500/20'
                        : getPasswordStrength(formData.password).color === 'yellow'
                        ? 'border-yellow-400 focus:border-yellow-400 focus:shadow-yellow-500/20'
                        : 'border-green-400 focus:border-green-400 focus:shadow-green-500/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-${
                      formData.password.length === 0 ? 'blue' : getPasswordStrength(formData.password).color
                    }-400 transition-colors duration-200`}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.password.length > 0 && (
                  <div className="space-y-1">
                    <p className={`text-xs flex items-center ${
                      getPasswordStrength(formData.password).color === 'red' ? 'text-red-400' :
                      getPasswordStrength(formData.password).color === 'yellow' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      <span className={`w-1 h-1 rounded-full mr-2 ${
                        getPasswordStrength(formData.password).color === 'red' ? 'bg-red-400' :
                        getPasswordStrength(formData.password).color === 'yellow' ? 'bg-yellow-400' :
                        'bg-green-400'
                      }`}></span>
                      {getPasswordStrength(formData.password).message}
                    </p>
                    {/* Индикатор силы пароля */}
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full ${
                            level <= getPasswordStrength(formData.password).level
                              ? getPasswordStrength(formData.password).color === 'red' ? 'bg-red-400' :
                                getPasswordStrength(formData.password).color === 'yellow' ? 'bg-yellow-400' :
                                'bg-green-400'
                              : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2 animate-slide-up-fast-delay-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300 flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-blue-400" />
                  Подтвердите пароль
                </label>
                <div className="relative group">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-${
                    formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword
                      ? 'red'
                      : formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword
                      ? 'green'
                      : 'blue'
                  }-400 transition-colors duration-200`} />
                  <NeomorphicInput
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Повторите пароль"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    className={`pl-10 pr-10 hover:shadow-lg focus:shadow-xl transition-all duration-200 ${
                      formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword
                        ? 'border-red-400 focus:border-red-400 focus:shadow-red-500/20'
                        : formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword
                        ? 'border-green-400 focus:border-green-400 focus:shadow-green-500/20'
                        : 'border-blue-400 focus:border-blue-400 focus:shadow-blue-500/20'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-${
                      formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword
                        ? 'red'
                        : formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword
                        ? 'green'
                        : 'blue'
                    }-400 transition-colors duration-200`}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-400 flex items-center">
                    <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                    Пароли не совпадают
                  </p>
                )}
                {formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword && (
                  <p className="text-xs text-green-400 flex items-center">
                    <span className="w-1 h-1 bg-green-400 rounded-full mr-2"></span>
                    Пароли совпадают
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl animate-slide-up-fast-delay-2"
                variant="gradient"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Регистрация...
                  </div>
                ) : (
                  'Зарегистрироваться'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center animate-slide-up-fast-delay-2">
              <p className="text-sm text-gray-300">
                Уже есть аккаунт?{' '}
                <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-all duration-200">
                  Войти
                </Link>
              </p>
            </div>
          </CardContent>
        </NeomorphicCard>
        </div>
      </div>
    </div>
  )
}

