import Image from "next/image"
import Link from "next/link"
import { Clock, Star } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface RestaurantCardProps {
  id: string
  name: string
  description: string
  image: string
  rating: number
  deliveryTime: string
  cuisine: string
}

export function RestaurantCard({ id, name, description, image, rating, deliveryTime, cuisine }: RestaurantCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
          <div className="flex items-center gap-1 rounded-md bg-accent px-2 py-1">
            <Star className="h-3 w-3 fill-accent-foreground text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">{rating}</span>
          </div>
        </div>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{deliveryTime}</span>
          </div>
          <span>•</span>
          <span>{cuisine}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/restaurant/${id}`}>View Menu</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
