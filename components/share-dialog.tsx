"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Task } from "@/lib/supabase"
import { Copy, Mail, MessageSquare } from "lucide-react"
import { useState } from "react"

type ShareDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task
}

export function ShareDialog({ open, onOpenChange, task }: ShareDialogProps) {
  const [copied, setCopied] = useState(false)

  const shareText = `I just completed "${task.title}" on Holistic Daily App! ${
    task.feedback ? `It made me feel: ${task.feedback}` : ""
  }`

  const shareUrl = `${window.location.origin}?share=${encodeURIComponent(shareText)}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSMS = () => {
    window.open(`sms:?body=${encodeURIComponent(shareText)}`)
  }

  const handleEmail = () => {
    window.open(`mailto:?subject=My Holistic Daily Task&body=${encodeURIComponent(shareText)}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share your accomplishment</DialogTitle>
          <DialogDescription>Let others know about your progress</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <Input value={shareText} readOnly />
            <Button size="icon" variant="outline" onClick={handleCopy}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {copied && <p className="text-sm text-green-500">Copied to clipboard!</p>}

          <div className="flex justify-center gap-4 pt-2">
            <Button onClick={handleSMS} variant="outline" className="flex gap-2">
              <MessageSquare className="h-4 w-4" />
              SMS
            </Button>
            <Button onClick={handleEmail} variant="outline" className="flex gap-2">
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

