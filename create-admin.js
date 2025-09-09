const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createAdmin() {
  try {
    console.log('🔐 Создаем админа...')
    
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash('password123', 10)
    
    // Создаем админа
    const admin = await prisma.user.upsert({
      where: { email: 'admin@ai-assistent.ru' },
      update: {
        name: 'Администратор',
        password: hashedPassword,
        role: 'ADMIN'
      },
      create: {
        email: 'admin@ai-assistent.ru',
        name: 'Администратор',
        password: hashedPassword,
        role: 'ADMIN',
      },
    })
    
    console.log('✅ Админ успешно создан!')
    console.log('📧 Email:', admin.email)
    console.log('👤 Имя:', admin.name)
    console.log('🔑 Пароль: password123')
    console.log('🎭 Роль:', admin.role)
    
  } catch (error) {
    console.error('❌ Ошибка при создании админа:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
