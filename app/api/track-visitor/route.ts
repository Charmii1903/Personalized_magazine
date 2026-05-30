// import { NextRequest, NextResponse } from 'next/server'
// import { db } from '@/lib/db'
// import { visitors } from '@/lib/schema'

// export async function POST(request: NextRequest) {
//   try {
//     const { page } = await request.json()

//     if (!page) {
//       return NextResponse.json(
//         { error: 'Page is required' },
//         { status: 400 }
//       )
//     }

//     const ipAddress = request.headers.get('x-forwarded-for') || 
//                      request.headers.get('x-real-ip') || 
//                      'unknown'
//     const userAgent = request.headers.get('user-agent') || ''
//     const referrer = request.headers.get('referer') || ''

//     await db.insert(visitors).values({
//       ipAddress,
//       userAgent,
//       page,
//       referrer,
//     })

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error('Visitor tracking error:', error)
//     return NextResponse.json(
//       { error: 'Failed to track visitor' },
//       { status: 500 }
//     )
//   }
// }
