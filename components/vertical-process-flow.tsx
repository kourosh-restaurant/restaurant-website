"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface Step {
  id: number
  title: string
  icon?: React.ReactNode
  image: string
}

interface VerticalProcessFlowProps {
  steps: Step[]
}

export function VerticalProcessFlow({ steps }: VerticalProcessFlowProps) {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const containerTop = containerRef.current.getBoundingClientRect().top
      const containerHeight = containerRef.current.offsetHeight
      const viewportCenter = window.innerHeight / 2

      // Find which step is closest to the center of the viewport
      let closestStep = 0
      let minDistance = Number.POSITIVE_INFINITY

      stepRefs.current.forEach((ref, index) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        const stepCenter = rect.top + rect.height / 2
        const distance = Math.abs(stepCenter - viewportCenter)

        if (distance < minDistance) {
          minDistance = distance
          closestStep = index
        }
      })

      setActiveStep(closestStep)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Generate symmetric S-curve path between two points
  const generateCurvePath = (index: number) => {
    const stepHeight = 200 // Approximate height between steps
    const startY = 0
    const endY = stepHeight
    const midY = stepHeight / 2

    // Control points for symmetric S-curve
    const cp1Y = midY * 0.5
    const cp2Y = midY * 1.5

    return `M 0 ${startY} C 0 ${cp1Y}, 0 ${cp2Y}, 0 ${endY}`
  }

  return (
    <div ref={containerRef} className="relative py-20">
      {steps.map((step, index) => (
        <div
          key={step.id}
          ref={(el) => {
            stepRefs.current[index] = el
          }}
          className="relative mb-48 last:mb-0"
        >
          {/* Step Content */}
          <div className="flex items-center justify-around gap-8 flex-col md:flex-row">
            {/* Circle Marker */}
            <div className="relative flex-shrink-0">
              <div
                className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 transition-all duration-500 ${index <= activeStep
                  ? "border-primary bg-primary shadow-lg shadow-primary/30"
                  : "border-border bg-background"
                  }`}
              >
                <span
                  className={`text-lg font-bold transition-colors duration-500 ${index <= activeStep ? "text-primary-foreground" : "text-muted-foreground"
                    }`}
                >
                  {step.id}
                </span>
              </div>

              {/* Animated dots on the circle */}
              {index <= activeStep && (
                <>
                  <div className="absolute inset-0 animate-ping rounded-full bg-primary opacity-20" />
                  <div className="absolute inset-0 animate-pulse rounded-full bg-primary opacity-10" />
                </>
              )}
            </div>

            {/* Step Text */}
            <div className="flex gap-4 pt-3 justify-center items-center">
              <h3
                className={`text-2xl font-semibold transition-all duration-500 ${index <= activeStep ? "text-foreground" : "text-muted-foreground"
                  }`}
              >
                {step.title}
              </h3>
              {step.icon && (
                <p
                  className={`mt-2 transition-all duration-500 ${index <= activeStep ? "text-muted-foreground" : "text-muted-foreground/50"
                    }`}
                >
                  {step.icon}
                </p>
              )}
            </div>
            <Image src={step.image} height={100} width={200} className="hidden md:block rounded-xl object-cover h-[200px] w-[360px]" alt="step-image" />
          </div>

          {/* Curved Dashed Line to Next Step */}
          {index < steps.length - 1 && (
            <div className="absolute right-8 top-16 h-48 w-0">
              <svg className="h-full w-full overflow-visible" style={{ width: "1px" }} preserveAspectRatio="none">
                <defs>
                  {/* Gradient for active state */}
                  <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={index < activeStep ? "1" : "0.3"} />
                    <stop
                      offset="100%"
                      stopColor="var(--color-primary)"
                      stopOpacity={index < activeStep ? "1" : "0.3"}
                    />
                  </linearGradient>
                </defs>

                {/* Symmetric S-curve path */}
                <path
                  d={generateCurvePath(index)}
                  fill="none"
                  stroke={`url(#gradient-${index})`}
                  strokeWidth="3"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                  className="transition-all duration-700"
                  style={{
                    strokeDashoffset: index < activeStep ? "0" : "16",
                  }}
                />

                {/* Animated dots along the path */}
                {index < activeStep && (
                  <>
                    <circle r="3" fill="var(--color-primary)" className="animate-dash-flow">
                      <animateMotion dur="2s" repeatCount="indefinite" path={generateCurvePath(index)} />
                    </circle>
                    <circle r="3" fill="var(--color-accent)" className="animate-dash-flow">
                      <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s" path={generateCurvePath(index)} />
                    </circle>
                  </>
                )}
              </svg>
            </div>
          )}
        </div>
      ))}

      <style jsx>{`
        @keyframes dash-flow {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        .animate-dash-flow {
          animation: dash-flow 2s infinite;
        }
      `}</style>
    </div>
  )
}
