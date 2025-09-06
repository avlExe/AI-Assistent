'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, GradientCard, NeomorphicCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  GraduationCap, 
  Target, 
  Users, 
  Star, 
  ArrowRight, 
  CheckCircle,
  BookOpen,
  TrendingUp,
  Shield,
  Zap,
  Heart,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">AI Помощник</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#features" 
              className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10">Возможности</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <Link 
              href="#about" 
              className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10">О проекте</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <Link 
              href="#contact" 
              className="text-gray-300 hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10">Контакты</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost">Войти</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="gradient">Начать</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Background */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        {/* 3D Animated Background */}
        <div className="absolute inset-0">
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg transform rotate-45 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg transform rotate-12 animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full animate-float"></div>
          
          {/* Large gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-3/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 via-indigo-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse-slow transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-red-500/5 rounded-full blur-2xl animate-pulse transform -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-move"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge variant="gradient" className="mb-6 text-sm px-4 py-2 animate-fade-in-up">
              🚀 Новое поколение ИИ-помощников
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text animate-fade-in-up-delayed">
              Умный выбор
              <br />
              <span className="text-gray-200">вуза и специальности</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delayed-2">
              ИИ-помощник поможет проанализировать ваши результаты ЕГЭ, учтёт достижения и подберёт 
              подходящие варианты для поступления в вуз или колледж
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up-delayed-3">
              <Link href="/auth/register">
                <Button size="xl" variant="gradient" className="w-full sm:w-auto hover:scale-105 transition-all duration-300 shadow-2xl">
                  Начать анализ
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                size="xl" 
                variant="outline" 
                className="w-full sm:w-auto hover:scale-105 transition-all duration-300"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Узнать больше
              </Button>
            </div>
          </div>
          
          {/* 3D Feature Cards */}
          <div className="mt-20 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <NeomorphicCard className="hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 animate-fade-in-up-delayed-4 group cursor-pointer">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">ИИ-анализ</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Умный анализ результатов и достижений
                  </p>
                </div>
              </NeomorphicCard>
              
              <NeomorphicCard className="hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 animate-fade-in-up-delayed-5 group cursor-pointer">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">Персональные рекомендации</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Подбор идеальных вузов и специальностей
                  </p>
                </div>
              </NeomorphicCard>
              
              <NeomorphicCard className="hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 animate-fade-in-up-delayed-6 group cursor-pointer">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">Успешное поступление</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Повышение шансов на поступление
                  </p>
                </div>
              </NeomorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Возможности помощника
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Полный спектр инструментов для успешного поступления
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <GradientCard className="hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">Анализ ЕГЭ/ОГЭ</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Детальный анализ результатов экзаменов с учётом проходных баллов
                  </p>
                </div>
              </div>
            </GradientCard>

            <GradientCard className="hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">Учёт достижений</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Олимпиады, сертификаты, проекты - всё учитывается в анализе
                  </p>
                </div>
              </div>
            </GradientCard>

            <GradientCard className="hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">Подбор вузов</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Интеллектуальный подбор подходящих учебных заведений
                  </p>
                </div>
              </div>
            </GradientCard>

            <GradientCard className="hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">Для родителей</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Отдельный доступ для отслеживания прогресса ребёнка
                  </p>
                </div>
              </div>
            </GradientCard>

            <GradientCard className="hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">Быстрые результаты</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Получите рекомендации за несколько минут
                  </p>
                </div>
              </div>
            </GradientCard>

            <GradientCard className="hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">Безопасность</h3>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                    Ваши данные защищены и не передаются третьим лицам
                  </p>
                </div>
              </div>
            </GradientCard>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gray-900/60 border-t border-b border-gray-700/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">Много</div>
              <div className="text-gray-300">Вузов и колледжей</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">Разнообразность</div>
              <div className="text-gray-300">Специальностей</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">Высокая</div>
              <div className="text-gray-300">Точность рекомендаций</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-gray-300">Доступность</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-800/30">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            О проекте
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            AI Помощник — это современная платформа, которая использует искусственный интеллект 
            для помощи ученикам и родителям в выборе подходящего вуза и специальности. 
            Наша система анализирует результаты ЕГЭ, учитывает достижения и предоставляет 
            персонализированные рекомендации для успешного поступления.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Готовы найти свой идеальный вуз?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Начните свой путь к успешному поступлению уже сегодня
          </p>
          <Link href="/auth/register">
            <Button size="xl" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Начать бесплатно
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AI Помощник</span>
              </div>
              <p className="text-gray-400">
                Умный выбор вуза и специальности с помощью ИИ
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Продукт</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Возможности</Link></li>
                <li><Link href="/institutions" className="hover:text-white transition-colors">Вузы</Link></li>
                <li><Link href="/assistant" className="hover:text-white transition-colors">Помощник</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">О проекте</Link></li>
                <li><Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link></li>
                <li><Link href="/help" className="hover:text-white transition-colors">Помощь</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Связаться</h3>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <Heart className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Помощник. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
