// Replace with your actual Grok model import
// import { grok } from '@ai-sdk/grok'

export type GrokResponse = {
  text: string
  sources?: {
    title: string
    url: string
  }[]
}

export async function askGrok(question: string): Promise<GrokResponse> {
  try {
    // This is a placeholder for when you have actual Grok API access
    // In a real implementation, you would use something like:

    /*
    const { text } = await generateText({
      model: grok("grok-1"),
      prompt: question,
      maxTokens: 500,
    });

    // Parse sources from the response if available
    // This would depend on how Grok formats its responses
    const sources = []; // Extract from response

    return {
      text,
      sources
    };
    */

    // For now, use mock responses
    const responses: Record<string, GrokResponse> = {
      default: {
        text: "I'm here to help you with your holistic wellness journey. What would you like to know about nutrition, fitness, or mental stimulation?",
      },
      nutrition: {
        text: "Nutrition is a key component of holistic wellness. Focus on whole foods, plenty of vegetables, lean proteins, and healthy fats. Stay hydrated and be mindful of portion sizes.",
        sources: [{ title: "Nutrition Basics", url: "https://example.com/nutrition" }],
      },
      workout: {
        text: "Regular physical activity is essential for overall health. Aim for a mix of cardio, strength training, and flexibility exercises. Even short workouts can be beneficial if done consistently.",
        sources: [{ title: "Fitness Guidelines", url: "https://example.com/fitness" }],
      },
      meditation: {
        text: "Meditation can help reduce stress, improve focus, and promote emotional well-being. Start with just 5 minutes a day and gradually increase the duration as you become more comfortable with the practice.",
        sources: [{ title: "Meditation Guide", url: "https://example.com/meditation" }],
      },
    }

    // Simple keyword matching for demo purposes
    if (
      question.toLowerCase().includes("nutrition") ||
      question.toLowerCase().includes("food") ||
      question.toLowerCase().includes("eat")
    ) {
      return responses.nutrition
    } else if (
      question.toLowerCase().includes("workout") ||
      question.toLowerCase().includes("exercise") ||
      question.toLowerCase().includes("fitness")
    ) {
      return responses.workout
    } else if (
      question.toLowerCase().includes("meditation") ||
      question.toLowerCase().includes("mindfulness") ||
      question.toLowerCase().includes("stress")
    ) {
      return responses.meditation
    }

    return responses.default
  } catch (error) {
    console.error("Error calling Grok API:", error)
    return {
      text: "I'm sorry, I encountered an error processing your request. Please try again later.",
    }
  }
}

