import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET - получить простую аналитику без raw запросов
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
        users: [],
        reports: []
      }
    })
  } catch (error) {
    console.error('Error fetching simple analytics:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
