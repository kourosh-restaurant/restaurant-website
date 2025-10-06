"use client"

import { useState } from "react"
import { MenuItemCard } from "@/components/menu-item-card"
import { CartSidebar } from "@/components/cart-sidebar"
import { UtensilsCrossed } from "lucide-react"
import { useCart } from '@/context/CartContext'

const menuItems = [
  {
    id: "1",
    name: "چلو جوجه با استخوان",
    description: "300گرم برنج، 200گرم جوجه با استخوان",
    price: 120_000,
    image: "/item1.jpg",
  },
  {
    id: "2",
    name: "قفقازی",
    description: "300گرم برنج، 150گرم سلطانی، 150گرم سینه مرغ",
    price: 140_000,
    image: "/item2.jpg",
  },
  {
    id: "3",
    name: "چنجه گوسفندی",
    description: "300گرم برنج، 200گرم چنجه گوسفندی",
    price: 135_000,
    image: "/item3.jpg",
  },
  {
    id: "4",
    name: "چلوکباب شاه عباسی",
    description: "300گرم برنج، 150گرم سینه مرغ، 150گرم کباب گوشت",
    price: 160_000,
    image: "/item4.jpg",
  },
  {
    id: "5",
    name: "زرشک پلو با مرغ",
    description: "300گرم برنج، 200گرم ران مرغ",
    price: 185_000,
    image: "/item5.jpg",
  },
  {
    id: "6",
    name: "سینی مخصوص سرآشپز",
    description: "500گرم برنج، 100گرم سلطانی، 100گرم جوجه، 100گرم برگ",
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
  const { cartItems, addToCart, updateQuantity, removeItem } = useCart()

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 p-12 flex flex-col gap-5">
          <h1 className="text-4xl font-bold flex gap-2 items-center">
            خوشمزگی با اصالت ایرانی
            <UtensilsCrossed className="h-10 w-10 text-primary" />
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold">منوی رستوران</h2>
            <div className="grid gap-4">
              {menuItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  {...item}
                  onAddToCart={() => addToCart(item)}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <CartSidebar
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
