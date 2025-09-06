import { Card, CardContent, CardDescription, CardHeader, CardTitle, NeomorphicCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, NeomorphicInput } from '@/components/ui/input'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Users
} from 'lucide-react'

export default function ContactsPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Контакты
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Свяжитесь с нами для получения поддержки или предложений по улучшению сервиса
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>
            <NeomorphicCard className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Имя
                    </label>
                    <NeomorphicInput
                      id="name"
                      type="text"
                      placeholder="Ваше имя"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <NeomorphicInput
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Тема
                  </label>
                  <NeomorphicInput
                    id="subject"
                    type="text"
                    placeholder="Тема сообщения"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    className="w-full rounded-xl bg-gray-100 dark:bg-gray-800 px-4 py-3 text-sm text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.1),inset_2px_2px_4px_rgba(0,0,0,0.1)] focus:shadow-[inset_-1px_-1px_2px_rgba(255,255,255,0.1),inset_1px_1px_2px_rgba(0,0,0,0.1)] transition-all duration-300 focus:outline-none resize-none"
                    placeholder="Ваше сообщение..."
                    required
                  />
                </div>
                
                <Button type="submit" variant="gradient" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Отправить сообщение
                </Button>
              </form>
            </NeomorphicCard>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Контактная информация</h2>
              <div className="space-y-6">
                <NeomorphicCard className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">support@ai-assistent.ru</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Отвечаем в течение 24 часов</p>
                    </div>
                  </div>
                </NeomorphicCard>

                <NeomorphicCard className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Телефон</h3>
                      <p className="text-gray-600 dark:text-gray-300">+7 (800) 123-45-67</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Бесплатная горячая линия</p>
                    </div>
                  </div>
                </NeomorphicCard>

                <NeomorphicCard className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Адрес</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Москва, ул. Примерная, д. 123
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Офис открыт с 9:00 до 18:00</p>
                    </div>
                  </div>
                </NeomorphicCard>

                <NeomorphicCard className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Время работы</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Пн-Пт: 9:00 - 18:00<br />
                        Сб-Вс: 10:00 - 16:00
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">МСК</p>
                    </div>
                  </div>
                </NeomorphicCard>
              </div>
            </div>

            {/* Quick Help */}
            <div>
              <h3 className="text-xl font-bold mb-4">Быстрая помощь</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="w-4 h-4 mr-3" />
                  Часто задаваемые вопросы
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-3" />
                  Онлайн-чат поддержки
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-3" />
                  Сообщество пользователей
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center gradient-text mb-8">
            Часто задаваемые вопросы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NeomorphicCard className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Как работает ИИ-помощник?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Наш ИИ анализирует ваши результаты ЕГЭ, достижения и интересы, 
                чтобы подобрать наиболее подходящие вузы и специальности.
              </p>
            </NeomorphicCard>

            <NeomorphicCard className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Безопасны ли мои данные?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Да, мы используем современные методы шифрования и не передаём 
                ваши персональные данные третьим лицам.
              </p>
            </NeomorphicCard>

            <NeomorphicCard className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Можно ли использовать сервис бесплатно?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Да, базовый функционал доступен бесплатно. Премиум-функции 
                доступны по подписке.
              </p>
            </NeomorphicCard>

            <NeomorphicCard className="p-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Как часто обновляется база вузов?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                База данных обновляется ежемесячно. Информация о проходных 
                баллах актуализируется после каждой приёмной кампании.
              </p>
            </NeomorphicCard>
          </div>
        </div>
      </div>
    </div>
  )
}

