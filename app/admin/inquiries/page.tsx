'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Filter, ChevronLeft, ChevronRight, CheckCircle, Clock, AlertCircle, Archive } from 'lucide-react'

interface Inquiry {
  id: number
  name: string
  email: string
  occasion: string
  theme?: string
  deadline?: string
  whatsapp?: string
  notes?: string
  status: string
  createdAt: string
}

interface PaginationData {
  data: Inquiry[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

const STATUS_CONFIG = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
  contacted: { label: 'Contacted', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  'in-progress': { label: 'In Progress', color: 'bg-purple-100 text-purple-800', icon: Clock },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  archived: { label: 'Archived', color: 'bg-gray-100 text-gray-800', icon: Archive },
}

export default function InquiriesPage() {
  const router = useRouter()
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [totalPages, setTotalPages] = useState(1)
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('adminAuthToken')
      if (!token) {
        router.push('/admin/login')
        return
      }
      fetchInquiries(token)
    }

    const fetchInquiries = async (token: string) => {
      try {
        setIsLoading(true)
        const params = new URLSearchParams({
          page: page.toString(),
          limit: '10',
          status: status !== 'all' ? status : '',
          search: search,
        })

        const response = await fetch(`/api/admin/inquiries?${params}`, {
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
          throw new Error('Failed to fetch inquiries')
        }

        const data: PaginationData = await response.json()
        setInquiries(data.data)
        setTotalPages(data.pagination.pages)
      } catch (err) {
        setError('Failed to load inquiries')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [page, status, search, router])

  const handleStatusChange = async (inquiryId: number, newStatus: string) => {
    const token = localStorage.getItem('adminAuthToken')
    if (!token) return

    try {
      const response = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: inquiryId, status: newStatus }),
      })

      if (!response.ok) throw new Error('Failed to update inquiry')

      const updated = await response.json()
      setInquiries(inquiries.map(i => i.id === inquiryId ? updated.data : i))
      setSelectedInquiry(updated.data)
    } catch (err) {
      console.error('Failed to update inquiry:', err)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <button
            onClick={() => router.push('/admin')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-4 transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Inquiries Management
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg p-6 border border-border mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-3 text-muted-foreground" size={20} />
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value)
                  setPage(1)
                }}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="text-right text-sm text-muted-foreground pt-3">
              {inquiries.length} inquiries
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inquiries List */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                <p className="text-muted-foreground">Loading inquiries...</p>
              </div>
            ) : error ? (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive">
                {error}
              </div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <p className="text-muted-foreground">No inquiries found</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {inquiries.map((inquiry, index) => {
                  const statusConfig = STATUS_CONFIG[inquiry.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.new
                  const StatusIcon = statusConfig.icon

                  return (
                    <motion.button
                      key={inquiry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedInquiry(inquiry)}
                      className={`w-full text-left bg-card rounded-lg p-4 border transition-all hover:border-primary ${
                        selectedInquiry?.id === inquiry.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{inquiry.name}</h3>
                          <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig.color}`}>
                          <StatusIcon size={14} />
                          {statusConfig.label}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {inquiry.occasion} • {new Date(inquiry.createdAt).toLocaleDateString()}
                      </p>
                    </motion.button>
                  )
                })}
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Details Panel */}
          {selectedInquiry ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24 h-fit bg-card rounded-lg p-6 border border-border"
            >
              <h3 className="text-lg font-display font-bold text-foreground mb-4">
                Inquiry Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    NAME
                  </label>
                  <p className="text-foreground">{selectedInquiry.name}</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    EMAIL
                  </label>
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="text-primary hover:underline"
                  >
                    {selectedInquiry.email}
                  </a>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    OCCASION
                  </label>
                  <p className="text-foreground">{selectedInquiry.occasion}</p>
                </div>

                {selectedInquiry.theme && (
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      THEME
                    </label>
                    <p className="text-foreground">{selectedInquiry.theme}</p>
                  </div>
                )}

                {selectedInquiry.deadline && (
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      DEADLINE
                    </label>
                    <p className="text-foreground">{selectedInquiry.deadline}</p>
                  </div>
                )}

                {selectedInquiry.whatsapp && (
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      WHATSAPP
                    </label>
                    <a
                      href={`https://wa.me/${selectedInquiry.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {selectedInquiry.whatsapp}
                    </a>
                  </div>
                )}

                {selectedInquiry.notes && (
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">
                      NOTES
                    </label>
                    <p className="text-foreground text-sm bg-background/50 p-3 rounded">
                      {selectedInquiry.notes}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">
                    DATE SUBMITTED
                  </label>
                  <p className="text-foreground">
                    {new Date(selectedInquiry.createdAt).toLocaleDateString()} at {new Date(selectedInquiry.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <label className="block text-xs font-semibold text-muted-foreground mb-3">
                    STATUS
                  </label>
                  <div className="space-y-2">
                    {Object.entries(STATUS_CONFIG).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => handleStatusChange(selectedInquiry.id, key)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                          selectedInquiry.status === key
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background border border-border text-foreground hover:border-primary'
                        }`}
                      >
                        {value.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="lg:sticky lg:top-24 h-fit bg-card rounded-lg p-6 border border-border text-center">
              <p className="text-muted-foreground">
                Select an inquiry to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
