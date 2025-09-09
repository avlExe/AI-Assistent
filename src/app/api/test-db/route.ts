import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Динамический импорт Prisma
    const { prisma } = await import('@/lib/prisma')

    // Проверяем подключение к базе данных
    const userCount = await prisma.user.count()
    
    // Определяем тип базы данных
    const databaseUrl = process.env.DATABASE_URL || ''
    const isPostgreSQL = databaseUrl.includes('postgresql') || 
                        databaseUrl.includes('supabase') || 
                        databaseUrl.includes('postgres://') ||
                        databaseUrl.includes('postgresql://')

    return NextResponse.json({
      success: true,
      userCount,
      databaseType: isPostgreSQL ? 'PostgreSQL' : 'SQLite',
      databaseUrl: databaseUrl.substring(0, 20) + '...',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({ 
      error: 'Database connection failed',
      details: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
