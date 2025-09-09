'use client'

export default function AdminTestPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold gradient-text mb-2">
        Тестовая страница админки
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Если вы видите эту страницу, значит навигация работает!
      </p>
      <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg">
        <p className="text-green-800 dark:text-green-200">
          ✅ Навигация работает корректно
        </p>
      </div>
    </div>
  )
}
