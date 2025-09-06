import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json()

    // Валидация
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Все поля обязательны' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Пароль должен содержать минимум 6 символов' },
        { status: 400 }
      )
    }

    // Проверка существования пользователя
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Пользователь с таким email уже существует' },
        { status: 400 }
      )
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10)

    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'STUDENT',
      }
    })

    return NextResponse.json(
      { message: 'Пользователь успешно создан', userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}

