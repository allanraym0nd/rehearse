import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { generateFeedback } from '@/lib/ai/feedback-generator'
import { InterviewType } from '@/config/interview-types'

export async function POST(request: Request) { 
    const supabase  = await createClient()

    const {data: {user}} =  await supabase.auth.getUser()

    if(!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {interview_id} = await request.json()

    const {data:interview, error: interviewError} = await supabase 
        .from('interviews')
        .select('*')
        .eq('id', interview_id)
        .eq('user_id', user.id)
        .single()


    if (interviewError || !interview) {
    return NextResponse.json({ error: 'Interview not found' }, { status: 404 })
  }

  const { data: transcripts, error: transcriptError } = await supabase
    .from('transcripts')
    .select('*')
    .eq('interview_id', interview_id)
    .order('created_at', { ascending: true })

  if (transcriptError) {
    return NextResponse.json({ error: 'Failed to fetch transcript' }, { status: 500 })
  }


  const messages = transcripts?.map(t => ({
    role: t.role as 'ai' | 'user',
    content: t.content
  })) || []

  const feedbackData = await generateFeedback(
    interview.type as InterviewType, 
    interview.topic,
    messages,
    interview.duration_seconds || 0
  )

  const {data: feedback, error: feedbackError} = await supabase
    .from('feedback')
    .insert({
        interview_id,
        overall_score: feedbackData.overall_score,
        category_scores: feedbackData.category_scores,
        strengths: feedbackData.strengths,
        improvements: feedbackData.improvements,
        recommendations: feedbackData.recommendations,
        weak_areas: feedbackData.weak_areas,
    })
    .select()
    .single()

    if (feedbackError) {
    return NextResponse.json({ error: feedbackError.message }, { status: 500 })
    }

    return NextResponse.json(feedback)



    
}