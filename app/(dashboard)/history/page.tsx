'use client'

import { useEffect, useState } from 'react'
import { InterviewHistoryTable } from '@/components/history/interview-history-table'

interface Interview { 
  id: string
  type: string
  topic: string
  status: string
  created_at: string
  duration_seconds: number
  overall_score?: number
}

export default function HistoryPage() { 
  const [interviews,setInterviews] = useState<Interview[]>([])
  const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch('/api/history')
        const data = await response.json()
        setInterviews(data)
      } catch (error) {
        console.error('Failed to fetch history:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [])

   if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">History</h1>
          <p className="text-muted-foreground mt-2">Loading your interviews...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Interview History</h1>
        <p className="text-muted-foreground mt-2">
          Review your past interviews and track your progress
        </p>
      </div>

      {/* Interview History Table */}
      <InterviewHistoryTable interviews={interviews} />
    </div>
  )
}