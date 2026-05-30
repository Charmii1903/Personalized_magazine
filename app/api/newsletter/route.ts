import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

    // MAIL TO YOU
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NEWSLETTER_RECEIVER,
      subject: 'New Newsletter Subscriber',
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>New Subscriber 🎉</h2>
          <p><strong>Email:</strong> ${email}</p>
        </div>
      `,
    })

    // AUTO REPLY TO USER
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Memories & All ✨',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Thank you for subscribing 💌</h2>

          <p>
            Welcome to <strong>Memories & All</strong>.
          </p>

          <p>
            You’ll now receive updates about:
          </p>

          <ul>
            <li>New magazine designs</li>
            <li>Special discounts & offers</li>
            <li>Creative inspiration</li>
            <li>Festive sales</li>
          </ul>

          <p>
            We’re excited to have you here ✨
          </p>

          <p>
            — Memories & All
          </p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully',
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong',
      },
      { status: 500 }
    )
  }
}