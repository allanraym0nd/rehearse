import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";


export async function GET() {
    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser()
    if(!user) { 
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // get all completed interviews
    const {data: interviews, error:interviewsError} = await supabase
     .from('interviews')
     .select(`
      id,
      type,
      topic,
      status,
      created_at,
      duration_seconds
    `)
    .eq('user_id', user.id)
    .eq('status', 'completed')
    .order('created_at', {ascending: false})

    if (interviewsError) {
    return NextResponse.json({ error: interviewsError.message }, { status: 500 })
  }

  const interviewIds = interviews?.map(i => i.id) || []

  const { data: feedbacks } = await supabase
    .from('feedback')
    .select('interview_id, overall_score')
    .in('interview_id',interviewIds)


const interviewWithScores = interviews?.map(interview => ({
    ...interview,
    overallScore: feedbacks?.find(f => f.interview_id === interview.id)?.overall_score
}))

return NextResponse.json(interviewWithScores || [])


}