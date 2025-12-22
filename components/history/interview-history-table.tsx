'use client' 

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Interview {
    id: string
    type: string
    topic: string
    status: string
    created_at: string
    duration_seconds: number
    overall_score?: number
}

interface InterviewHistoryTableProps { 
    interviews: Interview[]
}

export function InterviewHistoryTable({interviews}: InterviewHistoryTableProps) { 
    const router = useRouter()

    if (interviews.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <p className="text-muted-foreground mb-4">No interviews yet</p>
          <Button onClick={() => router.push('/dashboard')}>
            Start Your First Interview
          </Button>
        </CardContent>
      </Card>
    )
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const getScoreColor = (score: number) => {
    if(!score) return 'text-muted foreground'
    if(score >= 8) return 'text-green-500'
    if(score >= 6) return 'text-yellow-500'
    return 'text-red-500'

  }

  return(
        <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="p-4 bg-secondary/30 rounded-lg border border-border hover:border-foreground/20 transition-default"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{interview.topic}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="capitalize">{interview.type.replace('_', ' ')}</span>
                    <span>•</span>
                    <span>{new Date(interview.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{formatDuration(interview.duration_seconds || 0)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {interview.overall_score && (
                    <div className="text-center">
                      <div className={`text-3xl font-bold ${getScoreColor(interview.overall_score)}`}>
                        {interview.overall_score.toFixed(1)}
                      </div>
                      <div className="text-xs text-muted-foreground">Score</div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/interview/${interview.id}/feedback`)}
                    >
                      View Feedback
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/interview/${interview.id}/review`)}
                    >
                      View Transcript
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  
  )
}