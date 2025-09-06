'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input, NeomorphicInput } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, NeomorphicCard } from '@/components/ui/card'
import { Brain, Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Неверный email или пароль')
      } else {
        const session = await getSession()
        if (session?.user.role === 'ADMIN') {
          router.push('/admin')
        } else if (session?.user.role === 'PARENT') {
          router.push('/parent')
        } else {
          router.push('/student')
        }
      }
    } catch (error) {
      setError('Произошла ошибка при входе')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Back Button - Top Left */}
      <div className="absolute top-6 left-6 z-20">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">AI Помощник</span>
          </Link>
        </div>

        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold gradient-text mb-2">Вход в систему</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Войдите в свой аккаунт для доступа к ИИ-помощнику
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm shadow-lg">
                  {error}
                </div>
              )}

              <div className="space-y-3">
                <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Пароль
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold"
                variant="gradient"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Вход...
                  </div>
                ) : (
                  'Войти'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Нет аккаунта?{' '}
                <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                  Зарегистрироваться
                </Link>
              </p>
            </div>

            {/* Demo accounts */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Демо-аккаунты:
              </p>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <p><strong>Админ:</strong> admin@ai-assistent.ru / password123</p>
                <p><strong>Студент:</strong> student@example.com / password123</p>
                <p><strong>Родитель:</strong> parent@example.com / password123</p>
              </div>
            </div>
          </CardContent>
        </div>
        </div>
      </div>
    </div>
  )
}
