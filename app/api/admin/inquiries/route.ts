import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { inquiries } from '@/lib/schema'
import { sql, desc } from 'drizzle-orm'

function checkAuth(request: NextRequest) {
  const auth = request.headers.get('authorization')
  if (!auth || !auth.startsWith('Bearer ')) {
    return false
  }
  return true
}

export async function GET(request: NextRequest) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let query = db.select().from(inquiries)

    // Apply filters
    const filters = []
    
    if (status && status !== 'all') {
      filters.push(sql`${inquiries.status} = ${status}`)
    }

    if (search) {
      filters.push(
        sql`${inquiries.name} ILIKE ${`%${search}%`} OR ${inquiries.email} ILIKE ${`%${search}%`}`
      )
    }

    if (filters.length > 0) {
      query = db
        .select()
        .from(inquiries)
        .where(sql`${filters.join(' AND ')}`)
    }

    // Get total count
    const countResult = await db
      .select({ count: sql`count(*)` })
      .from(inquiries)

    const total = Number((countResult[0] as any).count) || 0

    // Get paginated results
    const offset = (page - 1) * limit
    
    let finalQuery = db
      .select()
      .from(inquiries)
      .orderBy(desc(inquiries.createdAt))
      .limit(limit)
      .offset(offset)

    if (status && status !== 'all') {
      finalQuery = db
        .select()
        .from(inquiries)
        .where(sql`${inquiries.status} = ${status}`)
        .orderBy(desc(inquiries.createdAt))
        .limit(limit)
        .offset(offset)
    }

    if (search) {
      finalQuery = db
        .select()
        .from(inquiries)
        .where(
          sql`${inquiries.name} ILIKE ${`%${search}%`} OR ${inquiries.email} ILIKE ${`%${search}%`}`
        )
        .orderBy(desc(inquiries.createdAt))
        .limit(limit)
        .offset(offset)
    }

    const data = await finalQuery

    return NextResponse.json({
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Inquiries API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!checkAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      )
    }

    const validStatuses = ['new', 'contacted', 'in-progress', 'completed', 'archived']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const result = await db
      .update(inquiries)
      .set({ status, updatedAt: new Date() })
      .where(sql`${inquiries.id} = ${id}`)
      .returning()

    return NextResponse.json({
      success: true,
      data: result[0],
    })
  } catch (error) {
    console.error('Update inquiry error:', error)
    return NextResponse.json(
      { error: 'Failed to update inquiry' },
      { status: 500 }
    )
  }
}
