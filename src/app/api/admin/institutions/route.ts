import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - получить все вузы
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
    const type = searchParams.get('type') || ''

    const skip = (page - 1) * limit

    const where = {
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
          { direction: { contains: search, mode: 'insensitive' as const } }
        ]
      }),
      ...(type && { type })
    }

    const [institutions, total] = await Promise.all([
      prisma.institution.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: {
              programs: true,
              savedBy: true
            }
          }
        }
      }),
      prisma.institution.count({ where })
    ])

    return NextResponse.json({
      institutions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching institutions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - создать новый вуз
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, description, type, direction, minScore, website, logo } = await request.json()

    if (!name || !description || !type || !direction || minScore === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const institution = await prisma.institution.create({
      data: {
        name,
        description,
        type,
        direction,
        minScore: parseInt(minScore),
        website,
        logo
      },
      include: {
        _count: {
          select: {
            programs: true,
            savedBy: true
          }
        }
      }
    })

    return NextResponse.json(institution, { status: 201 })
  } catch (error) {
    console.error('Error creating institution:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
