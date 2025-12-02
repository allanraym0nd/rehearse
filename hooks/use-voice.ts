'use client'

import { useState,useEffect,useRef,useCallback } from "react"; 

interface UseVoiceReturn {
    isListening: boolean,
    isSpeaking: boolean,
    transcript: string,
    startListening: () => void
    stopListening: () => void
    speak: (text: string) => void
    stopSpeaking: () => void
    resetTranscript: () => void

}

export function useVoice(): UseVoiceReturn {
    const [isListening,setIsListening] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [transcript, setTranscript] = useState('')

    const recognitionRef = useRef<any>(null)
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

    useEffect(()=> {
        if(typeof window != 'undefined' && ('webKitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
            const speechRecognition =  (window as any).webKitSpeechRecognition || (window as any).speechRecognition
            recognitionRef.current = new speechRecognition()
            recognitionRef.current.continous = true
            recognitionRef.current.interimResults = true
            recognitionRef.current.lang = 'en-US'

            recognitionRef.current.onResult = (event:any) => {
                let interimTranscript = ''
                let finalTranscript = ''

                for(let i = event.resultIndex; i < event.results.length; i++){
                    const transcriptPiece = event.results[i][0].transcript
                    if(event.results[i].isFinal){
                        finalTranscript = transcriptPiece + ''
                    } else {
                        interimTranscript += transcriptPiece
                    } 
                    
                }
                setTranscript((prev) => prev + finalTranscript )
            }

            

        }

        recognitionRef.current.onerror = (event:any) => {
            console.error('Speech recognition error:',  event.error)
            setIsListening(false)

        recognitionRef.current.onend = (event:any) => {
             setIsListening(false)
        }

     }

     return () => {
        if(recognitionRef.current){
            recognitionRef.current.stop()
        }
     }

    },[])

    const startListening = useCallback(() => {
        if(recognitionRef.current && !isListening){
            setTranscript('')
            recognitionRef.current.start()
            setIsListening(true)
        }

    },[isListening])

    const stopListening = useCallback(() => {
        if(recognitionRef.current && isListening){
            recognitionRef.current.stop()
            setIsListening(false)
        }

    },[isListening])

    const speak = useCallback((text:string) => {
        if('speechSynthesis' in window) {
            window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.9
        utterance.pitch = 1
        utterance.volume = 1 
        
        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)

        utteranceRef.current = utterance
        window.speechSynthesis.speak(utterance)

        }

    },[])

    const stopSpeaking = () => {
        if('speechSynthesis' in window) {
            window.speechSynthesis.cancel()
            setIsSpeaking(false)
        }

    }

    const resetTranscript = useCallback(() => {
        setTranscript('')
    }, [])

    return {
        isListening,
        isSpeaking,
        transcript,
        startListening,
        stopListening,
        speak,
        stopSpeaking,
        resetTranscript,
    }

}