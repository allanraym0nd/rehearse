'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { INTERVIEW_TYPES, type InterviewType } from '@/config/interview-types'

export default function NewInterviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type') as InterviewType | null

   console.log('Setup page loaded, type:', typeParam) 
  
  const [selectedType, setSelectedType] = useState<InterviewType | null>(typeParam)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [isStarting, setIsStarting] = useState(false)

  useEffect(() => {
    if (typeParam && INTERVIEW_TYPES[typeParam]) {
      setSelectedType(typeParam)
    }
  }, [typeParam])

  const handleStart = async () => {
  if (!selectedType || !selectedTopic) return

  setIsStarting(true)

  try {
    console.log('Creating interview:', { type: selectedType, topic: selectedTopic })
    
    // Create interview in database
    const response = await fetch('/api/interviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: selectedType,
        topic: selectedTopic,
      }),
    })

    const data = await response.json()
    console.log('Full API response:', data)  // ← See what comes back
    console.log('ID from response:', data.id)  // ← Check specifically for id

    if (data.error) {
      throw new Error(data.error)
    }

    const { id } = data  // Extract id from data
    
    if (!id) {
      console.error('Response data:', data)  // ← Log the full response
      throw new Error('No interview ID returned')
    }
    
    // Redirect to interview page
    console.log('Redirecting to:', `/interview/${id}`)
    router.push(`/interview/${id}`)
  } catch (error) {
    console.error('Failed to start interview:', error)
    setIsStarting(false)
  }
}

  if (!selectedType) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <p className="text-muted-foreground">Invalid interview type</p>
      </div>
    )
  }

  const interviewTypeData = INTERVIEW_TYPES[selectedType]

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-4xl">{interviewTypeData.icon}</span>
            <CardTitle className="text-3xl">{interviewTypeData.title}</CardTitle>
          </div>
          <CardDescription className="text-base">
            Select a topic to begin your interview
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-base">Choose a topic:</Label>
            <div className="grid gap-3">
              {interviewTypeData.topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`
                    p-4 text-left rounded-md border-2 transition-default
                    ${selectedTopic === topic
                      ? 'border-foreground bg-secondary'
                      : 'border-border hover:border-foreground/50'
                    }
                  `}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard')}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleStart}
              disabled={!selectedTopic || isStarting}
              className="flex-1"
            >
              {isStarting ? 'Starting...' : 'Start Interview'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}