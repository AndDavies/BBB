// app/page.tsx
import { Suspense } from "react"
import { DailyTasksDisplay } from "@/components/daily-tasks-display"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Today's Focus</h2>
          <p className="text-muted-foreground">What if you only had to take care of 3 things in a day?</p>
        </div>
        
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-[200px] w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        }>
          <DailyTasksDisplay />
        </Suspense>
      </div>
    </div>
  )
}