import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const {messages} = await request.json()

    try { 
         const response  = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama-3.1-70b-versatile',
            messages,
            temperature: 0.7,
            max_tokens: 1000
        }),
    })

    if(!response.ok){
        throw new Error(`Grop API error: ${response.statusText}`)
    }

    const data = await response.json()
    const aiMessage = data.choices[0].message.content

    }catch(error:any) {
        console.error('Grop API error', error)
        return NextResponse.json(
            {error: error.message || 'Failed To Get Ai Response'},
            {status: 500}

        )
    }

   
}