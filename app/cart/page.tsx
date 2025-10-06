'use client'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart()

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 20000
  const tax = subtotal * 0.09
  const total = subtotal + deliveryFee + tax

  if (cartItems.length === 0) {
    return (
      <Card className="m-10 p-10 text-center">
        <p className="mb-4">سبد خرید شما خالی است !</p>
        <Button asChild><Link href="/">بازگشت به منو</Link></Button>
      </Card>
    )
  }


  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">سبد خرید شما</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b pb-4">
              <div
                className="h-20 w-20 rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="font-medium text-primary">{item.price.toLocaleString()} تومان</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus /></Button>
                <span>{item.quantity}</span>
                <Button size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus /></Button>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => removeItem(item.id)}>
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Card>
          <CardHeader><CardTitle>جمع کل</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between"><span>جمع جز</span><span>{subtotal.toLocaleString()} تومان</span></div>
            <div className="flex justify-between"><span>هزینه ارسال</span><span>{deliveryFee.toLocaleString()} تومان</span></div>
            <div className="flex justify-between"><span>مالیات%9</span><span>{tax.toLocaleString()} تومان</span></div>
            <div className="border-t pt-3 flex justify-between font-bold"><span>جمع کل</span><span>{total.toLocaleString()} تومان</span></div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg">ثبت سفارش</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
