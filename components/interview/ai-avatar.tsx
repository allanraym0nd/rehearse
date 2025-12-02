interface AiAvatarProps {
    isSpeaking: boolean
}

export function AiAvatar({isSpeaking}: AiAvatarProps) {
    return (
        <div className="bg-card border border-border rounded-lg p-6 text-center">
            <div className={`
                w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
                flex items-center justify-center text-4xl mb-4 transition-default
                ${isSpeaking ? 'animate-pulse scale-110' : 'scale-100'}
            `}>
                🤖
            </div>
            <h3 className="font-semibold mb-1">AI Interviewer</h3>
            <p className="text-sm text-muted-foreground">
                {isSpeaking ? 'Speaking...' : 'Listening'}
            </p>
     </div>
    )

}