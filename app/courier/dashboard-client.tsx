'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { createClient } from '@/lib/supabase/client'
import { OrderStatusBadge } from '@/components/order-status-badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Package, 
  Clock, 
  Truck, 
  CheckCircle2,
  MapPin,
  Phone,
  User,
  Navigation,
  Store
} from 'lucide-react'
import { Profile, OrderStatus } from '@/lib/types'

interface CourierDashboardClientProps {
  profile: Profile
  initialOrders: any[]
  todayDeliveriesCount: number
  activeDeliveriesCount: number
}

export function CourierDashboardClient({ 
  profile, 
  initialOrders, 
  todayDeliveriesCount,
  activeDeliveriesCount 
}: CourierDashboardClientProps) {
  const { t, language } = useLanguage()
  const [orders, setOrders] = useState(initialOrders)
  const supabase = createClient()

  // Real-time subscription for order updates
  useEffect(() => {
    const channel = supabase
      .channel('courier-orders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
          filter: `courier_id=eq.${profile.id}`,
        },
        async (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            if (['on_the_way', 'ready'].includes(payload.new.status as string)) {
              const { data } = await supabase
                .from('orders')
                .select(`
                  *,
                  restaurant:restaurants(id, name, name_fa, address),
                  customer:profiles!orders_customer_id_fkey(id, full_name, phone),
                  order_items:order_items(
                    id,
                    quantity,
                    unit_price,
                    menu_item:menu_items(id, name, name_fa)
                  )
                `)
                .eq('id', payload.new.id)
                .single()

              if (data) {
                setOrders(prev => {
                  const exists = prev.find(o => o.id === data.id)
                  if (exists) {
                    return prev.map(o => o.id === data.id ? data : o)
                  }
                  return [data, ...prev]
                })
              }
            } else {
              // Remove from list if delivered
              setOrders(prev => prev.filter(o => o.id !== payload.new.id))
            }
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [profile.id, supabase])

  const markDelivered = async (orderId: string) => {
    await supabase
      .from('orders')
      .update({ 
        status: 'delivered', 
        updated_at: new Date().toISOString() 
      })
      .eq('id', orderId)

    setOrders(prev => prev.filter(o => o.id !== orderId))
  }

  const formatPrice = (price: number) => {
    if (language === 'fa') {
      return `${price.toLocaleString('fa-IR')} تومان`
    }
    return `${price.toLocaleString()} Toman`
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    if (language === 'fa') {
      return d.toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    }
    return d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">{t('Dashboard', 'داشبورد')}</h1>
        <p className="text-muted-foreground">
          {t('Welcome', 'خوش آمدید')}, {profile.full_name}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("Today's Deliveries", 'تحویل‌های امروز')}</p>
                <p className="text-2xl font-bold">{todayDeliveriesCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('Active Deliveries', 'تحویل‌های فعال')}</p>
                <p className="text-2xl font-bold">{activeDeliveriesCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Deliveries */}
      <div>
        <h2 className="text-lg font-semibold mb-4">{t('Active Deliveries', 'تحویل‌های فعال')}</h2>
        
        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                {t('No active deliveries', 'تحویل فعالی وجود ندارد')}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order: any) => (
              <Card key={order.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <CardTitle className="text-base">
                        #{order.id.slice(0, 8)}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(order.created_at)}
                      </div>
                    </div>
                    <OrderStatusBadge status={order.status as OrderStatus} size="sm" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Restaurant */}
                  <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                    <Store className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{t('Pick up from', 'دریافت از')}</p>
                      <p className="font-medium">{t(order.restaurant?.name, order.restaurant?.name_fa)}</p>
                      <p className="text-sm text-muted-foreground">{order.restaurant?.address}</p>
                    </div>
                  </div>

                {/* Order Items Summary */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {t('Order Items', 'آیتم‌های سفارش')}
                    </p>
                    {order.order_items?.map((item: any) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.quantity}x {t(item.menu_item?.name, item.menu_item?.name_fa)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  
                {/* Total & Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('Total', 'جمع کل')}</p>
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(order.total_amount)}
                      </p>
                    </div>
                    <Button
                      onClick={() => markDelivered(order.id)}
                      className="gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {t('Mark Delivered', 'تحویل داده شد')}
                    </Button>
                  </div>
                  <Separator />

                  
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
