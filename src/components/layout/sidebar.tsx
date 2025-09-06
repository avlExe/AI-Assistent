'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Home, 
  User, 
  GraduationCap, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Users,
  Building2,
  FileText,
  MessageSquare,
  TrendingUp,
  Database
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  role: string
}

const studentMenuItems = [
  { href: '/student', icon: Home, label: 'Главная' },
  { href: '/student/profile', icon: User, label: 'Профиль' },
  { href: '/assistant', icon: Brain, label: 'ИИ-Помощник' },
  { href: '/institutions', icon: Building2, label: 'Вузы' },
  { href: '/student/reports', icon: FileText, label: 'Отчёты' },
  { href: '/student/achievements', icon: GraduationCap, label: 'Достижения' },
]

const parentMenuItems = [
  { href: '/parent', icon: Home, label: 'Главная' },
  { href: '/parent/profile', icon: User, label: 'Профиль' },
  { href: '/parent/child', icon: Users, label: 'Мой ребёнок' },
  { href: '/parent/reports', icon: FileText, label: 'Отчёты' },
]

const adminMenuItems = [
  { href: '/admin', icon: Home, label: 'Главная' },
  { href: '/admin/users', icon: Users, label: 'Пользователи' },
  { href: '/admin/institutions', icon: Building2, label: 'Вузы' },
  { href: '/admin/programs', icon: GraduationCap, label: 'Программы' },
  { href: '/admin/reports', icon: FileText, label: 'Отчёты' },
  { href: '/admin/analytics', icon: TrendingUp, label: 'Аналитика' },
  { href: '/admin/settings', icon: Settings, label: 'Настройки' },
]

export function Sidebar({ role }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const getMenuItems = () => {
    switch (role) {
      case 'STUDENT':
        return studentMenuItems
      case 'PARENT':
        return parentMenuItems
      case 'ADMIN':
        return adminMenuItems
      default:
        return []
    }
  }

  const menuItems = getMenuItems()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/80 backdrop-blur-md shadow-lg"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-r border-gray-200/50 dark:border-gray-700/50 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">AI Помощник</span>
            </Link>
          </div>

          {/* User info */}
          <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {session?.user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-gradient-primary text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Sign out */}
          <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Выйти
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

