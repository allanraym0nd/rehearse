import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, TrendingUp, Clock, Target } from 'lucide-react'

interface StatsOverviewProps {
    totalInterviews: number
    averageScore: number
    totalDuration: number
    improvementRate: number
}

export function StatsOverview({
    totalInterviews,
    averageScore,
    totalDuration,
    improvementRate
}: StatsOverviewProps) {
    const formatDuration = (seconds: number) => {
        const hours = Math.floor(seconds/3600)
        const mins = Math.floor((seconds % 3600)/60)

        return `${hours}h ${mins}m`
    }

    const stats = [
    {
      label: 'Total Interviews',
      value: totalInterviews,
      icon: BarChart3,
      color: 'text-blue-500'
         },
    {
        label: 'Average Score',
        value: averageScore > 0 ? averageScore.toFixed(1) : '-',
        icon: Target,
        coloe: 'text-green-500'
    },
    {
      label: 'Practice Time',
      value: totalDuration > 0 ? formatDuration(totalDuration) : '—',
      icon: Clock,
      color: 'text-yellow-500'
    },
    {
      label: 'Improvement',
      value: improvementRate > 0 ? `+${improvementRate.toFixed(1)}` : '—',
      icon: TrendingUp,
      color: 'text-purple-500'
    }
    ]

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="transition-default hover:border-foreground/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-semibold mt-2">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
    )


}