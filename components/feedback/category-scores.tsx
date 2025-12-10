import { Card, CardContent } from '@/components/ui/card'

interface CategoryScores { 
    scores: {
        technical: number,
        communication: number,
        problem_solving: number
        system_design?: number
    }
}
export function CategoryScores({scores}: CategoryScores) { 

  type CategoryKey = keyof typeof scores // dynamically get all valid keys

    const categories = [
        { name: 'Technical Accuracy', key: 'technical' as const },
        { name: 'Communication', key: 'communication' as const },
        { name: 'Problem Solving', key: 'problem_solving' as const },
    ]

    if(scores.system_design !== undefined){
        categories.push({name: 'System Design', key: 'system_design'})

    }

        return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Category Breakdown</h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const score = scores[category.key]
          const scoreColor = score >= 8 ? 'text-green-500' : score >= 6 ? 'text-yellow-500' : 'text-red-500'
          
          return (
            <Card key={category.key} className="transition-default hover:border-foreground/20">
              <CardContent className="p-6 text-center">
                <div className="text-sm text-muted-foreground mb-2">{category.name}</div>
                <div className={`text-4xl font-bold ${scoreColor}`}>
                  {score?.toFixed(1) || 'N/A'}
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