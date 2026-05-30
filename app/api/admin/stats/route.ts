import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { visitors, inquiries } from '@/lib/schema'
import { sql, count, and, gte } from 'drizzle-orm'

async function checkAuth(request: NextRequest) {
  // For demo purposes, check for a simple auth header
  // In production, use proper session management
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

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

    // Get visitor counts
    const visitorCountToday = await db
      .select({ count: count() })
      .from(visitors)
      .where(gte(visitors.timestamp, today))
    
    const visitorCountWeek = await db
      .select({ count: count() })
      .from(visitors)
      .where(gte(visitors.timestamp, weekAgo))

    const totalVisitors = await db
      .select({ count: count() })
      .from(visitors)

    // Get inquiry counts
    const inquiryCountNew = await db
      .select({ count: count() })
      .from(inquiries)
      .where(sql`${inquiries.status} = 'new'`)

    const inquiryCountTotal = await db
      .select({ count: count() })
      .from(inquiries)

    // Get inquiry status breakdown
    const statusBreakdown = await db
      .select({
        status: inquiries.status,
        count: count(),
      })
      .from(inquiries)
      .groupBy(inquiries.status)

    // Get top pages
    const topPages = await db
      .select({
        page: visitors.page,
        count: count(),
      })
      .from(visitors)
      .groupBy(visitors.page)
      .orderBy(sql`count(*) DESC`)
      .limit(5)

    return NextResponse.json({
      visitors: {
        today: visitorCountToday[0]?.count || 0,
        week: visitorCountWeek[0]?.count || 0,
        total: totalVisitors[0]?.count || 0,
      },
      inquiries: {
        new: inquiryCountNew[0]?.count || 0,
        total: inquiryCountTotal[0]?.count || 0,
        statusBreakdown: statusBreakdown,
      },
      topPages: topPages,
    })
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
