import { InterviewType } from '@/config/interview-types'

interface Message { 
    role: 'ai' | 'user'
    content: string
}

interface FeedbackResult {
    overall_score:number,
    category_scores: {
    technical: number
    communication: number
    problem_solving: number
    system_design?: number
  }
  strengths: string[]
  improvements: string[]
  recommendations: string[]
  weak_areas: string[]
}

export async function generateFeedback(
    type: InterviewType,
    topic: string,
    messages: Message[],
    duration: number
): Promise<FeedbackResult> { 
    const prompt = `You are an expert technical interviewer. Analyze this ${type.replace('_',' ')} interview and provide detailed feedback.

    Interview Topic: ${topic}
    Duration: ${Math.floor(duration / 60)} minutes
    Total Exchanges: ${messages.length}

    Conversation: 
    ${messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n')}

    Provide response in JSON format with: 
    {
    "overall_score": (number 0-10),
    "category_scores": {
        "technical": (0-10),
        "communication": (0-10),
        "problem_solving": (0-10)
    },
    "strengths": [3-5 specific things done well with details],
    "improvements": [3-5 specific areas to improve with details],
    "recommendations": [3-5 actionable next steps],
    "weak_areas": [2-4 topic keywords like "caching", "monitoring"]
    } 
    Be specific and reference actual moments from the conversation. Rate honestly but constructively. 
    IMPORTANT: Respond ONLY with valid JSON, no markdown formatting or code blocks.
    `

    try { 
        const response = await fetch('/api/groq', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                     { role: 'system', content: 'You are an expert technical interviewer providing feedback. Respond ONLY with valid JSON, no markdown formatting.' },
                     {role: 'user', content: prompt}
                ]
            }),
        }) 

        const data = await response.json()
    
        if (data.error) {
        throw new Error(data.error)
        }

        let cleanedMessage = data.message.trim()
        if(cleanedMessage.startsWith('```json')) {
            cleanedMessage = cleanedMessage.replace(/```json\n?/g, '').replace(/```\n?$/g, '')
        } else if(cleanedMessage.startsWith('```')) {
            cleanedMessage = cleanedMessage.replace(/```\n?/g, '')
        }

        const feedback = JSON.parse(cleanedMessage)
        console.log('Parsed feedback:', feedback)

        if (!feedback.overall_score || 
            !feedback.category_scores || 
            !feedback.strengths || 
            !feedback.improvements || 
            !feedback.recommendations || 
            !feedback.weak_areas) {
          console.error('Invalid feedback structure:', feedback)
          throw new Error('AI returned incomplete feedback')
        }
        return feedback
    }catch(error){
     console.error('Failed to generate feedback:', error)

    return {
      overall_score: 7.0,
      category_scores: {
        technical: 7,
        communication: 7,
        problem_solving: 7,
      },
      strengths: [
        'You participated in the interview and engaged with the questions',
        'You attempted to provide answers to the questions asked',
      ],
      improvements: [
        'Try to provide more detailed explanations of your thought process',
        'Consider discussing trade-offs and alternative approaches',
      ],
      recommendations: [
        'Practice more interviews to build confidence',
        'Review fundamental concepts related to this topic',
      ],
      weak_areas: ['practice_needed'],
    }
  }
 }   


