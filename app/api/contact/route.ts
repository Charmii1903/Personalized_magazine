import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { inquiries } from '@/lib/schema'

// Simple rate limiting (in production, use Redis or similar)
const rateLimitMap = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timeWindow = 60000 // 1 minute
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, [now])
    return false
  }

  const timestamps = rateLimitMap.get(ip)!
  const recentRequests = timestamps.filter(t => now - t < timeWindow)
  
  if (recentRequests.length >= 5) {
    return true
  }

  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)
  return false
}

export async function POST(request: NextRequest) {
  try {
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // Rate limiting
    if (isRateLimited(ipAddress)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, occasion, theme, deadline, whatsapp, notes } = body

    // Validation
    if (!name || !email || !occasion) {
      return NextResponse.json(
        { error: 'Name, email, and occasion are required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // WhatsApp validation (if provided)
    if (whatsapp && !/^\d{10,15}$/.test(whatsapp.replace(/\D/g, ''))) {
      return NextResponse.json(
        { error: 'Invalid WhatsApp number' },
        { status: 400 }
      )
    }

    // Insert inquiry
    const result = await db.insert(inquiries).values({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      occasion: occasion.trim(),
      theme: theme?.trim() || null,
      deadline: deadline?.trim() || null,
      whatsapp: whatsapp?.trim() || null,
      notes: notes?.trim() || null,
      status: 'new',
      source: 'website-contact-form',
    }).returning()

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your inquiry has been received. We will contact you soon!',
        id: result[0]?.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit inquiry. Please try again.' },
      { status: 500 }
    )
  }
}
