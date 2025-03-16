// app/actions/task-actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// Mock tasks for development
const defaultTasks = {
  belly: [
    {
      title: "Try a Mediterranean breakfast bowl",
      description: "Start your day with a nutritious Mediterranean breakfast bowl featuring Greek yogurt, honey, fresh berries, and a sprinkle of nuts and seeds for protein and healthy fats.",
      imageUrl: "/placeholder.svg?height=200&width=400&text=Mediterranean+Bowl",
      linkUrl: "https://example.com/recipe/mediterranean-bowl"
    },
    {
      title: "Make a colorful lunch salad",
      description: "Prepare a vibrant salad with at least 5 different colored vegetables, a lean protein source, and a simple olive oil and lemon dressing for a nutrient-dense lunch.",
      imageUrl: "/placeholder.svg?height=200&width=400&text=Colorful+Salad",
      linkUrl: "https://example.com/recipe/colorful-salad"
    }
  ],
  body: [
    {
      title: "15-minute mobility routine",
      description: "Take a short break for this 15-minute mobility routine that focuses on joint health and flexibility. Perfect for counteracting the effects of sitting at a desk.",
      imageUrl: "/placeholder.svg?height=200&width=400&text=Mobility+Routine",
      linkUrl: "https://example.com/workout/mobility-routine"
    },
    {
      title: "Take a 20-minute nature walk",
      description: "Step outside for a brief nature walk. Pay attention to your surroundings, breathe deeply, and appreciate the natural environment as you move your body.",
      imageUrl: "/placeholder.svg?height=200&width=400&text=Nature+Walk",
      linkUrl: "https://example.com/workout/nature-walk"
    }
  ],
  brain: [
    {
      title: "Listen to a thought-provoking podcast",
      description: "Expand your mind with this 20-minute podcast episode about creative problem-solving and how constraints can actually boost innovation in unexpected ways.",
      imageUrl: "/placeholder.svg?height=200&width=400&text=Podcast",
      linkUrl: "https://example.com/podcast/creative-constraints"
    },
    {
      title: "Spend 10 minutes on a puzzle",
      description: "Challenge your brain with a short puzzle session. Try a crossword, sudoku, or another brain game that makes you think differently.",
      imageUrl: "/placeholder.svg?height=200&width=400&text=Brain+Puzzle",
      linkUrl: "https://example.com/brain/puzzles"
    }
  ]
}

// For development, use a mock user ID
const MOCK_USER_ID = "user-123"

export async function generateDailyTasks() {
  // For development, return mock tasks
  const today = new Date().toISOString().split('T')[0]
  
  return [
    {
      id: "1",
      title: defaultTasks.belly[0].title,
      description: defaultTasks.belly[0].description,
      type: "belly",
      completed: false,
      date: today,
      user_id: MOCK_USER_ID,
      image_url: defaultTasks.belly[0].imageUrl,
      link_url: defaultTasks.belly[0].linkUrl
    },
    {
      id: "2",
      title: defaultTasks.body[0].title,
      description: defaultTasks.body[0].description,
      type: "body",
      completed: false,
      date: today,
      user_id: MOCK_USER_ID,
      image_url: defaultTasks.body[0].imageUrl,
      link_url: defaultTasks.body[0].linkUrl
    },
    {
      id: "3",
      title: defaultTasks.brain[0].title,
      description: defaultTasks.brain[0].description,
      type: "brain",
      completed: false,
      date: today,
      user_id: MOCK_USER_ID,
      image_url: defaultTasks.brain[0].imageUrl,
      link_url: defaultTasks.brain[0].linkUrl
    }
  ]
}

export async function completeTask(taskId: string, completed: boolean) {
  // For development, just return success
  console.log(`Task ${taskId} marked as ${completed ? 'completed' : 'incomplete'}`)
  return true
}

export async function saveFeedback(taskId: string, feedback: string) {
  // For development, just return success
  console.log(`Feedback saved for task ${taskId}: ${feedback}`)
  return true
}

export async function saveOnboardingPreferences(
  userId: string, 
  dietaryPreferences: string[], 
  fitnessLevel: string, 
  contentInterests: string[]
) {
  // For development, just return success
  console.log('Preferences saved:', { userId, dietaryPreferences, fitnessLevel, contentInterests })
  return true
}