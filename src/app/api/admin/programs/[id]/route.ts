import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - получить программу по ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const program = await prisma.program.findUnique({
      where: { id: params.id },
      include: {
        institution: {
          select: {
            id: true,
            name: true,
            type: true,
            website: true
          }
        }
      }
    })

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    // Парсим JSON строку exams
    const programWithParsedExams = {
      ...program,
      exams: JSON.parse(program.exams)
    }

    return NextResponse.json(programWithParsedExams)
  } catch (error) {
    console.error('Error fetching program:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - обновить программу
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, description, faculty, requirements, exams, institutionId } = await request.json()

    const updateData: any = {}
    
    if (name) updateData.name = name
    if (description) updateData.description = description
    if (faculty) updateData.faculty = faculty
    if (requirements) updateData.requirements = requirements
    if (exams) updateData.exams = JSON.stringify(exams)
    if (institutionId) updateData.institutionId = institutionId

    const program = await prisma.program.update({
      where: { id: params.id },
      data: updateData,
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

    return NextResponse.json(program)
  } catch (error) {
    console.error('Error updating program:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - удалить программу
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.program.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Program deleted successfully' })
  } catch (error) {
    console.error('Error deleting program:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
