const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Настройка AI Помощника для Поступления...\n');

// Проверяем наличие Node.js
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js версия: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Node.js не найден. Установите Node.js 18+ с https://nodejs.org/');
  process.exit(1);
}

// Создаём .env.local если его нет
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Создание файла .env.local...');
  const envContent = `# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-${Math.random().toString(36).substring(2)}"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
`;
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Файл .env.local создан');
} else {
  console.log('✅ Файл .env.local уже существует');
}

// Устанавливаем зависимости
console.log('\n📦 Установка зависимостей...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Зависимости установлены');
} catch (error) {
  console.error('❌ Ошибка при установке зависимостей');
  process.exit(1);
}

// Исправляем уязвимости безопасности
console.log('\n🔒 Исправление уязвимостей безопасности...');
try {
  execSync('npm audit fix --force', { stdio: 'inherit' });
  console.log('✅ Уязвимости исправлены');
} catch (error) {
  console.log('⚠️ Некоторые уязвимости не удалось исправить автоматически');
}

// Инициализируем базу данных
console.log('\n🗄️ Инициализация базы данных...');
try {
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('✅ База данных создана');
} catch (error) {
  console.error('❌ Ошибка при создании базы данных');
  console.log('💡 Попробуйте запустить: npx prisma db push');
  process.exit(1);
}

// Заполняем тестовыми данными
console.log('\n🌱 Заполнение тестовыми данными...');
try {
  execSync('npx prisma db seed', { stdio: 'inherit' });
  console.log('✅ Тестовые данные добавлены');
} catch (error) {
  console.error('❌ Ошибка при заполнении тестовыми данными');
  process.exit(1);
}

console.log('\n🎉 Настройка завершена!');
console.log('\n📋 Следующие шаги:');
console.log('1. Запустите проект: npm run dev');
console.log('2. Откройте http://localhost:3000');
console.log('\n👥 Демо-аккаунты:');
console.log('• Админ: admin@ai-assistent.ru / password123');
console.log('• Студент: student@example.com / password123');
console.log('• Родитель: parent@example.com / password123');
console.log('\n📚 Документация: README.md');
console.log('\nУдачи в разработке! 🚀');
