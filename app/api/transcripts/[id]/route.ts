import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request, context: {params: Promise<{id: string}>}) {
    const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const  {id: interviewId}  = await context.params
    
  // Verify interview belongs to user
  const { data: interview } = await supabase
    .from('interviews')
    .select('id')
    .eq('id',interviewId)
    .eq('user_id', user.id)
    .single()

  if (!interview) {
    return NextResponse.json({ error: 'Interview not found' }, { status: 404 })
  }

  // Get transcript
  const { data: transcripts, error } = await supabase
    .from('transcripts')
    .select('*')
    .eq('interview_id', interviewId)
    .order('created_at', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(transcripts)

}