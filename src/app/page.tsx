'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ThreeDHeroBackground from '@/components/3d-hero-background'
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
  Sparkles,
  Zap as Lightning
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      {/* Global Background */}
      <ThreeDHeroBackground />
      
      {/* Global Fallback Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-slate-800/40 to-slate-900/60"></div>
        
                 {/* Плотный фон для хедера - верхняя часть страницы */}
                 <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/60 rounded-full blur-3xl animate-pulse"></div>
                 <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500/60 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                 <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/60 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                 
                 {/* Дополнительные элементы в хедере */}
                 <div className="absolute top-1/6 left-1/6 w-56 h-56 bg-pink-500/50 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
                 <div className="absolute top-1/5 right-1/5 w-48 h-48 bg-indigo-500/50 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
                 <div className="absolute top-2/5 left-1/8 w-52 h-52 bg-emerald-500/45 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.8s'}}></div>
                 <div className="absolute top-1/4 right-1/8 w-44 h-44 bg-orange-500/45 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2.2s'}}></div>
                 
                 {/* Ещё больше элементов в верхней части */}
                 <div className="absolute top-1/8 left-1/8 w-40 h-40 bg-violet-500/40 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.3s'}}></div>
                 <div className="absolute top-1/7 right-1/7 w-36 h-36 bg-rose-500/40 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.8s'}}></div>
                 <div className="absolute top-1/3 left-1/12 w-32 h-32 bg-teal-500/40 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.7s'}}></div>
                 <div className="absolute top-1/3 right-1/12 w-38 h-38 bg-amber-500/40 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.3s'}}></div>
                 <div className="absolute top-1/6 right-1/3 w-34 h-34 bg-lime-500/35 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2.5s'}}></div>
                 <div className="absolute top-1/5 left-1/3 w-42 h-42 bg-sky-500/40 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.9s'}}></div>
                 
                 {/* Дополнительные мелкие элементы для плотности в хедере (уменьшено) */}
                 <div className="absolute top-1/12 left-1/4 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.2s'}}></div>
                 <div className="absolute top-1/10 right-1/4 w-28 h-28 bg-purple-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1.2s'}}></div>
                 <div className="absolute top-1/8 left-1/2 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.6s'}}></div>
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
            </div>
            <div className="flex flex-col">
            <span className="text-xl font-bold itmo-heading text-slate-100">AI Помощник</span>
              <span className="text-xs text-slate-400 -mt-1">для поступления</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="#features" 
              className="text-slate-300 hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group"
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
              className="text-slate-300 hover:text-purple-400 transition-all duration-300 hover:scale-105 relative group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10">О проекте</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
            <Link 
              href="#contact" 
              className="text-slate-300 hover:text-cyan-400 transition-all duration-300 hover:scale-105 relative group"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="relative z-10">Контакты</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-2"></div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300">
                Войти
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="relative group overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Начать</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4">
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-slate-800/30 backdrop-blur-sm"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 text-sm px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-100 animate-fade-in-up">
              <Sparkles className="w-4 h-4 mr-2" />
              Новое поколение ИИ-помощников
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fade-in-up-delayed">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Умный выбор</span>
              <br />
              <span className="text-slate-200">вуза и специальности</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up-delayed-2">
              ИИ-помощник поможет проанализировать ваши результаты ЕГЭ, учтёт достижения и подберёт 
              подходящие варианты для поступления в вуз или колледж
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up-delayed-3">
              <Link href="/auth/register">
                <Button className="relative group overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:from-blue-600 hover:via-purple-600 hover:to-cyan-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg">
                  <span className="relative z-10 flex items-center space-x-3">
                    <Lightning className="w-5 h-5" />
                    <span>Начать анализ</span>
                    <ArrowRight className="w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Button>
              </Link>
              <Button 
                size="xl" 
                variant="outline" 
                className="w-full sm:w-auto hover:scale-105 transition-all duration-300 border-slate-500 text-slate-200 bg-slate-800/30 hover:text-white hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Узнать больше
              </Button>
            </div>
          </div>
          
          {/* Feature Cards */}
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="relative group bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-6 text-center relative z-10">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors itmo-heading">ИИ-анализ</h3>
                  <p className="itmo-text group-hover:text-slate-200 transition-colors">
                    Умный анализ результатов и достижений
                  </p>
                </CardContent>
              </Card>
              
              <Card className="relative group bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-6 text-center relative z-10">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors itmo-heading">Персональные рекомендации</h3>
                  <p className="itmo-text group-hover:text-slate-200 transition-colors">
                    Подбор идеальных вузов и специальностей
                  </p>
                </CardContent>
              </Card>
              
              <Card className="relative group bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardContent className="p-6 text-center relative z-10">
                  <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl group-hover:scale-110 transition-transform duration-300 group-hover:rotate-12"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors itmo-heading">Успешное поступление</h3>
                  <p className="itmo-text group-hover:text-slate-200 transition-colors">
                    Повышение шансов на поступление
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20 px-4">
        <div className="absolute inset-0 bg-slate-800/60 backdrop-blur-md border-t border-b border-slate-700/30"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Возможности
            </h2>
            <p className="text-xl itmo-text max-w-3xl mx-auto">
              Всё необходимое для успешного поступления
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="itmo-card rounded-xl p-6 hover-tilt cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors itmo-heading">Анализ ЕГЭ/ОГЭ</h3>
                  <p className="itmo-text group-hover:text-slate-200 transition-colors">
                    Детальный анализ результатов экзаменов с учётом проходных баллов
                  </p>
                </div>
              </div>
            </div>

            <div className="itmo-card rounded-xl p-6 hover-tilt cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors itmo-heading">Учёт достижений</h3>
                  <p className="itmo-text group-hover:text-slate-200 transition-colors">
                    Олимпиады, сертификаты, проекты - всё учитывается в анализе
                  </p>
                </div>
              </div>
            </div>

            <div className="itmo-card rounded-xl p-6 hover-tilt cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors itmo-heading">Подбор вузов</h3>
                  <p className="itmo-text group-hover:text-slate-200 transition-colors">
                    Интеллектуальный подбор подходящих учебных заведений
                  </p>
                </div>
              </div>
            </div>

            <div className="itmo-card rounded-xl p-6 hover-tilt cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-green-400 transition-colors itmo-heading">Для родителей</h3>
                  <p className="itmo-text group-hover:text-slate-200 transition-colors">
                    Отдельный доступ для отслеживания прогресса ребёнка
                  </p>
                </div>
              </div>
            </div>

            <div className="itmo-card rounded-xl p-6 hover-tilt cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-yellow-400 transition-colors itmo-heading">Быстрые результаты</h3>
                  <p className="itmo-text group-hover:text-slate-200 transition-colors">
                    Получите рекомендации за несколько минут
                  </p>
                </div>
              </div>
            </div>

            <div className="itmo-card rounded-xl p-6 hover-tilt cursor-pointer group">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors itmo-heading">Безопасность</h3>
                  <p className="itmo-text group-hover:text-slate-200 transition-colors">
                    Ваши данные защищены и не передаются третьим лицам
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 border-t border-b border-gray-700/20">
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Почему выбирают нас
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:bg-blue-500/20 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer group">
              <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors">Много</div>
              <div className="text-slate-300 group-hover:text-slate-200 transition-colors">Вузов и колледжей</div>
            </div>
            <div className="bg-purple-500/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:bg-purple-500/20 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer group">
              <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1 group-hover:text-purple-300 transition-colors">Разнообразность</div>
              <div className="text-slate-300 group-hover:text-slate-200 transition-colors">Специальностей</div>
            </div>
            <div className="bg-cyan-500/10 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:bg-cyan-500/20 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer group">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1 group-hover:text-cyan-300 transition-colors">Высокая</div>
              <div className="text-slate-300 group-hover:text-slate-200 transition-colors">Точность рекомендаций</div>
            </div>
            <div className="bg-emerald-500/10 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/20 hover:bg-emerald-500/20 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer group">
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors">24/7</div>
              <div className="text-slate-300 group-hover:text-slate-200 transition-colors">Доступность</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-4 border-t border-b border-slate-700/30">
        <div className="absolute inset-0 bg-slate-800/60 backdrop-blur-md"></div>
        
        {/* Анимированные светящиеся элементы для секции "О проекте" */}
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-blue-500/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/3 right-1/6 w-28 h-28 bg-purple-500/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.2s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-500/25 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute top-2/3 right-1/3 w-36 h-36 bg-pink-500/25 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.8s'}}></div>
        <div className="absolute top-1/5 left-1/2 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2.1s'}}></div>
        <div className="absolute top-3/4 right-1/5 w-30 h-30 bg-orange-500/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.3s'}}></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            О проекте
          </h2>
          <p className="text-lg md:text-xl font-light text-slate-200 max-w-4xl mx-auto leading-relaxed tracking-wide">
            AI Помощник — это современная платформа, которая использует искусственный интеллект 
            для помощи ученикам и родителям в выборе подходящего вуза и специальности. 
            Наша система анализирует результаты ЕГЭ, учитывает достижения и предоставляет 
            персонализированные рекомендации для успешного поступления.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm"></div>
        
        {/* Анимированные светящиеся элементы для CTA секции */}
        <div className="absolute top-1/4 left-1/5 w-28 h-28 bg-purple-500/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.7s'}}></div>
        <div className="absolute top-1/3 right-1/5 w-32 h-32 bg-pink-500/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-500/25 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.9s'}}></div>
        <div className="absolute top-2/3 right-1/4 w-30 h-30 bg-orange-500/25 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2.0s'}}></div>
        <div className="absolute top-1/6 left-1/2 w-26 h-26 bg-violet-500/25 rounded-full blur-xl animate-pulse" style={{animationDelay: '1.1s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-22 h-22 bg-rose-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.4s'}}></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Готовы найти свой идеальный вуз?
          </h2>
          <p className="text-lg md:text-xl font-light text-slate-200 mb-8 max-w-3xl mx-auto leading-relaxed tracking-wide">
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
      <footer id="contact" className="relative py-12 px-4 border-t border-slate-700/30">
        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-10">
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
