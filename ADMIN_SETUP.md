# Admin Dashboard Setup Guide

## Overview

Memora now includes a comprehensive admin dashboard for tracking visitors and managing customer inquiries. This guide walks you through the setup process.

## Features

- **Visitor Analytics**: Track daily, weekly, and total visitors
- **Inquiry Management**: View, filter, and manage customer inquiries
- **Dashboard Statistics**: Visual charts and metrics
- **Inquiry Status Tracking**: Mark inquiries as new, contacted, in-progress, completed, or archived
- **Search & Filter**: Find inquiries by name, email, or status
- **Real-time Data**: All data is tracked in real-time

## Prerequisites

1. Neon PostgreSQL database connected (already set up)
2. `.env.local` file with `DATABASE_URL`

## Setup Instructions

### 1. Run Database Migration

First, set up the database tables:

```bash
npm run migrate
# or
pnpm exec ts-node scripts/migrate.ts
```

This creates two tables:
- `visitors` - Tracks page visits
- `inquiries` - Stores contact form submissions

### 2. Access the Admin Dashboard

The admin dashboard is available at:
- **Login**: `http://localhost:3000/admin/login`
- **Dashboard**: `http://localhost:3000/admin`
- **Inquiries**: `http://localhost:3000/admin/inquiries`

### 3. Demo Credentials

For testing purposes, use these credentials:

```
Email: admin@memora.com
Password: admin123
```

⚠️ **Important**: In production, implement proper authentication using Better Auth or similar solution.

## How It Works

### Visitor Tracking

1. When a user visits the website, the `useTrackVisitor` hook logs the page visit
2. Data is sent to `/api/track-visitor` endpoint
3. Information stored includes:
   - IP Address
   - User Agent
   - Page URL
   - Referrer

### Inquiry Submission

1. User fills out the contact form with name, email, occasion, etc.
2. Form data is sent to `/api/contact` endpoint
3. Data is validated and stored in the `inquiries` table
4. Success message is shown to the user

### Admin Dashboard

The dashboard displays:

#### Overview Stats
- **Visitors Today**: Total page visits in the last 24 hours
- **Visitors This Week**: Total page visits in the last 7 days
- **Total Visitors**: All-time visitor count
- **New Inquiries**: Count of uncontacted inquiries

#### Charts
- **Weekly Activity**: Line chart showing visitors and inquiries over 7 days
- **Inquiry Status**: Pie chart showing distribution by status
- **Top Pages**: Bar chart of most visited pages

#### Inquiries Management
- List all inquiries with pagination
- Search by name or email
- Filter by status
- View detailed inquiry information
- Update inquiry status

## API Endpoints

### Public Endpoints

#### POST `/api/track-visitor`
Tracks a page visit.

**Request:**
```json
{
  "page": "/"
}
```

**Response:**
```json
{
  "success": true
}
```

#### POST `/api/contact`
Submits a contact form inquiry.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "occasion": "birthday",
  "theme": "minimalist",
  "deadline": "2024-03-15",
  "whatsapp": "+91 98765 43210",
  "notes": "Please make it colorful"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your inquiry has been received. We will contact you soon!",
  "id": 1
}
```

### Admin Endpoints (Requires Authentication)

#### GET `/api/admin/stats`
Fetches dashboard statistics.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "visitors": {
    "today": 45,
    "week": 320,
    "total": 1250
  },
  "inquiries": {
    "new": 5,
    "total": 42,
    "statusBreakdown": [
      { "status": "new", "count": 5 },
      { "status": "contacted", "count": 12 }
    ]
  },
  "topPages": [
    { "page": "/", "count": 450 }
  ]
}
```

#### GET `/api/admin/inquiries`
Fetches list of inquiries with pagination and filtering.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status
- `search` (optional): Search by name or email

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "occasion": "birthday",
      "theme": "minimalist",
      "deadline": "2024-03-15",
      "whatsapp": "+91 98765 43210",
      "notes": "Please make it colorful",
      "status": "new",
      "createdAt": "2024-03-10T10:30:00Z",
      "updatedAt": "2024-03-10T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "pages": 5
  }
}
```

#### PATCH `/api/admin/inquiries`
Updates an inquiry's status.

**Request:**
```json
{
  "id": 1,
  "status": "contacted"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "contacted",
    "updatedAt": "2024-03-10T11:00:00Z"
  }
}
```

## Environment Variables

Make sure your `.env.local` file contains:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
```

## Inquiry Statuses

- **new**: Newly submitted inquiry, not yet reviewed
- **contacted**: Admin has reached out to the customer
- **in-progress**: Project is being worked on
- **completed**: Project is complete
- **archived**: Inquiry archived or closed

## Security Considerations

### Current Implementation
- Simple Bearer token authentication (for demo)
- Rate limiting on contact form (5 requests per minute per IP)
- Input validation on all form fields
- SQL injection prevention via parameterized queries

### Production Recommendations
1. **Implement Proper Auth**: Use Better Auth or NextAuth.js with session management
2. **Database Authentication**: Use strong credentials and connection pools
3. **HTTPS Enforcement**: Always use HTTPS in production
4. **Rate Limiting**: Use Redis or similar for distributed rate limiting
5. **Data Encryption**: Encrypt sensitive data at rest
6. **Audit Logging**: Log all admin actions for compliance
7. **CORS Configuration**: Restrict API access to your domain

## Troubleshooting

### Migration Fails
- Ensure `DATABASE_URL` is correct
- Check database credentials
- Verify network connectivity to the database

### Admin Login Not Working
- Verify credentials (demo: admin@memora.com / admin123)
- Check browser localStorage for `adminAuthToken`
- Clear browser cache and try again

### No Visitor Data
- Verify tracking API endpoint is being called
- Check browser console for errors
- Ensure `useTrackVisitor` hook is imported in pages

### Inquiries Not Saving
- Check form validation errors
- Verify database connection
- Check API response in browser Network tab

## Database Schema

### visitors table
```sql
CREATE TABLE visitors (
  id SERIAL PRIMARY KEY,
  ip_address VARCHAR(45),
  user_agent TEXT,
  page VARCHAR(255),
  referrer TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX visitors_ip_idx ON visitors(ip_address);
CREATE INDEX visitors_page_idx ON visitors(page);
CREATE INDEX visitors_timestamp_idx ON visitors(timestamp);
```

### inquiries table
```sql
CREATE TABLE inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  occasion VARCHAR(255) NOT NULL,
  theme VARCHAR(255),
  deadline VARCHAR(255),
  whatsapp VARCHAR(20),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'new',
  source VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX inquiries_email_idx ON inquiries(email);
CREATE INDEX inquiries_status_idx ON inquiries(status);
CREATE INDEX inquiries_created_at_idx ON inquiries(created_at);
```

## Next Steps

1. Update the demo credentials in production
2. Implement proper authentication with Better Auth
3. Add email notifications when new inquiries arrive
4. Set up automated backup of your database
5. Monitor analytics and optimize based on visitor behavior

## Support

For issues or questions about the admin dashboard, refer to the API documentation above or check the console logs for error messages.
