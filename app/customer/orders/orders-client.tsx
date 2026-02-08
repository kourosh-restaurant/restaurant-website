'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { createClient } from '@/lib/supabase/client'
import { OrderStatusBadge } from '@/components/order-status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Package, Clock } from 'lucide-react'
import { Order, OrderStatus } from '@/lib/types'

interface CustomerOrdersClientProps {
  initialOrders: any[]
}

export function CustomerOrdersClient({ initialOrders }: CustomerOrdersClientProps) {
  const { t, language } = useLanguage()
  const [orders, setOrders] = useState(initialOrders)
  const supabase = createClient()

  // Real-time subscription for order updates
  useEffect(() => {
    const channel = supabase
      .channel('customer-orders')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
        },
        (payload) => {
          setOrders(prev => 
            prev.map(order => 
              order.id === payload.new.id 
                ? { ...order, ...payload.new }
                : order
            )
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const formatPrice = (price: number) => {
    if (language === 'fa') {
      return `${price.toLocaleString('fa-IR')} تومان`
    }
    return `${price.toLocaleString()} Toman`
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    if (language === 'fa') {
      return d.toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    }
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-2">
          {t('No orders yet', 'هنوز سفارشی ندارید')}
        </h2>
        <p className="text-muted-foreground">
          {t('Your orders will appear here', 'سفارشات شما اینجا نمایش داده می‌شود')}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('My Orders', 'سفارشات من')}</h1>

      <div className="space-y-4">
        {orders.map((order: any) => (
          <Card key={order.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">
                    {t(order.restaurant?.name, order.restaurant?.name_fa)}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Clock className="h-4 w-4" />
                    {formatDate(order.created_at)}
                  </div>
                </div>
                <OrderStatusBadge status={order.status as OrderStatus} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {order.order_items?.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {t(item.menu_item?.name, item.menu_item?.name_fa)}
                    </span>
                    <span className="text-muted-foreground">
                      {formatPrice(item.quantity * item.unit_price)}
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-3" />

              <div className="flex justify-between font-medium">
                <span>{t('Total', 'جمع کل')}</span>
                <span className="text-primary">{formatPrice(order.total_amount)}</span>
              </div>

              {order.delivery_address && (
                <div className="mt-3 text-sm">
                  <span className="text-muted-foreground">{t('Delivery to:', 'تحویل به:')}</span>
                  <p className="mt-1">{order.delivery_address}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
