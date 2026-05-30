'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { LogOut, Users, MessageSquare, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface Stats {
  visitors: {
    today: number
    week: number
    total: number
  }
  inquiries: {
    new: number
    total: number
    statusBreakdown: Array<{ status: string; count: number }>
  }
  topPages: Array<{ page: string; count: number }>
}

const COLORS = ['#D9BFA8', '#E6B8C3', '#8A8170', '#C4B5A0', '#D4A574']

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminAuthToken')
      if (!token) {
        router.push('/admin/login')
        return
      }
      fetchStats(token)
    }

    const fetchStats = async (token: string) => {
      try {
        const response = await fetch('/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('adminAuthToken')
            router.push('/admin/login')
            return
          }
          throw new Error('Failed to fetch stats')
        }

        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError('Failed to load dashboard')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuthToken')
    localStorage.removeItem('adminEmail')
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    )
  }

  const chartData = [
    { name: 'Mon', visitors: 120, inquiries: 5 },
    { name: 'Tue', visitors: 150, inquiries: 8 },
    { name: 'Wed', visitors: 180, inquiries: 6 },
    { name: 'Thu', visitors: 200, inquiries: 10 },
    { name: 'Fri', visitors: 220, inquiries: 12 },
    { name: 'Sat', visitors: 190, inquiries: 7 },
    { name: 'Sun', visitors: 160, inquiries: 4 },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Memora Admin</h1>
            <p className="text-sm text-muted-foreground">Dashboard & Analytics</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: 'Visitors Today',
              value: stats?.visitors.today || 0,
              icon: Users,
              color: 'bg-primary/10 text-primary',
            },
            {
              label: 'Visitors This Week',
              value: stats?.visitors.week || 0,
              icon: TrendingUp,
              color: 'bg-accent/10 text-accent',
            },
            {
              label: 'Total Visitors',
              value: stats?.visitors.total || 0,
              icon: Users,
              color: 'bg-secondary/10 text-secondary',
            },
            {
              label: 'New Inquiries',
              value: stats?.inquiries.new || 0,
              icon: AlertCircle,
              color: 'bg-destructive/10 text-destructive',
            },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg p-6 border border-border"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium mb-2">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-card rounded-lg p-6 border border-border"
          >
            <h2 className="text-lg font-display font-bold text-foreground mb-6">
              Weekly Activity
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#8A8170" opacity={0.2} />
                <XAxis stroke="#8A8170" />
                <YAxis stroke="#8A8170" />
                <Tooltip contentStyle={{ backgroundColor: '#F5F4F0', border: '1px solid #8A8170' }} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#D9BFA8" 
                  strokeWidth={2}
                  dot={{ fill: '#D9BFA8' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="inquiries" 
                  stroke="#E6B8C3" 
                  strokeWidth={2}
                  dot={{ fill: '#E6B8C3' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-lg p-6 border border-border"
          >
            <h2 className="text-lg font-display font-bold text-foreground mb-6">
              Inquiry Status
            </h2>
            {stats?.inquiries.statusBreakdown && (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={stats.inquiries.statusBreakdown}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                  >
                    {stats.inquiries.statusBreakdown.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </motion.div>
        </div>

        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-lg p-6 border border-border"
        >
          <h2 className="text-lg font-display font-bold text-foreground mb-6">
            Most Visited Pages
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.topPages || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#8A8170" opacity={0.2} />
              <XAxis stroke="#8A8170" />
              <YAxis stroke="#8A8170" />
              <Tooltip contentStyle={{ backgroundColor: '#F5F4F0', border: '1px solid #8A8170' }} />
              <Bar dataKey="count" fill="#D9BFA8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Inquiries CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 border border-primary/20 text-center"
        >
          <MessageSquare className="mx-auto mb-4 text-primary" size={32} />
          <h3 className="text-xl font-display font-bold text-foreground mb-2">
            Total Inquiries: {stats?.inquiries.total || 0}
          </h3>
          <p className="text-muted-foreground mb-6">
            Manage and respond to customer inquiries
          </p>
          <a
            href="/admin/inquiries"
            className="inline-block btn-primary"
          >
            View All Inquiries
          </a>
        </motion.div>
      </div>
    </main>
  )
}
