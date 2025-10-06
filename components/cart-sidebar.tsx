"use client"

import { X, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartSidebarProps {
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartSidebar({ items, onUpdateQuantity, onRemove }: CartSidebarProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 20_000
  const total = subtotal + deliveryFee

  return (
    <Card className="sticky top-20 h-fit">
      <CardHeader>
        <CardTitle className="text-foreground">سبد خرید شما</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-6">
          {items.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">!سبد خرید شما خالی است</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-3 border-b border-border pb-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{item.name}</h4>
                    <p className="text-sm text-primary">{item.price.toFixed(2)}تومان</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7 bg-transparent"
                      onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-6 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-7 w-7 bg-transparent"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button size="icon" variant="cross" className="h-7 w-7" onClick={() => onRemove(item.id)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <div className="w-full space-y-2 border-t border-border pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">جمع غذا</span>
            <span className="font-medium text-foreground">{subtotal.toFixed(2)}تومان</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">هزینه غذا</span>
            <span className="font-medium text-foreground">{deliveryFee.toFixed(2)}تومان</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 font-semibold">
            <span className="text-foreground">مجموع</span>
            <span className="text-primary">{total.toFixed(2)}تومان</span>
          </div>
        </div>
        <Button className="w-full" size="lg" disabled={items.length === 0}>
          پرداخت
        </Button>
      </CardFooter>
    </Card>
  )
}
