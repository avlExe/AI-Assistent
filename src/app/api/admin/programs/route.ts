import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - получить все программы
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''
    const faculty = searchParams.get('faculty') || ''
    const institutionId = searchParams.get('institutionId') || ''

    const skip = (page - 1) * limit

    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
          { faculty: { contains: search, mode: 'insensitive' as const } }
        ]
      }),
      ...(faculty && { faculty }),
      ...(institutionId && { institutionId })
    }

    const [programs, total] = await Promise.all([
      prisma.program.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          institution: {
            select: {
              id: true,
              name: true,
              type: true
            }
          }
        }
      }),
      prisma.program.count({ where })
    ])

    return NextResponse.json({
      programs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching programs:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - создать новую программу
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, description, faculty, requirements, exams, institutionId } = await request.json()

    if (!name || !description || !faculty || !requirements || !exams || !institutionId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Проверяем, существует ли вуз
    const institution = await prisma.institution.findUnique({
      where: { id: institutionId }
    })

    if (!institution) {
      return NextResponse.json({ error: 'Institution not found' }, { status: 404 })
    }

    const program = await prisma.program.create({
      data: {
        name,
        description,
        faculty,
        requirements,
        exams: JSON.stringify(exams),
        institutionId
      },
      include: {
        institution: {
          select: {
            id: true,
            name: true,
            type: true
          }
        }
      }
    })

    return NextResponse.json(program, { status: 201 })
  } catch (error) {
    console.error('Error creating program:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
