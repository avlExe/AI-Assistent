import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Начинаем заполнение базы данных...')

  // Создаем пользователей
  const hashedPassword = await bcrypt.hash('password123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ai-assistent.ru' },
    update: {},
    create: {
      email: 'admin@ai-assistent.ru',
      name: 'Администратор',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: 'Анна Петрова',
      password: hashedPassword,
      role: 'STUDENT',
    },
  })

  const parent = await prisma.user.upsert({
    where: { email: 'parent@example.com' },
    update: {},
    create: {
      email: 'parent@example.com',
      name: 'Мария Петрова',
      password: hashedPassword,
      role: 'PARENT',
    },
  })

  // Связываем родителя с учеником
  await prisma.parent.upsert({
    where: { parentId: parent.id },
    update: {},
    create: {
      parentId: parent.id,
      studentId: student.id,
    },
  })

  // Создаем вузы
  const institutions = [
    {
      name: 'МГУ им. М.В. Ломоносова',
      description: 'Московский государственный университет - ведущий вуз России',
      type: 'UNIVERSITY',
      direction: 'Гуманитарные науки',
      minScore: 280,
      website: 'https://www.msu.ru',
    },
    {
      name: 'МФТИ',
      description: 'Московский физико-технический институт',
      type: 'UNIVERSITY',
      direction: 'Технические науки',
      minScore: 290,
      website: 'https://mipt.ru',
    },
    {
      name: 'ВШЭ',
      description: 'Национальный исследовательский университет "Высшая школа экономики"',
      type: 'UNIVERSITY',
      direction: 'Экономика и управление',
      minScore: 270,
      website: 'https://www.hse.ru',
    },
    {
      name: 'МГИМО',
      description: 'Московский государственный институт международных отношений',
      type: 'UNIVERSITY',
      direction: 'Международные отношения',
      minScore: 285,
      website: 'https://mgimo.ru',
    },
    {
      name: 'СПбГУ',
      description: 'Санкт-Петербургский государственный университет',
      type: 'UNIVERSITY',
      direction: 'Универсальный',
      minScore: 275,
      website: 'https://spbu.ru',
    },
    {
      name: 'ИТМО',
      description: 'Университет ИТМО - ведущий вуз в области IT',
      type: 'UNIVERSITY',
      direction: 'Информационные технологии',
      minScore: 280,
      website: 'https://itmo.ru',
    },
    {
      name: 'МГТУ им. Н.Э. Баумана',
      description: 'Московский государственный технический университет',
      type: 'UNIVERSITY',
      direction: 'Технические науки',
      minScore: 270,
      website: 'https://bmstu.ru',
    },
    {
      name: 'РГУ нефти и газа им. И.М. Губкина',
      description: 'Российский государственный университет нефти и газа',
      type: 'UNIVERSITY',
      direction: 'Нефтегазовая отрасль',
      minScore: 260,
      website: 'https://gubkin.ru',
    },
    {
      name: 'Московский колледж управления и права',
      description: 'Среднее профессиональное образование',
      type: 'COLLEGE',
      direction: 'Управление и право',
      minScore: 200,
      website: 'https://mcup.ru',
    },
    {
      name: 'Колледж информатики и программирования',
      description: 'Среднее профессиональное образование в IT',
      type: 'COLLEGE',
      direction: 'Информационные технологии',
      minScore: 180,
      website: 'https://kip-college.ru',
    },
  ]

  for (const institutionData of institutions) {
    await prisma.institution.create({
      data: institutionData,
    })
  }

  // Получаем созданные вузы для создания программ
  const createdInstitutions = await prisma.institution.findMany()

  // Создаем программы
  const programs = [
    {
      name: 'Прикладная математика и информатика',
      description: 'Фундаментальная подготовка в области математики и программирования',
      faculty: 'Факультет вычислительной математики и кибернетики',
      requirements: 'Математика, Информатика, Русский язык',
      exams: JSON.stringify(['Математика', 'Информатика', 'Русский язык']),
      institutionId: createdInstitutions[0].id, // МГУ
    },
    {
      name: 'Физика',
      description: 'Теоретическая и экспериментальная физика',
      faculty: 'Физический факультет',
      requirements: 'Математика, Физика, Русский язык',
      exams: JSON.stringify(['Математика', 'Физика', 'Русский язык']),
      institutionId: createdInstitutions[1].id, // МФТИ
    },
    {
      name: 'Экономика',
      description: 'Экономическая теория и практика',
      faculty: 'Факультет экономических наук',
      requirements: 'Математика, Обществознание, Русский язык',
      exams: JSON.stringify(['Математика', 'Обществознание', 'Русский язык']),
      institutionId: createdInstitutions[2].id, // ВШЭ
    },
    {
      name: 'Международные отношения',
      description: 'Подготовка специалистов по международным отношениям',
      faculty: 'Факультет международных отношений',
      requirements: 'История, Иностранный язык, Русский язык',
      exams: JSON.stringify(['История', 'Иностранный язык', 'Русский язык']),
      institutionId: createdInstitutions[3].id, // МГИМО
    },
    {
      name: 'Программная инженерия',
      description: 'Разработка программного обеспечения',
      faculty: 'Факультет программной инженерии',
      requirements: 'Математика, Информатика, Русский язык',
      exams: JSON.stringify(['Математика', 'Информатика', 'Русский язык']),
      institutionId: createdInstitutions[5].id, // ИТМО
    },
  ]

  for (const programData of programs) {
    await prisma.program.create({
      data: programData,
    })
  }

  // Создаем результаты экзаменов для студента
  const examResults = [
    {
      subject: 'Математика',
      score: 85,
      examType: 'EGE',
      userId: student.id,
    },
    {
      subject: 'Информатика',
      score: 90,
      examType: 'EGE',
      userId: student.id,
    },
    {
      subject: 'Русский язык',
      score: 88,
      examType: 'EGE',
      userId: student.id,
    },
  ]

  for (const examData of examResults) {
    await prisma.examResult.create({
      data: examData,
    })
  }

  // Создаем достижения
  const achievements = [
    {
      title: 'Победитель олимпиады по информатике',
      description: '1 место в региональной олимпиаде по информатике',
      type: 'OLYMPIAD',
      userId: student.id,
    },
    {
      title: 'Сертификат по программированию',
      description: 'Сертификат о прохождении курса Python',
      type: 'CERTIFICATE',
      userId: student.id,
    },
  ]

  for (const achievementData of achievements) {
    await prisma.achievement.create({
      data: achievementData,
    })
  }

  // Создаем отчет
  await prisma.report.create({
    data: {
      title: 'Анализ поступления - Анна Петрова',
      content: 'На основе ваших результатов ЕГЭ и достижений, мы рекомендуем рассмотреть следующие направления...',
      recommendations: '1. Подать документы в МФТИ на программу "Прикладная математика и информатика"\n2. Рассмотреть ИТМО для программной инженерии\n3. Подготовиться к дополнительным испытаниям',
      userId: student.id,
    },
  })

  console.log('✅ База данных успешно заполнена!')
  console.log('👤 Админ: admin@ai-assistent.ru / password123')
  console.log('🎓 Студент: student@example.com / password123')
  console.log('👨‍👩‍👧‍👦 Родитель: parent@example.com / password123')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
