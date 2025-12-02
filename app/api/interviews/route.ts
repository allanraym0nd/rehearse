import { createClient } from "@/lib/supabase/server";
import {NextResponse} from "next/server"

export default async function POST(request:Request) {
    const supabase = await createClient() 

    const {data: {user}} = await supabase.auth.getUser()
    if(!user){
        return NextResponse.json({error: 'Unauthorized'}, {status:401})
    }

    const {type,topic} = await request.json()

    const {data: interview,error} = await supabase
    .from('interviews')
    .insert({
        user_id:user.id,
        type,
        topic,
        status: 'in_progress'
    })
    .select()
    .single()

    if(error) {
        return NextResponse.json({error: error.message}, {status:500})
    }

    return NextResponse.json(interview)

}

export async function GET() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: interviews, error } = await supabase
    .from('interviews')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(interviews)
}