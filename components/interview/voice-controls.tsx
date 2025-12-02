'use client'

import { Button } from '@/components/ui/button'
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react'

interface VoiceControlsProps {
  isListening: boolean
  isSpeaking: boolean
  transcript: string
  duration: number
  maxDuration: number
  onStartListening: () => void
  onStopListening: () => void
  onStopSpeaking: () => void
  onEndInterview: () => void
}

export function VoiceControls({
  isListening,
  isSpeaking,
  transcript,
  duration,
  maxDuration,
  onStartListening,
  onStopListening,
  onStopSpeaking,
  onEndInterview,
}: VoiceControlsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      {/* Voice Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={isListening ? onStopListening : onStartListening}
          className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-default
            ${isListening 
              ? 'bg-green-500 hover:bg-green-600 animate-pulse' 
              : 'bg-red-500 hover:bg-red-600'
            }
          `}
        >
          {isListening ? (
            <Mic className="h-8 w-8 text-white" />
          ) : (
            <MicOff className="h-8 w-8 text-white" />
          )}
        </button>

        <div className="flex-1 ml-6">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${isListening ? 'text-green-500' : 'text-muted-foreground'}`}>
              {isListening ? '● Listening...' : 'Click to speak'}
            </span>
            <span className="text-sm text-muted-foreground">
              {formatTime(duration)} / {formatTime(maxDuration)}
            </span>
          </div>

          {/* Waveform visualization */}
          {isListening && (
            <div className="flex items-center gap-1 h-10">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-green-500 rounded-full animate-wave"
                  style={{
                    height: `${Math.random() * 80 + 20}%`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Current transcript preview */}
          {transcript && (
            <div className="mt-2 p-2 bg-secondary rounded text-sm text-muted-foreground">
              {transcript.slice(-100)}...
            </div>
          )}
        </div>

        {isSpeaking && (
          <button
            onClick={onStopSpeaking}
            className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-default ml-4"
          >
            <VolumeX className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* End Interview Button */}
      <Button
        variant="destructive"
        onClick={onEndInterview}
        className="w-full"
      >
        End Interview
      </Button>
    </div>
  )
}