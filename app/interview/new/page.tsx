'use client'

import { useState,useEffect } from "react"
import { useRouter,useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card,CardDescription,CardContent,CardHeader,CardTitle } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label"
import { type InterviewType,INTERVIEW_TYPES } from "@/config/interview-types"
import { type } from "node:os"

export default function NewInterviewPage() {
    const router = useRouter() 
    const params = useSearchParams()
    const typeParam = params.get('type') as InterviewType | null

    const [selectedType,setSelectedType] = useState<InterviewType | null>(typeParam)
    const [selectedTopic,setSelectedTopic] = useState<string | null>(null)
    const [isStarting,setIsStarting] = useState(false)

    useEffect(() => {
        if(typeParam && INTERVIEW_TYPES[typeParam]){
            setSelectedType(typeParam)
        }

    }, [typeParam])

    const handleStart = async() => {
        if(!selectedType || !selectedTopic) return

        setIsStarting(true)

        try {
            const response = await fetch('api/interviews',{
                method: 'POST',
                headers: {
                    'Content-type': 'application.json'
                },
                body: JSON.stringify({
                    type:selectedType,
                    topic:selectedTopic
                }),
            })

            const {id} = await response.json()
            router.push(`/interview/${id}`)
        }catch(error){
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