"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ParagraphLoadMoreProps {
  text: string
  previewLength?: number
  className?: string
}

export default function ParagraphLoadMore({ text, previewLength = 200, className = "" }: ParagraphLoadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const shouldTruncate = text.length > previewLength
  const displayText = isExpanded || !shouldTruncate ? text : text.slice(0, previewLength) + "..."

  return (
    <div className={`space-y-3 ${className} flex flex-col justify-center items-center`}>
      <p className="text-foreground leading-relaxed text-pretty">{displayText}</p>

      {shouldTruncate && (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary hover:text-primary/80"
        >
          {isExpanded ? "مشاهده کمتر" : "مشاهده بیشتر"}
        </Button>
      )}
    </div>
  )
}
