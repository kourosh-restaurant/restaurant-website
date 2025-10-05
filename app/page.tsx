import { Navbar } from "@/components/navbar"
import { RestaurantCard } from "@/components/restaurant-card"

const restaurants = [
  {
    id: "1",
    name: "Bella Italia",
    description: "Authentic Italian cuisine with fresh pasta and wood-fired pizzas",
    image: "/italian-restaurant-food.png",
    rating: 4.8,
    deliveryTime: "25-35 min",
    cuisine: "Italian",
  },
  {
    id: "2",
    name: "Sushi Master",
    description: "Premium sushi and Japanese dishes made by expert chefs",
    image: "/bustling-sushi-restaurant.png",
    rating: 4.9,
    deliveryTime: "30-40 min",
    cuisine: "Japanese",
  },
  {
    id: "3",
    name: "Burger House",
    description: "Juicy gourmet burgers with hand-cut fries and craft sodas",
    image: "/gourmet-burger.png",
    rating: 4.6,
    deliveryTime: "20-30 min",
    cuisine: "American",
  },
  {
    id: "4",
    name: "Spice Garden",
    description: "Flavorful Indian curries and tandoori specialties",
    image: "/indian-curry-food.jpg",
    rating: 4.7,
    deliveryTime: "35-45 min",
    cuisine: "Indian",
  },
  {
    id: "5",
    name: "Taco Fiesta",
    description: "Authentic Mexican tacos, burritos, and fresh guacamole",
    image: "/mexican-tacos.jpg",
    rating: 4.5,
    deliveryTime: "25-35 min",
    cuisine: "Mexican",
  },
  {
    id: "6",
    name: "Green Bowl",
    description: "Healthy salads, smoothie bowls, and plant-based options",
    image: "/healthy-salad-bowl.png",
    rating: 4.8,
    deliveryTime: "15-25 min",
    cuisine: "Healthy",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-foreground text-balance">Discover Restaurants Near You</h1>
          <p className="text-lg text-muted-foreground">
            Order from the best local restaurants with easy on-demand delivery
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} {...restaurant} />
          ))}
        </div>
      </main>
    </div>
  )
}
