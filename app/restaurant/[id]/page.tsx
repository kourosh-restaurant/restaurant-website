"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { MenuItemCard } from "@/components/menu-item-card"
import { CartSidebar } from "@/components/cart-sidebar"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomato sauce, and basil",
    price: 12.99,
    image: "/margherita-pizza.png",
  },
  {
    id: "2",
    name: "Spaghetti Carbonara",
    description: "Creamy pasta with pancetta, eggs, and parmesan cheese",
    price: 14.99,
    image: "/spaghetti-carbonara.png",
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce with caesar dressing and croutons",
    price: 8.99,
    image: "/caesar-salad.png",
  },
  {
    id: "4",
    name: "Tiramisu",
    description: "Classic Italian dessert with coffee-soaked ladyfingers",
    price: 6.99,
    image: "/classic-tiramisu.png",
  },
  {
    id: "5",
    name: "Lasagna",
    description: "Layers of pasta with meat sauce, ricotta, and mozzarella",
    price: 15.99,
    image: "/classic-lasagna.png",
  },
  {
    id: "6",
    name: "Bruschetta",
    description: "Toasted bread topped with tomatoes, garlic, and olive oil",
    price: 7.99,
    image: "/classic-bruschetta.png",
  },
]

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export default function RestaurantPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "Margherita Pizza", price: 12.99, quantity: 1 },
    { id: "2", name: "Spaghetti Carbonara", price: 14.99, quantity: 2 },
  ])

  const handleAddToCart = (item: (typeof menuItems)[0]) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }]
    })
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const handleRemove = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Restaurants
          </Link>
        </Button>

        <div className="mb-8 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 p-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Bella Italia</h1>
          <p className="text-muted-foreground">Authentic Italian cuisine with fresh pasta and wood-fired pizzas</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-foreground">Menu</h2>
            <div className="grid gap-4">
              {menuItems.map((item) => (
                <MenuItemCard key={item.id} {...item} onAddToCart={() => handleAddToCart(item)} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <CartSidebar items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemove} />
          </div>
        </div>
      </main>
    </div>
  )
}
