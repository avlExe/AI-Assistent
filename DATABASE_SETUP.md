# Настройка базы данных

## Обзор

Проект поддерживает две конфигурации базы данных:
- **Локальная разработка**: SQLite (файл `prisma/dev.db`)
- **Продакшн**: PostgreSQL (Supabase)

## Переключение между базами данных

### Для локальной разработки (SQLite)
```bash
npm run db:local
```

### Для продакшена (PostgreSQL)
```bash
npm run db:prod
```

## Настройка переменных окружения

### Локальная разработка
Создайте файл `.env.local`:
```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Продакшн
Настройте переменные окружения в Vercel/другом хостинге:
```env
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="your-production-secret"
NEXT_PUBLIC_APP_URL="https://your-app.vercel.app"
```

## Команды для работы с базой данных

```bash
# Генерация Prisma клиента
npx prisma generate

# Применение изменений схемы
npx prisma db push

# Заполнение тестовыми данными
npm run db:seed

# Открытие Prisma Studio
npm run db:studio
```

## Тестовые пользователи

После выполнения `npm run db:seed`:

- **Администратор**: `admin@ai-assistent.ru` / `password123`
- **Студент**: `student@example.com` / `password123`
- **Родитель**: `parent@example.com` / `password123`

## Структура файлов

- `prisma/schema.prisma` - основная схема (автоматически переключается)
- `prisma/schema.sqlite.prisma` - схема для SQLite
- `prisma/schema.prisma.bak` - резервная копия PostgreSQL схемы
- `prisma/dev.db` - файл SQLite базы данных

## Устранение проблем

### Ошибка "operation not permitted"
Если возникает ошибка прав доступа при генерации Prisma клиента:
1. Остановите dev сервер
2. Выполните `npx prisma generate`
3. Запустите dev сервер снова

### Ошибка подключения к базе данных
1. Проверьте переменную `DATABASE_URL` в `.env.local`
2. Убедитесь, что выполнили `npm run db:local` для SQLite
3. Проверьте, что база данных существует и доступна
