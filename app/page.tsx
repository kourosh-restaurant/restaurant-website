"use client"

import { RestaurantCard } from "@/components/restaurant-card"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { MenuItemCard } from "@/components/menu-item-card"
import { CartSidebar } from "@/components/cart-sidebar"
import { Button } from "@/components/ui/button"
import { UtensilsCrossed } from "lucide-react"


const menuItems = [
  {
    id: "1",
    name: "چلو جوجه با استخوان",
    description: "Classic pizza with fresh mozzarella, tomato sauce, and basil",
    price: 120_000,
    image: "/item1.jpg",
  },
  {
    id: "2",
    name: "قفقازی",
    description: "Creamy pasta with pancetta, eggs, and parmesan cheese",
    price: 140_000,
    image: "/item2.jpg",
  },
  {
    id: "3",
    name: "چنجه گوسفندی",
    description: "Crisp romaine lettuce with caesar dressing and croutons",
    price: 135_000,
    image: "/item3.jpg",
  },
  {
    id: "4",
    name: "چلوکباب شاه عباسی",
    description: "Classic Italian dessert with coffee-soaked ladyfingers",
    price: 160_000,
    image: "/item4.jpg",
  },
  {
    id: "5",
    name: "زرشک پلو با مرغ",
    description: "Layers of pasta with meat sauce, ricotta, and mozzarella",
    price: 185_000,
    image: "/item5.jpg",
  },
  {
    id: "6",
    name: "سینی مخصوص سرآشپز",
    description: "Toasted bread topped with tomatoes, garlic, and olive oil",
    price: 200_000,
    image: "/item6.jpg",
  },
]

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}


export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

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
        <div className="mb-8 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 p-12 flex flex-col gap-5">
          <h1 className="mb-2 text-4xl font-bold text-foreground text-balance flex gap-2 items-center">خوشمزگی با اصالت ایرانی
            <UtensilsCrossed className="h-10 w-10 text-primary" />
          </h1>
          <p className="text-lg text-muted-foreground">
            آدرس: مازندران، نوشهر، میدان شموشک، روبروی باغ اکولوژی، جنب هایپر جانبو
          </p>
          <div className="flex gap-4">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-5 w-5 rounded-full bg-green-300 opacity-75 animate-ping"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </div>
            <p className="text-sm">سفارش میپذیریم</p>
          </div>
        </div>

        <div className="min-h-screen">
          <main className="container mx-auto px-4 py-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="mb-6 text-2xl font-bold text-foreground">منو رستوران</h2>
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
      </main>
    </div>
  )
}
