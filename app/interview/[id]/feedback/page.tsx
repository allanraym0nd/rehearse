'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ScoreDisplay } from '@/components/feedback/score-display'
import { CategoryScores } from '@/components/feedback/category-scores'
import { FeedbackSection } from '@/components/feedback/feedback-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Interview {
  id: string
  type: string
  topic: string
  duration_seconds: number,
  created_at: string
}

interface Feedback { 
    overall_score: number
    category_scores: {
        technical: number
        communication: number
        problem_solving: number
        system_design?: number
    }
    strengths: string[]
    improvements: string[]
    recommendations: string[]
    weak_areas: string[]
}

export default function FeedbackPage() { 
    const router = useRouter()
    const params = useParams()
    const interviewId = params.id as string

    const [interview,setInterview] = useState<Interview | null>(null)
    const [feedback,setFeedback] = useState<Feedback | null>(null)
    const [isLoading,setIsLoading] = useState(true)
    const [error,setError] = useState<string | null>(null)


 
  useEffect(() => {
    async function loadFeedback() {
      try {
        console.log('Loading feedback for interview:', interviewId)
        
        // Fetch interview details
        const interviewRes = await fetch(`/api/interviews/${interviewId}`)
        const interviewData = await interviewRes.json()

        console.log('Interview data:', interviewData)

        if (interviewData.error) {
          throw new Error(interviewData.error)
        }

        setInterview(interviewData)

        // Check if feedback already exists
        const feedbackCheckRes = await fetch(`/api/feedback/${interviewId}`)
        const existingFeedback = await feedbackCheckRes.json()

        console.log('Existing feedback check:', existingFeedback)

        if (existingFeedback && !existingFeedback.error) {
          console.log('Using existing feedback')
          setFeedback(existingFeedback)
        } else {
          // Generate new feedback
          console.log('Generating new feedback...')
          const feedbackRes = await fetch('/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ interview_id: interviewId }),
          })

          const newFeedback = await feedbackRes.json()
          console.log('New feedback received:', newFeedback)

          if (newFeedback.error) {
            throw new Error(newFeedback.error)
          }

          // Validate feedback has required fields before setting
          if (!newFeedback.overall_score || !newFeedback.category_scores) {
            console.error('Incomplete feedback received:', newFeedback)
            throw new Error('Incomplete feedback data')
          }

          setFeedback(newFeedback)
        }
      } catch (err: any) {
        console.error('Failed to load feedback:', err)
        setError(err.message || 'Failed to load feedback')
      } finally {
        setIsLoading(false)
      }
    }

    loadFeedback()
  }, [interviewId])

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds/60)
        const secs = seconds % 60
        return `${mins}m ${secs}s`

    }

    if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Analyzing your interview...</p>
        </div>
      </div>
    )
  }

  if (error || !interview || !feedback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-destructive">{error || 'Failed to load feedback'}</p>
          <Button onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold">Interview Feedback</h1>
          <p className="text-muted-foreground">{interview.topic}</p>
          <p className="text-sm text-muted-foreground capitalize">
            {interview.type.replace('_', ' ')} Interview
          </p>
        </div>

        {/* Overall Score */}
        <Card>
          <CardContent className="p-6">
            <ScoreDisplay score={feedback.overall_score} />
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardContent className="p-6">
            <CategoryScores scores={feedback.category_scores} />
          </CardContent>
        </Card>

        {/* Strengths */}
        <Card>
          <CardContent className="p-6">
            <FeedbackSection
              title="What You Did Well"
              icon="✅"
              items={feedback.strengths}
              type="positive"
            />
          </CardContent>
        </Card>

        {/* Improvements */}
        <Card>
          <CardContent className="p-6">
            <FeedbackSection
              title="Areas for Improvement"
              icon="⚠️"
              items={feedback.improvements}
              type="negative"
            />
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardContent className="p-6">
            <FeedbackSection
              title="Specific Recommendations"
              icon="💡"
              items={feedback.recommendations}
              type="neutral"
            />
          </CardContent>
        </Card>

      // Replace the Interview Stats section with this safer version:
{/* Interview Stats */}
<Card>
  <CardContent className="p-6">
    <h3 className="text-xl font-semibold mb-4">Interview Statistics</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <div className="text-sm text-muted-foreground">Duration</div>
        <div className="text-lg font-semibold">
          {interview?.duration_seconds ? formatDuration(interview.duration_seconds) : 'N/A'}
        </div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground">Date</div>
        <div className="text-lg font-semibold">
          {interview?.created_at ? new Date(interview.created_at).toLocaleDateString() : 'N/A'}
        </div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground">Weak Areas</div>
        <div className="text-lg font-semibold">
          {feedback?.weak_areas?.length || 0}
        </div>
      </div>
      <div>
        <div className="text-sm text-muted-foreground">Score</div>
        <div className="text-lg font-semibold">
          {feedback?.overall_score ? feedback.overall_score.toFixed(1) : 'N/A'}/10
        </div>
      </div>
    </div>
  </CardContent>
</Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => router.push('/dashboard')}
          >
            Start New Interview
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push(`/interview/${interviewId}/review`)}
          >
            View Transcript
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.print()}
          >
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
  
}