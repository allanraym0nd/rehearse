export default async function callGroq(messages: Array<{role: string; content:string}>) {
    const response = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
        method: 'POST',
        headers: {
            'Authorization':`Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'llama-3.1-70b-versatile',
            messages,
            temperature: 0.7,
            max_tokens:1000
        }),

        
    })

    if(!response.ok){
        throw new Error(`Groq API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.choices[0].message.content

}