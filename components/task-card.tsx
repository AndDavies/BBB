"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Share2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { ShareDialog } from "@/components/share-dialog"
import { completeTask } from "@/app/actions/task-actions"

type Task = {
  id: string
  title: string
  description: string
  type: "belly" | "body" | "brain"
  completed: boolean
  feedback?: string
  date: string
  user_id: string
  image_url?: string
  link_url?: string
}

type TaskCardProps = {
  task: Task
  expanded: boolean
  onToggleExpand: () => void
  onTaskUpdated: () => void
}

export function TaskCard({ task, expanded, onToggleExpand, onTaskUpdated }: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(task.completed)
  const [showFeedback, setShowFeedback] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleCompletionChange = async (checked: boolean) => {
    try {
      setIsUpdating(true)
      setIsCompleted(checked)
      await completeTask(task.id, checked)
      onTaskUpdated()

      if (checked) {
        setShowFeedback(true)
      }
    } catch (error) {
      console.error("Error updating task:", error)
      setIsCompleted(!checked) // Revert UI state if there's an error
    } finally {
      setIsUpdating(false)
    }
  }

  const getTypeIcon = () => {
    switch (task.type) {
      case "belly":
        return "🍽️"
      case "body":
        return "💪"
      case "brain":
        return "🧠"
      default:
        return "📋"
    }
  }

  const getTypeLabel = () => {
    switch (task.type) {
      case "belly":
        return "Nourish your belly"
      case "body":
        return "Move your body"
      case "brain":
        return "Stimulate your brain"
      default:
        return "Task"
    }
  }

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`cursor-pointer ${expanded ? "col-span-3 md:col-span-1" : "col-span-1"}`}
        onClick={expanded ? undefined : onToggleExpand}
      >
        <Card
          className={`h-full overflow-hidden transition-all duration-300 ${isCompleted ? "border-green-500 dark:border-green-700" : ""}`}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getTypeIcon()}</span>
                <CardTitle>{getTypeLabel()}</CardTitle>
              </div>
              {isCompleted && <Check className="text-green-500" />}
            </div>
            <CardDescription>{task.title}</CardDescription>
          </CardHeader>

          {expanded && (
            <CardContent>
              <div className="space-y-4">
                {task.image_url && (
                  <div className="rounded-md overflow-hidden">
                    <img
                      src={task.image_url || "/placeholder.svg?height=200&width=400"}
                      alt={task.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                <p>{task.description}</p>
                {task.link_url && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={task.link_url} target="_blank" rel="noopener noreferrer">
                      View Details
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          )}

          {expanded && (
            <CardFooter className="flex justify-between pt-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`task-${task.id}`}
                  checked={isCompleted}
                  onCheckedChange={handleCompletionChange}
                  disabled={isUpdating}
                />
                <label
                  htmlFor={`task-${task.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {isCompleted ? "Completed" : "Mark as complete"}
                </label>
              </div>

              {isCompleted && (
                <Button variant="ghost" size="icon" onClick={() => setShowShare(true)}>
                  <Share2 className="h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          )}
        </Card>
      </motion.div>

      <FeedbackDialog open={showFeedback} onOpenChange={setShowFeedback} taskId={task.id} taskTitle={task.title} />

      <ShareDialog open={showShare} onOpenChange={setShowShare} task={task} />
    </>
  )
}

