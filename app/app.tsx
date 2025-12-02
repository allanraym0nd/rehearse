import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-6xl font-semibold tracking-tight">
          Rehearse
        </h1>
        <p className="text-xl text-muted-foreground">
          Practice technical interviews with AI-powered feedback and improve your skills
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/signup">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}