import { Card, CardContent, CardDescription, CardHeader, CardTitle, GradientCard } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Target, 
  Users, 
  Award,
  TrendingUp,
  Shield,
  Heart,
  Lightbulb
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            О проекте
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            AI Помощник для Поступления — это инновационная платформа, которая использует 
            искусственный интеллект для помощи в выборе вуза и специальности.
          </p>
        </div>

        {/* Mission */}
        <GradientCard className="p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Наша миссия</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Помочь каждому ученику найти свой путь в образовании, используя современные 
              технологии для анализа способностей, интересов и возможностей поступления.
            </p>
          </div>
        </GradientCard>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <CardTitle>ИИ-анализ</CardTitle>
              <CardDescription>
                Умный анализ результатов ЕГЭ и достижений
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Наш ИИ учитывает множество факторов для точных рекомендаций
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Для всей семьи</CardTitle>
              <CardDescription>
                Отдельные интерфейсы для учеников и родителей
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Родители могут отслеживать прогресс своих детей
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Точные рекомендации</CardTitle>
              <CardDescription>
                Персональные советы по поступлению
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                95% точность в подборе подходящих вузов
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Актуальные данные</CardTitle>
              <CardDescription>
                Обновляемая база вузов и программ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Информация о проходных баллах и требованиях
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Безопасность</CardTitle>
              <CardDescription>
                Защита персональных данных
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Ваши данные в безопасности и не передаются третьим лицам
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Инновации</CardTitle>
              <CardDescription>
                Современные технологии в образовании
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Используем последние достижения ИИ для помощи студентам
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Наши достижения</h2>
            <p className="text-blue-100">
              Цифры, которые говорят сами за себя
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Вузов и колледжей</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Образовательных программ</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Точность рекомендаций</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Доступность сервиса</div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="text-center">
          <h2 className="text-3xl font-bold gradient-text mb-6">Команда проекта</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Над проектом работают опытные разработчики, педагоги и специалисты по ИИ, 
            объединённые общей целью — сделать образование более доступным и эффективным.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="text-gray-600 dark:text-gray-300">
              Сделано с любовью для будущих студентов
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

