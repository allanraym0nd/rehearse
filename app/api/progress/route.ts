import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient()

    const {data: {user}} = await supabase.auth.getUser()

    if(!user) {
        return NextResponse.json({error: 'Unauthorized'}, {status:401})
    }

    const {data: interviews, error:interviewsError} = await supabase
    .from('interviews')
    .select('id, created_at, duration_seconds, status')
    .eq('user_id',user.id)
    .eq('status', 'completed')
    .order('created_at',{ascending: true})

    if(interviewsError){
        return NextResponse.json({ error: interviewsError.message }, { status: 500 })
    }

    const interviewIds = interviews?.map(i => i.id) || []

    const {data: feedbacks, error: feedbacksError} = await supabase
    .from('feedback')
    .select('interview_id,overall_score,weak_areas, created_at')
    .in('interview_id', interviewIds)

    if (feedbacksError) {
    return NextResponse.json({ error: feedbacksError.message }, { status: 500 })
  }

  const totalInterviews = interviews?.length || 0
  const totalDuration = interviews?.reduce((sum, i) => sum + (i.duration_seconds || 0), 0) || 0

  const scores = feedbacks?.map(f => f.overall_score).filter(s => s != null)
  const averageScore = scores.length > 0 
  ? scores.reduce((sum,s) => sum + (s), 0) || 0 / scores.length : 0

  // Calculate improvement rate (last 3 vs first 3)
  const recentScores = scores.slice(-3)
  const oldScores = scores.slice(0, 3)
  const recentAvg = recentScores.length > 0 
    ? recentScores.reduce((sum, s) => sum + s, 0) / recentScores.length 
    : 0
  const oldAvg = oldScores.length > 0 
    ? oldScores.reduce((sum, s) => sum + s, 0) / oldScores.length 
    : 0
  const improvementRate = recentAvg - oldAvg

   // Build score trend data
   const scoreTrend = interviews?.map(interview => {
   const feedback = feedbacks?.find(f => f.interview_id === interview.id)
    return { 
        date: new Date(interview.created_at).toLocaleDateString('en-US', {month: 'short', day: 'numeric'}),
        score: feedback?.overall_score || 0
    }
  }).filter(item => item.score > 0) || []

  const weakAreasMap = new Map<string,number>()
  feedbacks?.forEach(feedback => {
    feedback.weak_areas?.forEach((area: string) => {
        weakAreasMap.set(area, (weakAreasMap.get(area) || 0) + 1)
    })
  })


  const weakAreas = Array.from(weakAreasMap.entries())
    .map(([Area,count]) => ({Area,count})) 
    .sort((a,b) => b.count - a.count)
    .slice(0,5)

return NextResponse.json({
    totalInterviews,
    averageScore,
    totalDuration,
    improvementRate,
    scoreTrend,
    weakAreas
})
}