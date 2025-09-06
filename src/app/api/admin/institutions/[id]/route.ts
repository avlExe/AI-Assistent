import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - получить вуз по ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const institution = await prisma.institution.findUnique({
      where: { id: params.id },
      include: {
        programs: {
          select: {
            id: true,
            name: true,
            faculty: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' },
          take: 5
        },
        _count: {
          select: {
            programs: true,
            savedBy: true
          }
        }
      }
    })

    if (!institution) {
      return NextResponse.json({ error: 'Institution not found' }, { status: 404 })
    }

    return NextResponse.json(institution)
  } catch (error) {
    console.error('Error fetching institution:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - обновить вуз
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, description, type, direction, minScore, website, logo } = await request.json()

    const updateData: any = {}
    
    if (name) updateData.name = name
    if (description) updateData.description = description
    if (type) updateData.type = type
    if (direction) updateData.direction = direction
    if (minScore !== undefined) updateData.minScore = parseInt(minScore)
    if (website !== undefined) updateData.website = website
    if (logo !== undefined) updateData.logo = logo

    const institution = await prisma.institution.update({
      where: { id: params.id },
      data: updateData,
      include: {
        _count: {
          select: {
            programs: true,
            savedBy: true
          }
        }
      }
    })

    return NextResponse.json(institution)
  } catch (error) {
    console.error('Error updating institution:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - удалить вуз
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.institution.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Institution deleted successfully' })
  } catch (error) {
    console.error('Error deleting institution:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
