import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface WeakArea {
    area: string
    count: number
}

interface WeakAreasProps { 
    weakAreas: WeakArea[]
}

export function WeakAreas({weakAreas}: WeakAreasProps) {
    if(weakAreas.length === 0) {
        return (
      <Card>
        <CardHeader>
          <CardTitle>Focus Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Complete interviews to identify areas for improvement</p>
        </CardContent>
      </Card>
    )
    }
    

    return (
    <Card>
      <CardHeader>
        <CardTitle>Focus Areas</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Topics you should practice more
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {weakAreas.map((area, index) => (
          <div
            key={index}
            className="p-3 bg-secondary/50 rounded-lg border-l-4 border-l-red-500"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium capitalize">{area.area.replace('_', ' ')}</span>
              <span className="text-sm text-muted-foreground">
                Mentioned in {area.count} {area.count === 1 ? 'interview' : 'interviews'}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )

}