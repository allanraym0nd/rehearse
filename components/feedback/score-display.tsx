interface ScoreDisplayProps {
    score: number
    previousScore?: number
}

export function ScoreDisplay({score,previousScore}: ScoreDisplayProps) {
    const scoreDiff = previousScore ? score - previousScore : 0
    const scoreColor = score >= 8 ? 'text-green-500' : score >=6 ? 'text-yellow-500' : 'text-red-500'

    return (
        <div className="text-center py-8">
      <h2 className="text-lg text-muted-foreground mb-4">Overall Performance</h2>
      <div className={`text-8xl font-bold ${scoreColor} mb-4`}>
        {score.toFixed(1)}
      </div>
      <div className="text-3xl text-muted-foreground mb-4">/10</div>
      {previousScore && (
        <div className={`text-lg ${scoreDiff > 0 ? 'text-green-500' : scoreDiff < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
          {scoreDiff > 0 ? '↑' : scoreDiff < 0 ? '↓' : '='} {Math.abs(scoreDiff).toFixed(1)} from last interview
        </div>
      )}
    </div>
    )
 
}