'use client'

import { useState,useEffect } from "react"
import { Card,CardContent,CardTitle,CardHeader } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface Interview { 
  id: string,
  type: string,
  topic: string,
  created_at: string

}

interface Feedback  { 
  interview_id: string,
  overall_score: number,
  weak_areas: string[],
  created_at: string
}

interface Chartdata {
  date: string
  score: number
}

interface WeakAreaCount { 
  area: string,
  count: number
}

export default function ProgressPage() { 

}