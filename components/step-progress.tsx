"use client"

import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"
import React, { ReactNode, useRef } from "react"

interface Step {
  id: number
  label: string
  icon?: React.ReactNode
}

interface CurvedStepsProps {
  steps: Step[]
}

interface StepItemProps {
  step: Step
  index: number
  totalSteps: number
  scrollYProgress: MotionValue<number>
  position: { x: number; y: number }
}

function StepItem({ step, index, totalSteps, scrollYProgress, position }: StepItemProps) {
  const isLeft = position.x < 50
  const stepProgress = index / (totalSteps - 1)

  // All hooks are now at the top level of this component
  const contentOpacity = useTransform(
    scrollYProgress,
    [Math.max(0, stepProgress - 0.15), stepProgress, Math.min(1, stepProgress + 0.15)],
    [0.4, 1, 0.4],
  )
  const contentScale = useTransform(
    scrollYProgress,
    [Math.max(0, stepProgress - 0.15), stepProgress, Math.min(1, stepProgress + 0.15)],
    [0.95, 1.05, 0.95],
  )
  const circleScale = useTransform(
    scrollYProgress,
    [Math.max(0, stepProgress - 0.15), stepProgress, Math.min(1, stepProgress + 0.15)],
    [1, 1.15, 1],
  )
  const glowOpacity = useTransform(
    scrollYProgress,
    [Math.max(0, stepProgress - 0.15), stepProgress, Math.min(1, stepProgress + 0.15)],
    [0, 0.5, 0],
  )
  const glowScale = useTransform(
    scrollYProgress,
    [Math.max(0, stepProgress - 0.15), stepProgress, Math.min(1, stepProgress + 0.15)],
    [1, 1.8, 1],
  )
  const checkOpacity = useTransform(scrollYProgress, [Math.max(0, stepProgress - 0.1), stepProgress], [0, 1])

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0.8, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      <div
        className={cn(
          "flex items-center gap-3 md:gap-6",
          "flex-col md:flex-row",
          isLeft ? "md:flex-row-reverse" : "md:flex-row",
        )}
      >
        {/* Step Content */}
        <motion.div
          className={cn(
            "flex gap-2",
            "items-center text-center md:min-w-[180px]",
            isLeft ? "md:items-end md:text-right" : "md:items-start md:text-left",
          )}
          style={{
            opacity: 1,
            scale: 1,
          }}
        >
          <h3 className="text-base md:text-lg font-semibold tracking-tight text-primary">{step.label}</h3>
          {step.icon && (
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed max-w-[200px] md:max-w-none">
              {step.icon}
            </p>
          )}
        </motion.div>

        {/* Step Circle */}
        <motion.div
          className="relative flex-shrink-0"
          style={{
            scale: circleScale,
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/20"
            style={{
              opacity: glowOpacity,
              scale: glowScale,
            }}
          />

          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-base font-bold bg-gradient-to-br from-primary to-green-500 text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/10">
            <motion.svg
              className="w-5 h-5 md:w-6 md:h-6"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                opacity: checkOpacity,
              }}
            >
              <motion.path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function CurvedSteps({ steps }: CurvedStepsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const getStepPosition = (index: number, total: number) => {
    const verticalSpacing = 100 / (total - 1)
    const y = index * verticalSpacing

    const amplitude = 35
    const normalizedIndex = index / (total - 1)
    const x = 50 + amplitude * Math.cos(normalizedIndex * Math.PI)

    return { x, y }
  }

  const generatePath = () => {
    if (steps.length < 2) return ""

    const positions = steps.map((_, i) => getStepPosition(i, steps.length))
    let path = `M ${positions[0].x} ${positions[0].y}`

    for (let i = 1; i < positions.length; i++) {
      const prev = positions[i - 1]
      const curr = positions[i]

      const distance = curr.y - prev.y
      const cp1X = prev.x
      const cp1Y = prev.y + distance * 0.5
      const cp2X = curr.x
      const cp2Y = curr.y - distance * 0.5

      path += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${curr.x} ${curr.y}`
    }

    return path
  }

  return (
    <div ref={containerRef} className=" relative flex justify-center items-center">
      <div className="sticky top-0 flex items-center justify-center min-h-screen bg-background p-4 md:p-8">
        <div className="relative w-full max-w-2xl h-[600px] md:h-[700px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d={generatePath()}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="0.5 md:0.35"
              strokeLinecap="round"
              strokeDasharray="1.5 1.5"
              style={{
                pathLength: scrollYProgress,
              }}
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(25, 75%, 55%)" />
                <stop offset="100%" stopColor="hsl(15, 85%, 60%)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Steps */}
          {steps.map((step, index) => {
            const position = getStepPosition(index, steps.length)
            return (
              <StepItem
                key={step.id}
                step={step}
                index={index}
                totalSteps={steps.length}
                scrollYProgress={scrollYProgress}
                position={position}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
