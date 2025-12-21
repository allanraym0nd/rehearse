'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ScoreChartProps { 
    data: Array<{
        date: string 
        score:number}>
}

export function ScoreChart({data}: ScoreChartProps) {
    if(data.length === 0) { 
       return (
      <Card>
        <CardHeader>
          <CardTitle>Score Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No interview data yet. Complete some interviews to see your progress!</p>
        </CardContent>
      </Card>
    )      
    }

return (
    <Card>
      <CardHeader>
        <CardTitle>Score Trend Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="date" 
              stroke="#888"
              tick={{ fill: '#888' }}
            />
            <YAxis 
              domain={[0, 10]}
              stroke="#888"
              tick={{ fill: '#888' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                border: '1px solid #333',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#60a5fa" 
              strokeWidth={2}
              dot={{ fill: '#60a5fa', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
    )

}
