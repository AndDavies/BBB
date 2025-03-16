import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Task = {
  id: string
  title: string
  description: string
  type: "belly" | "body" | "brain"
  completed: boolean
  feedback?: string
  date: string
  userId: string
  imageUrl?: string
  linkUrl?: string
}

export type UserPreferences = {
  id: string
  userId: string
  dietaryPreferences: string[]
  fitnessLevel: "beginner" | "intermediate" | "advanced"
  contentInterests: string[]
  createdAt: string
}

export async function getTodaysTasks(userId: string) {
  const today = new Date().toISOString().split("T")[0]

  const { data, error } = await supabase.from("tasks").select("*").eq("userId", userId).eq("date", today)

  if (error) {
    console.error("Error fetching tasks:", error)
    return null
  }

  return data as Task[]
}

export async function updateTaskCompletion(taskId: string, completed: boolean) {
  const { error } = await supabase.from("tasks").update({ completed }).eq("id", taskId)

  if (error) {
    console.error("Error updating task:", error)
    return false
  }

  return true
}

export async function saveTaskFeedback(taskId: string, feedback: string) {
  const { error } = await supabase.from("tasks").update({ feedback }).eq("id", taskId)

  if (error) {
    console.error("Error saving feedback:", error)
    return false
  }

  return true
}

export async function getUserPreferences(userId: string) {
  const { data, error } = await supabase.from("user_preferences").select("*").eq("userId", userId).single()

  if (error) {
    console.error("Error fetching user preferences:", error)
    return null
  }

  return data as UserPreferences
}

