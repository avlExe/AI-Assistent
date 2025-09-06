'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle, NeomorphicCard } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, NeomorphicInput } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  Send, 
  User, 
  Bot, 
  Loader2,
  FileText,
  TrendingUp,
  Target,
  BookOpen,
  Star
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  type?: 'analysis' | 'recommendation' | 'general'
}

export default function AssistantPage() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! Я ваш ИИ-помощник по поступлению. Я могу помочь вам:\n\n• Проанализировать результаты ЕГЭ/ОГЭ\n• Подобрать подходящие вузы и специальности\n• Дать рекомендации по подготовке\n• Оценить шансы на поступление\n\nЧто бы вы хотели узнать?',
      timestamp: new Date(),
      type: 'general'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Симуляция ответа ИИ
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const assistantResponse = generateAIResponse(input)
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantResponse.content,
        timestamp: new Date(),
        type: assistantResponse.type
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase()
    
    if (input.includes('егэ') || input.includes('экзамен') || input.includes('балл')) {
      return {
        content: `📊 **Анализ результатов ЕГЭ**

На основе ваших результатов:
• Математика: 85 баллов
• Информатика: 90 баллов  
• Русский язык: 88 баллов

**Общий балл: 263**

🎯 **Рекомендации:**
1. Ваши результаты позволяют претендовать на бюджетные места в топовых вузах
2. Особенно сильны в IT-направлениях
3. Рекомендую рассмотреть МФТИ, ИТМО, ВШЭ

Хотите получить детальный анализ по конкретным специальностям?`,
        type: 'analysis' as const
      }
    }
    
    if (input.includes('вуз') || input.includes('университет') || input.includes('колледж')) {
      return {
        content: `🏛️ **Подбор учебных заведений**

Исходя из ваших результатов и интересов, рекомендую:

**Топ-университеты:**
1. **МФТИ** - Прикладная математика и информатика
   - Проходной балл: 290
   - Ваши шансы: 85%

2. **ИТМО** - Программная инженерия  
   - Проходной балл: 280
   - Ваши шансы: 90%

3. **ВШЭ** - Прикладная математика
   - Проходной балл: 270
   - Ваши шансы: 95%

**Колледжи (запасной вариант):**
• Колледж информатики и программирования
• Московский колледж управления и права

Нужна помощь с подачей документов?`,
        type: 'recommendation' as const
      }
    }
    
    if (input.includes('подготовка') || input.includes('готовиться')) {
      return {
        content: `📚 **План подготовки**

**До экзаменов (если ещё не сдавали):**
1. **Математика** - решайте задачи повышенной сложности
2. **Информатика** - изучайте алгоритмы и программирование
3. **Русский язык** - тренируйте сочинения

**После получения результатов:**
1. Подайте документы в 5 вузов
2. Подготовьтесь к дополнительным испытаниям
3. Изучите программы обучения

**Полезные ресурсы:**
• Решу ЕГЭ
• ФИПИ
• Онлайн-курсы вузов

Есть вопросы по конкретным предметам?`,
        type: 'recommendation' as const
      }
    }
    
    return {
      content: `🤖 Я понимаю ваш вопрос. Для более точного ответа мне нужна дополнительная информация:

• Ваши результаты ЕГЭ/ОГЭ
• Интересующие специальности  
• Предпочтения по вузам
• Географические ограничения

Задайте более конкретный вопрос, и я дам детальный ответ!`,
      type: 'general' as const
    }
  }

  const quickActions = [
    {
      title: 'Анализ ЕГЭ',
      description: 'Проанализировать мои результаты',
      icon: TrendingUp,
      action: () => setInput('Проанализируй мои результаты ЕГЭ')
    },
    {
      title: 'Подбор вузов',
      description: 'Найти подходящие учебные заведения',
      icon: BookOpen,
      action: () => setInput('Подбери подходящие вузы для меня')
    },
    {
      title: 'План подготовки',
      description: 'Составить план подготовки',
      icon: Target,
      action: () => setInput('Составь план подготовки к поступлению')
    }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold gradient-text mb-2">
          ИИ-Помощник по поступлению
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Ваш персональный консультант для выбора вуза и специальности
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickActions.map((action, index) => (
          <NeomorphicCard 
            key={index} 
            className="p-4 cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={action.action}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{action.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
              </div>
            </div>
          </NeomorphicCard>
        ))}
      </div>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-6 h-6" />
            <span>Чат с ИИ-помощником</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-gradient-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' && (
                      <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString('ru-RU', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                    {message.role === 'user' && (
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Думаю...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <NeomorphicInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Задайте вопрос о поступлении..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                variant="gradient"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

