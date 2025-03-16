"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { saveOnboardingPreferences } from "@/app/actions/task-actions"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([])
  const [fitnessLevel, setFitnessLevel] = useState<string>("beginner")
  const [contentInterests, setContentInterests] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const handleDietaryChange = (value: string) => {
    setDietaryPreferences((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleContentChange = (value: string) => {
    setContentInterests((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      try {
        setIsSubmitting(true)

        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          toast({
            title: "Authentication Error",
            description: "Please sign in to complete your profile.",
            variant: "destructive",
          })
          router.push("/login")
          return
        }

        await saveOnboardingPreferences(user.id, dietaryPreferences, fitnessLevel, contentInterests)

        toast({
          title: "Onboarding complete!",
          description: "Your preferences have been saved.",
        })

        router.push("/")
      } catch (error) {
        console.error("Error saving preferences:", error)
        toast({
          title: "Error",
          description: "Failed to save your preferences. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to Holistic Daily</h1>
        <p className="text-muted-foreground">Let's personalize your experience</p>

        <div className="flex justify-center gap-2 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i === step ? "bg-primary" : "bg-muted"}`} />
          ))}
        </div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Dietary Preferences</CardTitle>
                <CardDescription>Select any dietary preferences or restrictions you have</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vegetarian"
                    checked={dietaryPreferences.includes("vegetarian")}
                    onCheckedChange={() => handleDietaryChange("vegetarian")}
                  />
                  <Label htmlFor="vegetarian">Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vegan"
                    checked={dietaryPreferences.includes("vegan")}
                    onCheckedChange={() => handleDietaryChange("vegan")}
                  />
                  <Label htmlFor="vegan">Vegan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gluten-free"
                    checked={dietaryPreferences.includes("gluten-free")}
                    onCheckedChange={() => handleDietaryChange("gluten-free")}
                  />
                  <Label htmlFor="gluten-free">Gluten-free</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dairy-free"
                    checked={dietaryPreferences.includes("dairy-free")}
                    onCheckedChange={() => handleDietaryChange("dairy-free")}
                  />
                  <Label htmlFor="dairy-free">Dairy-free</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="no-restrictions"
                    checked={dietaryPreferences.includes("no-restrictions")}
                    onCheckedChange={() => handleDietaryChange("no-restrictions")}
                  />
                  <Label htmlFor="no-restrictions">No restrictions</Label>
                </div>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Fitness Level</CardTitle>
                <CardDescription>Select your current fitness level</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={fitnessLevel} onValueChange={setFitnessLevel}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="beginner" id="beginner" />
                    <Label htmlFor="beginner">Beginner - New to fitness</Label>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate">Intermediate - Exercise 1-3 times per week</Label>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <RadioGroupItem value="advanced" id="advanced" />
                    <Label htmlFor="advanced">Advanced - Exercise 4+ times per week</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle>Content Interests</CardTitle>
                <CardDescription>Select topics you're interested in for brain stimulation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="science"
                    checked={contentInterests.includes("science")}
                    onCheckedChange={() => handleContentChange("science")}
                  />
                  <Label htmlFor="science">Science & Technology</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="arts"
                    checked={contentInterests.includes("arts")}
                    onCheckedChange={() => handleContentChange("arts")}
                  />
                  <Label htmlFor="arts">Arts & Culture</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="business"
                    checked={contentInterests.includes("business")}
                    onCheckedChange={() => handleContentChange("business")}
                  />
                  <Label htmlFor="business">Business & Entrepreneurship</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="personal-growth"
                    checked={contentInterests.includes("personal-growth")}
                    onCheckedChange={() => handleContentChange("personal-growth")}
                  />
                  <Label htmlFor="personal-growth">Personal Growth</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="history"
                    checked={contentInterests.includes("history")}
                    onCheckedChange={() => handleContentChange("history")}
                  />
                  <Label htmlFor="history">History & Philosophy</Label>
                </div>
              </CardContent>
            </>
          )}

          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={step === 1 || isSubmitting}>
              Back
            </Button>
            <Button onClick={handleNext} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : step === 3 ? "Complete" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

