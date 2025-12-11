import { Card, CardContent } from '@/components/ui/card'

interface CategoryScoresProps {
  scores: {
    technical: number
    communication: number
    problem_solving: number
    system_design?: number
  }
}

export function CategoryScores({ scores }: CategoryScoresProps) {
  const categories = [
    { name: 'Technical Accuracy', key: 'technical' as keyof typeof scores },
    { name: 'Communication', key: 'communication' as keyof typeof scores },
    { name: 'Problem Solving', key: 'problem_solving' as keyof typeof scores },
  ]

  if (scores.system_design !== undefined) {
    categories.push({ name: 'System Design', key: 'system_design' as keyof typeof scores })
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const score = scores[category.key]
          
          // Handle undefined scores
          if (score === undefined) return null
          
          const scoreColor = score >= 8 ? 'text-green-500' : score >= 6 ? 'text-yellow-500' : 'text-red-500'
          
          return (
            <Card key={category.key} className="transition-default hover:border-foreground/20">
              <CardContent className="p-6 text-center">
                <div className="text-sm text-muted-foreground mb-2">{category.name}</div>
                <div className={`text-4xl font-bold ${scoreColor}`}>
                  {score.toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground mt-1">/10</div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}