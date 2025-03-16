"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TaskCard } from "@/components/task-card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { generateDailyTasks } from "@/app/actions/task-actions"

export function DailyTasksDisplay() {
  const [tasks, setTasks] = useState<any[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null)
  const [completedCount, setCompletedCount] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true)
        const data = await generateDailyTasks()

        if (data) {
          setTasks(data)
          setCompletedCount(data.filter((task: any) => task.completed).length)
        }
      } catch (error) {
        console.error("Error loading tasks:", error)
        toast({
          title: "Error",
          description: "Failed to load today's tasks. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadTasks()

    // Check for shared content
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const sharedContent = urlParams.get("share")

      if (sharedContent) {
        toast({
          title: "Shared Content",
          description: decodeURIComponent(sharedContent),
        })

        // Remove the query parameter
        router.replace("/")
      }
    }
  }, [toast, router])

  const handleTaskUpdated = () => {
    if (tasks) {
      const updatedCompletedCount = tasks.filter((task) => task.completed).length
      setCompletedCount(updatedCompletedCount)
    }
  }

  const handleExpandTask = (taskId: string) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId)
  }

  if (loading) {
    return null // Suspense will handle loading state
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No tasks available</h3>
        <p className="text-muted-foreground mb-6">We couldn't find today's tasks.</p>
        <Button onClick={() => window.location.reload()}>Refresh</Button>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6">
        <div className="text-center">
          <p className="text-lg font-medium">
            {completedCount === 3
              ? "Amazing! You've completed all tasks today."
              : `${completedCount}/3 tasks completed`}
          </p>
          <div className="w-full bg-muted rounded-full h-2.5 mt-2 max-w-xs mx-auto">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <motion.div className="grid grid-cols-3 gap-6" layout>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            expanded={expandedTaskId === task.id}
            onToggleExpand={() => handleExpandTask(task.id)}
            onTaskUpdated={handleTaskUpdated}
          />
        ))}
      </motion.div>
    </>
  )
}

