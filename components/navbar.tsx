"use client"

import Link from "next/link"
import { useCart } from '@/context/CartContext'
import { ShoppingCart, User, UtensilsCrossed } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navbar() {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <UtensilsCrossed className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground hover:text-primary duration-75">رستوران کوروش</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            خانه
          </Link>
          <Link href="/orders" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            درباره ما
          </Link>
          <Link
            href="/restaurant/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            وضعیت سفارش
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                { }
              </span>
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="hidden md:flex bg-transparent">
            <Link href="/login">
              <User className="mr-2 h-4 w-4" />
              ورود
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
