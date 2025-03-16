"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { saveFeedback } from "@/app/actions/task-actions"

type FeedbackDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  taskId: string
  taskTitle: string
}

export function FeedbackDialog({ open, onOpenChange, taskId, taskTitle }: FeedbackDialogProps) {
  const [feedback, setFeedback] = useState("")
  const [feeling, setFeeling] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const combinedFeedback = feeling ? `Feeling: ${feeling}${feedback ? ` - ${feedback}` : ""}` : feedback

      await saveFeedback(taskId, combinedFeedback)
      setFeedback("")
      setFeeling("")
      onOpenChange(false)
    } catch (error) {
      console.error("Error saving feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>How did this make you feel?</DialogTitle>
          <DialogDescription>Share your experience with "{taskTitle}"</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <RadioGroup value={feeling} onValueChange={setFeeling}>
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Energized" id="energized" />
                <Label htmlFor="energized">Energized</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Accomplished" id="accomplished" />
                <Label htmlFor="accomplished">Accomplished</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Challenged" id="challenged" />
                <Label htmlFor="challenged">Challenged</Label>
              </div>
            </div>
          </RadioGroup>

          <div className="grid gap-2">
            <Label htmlFor="feedback">Additional thoughts (optional)</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share more about your experience..."
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Skip
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

