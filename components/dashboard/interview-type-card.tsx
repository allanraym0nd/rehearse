import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface InterviewTypeCardProps {
  title: string
  description: string
  icon: string
  type: string
}

export function InterviewTypeCard({ title, description, icon, type }: InterviewTypeCardProps) {
  return (
    <Card className="transition-default hover:border-foreground/20">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-2">
          <span className="text-3xl">{icon}</span>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full transition-default">
          <Link href={`/interview/new?type=${type}`}>
            Start Interview
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}