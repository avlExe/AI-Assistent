import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// GET - тестовая аналитика
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Возвращаем тестовые данные
    return NextResponse.json({
      overview: {
        totalUsers: 5,
        totalInstitutions: 3,
        totalPrograms: 12,
        totalReports: 8,
        recentUsers: 2,
        recentInstitutions: 1,
        recentPrograms: 4,
        recentReports: 3
      },
      usersByRole: [
        { role: 'ADMIN', count: 1 },
        { role: 'STUDENT', count: 3 },
        { role: 'PARENT', count: 1 }
      ],
      institutionsByType: [
        { type: 'UNIVERSITY', count: 2 },
        { type: 'COLLEGE', count: 1 }
      ],
      topInstitutions: [
        { id: '1', name: 'МГУ', type: 'UNIVERSITY', programsCount: 8, savedCount: 15 },
        { id: '2', name: 'СПбГУ', type: 'UNIVERSITY', programsCount: 4, savedCount: 10 }
      ],
      userActivity: [
        { id: '1', name: 'Иван Иванов', role: 'STUDENT', createdAt: new Date(), reportsCount: 3, achievementsCount: 2, examResultsCount: 1, savedInstitutionsCount: 2 }
      ],
      monthlyStats: {
        users: [
          { month: '2024-09', count: 2 },
          { month: '2024-10', count: 3 }
        ],
        reports: [
          { month: '2024-09', count: 1 },
          { month: '2024-10', count: 2 }
        ]
      }
    })
  } catch (error) {
    console.error('Error in test analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
