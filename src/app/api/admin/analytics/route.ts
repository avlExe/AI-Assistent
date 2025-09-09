import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET - получить аналитику
export async function GET(request: NextRequest) {
  try {
    // Проверяем, что мы не в процессе сборки
    if (process.env.NODE_ENV === 'production' && !process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
    }

    // Дополнительная проверка для Vercel build
    if (process.env.VERCEL_ENV === 'preview' && !process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'Database not available in preview' }, { status: 503 })
    }

    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Динамический импорт Prisma
    const { prisma } = await import('@/lib/prisma')

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30' // дней

    const daysAgo = new Date()
    daysAgo.setDate(daysAgo.getDate() - parseInt(period))

    // Общая статистика
    const [
      totalUsers,
      totalInstitutions,
      totalPrograms,
      totalReports,
      recentUsers,
      recentInstitutions,
      recentPrograms,
      recentReports
    ] = await Promise.all([
      prisma.user.count(),
      prisma.institution.count(),
      prisma.program.count(),
      prisma.report.count(),
      prisma.user.count({
        where: { createdAt: { gte: daysAgo } }
      }),
      prisma.institution.count({
        where: { createdAt: { gte: daysAgo } }
      }),
      prisma.program.count({
        where: { createdAt: { gte: daysAgo } }
      }),
      prisma.report.count({
        where: { createdAt: { gte: daysAgo } }
      })
    ])

    // Статистика по ролям пользователей
    const usersByRole = await prisma.user.groupBy({
      by: ['role'],
      _count: { role: true }
    })

    // Статистика по типам вузов
    const institutionsByType = await prisma.institution.groupBy({
      by: ['type'],
      _count: { type: true }
    })

    // Топ вузов по количеству программ
    const topInstitutions = await prisma.institution.findMany({
      include: {
        _count: {
          select: {
            programs: true,
            savedBy: true
          }
        }
      },
      orderBy: {
        programs: {
          _count: 'desc'
        }
      },
      take: 10
    })

    // Статистика активности пользователей за последние дни
    const userActivity = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            reports: true,
            achievements: true,
            examResults: true,
            savedInstitutions: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 20
    })

    // Определяем тип базы данных по URL
    const databaseUrl = process.env.DATABASE_URL || ''
    const isPostgreSQL = databaseUrl.includes('postgresql') || 
                        databaseUrl.includes('supabase') || 
                        databaseUrl.includes('postgres://') ||
                        databaseUrl.includes('postgresql://')
    
    console.log('Database URL detected:', databaseUrl.substring(0, 20) + '...')
    console.log('Is PostgreSQL:', isPostgreSQL)
    
    // Статистика по месяцам (универсальная версия с fallback)
    let monthlyStats: any[] = [[], []]
    
    try {
      if (isPostgreSQL) {
        console.log('Using PostgreSQL queries')
        // PostgreSQL версия
        monthlyStats = await Promise.all([
          // Пользователи по месяцам
          prisma.$queryRaw`
            SELECT 
              to_char(created_at, 'YYYY-MM') as month,
              COUNT(*)::int as count
            FROM "User" 
            WHERE created_at >= NOW() - INTERVAL '12 months'
            GROUP BY to_char(created_at, 'YYYY-MM')
            ORDER BY month
          `,
          // Отчёты по месяцам
          prisma.$queryRaw`
            SELECT 
              to_char(created_at, 'YYYY-MM') as month,
              COUNT(*)::int as count
            FROM "Report" 
            WHERE created_at >= NOW() - INTERVAL '12 months'
            GROUP BY to_char(created_at, 'YYYY-MM')
            ORDER BY month
          `
        ])
        console.log('PostgreSQL queries successful')
      } else {
        console.log('Using SQLite queries')
        // SQLite версия
        monthlyStats = await Promise.all([
          // Пользователи по месяцам
          prisma.$queryRaw`
            SELECT 
              strftime('%Y-%m', created_at) as month,
              COUNT(*) as count
            FROM users 
            WHERE created_at >= datetime('now', '-12 months')
            GROUP BY strftime('%Y-%m', created_at)
            ORDER BY month
          `,
          // Отчёты по месяцам
          prisma.$queryRaw`
            SELECT 
              strftime('%Y-%m', created_at) as month,
              COUNT(*) as count
            FROM reports 
            WHERE created_at >= datetime('now', '-12 months')
            GROUP BY strftime('%Y-%m', created_at)
            ORDER BY month
          `
        ])
        console.log('SQLite queries successful')
      }
    } catch (rawQueryError) {
      console.error('Raw query failed:', rawQueryError)
      console.error('Error details:', {
        message: rawQueryError.message,
        code: rawQueryError.code,
        stack: rawQueryError.stack
      })
      
      // Fallback: получаем данные за последние 12 месяцев без группировки
      try {
        const twelveMonthsAgo = new Date()
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)
        
        const [recentUsers, recentReports] = await Promise.all([
          prisma.user.findMany({
            where: { createdAt: { gte: twelveMonthsAgo } },
            select: { createdAt: true }
          }),
          prisma.report.findMany({
            where: { createdAt: { gte: twelveMonthsAgo } },
            select: { createdAt: true }
          })
        ])
        
        // Простая группировка по месяцам в JavaScript
        const usersByMonth = recentUsers.reduce((acc, user) => {
          const month = user.createdAt.toISOString().substring(0, 7)
          acc[month] = (acc[month] || 0) + 1
          return acc
        }, {} as Record<string, number>)
        
        const reportsByMonth = recentReports.reduce((acc, report) => {
          const month = report.createdAt.toISOString().substring(0, 7)
          acc[month] = (acc[month] || 0) + 1
          return acc
        }, {} as Record<string, number>)
        
        monthlyStats = [
          Object.entries(usersByMonth).map(([month, count]) => ({ month, count })),
          Object.entries(reportsByMonth).map(([month, count]) => ({ month, count }))
        ]
        
        console.log('Fallback monthly stats generated successfully')
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError)
        monthlyStats = [[], []]
      }
    }

    return NextResponse.json({
      overview: {
        totalUsers,
        totalInstitutions,
        totalPrograms,
        totalReports,
        recentUsers,
        recentInstitutions,
        recentPrograms,
        recentReports
      },
      usersByRole: usersByRole.map(item => ({
        role: item.role,
        count: item._count.role
      })),
      institutionsByType: institutionsByType.map(item => ({
        type: item.type,
        count: item._count.type
      })),
      topInstitutions: topInstitutions.map(inst => ({
        id: inst.id,
        name: inst.name,
        type: inst.type,
        programsCount: inst._count.programs,
        savedCount: inst._count.savedBy
      })),
      userActivity: userActivity.map(user => ({
        id: user.id,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        reportsCount: user._count.reports,
        achievementsCount: user._count.achievements,
        examResultsCount: user._count.examResults,
        savedInstitutionsCount: user._count.savedInstitutions
      })),
      monthlyStats: {
        users: monthlyStats[0],
        reports: monthlyStats[1]
      }
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
