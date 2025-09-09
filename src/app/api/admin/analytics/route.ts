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

    // Общая статистика с обработкой ошибок
    let totalUsers = 0, totalInstitutions = 0, totalPrograms = 0, totalReports = 0
    let recentUsers = 0, recentInstitutions = 0, recentPrograms = 0, recentReports = 0

    try {
      const [
        totalUsersResult,
        totalInstitutionsResult,
        totalProgramsResult,
        totalReportsResult,
        recentUsersResult,
        recentInstitutionsResult,
        recentProgramsResult,
        recentReportsResult
      ] = await Promise.allSettled([
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

      totalUsers = totalUsersResult.status === 'fulfilled' ? totalUsersResult.value : 0
      totalInstitutions = totalInstitutionsResult.status === 'fulfilled' ? totalInstitutionsResult.value : 0
      totalPrograms = totalProgramsResult.status === 'fulfilled' ? totalProgramsResult.value : 0
      totalReports = totalReportsResult.status === 'fulfilled' ? totalReportsResult.value : 0
      recentUsers = recentUsersResult.status === 'fulfilled' ? recentUsersResult.value : 0
      recentInstitutions = recentInstitutionsResult.status === 'fulfilled' ? recentInstitutionsResult.value : 0
      recentPrograms = recentProgramsResult.status === 'fulfilled' ? recentProgramsResult.value : 0
      recentReports = recentReportsResult.status === 'fulfilled' ? recentReportsResult.value : 0
    } catch (error) {
      console.error('Error fetching basic counts:', error)
    }

    // Статистика по ролям пользователей
    let usersByRole = []
    try {
      usersByRole = await prisma.user.groupBy({
        by: ['role'],
        _count: { role: true }
      })
    } catch (error) {
      console.error('Error fetching users by role:', error)
    }

    // Статистика по типам вузов
    let institutionsByType = []
    try {
      institutionsByType = await prisma.institution.groupBy({
        by: ['type'],
        _count: { type: true }
      })
    } catch (error) {
      console.error('Error fetching institutions by type:', error)
    }

    // Топ вузов по количеству программ
    let topInstitutions = []
    try {
      topInstitutions = await prisma.institution.findMany({
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
    } catch (error) {
      console.error('Error fetching top institutions:', error)
    }

    // Статистика активности пользователей за последние дни
    let userActivity = []
    try {
      userActivity = await prisma.user.findMany({
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
    } catch (error) {
      console.error('Error fetching user activity:', error)
    }

    // Статистика по месяцам (для графиков) - PostgreSQL версия
    let monthlyStats = [[], []]
    try {
      const [usersResult, reportsResult] = await Promise.allSettled([
        // Пользователи по месяцам
        prisma.$queryRaw`
          SELECT 
            to_char("createdAt", 'YYYY-MM') as month,
            COUNT(*) as count
          FROM users 
          WHERE "createdAt" >= NOW() - INTERVAL '12 months'
          GROUP BY to_char("createdAt", 'YYYY-MM')
          ORDER BY month
        `,
        // Отчёты по месяцам
        prisma.$queryRaw`
          SELECT 
            to_char("createdAt", 'YYYY-MM') as month,
            COUNT(*) as count
          FROM reports 
          WHERE "createdAt" >= NOW() - INTERVAL '12 months'
          GROUP BY to_char("createdAt", 'YYYY-MM')
          ORDER BY month
        `
      ])
      
      monthlyStats[0] = usersResult.status === 'fulfilled' ? usersResult.value : []
      monthlyStats[1] = reportsResult.status === 'fulfilled' ? reportsResult.value : []
    } catch (error) {
      console.error('Error fetching monthly stats:', error)
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
