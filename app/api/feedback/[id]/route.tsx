import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'


export async function GET(
    request: Request, 
    context: {params: Promise<{id: string}>}
) { 
    const supabase = await createClient() 

    const {data: {user}} = await supabase.auth.getUser() 

    if(!user) {
         return NextResponse.json({error: 'Unauthorized'}, {status: 401})
    } 
    
    const {id: interviewId} = await context.params
 
    // Check if interview belongs to user
    const {data: interview, error: interviewError} = await supabase
        .from('interviews')
        .select('*')
        .eq('id', interviewId)
        .eq('user_id', user.id)
        .single()

        if (interviewError || !interview) {
        return NextResponse.json({ error: 'Interview not found' }, { status: 404 })
        }

    const {data:feedback, error: feedbackError} = await supabase 
        .from('feedback')
        .select('*')
        .eq('interview_id', interviewId)
         .single()

        if (feedbackError) {
        return NextResponse.json({ error: 'Feedback not found' }, { status: 404 })
    }

    return NextResponse.json(feedback)




}