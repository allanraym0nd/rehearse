'use client'

import { useEffect,useRef } from "react"
import { ScrollArea } from "../ui/scroll-area"

interface Message {
    role: 'ai' | 'user'
    content: string
    timestamp: string
}

interface TranscriptPanel {
    messages: Message[]
}

export function TranscriptPanel({messages}: TranscriptPanel) {

    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => { 
        if(scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }


    }, [messages])

return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold">Live Transcript</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {messages.length} messages
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div ref={scrollRef} className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              Start speaking to begin the conversation...
            </p>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`
                  p-3 rounded-lg border-l-4
                  ${message.role === 'ai' 
                    ? 'bg-secondary/50 border-l-blue-500' 
                    : 'bg-secondary/30 border-l-green-500'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold uppercase tracking-wide ${
                    message.role === 'ai' ? 'text-blue-500' : 'text-green-500'
                  }`}>
                    {message.role === 'ai' ? 'AI Interviewer' : 'You'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
)

}