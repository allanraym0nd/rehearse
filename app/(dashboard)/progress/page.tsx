'use client'

import { useEffect, useState } from 'react'
import { StatsOverview } from '@/components/progress/stats-overview'
import { ScoreChart } from '@/components/progress/score-chart'
import { WeakAreas } from '@/components/progress/weak-areas'

interface ProgressData { 
  totalInterviews: number
  averageScore: number
  totalDuration: number
  improvementRate: number
  scoreTrend: Array<{date: string, score: number}>
  weakAreas: Array<{area: string, count: number}>
}

export default function ProgressPage() { 
  const [data, setData] = useState<ProgressData | null>(null)
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {

    async function fetchProgress() { 
      try{ 
          const response = await fetch('api/progress')
          const progressData = await response.json()
          setData(progressData)
      }catch(error){
        console.error("Failed to fetch progress", error)

      } finally { 
        setIsLoading(false)
      }

  }
fetchProgress()
  },[])

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Progress</h1>
          <p className="text-muted-foreground mt-2">Loading your progress...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Progress</h1>
          <p className="text-muted-foreground mt-2">Failed to load progress data</p>
        </div>
      </div>
    )
  }


  return(
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-semibold tracking-tight">Progress</h1>
        <p className="text-muted-foreground mt-2">
          Track your improvement over time
        </p>
      </div>

      {/* Stats Overview */}
      <StatsOverview
        totalInterviews={data.totalInterviews}
        averageScore={data.averageScore}
        totalDuration={data.totalDuration}
        improvementRate={data.improvementRate}
      />

      {/* Score Trend Chart */}
      <ScoreChart data={data.scoreTrend} />

      {/* Weak Areas */}
      <WeakAreas weakAreas={data.weakAreas} />
    </div>

  )
  
}