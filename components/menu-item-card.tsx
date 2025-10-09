"use client"

import Image from "next/image"
import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MenuItemCardProps {
  id: string
  name: string
  description: string
  price: number
  image: string
  onAddToCart: () => void
}

export function MenuItemCard({ name, description, price, image, onAddToCart }: MenuItemCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          <div className="flex-1">
            <h3 className="mb-1 font-semibold text-foreground">{name}</h3>
            <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">{price.toFixed(2)}تومان</span>
              <Button size="sm" onClick={onAddToCart} className="gap-1 cursor-pointer">
                افزودن
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
